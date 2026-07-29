import v4 from "./v4.js";

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";
const MEMBERS_PATH = "docs/data/members.json";
const TABLE_MAX_ROWS = 500;
const TABLE_MAX_COLUMNS = 50;
const TABLE_MAX_CELLS = 20_000;
const TABLE_MAX_BYTES = 1_000_000;
const OUTPUT_TYPES = new Set(["any", "files", "code", "server", "table"]);
const REVIEW_MODES = new Set(["none", "recommended"]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return v4.fetch(request, env, ctx);

    try {
      const issueMatch = url.pathname.match(/^\/api\/issues\/(\d+)$/);
      if (issueMatch && request.method === "GET") {
        const session = await requireSession(request, env);
        const issueNumber = Number(issueMatch[1]);
        const [issue, submissions] = await Promise.all([
          fetchIssue(issueNumber, session.token, env),
          loadSubmissions(session.token, env)
        ]);
        return corsJson(issuePayload(issue, submissions), request, env);
      }

      const checklistMatch = url.pathname.match(/^\/api\/issues\/(\d+)\/checklist$/);
      if (checklistMatch && request.method === "PATCH") {
        const session = await requireSession(request, env);
        const result = await updateTaskChecklist(
          Number(checklistMatch[1]),
          await request.json(),
          session,
          env
        );
        return corsJson(result, request, env);
      }

      const submissionMatch = url.pathname.match(
        /^\/api\/phases\/(\d+)\/tasks\/([A-Za-z0-9-]+)\/outputs\/([A-Za-z0-9-]+)\/submissions$/
      );
      if (submissionMatch && request.method === "POST") {
        const input = await request.clone().json().catch(() => ({}));
        if (String(input?.type || "") === "table") {
          const session = await requireSession(request, env);
          const result = await createTableSubmission(
            Number(submissionMatch[1]),
            submissionMatch[2],
            submissionMatch[3],
            input,
            session,
            env
          );
          return corsJson(result, request, env, 201);
        }
      }

      return v4.fetch(request, env, ctx);
    } catch (error) {
      const status = Number(error.status || 500);
      const message = status >= 500
        ? (error.publicMessage || "서버 처리 중 오류가 발생했습니다.")
        : error.message;
      console.error(error);
      return corsJson({ message }, request, env, status);
    }
  }
};

async function requireSession(request, env) {
  const sessionId = readBearer(request);
  if (!sessionId) throw httpError(401, "GitHub 로그인이 필요합니다.");
  const session = await env.SESSIONS.get(`session:${sessionId}`, "json");
  if (!session?.token || !session?.user) throw httpError(401, "로그인 세션이 만료되었습니다.");
  return { ...session, sessionId };
}

function readBearer(request) {
  const value = request.headers.get("Authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

async function fetchIssue(issueNumber, token, env) {
  if (!Number.isInteger(issueNumber) || issueNumber < 1) throw httpError(400, "Issue 번호가 올바르지 않습니다.");
  return githubJson(`/repos/${env.REPOSITORY}/issues/${issueNumber}`, token);
}

function phaseIdFromIssue(issue) {
  const match = String(issue.title || "").match(/^Phase\s+(\d+)\./i);
  return match ? Number(match[1]) : Number(issue.number);
}

function issuePayload(issue, submissionsData = emptySubmissions(), modifiedBy = null, modifiedAction = null) {
  const phaseId = phaseIdFromIssue(issue);
  const body = String(issue.body || "");
  const tasks = parseTaskSection(
    extractSection(body, "1. 해야 할 것", "2. 나와야 하는 결과물"),
    phaseId
  );
  for (const task of tasks) {
    for (const output of task.outputs) {
      output.submissions = submissionsData.outputs?.[output.id] ?? [];
    }
  }
  const outputs = flattenOutputs(tasks);
  const tasksDone = tasks.filter((item) => item.checked).length;
  const tasksTotal = tasks.length;
  const progress = tasksTotal ? Math.round(tasksDone / tasksTotal * 100) : 0;
  let state = tasksDone ? "in-progress" : "waiting";
  if (tasksTotal && tasksDone === tasksTotal) state = issue.state === "closed" ? "completed" : "review";
  if (issue.state === "closed" && tasksDone < tasksTotal) state = "blocked";

  return {
    issueNumber: issue.number,
    issueUrl: issue.html_url,
    updatedAt: issue.updated_at,
    assignees: (issue.assignees || []).map((user) => user.login).filter(Boolean),
    tasks,
    outputs,
    tasksDone,
    tasksTotal,
    outputsDone: outputs.filter((item) => (item.submissions || []).length > 0).length,
    outputsTotal: outputs.length,
    progress,
    state,
    ...(modifiedBy ? { modifiedBy } : {}),
    ...(modifiedAction ? { modifiedAction } : {})
  };
}

async function updateTaskChecklist(issueNumber, input, session, env) {
  const issue = await fetchIssue(issueNumber, session.token, env);
  const phaseId = phaseIdFromIssue(issue);
  const expectedUpdatedAt = String(input?.expectedUpdatedAt || "");
  if (expectedUpdatedAt && issue.updated_at !== expectedUpdatedAt) {
    throw httpError(409, "다른 연구원이 먼저 수정했습니다.");
  }
  const tasks = validateTasks(input?.tasks, phaseId);
  const body = replaceTaskSection(String(issue.body || ""), tasks);
  const updated = await githubJson(`/repos/${env.REPOSITORY}/issues/${issueNumber}`, session.token, {
    method: "PATCH",
    body: JSON.stringify({ body })
  });
  const submissions = await loadSubmissions(session.token, env);
  return issuePayload(updated, submissions, session.user.login, "과제·산출물 목록 수정");
}

function parseTaskSection(text, phaseId) {
  const tasks = [];
  let current = null;
  let fallbackTaskNumber = 1;
  const fallbackOutputNumbers = new Map();

  for (const rawLine of String(text || "").split(/\r?\n/)) {
    const taskMatch = rawLine.match(/^- \[([ xX])\]\s*(.*)$/);
    if (taskMatch) {
      const metadata = parseMetadata(taskMatch[2]);
      const cleanTextValue = stripMetadata(taskMatch[2]);
      const supplied = String(metadata["task-id"] || "").toUpperCase();
      const id = /^P\d{2}-T\d{2}$/.test(supplied)
        ? supplied
        : `P${String(phaseId).padStart(2, "0")}-T${String(fallbackTaskNumber).padStart(2, "0")}`;
      fallbackTaskNumber += 1;
      current = { id, checked: taskMatch[1].toLowerCase() === "x", text: cleanTextValue, outputs: [] };
      tasks.push(current);
      fallbackOutputNumbers.set(id, 1);
      continue;
    }

    const outputMatch = rawLine.match(/^\s{2,}-\s+(.*)$/);
    if (!outputMatch || !current) continue;
    const metadata = parseMetadata(outputMatch[1]);
    const cleanTextValue = stripMetadata(outputMatch[1]);
    if (!cleanTextValue) continue;
    const next = fallbackOutputNumbers.get(current.id) || 1;
    const supplied = String(metadata["output-id"] || "").toUpperCase();
    const id = /^P\d{2}-T\d{2}-O\d{2}$/.test(supplied)
      ? supplied
      : `${current.id}-O${String(next).padStart(2, "0")}`;
    fallbackOutputNumbers.set(current.id, next + 1);
    const type = OUTPUT_TYPES.has(metadata.type) ? metadata.type : "any";
    const review = REVIEW_MODES.has(metadata.review) ? metadata.review : "none";
    current.outputs.push({ id, text: cleanTextValue, type, review });
  }
  return tasks.filter((task) => task.text);
}

function validateTasks(value, phaseId) {
  if (!Array.isArray(value)) throw httpError(400, "과제 항목 형식이 올바르지 않습니다.");
  if (value.length > 200) throw httpError(400, "과제 항목이 너무 많습니다.");
  const usedTaskIds = new Set();
  const usedOutputIds = new Set();
  let nextTaskNumber = 1;

  return value.map((task, taskIndex) => {
    const text = cleanInlineText(task?.text, `과제 ${taskIndex + 1}`, 500);
    let id = String(task?.id || "").toUpperCase();
    if (!/^P\d{2}-T\d{2}$/.test(id) || usedTaskIds.has(id)) {
      do {
        id = `P${String(phaseId).padStart(2, "0")}-T${String(nextTaskNumber).padStart(2, "0")}`;
        nextTaskNumber += 1;
      } while (usedTaskIds.has(id));
    }
    usedTaskIds.add(id);

    const rawOutputs = Array.isArray(task?.outputs) ? task.outputs : [];
    if (rawOutputs.length > 40) throw httpError(400, `${text}: 산출물 항목이 너무 많습니다.`);
    let nextOutputNumber = 1;
    const outputs = rawOutputs.map((output, outputIndex) => {
      const outputText = cleanInlineText(output?.text, `${text} 산출물 ${outputIndex + 1}`, 500);
      let outputId = String(output?.id || "").toUpperCase();
      if (!/^P\d{2}-T\d{2}-O\d{2}$/.test(outputId) || usedOutputIds.has(outputId)) {
        do {
          outputId = `${id}-O${String(nextOutputNumber).padStart(2, "0")}`;
          nextOutputNumber += 1;
        } while (usedOutputIds.has(outputId));
      }
      usedOutputIds.add(outputId);
      const type = OUTPUT_TYPES.has(String(output?.type || "")) ? String(output.type) : "any";
      const review = REVIEW_MODES.has(String(output?.review || "")) ? String(output.review) : "none";
      return { id: outputId, text: outputText, type, review };
    });
    return { id, checked: Boolean(task?.checked), text, outputs };
  });
}

function replaceTaskSection(body, tasks) {
  const heading = "1. 해야 할 것";
  const nextHeading = "2. 나와야 하는 결과물";
  const pattern = new RegExp(
    `(^##\\s+${escapeRegExp(heading)}\\s*$\\r?\\n?)([\\s\\S]*?)(?=^##\\s+${escapeRegExp(nextHeading)}\\s*$)`,
    "m"
  );
  const match = pattern.exec(body);
  if (!match) throw httpError(422, `${heading} 영역을 Issue 본문에서 찾지 못했습니다.`);
  const replacement = `${match[1]}\n${serializeTasks(tasks)}\n\n`;
  return `${body.slice(0, match.index)}${replacement}${body.slice(match.index + match[0].length)}`;
}

function serializeTasks(tasks) {
  return tasks.map((task) => {
    const taskLine = `- [${task.checked ? "x" : " "}] <!-- task-id:${task.id} --> ${task.text}`;
    const outputLines = (task.outputs || []).map((output) =>
      `  - <!-- output-id:${output.id} type:${output.type || "any"} review:${output.review || "none"} --> ${output.text}`
    );
    return [taskLine, ...outputLines].join("\n");
  }).join("\n");
}

function parseMetadata(value) {
  const match = String(value || "").match(/<!--\s*([^>]+?)\s*-->/);
  if (!match) return {};
  const result = {};
  for (const part of match[1].trim().split(/\s+/)) {
    const separator = part.indexOf(":");
    if (separator <= 0) continue;
    result[part.slice(0, separator).toLowerCase()] = part.slice(separator + 1);
  }
  return result;
}

function stripMetadata(value) {
  return String(value || "").replace(/\s*<!--\s*[^>]+?\s*-->\s*/g, " ").trim();
}

function flattenOutputs(tasks) {
  return (tasks || []).flatMap((task) => (task.outputs || []).map((output) => ({ ...output, taskId: task.id })));
}

function extractSection(body, heading, nextHeading) {
  const pattern = new RegExp(
    `^##\\s+${escapeRegExp(heading)}\\s*$\\s*([\\s\\S]*?)(?=^##\\s+${escapeRegExp(nextHeading)}\\s*$)`,
    "m"
  );
  const match = body.match(pattern);
  return match ? match[1] : "";
}

async function createTableSubmission(phaseId, requestedTaskId, requestedOutputId, input, session, env) {
  if (!Number.isInteger(phaseId) || phaseId < 1) throw httpError(400, "Phase 번호가 올바르지 않습니다.");
  const taskId = String(requestedTaskId || "").toUpperCase();
  const outputId = String(requestedOutputId || "").toUpperCase();
  if (!/^P\d{2}-T\d{2}$/.test(taskId)) throw httpError(400, "과제 ID가 올바르지 않습니다.");
  if (!/^P\d{2}-T\d{2}-O\d{2}$/.test(outputId)) throw httpError(400, "산출물 ID가 올바르지 않습니다.");

  const issueNumber = Number(input?.issueNumber || phaseId);
  const issue = await fetchIssue(issueNumber, session.token, env);
  if (phaseIdFromIssue(issue) !== phaseId) throw httpError(400, "Phase와 Issue가 일치하지 않습니다.");
  assertSubmissionPermission(issue, session, env);
  const expectedUpdatedAt = String(input?.expectedUpdatedAt || "");
  if (expectedUpdatedAt && issue.updated_at !== expectedUpdatedAt) {
    throw httpError(409, "다른 연구원이 먼저 목록을 수정했습니다.");
  }

  const tasks = parseTaskSection(
    extractSection(String(issue.body || ""), "1. 해야 할 것", "2. 나와야 하는 결과물"),
    phaseId
  );
  const task = tasks.find((item) => item.id.toUpperCase() === taskId);
  const target = task?.outputs.find((item) => item.id.toUpperCase() === outputId);
  if (!task || !target) throw httpError(404, "해당 과제의 산출물 항목을 찾지 못했습니다.");
  if (target.type !== "any" && target.type !== "table") {
    throw httpError(400, `이 산출물은 ${target.type} 방식으로 제출해야 합니다.`);
  }

  const table = normalizeTable(input?.submission || {});
  const member = await resolveMember(session.user.login, session.token, env);
  const now = new Date();
  const compactTime = now.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const submissionId = `${compactTime}-${safeSegment(session.user.login)}-${randomToken(4).slice(0, 6)}`;
  const rootPath = `members/${member.folder}/phases/phase-${String(phaseId).padStart(2, "0")}/tasks/${taskId}/outputs/${outputId}`;
  const submissionPath = `${rootPath}/submissions/${submissionId}`;
  const repositoryUrl = `https://github.com/${env.REPOSITORY}`;
  const rawBaseUrl = `https://raw.githubusercontent.com/${env.REPOSITORY}/${DEFAULT_BRANCH}/${encodePath(submissionPath)}`;
  const folderUrl = `${repositoryUrl}/tree/${DEFAULT_BRANCH}/${encodePath(submissionPath)}`;
  const uploadedAt = now.toISOString();

  const built = buildTableFiles({
    table,
    target,
    task,
    phaseId,
    issueNumber,
    submissionPath,
    folderUrl,
    member,
    login: session.user.login,
    uploadedAt
  });
  const submissionsData = await loadSubmissions(session.token, env);
  const record = {
    submissionId,
    phaseId,
    issueNumber,
    taskId,
    taskText: task.text,
    outputId,
    outputText: target.text,
    uploader: session.user.login,
    memberName: member.name,
    memberFolder: member.folder,
    type: "table",
    uploadedAt,
    folderPath: submissionPath,
    folderUrl,
    summary: `${table.rowCount}행 × ${table.columnCount}열 표`,
    files: built.recordFiles,
    table: {
      rowCount: table.rowCount,
      columnCount: table.columnCount,
      hasHeader: table.hasHeader,
      dataUrl: `${rawBaseUrl}/table.json`,
      csvUrl: `${rawBaseUrl}/table.csv`,
      tsvUrl: `${rawBaseUrl}/table.tsv`
    }
  };

  if (!submissionsData.outputs[outputId]) submissionsData.outputs[outputId] = [];
  submissionsData.outputs[outputId].push(record);
  submissionsData.updatedAt = uploadedAt;
  const userSubmissions = submissionsData.outputs[outputId].filter(
    (item) => String(item.memberFolder).toLowerCase() === member.folder.toLowerCase()
  );
  const filesToCommit = [
    ...built.files,
    {
      path: `${submissionPath}/submission.json`,
      contentBase64: utf8ToBase64(JSON.stringify(record, null, 2) + "\n")
    },
    {
      path: `${rootPath}/README.md`,
      contentBase64: utf8ToBase64(buildOutputReadme(target, task, phaseId, member, userSubmissions))
    },
    {
      path: SUBMISSIONS_PATH,
      contentBase64: utf8ToBase64(JSON.stringify(submissionsData, null, 2) + "\n")
    }
  ];
  await commitFilesAtomic(filesToCommit, `Submit ${outputId} table by ${session.user.login}`, session.token, env);
  return {
    submission: record,
    issue: issuePayload(issue, submissionsData, session.user.login, "표 산출물 제출")
  };
}

function normalizeTable(submission) {
  if (!Array.isArray(submission?.rows) || !submission.rows.length) throw httpError(400, "표 데이터가 없습니다.");
  if (submission.rows.length > TABLE_MAX_ROWS) throw httpError(400, `표는 최대 ${TABLE_MAX_ROWS}행까지 저장할 수 있습니다.`);
  const rows = submission.rows.map((row, rowIndex) => {
    if (!Array.isArray(row)) throw httpError(400, `${rowIndex + 1}행 형식이 올바르지 않습니다.`);
    if (row.length > TABLE_MAX_COLUMNS) throw httpError(400, `표는 최대 ${TABLE_MAX_COLUMNS}열까지 저장할 수 있습니다.`);
    return row.map((cell) => String(cell ?? "").replace(/\r\n?/g, "\n").slice(0, 10_000));
  });
  while (rows.length && rows.at(-1).every((cell) => !cell.trim())) rows.pop();
  if (!rows.length) throw httpError(400, "표 데이터가 비어 있습니다.");
  let lastColumn = -1;
  rows.forEach((row) => row.forEach((cell, index) => {
    if (cell.trim()) lastColumn = Math.max(lastColumn, index);
  }));
  if (lastColumn < 0) throw httpError(400, "표 데이터가 비어 있습니다.");
  const normalized = rows.map((row) => Array.from({ length: lastColumn + 1 }, (_, index) => row[index] ?? ""));
  const rowCount = normalized.length;
  const columnCount = lastColumn + 1;
  if (rowCount * columnCount > TABLE_MAX_CELLS) throw httpError(400, `표는 최대 ${TABLE_MAX_CELLS.toLocaleString()}셀까지 저장할 수 있습니다.`);
  const jsonBytes = new TextEncoder().encode(JSON.stringify(normalized)).length;
  if (jsonBytes > TABLE_MAX_BYTES) throw httpError(400, "표 데이터는 1MB를 넘을 수 없습니다.");
  return {
    rows: normalized,
    rowCount,
    columnCount,
    hasHeader: Boolean(submission.hasHeader),
    note: cleanText(submission.note, 5000)
  };
}

function buildTableFiles(context) {
  const { table } = context;
  const tsv = table.rows.map((row) => row.map(tsvCell).join("\t")).join("\n") + "\n";
  const csv = "\uFEFF" + table.rows.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
  const tableJson = JSON.stringify({
    version: 1,
    rowCount: table.rowCount,
    columnCount: table.columnCount,
    hasHeader: table.hasHeader,
    rows: table.rows
  }, null, 2) + "\n";
  const markdown = markdownTable(table.rows, table.hasHeader);
  const readme = buildSubmissionReadme(context, {
    body: [
      "## 저장된 표",
      "",
      `- 크기: ${table.rowCount}행 × ${table.columnCount}열`,
      `- 첫 행 제목 사용: ${table.hasHeader ? "예" : "아니오"}`,
      "- [CSV 원본](./table.csv)",
      "- [TSV 원본](./table.tsv)",
      "- [JSON 원본](./table.json)",
      ...(table.note ? ["", "## 표 설명", "", table.note] : []),
      "",
      markdown
    ].join("\n")
  });
  const files = [
    { path: `${context.submissionPath}/table.tsv`, contentBase64: utf8ToBase64(tsv) },
    { path: `${context.submissionPath}/table.csv`, contentBase64: utf8ToBase64(csv) },
    { path: `${context.submissionPath}/table.json`, contentBase64: utf8ToBase64(tableJson) },
    { path: `${context.submissionPath}/README.md`, contentBase64: utf8ToBase64(readme) }
  ];
  return {
    files,
    recordFiles: [
      { name: "table.tsv", path: `${context.submissionPath}/table.tsv`, size: new TextEncoder().encode(tsv).length },
      { name: "table.csv", path: `${context.submissionPath}/table.csv`, size: new TextEncoder().encode(csv).length },
      { name: "table.json", path: `${context.submissionPath}/table.json`, size: new TextEncoder().encode(tableJson).length }
    ]
  };
}

function tsvCell(value) {
  return String(value ?? "").replace(/[\t\r\n]+/g, " ");
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function markdownTable(rows, hasHeader) {
  const columns = Math.max(1, ...rows.map((row) => row.length));
  const normalized = rows.map((row) => Array.from({ length: columns }, (_, index) => row[index] ?? ""));
  const header = hasHeader ? normalized[0] : Array.from({ length: columns }, (_, index) => `열 ${index + 1}`);
  const body = hasHeader ? normalized.slice(1) : normalized;
  const line = (row) => `| ${row.map(markdownCell).join(" | ")} |`;
  return [line(header), `| ${Array(columns).fill("---").join(" | ")} |`, ...body.map(line)].join("\n");
}

function markdownCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/[\r\n]+/g, "<br>");
}

function buildSubmissionReadme(context, { body }) {
  return [
    `# Phase ${context.phaseId} 산출물 — ${context.target.text}`,
    "",
    `- 과제 ID: \`${context.task.id}\``,
    `- 산출물 ID: \`${context.target.id}\``,
    `- 제출자: ${context.member.name} (\`@${context.login}\`)`,
    `- 제출 시각: ${context.uploadedAt}`,
    `- 관련 Issue: [#${context.issueNumber}](https://github.com/${context.folderUrl.split("/tree/")[0].split("github.com/")[1]}/issues/${context.issueNumber})`,
    "- 제출 방식: table",
    "",
    body,
    ""
  ].join("\n");
}

function buildOutputReadme(output, task, phaseId, member, submissions) {
  const rows = submissions.slice().reverse().map((item, index) => {
    const relative = item.folderPath.split("/").slice(-2).join("/");
    return `| v${submissions.length - index} | ${item.uploadedAt} | ${item.type} | [열기](./${relative}/) |`;
  });
  return [
    `# Phase ${phaseId} · ${output.text}`,
    "",
    `- 과제: ${task.text}`,
    `- 과제 ID: \`${task.id}\``,
    `- 산출물 ID: \`${output.id}\``,
    `- 연구원: ${member.name}`,
    "",
    "## 제출 이력",
    "",
    "| 버전 | 제출 시각 | 유형 | 제출본 |",
    "|---|---|---|---|",
    ...(rows.length ? rows : ["| - | - | - | 제출 없음 |"]),
    ""
  ].join("\n");
}

function assertSubmissionPermission(issue, session, env) {
  // Phase assignees manage responsibility; submission access is validated by resolveMember.
  return true;
}

async function resolveMember(login, token, env) {
  const data = await loadJsonRepoFile(MEMBERS_PATH, token, env, { members: [] });
  const member = (data.members || []).find(
    (item) => String(item.username || "").toLowerCase() === String(login).toLowerCase()
  );
  if (!member) throw httpError(403, "등록된 공동 연구원 계정만 산출물을 제출할 수 있습니다.");
  const folder = String(member.folder || "").trim() || folderFromUrl(member.folderUrl);
  if (!folder || !/^[A-Za-z0-9_-]+$/.test(folder)) throw httpError(500, "연구원 개인 폴더 설정이 올바르지 않습니다.");
  return { name: String(member.name || login), folder };
}

function folderFromUrl(value) {
  try {
    const pathname = new URL(String(value || "")).pathname;
    return decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "");
  } catch {
    return "";
  }
}

function emptySubmissions() {
  return { version: 2, updatedAt: null, outputs: {} };
}

async function loadSubmissions(token, env) {
  const data = await loadJsonRepoFile(SUBMISSIONS_PATH, token, env, emptySubmissions());
  if (!data.outputs || typeof data.outputs !== "object") data.outputs = {};
  if (!data.version || data.version < 2) data.version = 2;
  return data;
}

async function loadJsonRepoFile(path, token, env, fallback) {
  const response = await githubFetch(`/repos/${env.REPOSITORY}/contents/${encodePath(path)}?ref=${DEFAULT_BRANCH}`, token);
  if (response.status === 404) return structuredClone(fallback);
  const payload = await parseGithubResponse(response);
  if (!response.ok) throw githubApiError(response.status, payload);
  if (!payload.content) return structuredClone(fallback);
  try {
    return JSON.parse(base64ToUtf8(String(payload.content).replace(/\s/g, "")));
  } catch {
    throw httpError(500, `${path} 파일 형식이 올바르지 않습니다.`);
  }
}

async function commitFilesAtomic(files, message, token, env) {
  const deduped = new Map();
  for (const file of files) deduped.set(file.path, file.contentBase64);
  const entries = [...deduped.entries()];
  if (!entries.length) throw httpError(400, "커밋할 파일이 없습니다.");
  const ref = await githubJson(`/repos/${env.REPOSITORY}/git/ref/heads/${DEFAULT_BRANCH}`, token);
  const baseSha = ref.object.sha;
  const baseCommit = await githubJson(`/repos/${env.REPOSITORY}/git/commits/${baseSha}`, token);
  const treeEntries = [];
  for (const [path, contentBase64] of entries) {
    const blob = await githubJson(`/repos/${env.REPOSITORY}/git/blobs`, token, {
      method: "POST",
      body: JSON.stringify({ content: contentBase64, encoding: "base64" })
    });
    treeEntries.push({ path, mode: "100644", type: "blob", sha: blob.sha });
  }
  const tree = await githubJson(`/repos/${env.REPOSITORY}/git/trees`, token, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree: treeEntries })
  });
  const commit = await githubJson(`/repos/${env.REPOSITORY}/git/commits`, token, {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [baseSha] })
  });
  try {
    await githubJson(`/repos/${env.REPOSITORY}/git/refs/heads/${DEFAULT_BRANCH}`, token, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha, force: false })
    });
  } catch (error) {
    if ([409, 422].includes(Number(error.status))) {
      throw httpError(409, "다른 커밋이 먼저 반영됐습니다. 최신 내용을 불러온 뒤 다시 제출해 주세요.");
    }
    throw error;
  }
  return commit;
}

function cleanInlineText(value, label, maxLength) {
  const text = String(value || "").trim().replace(/\r?\n/g, " ");
  if (!text) throw httpError(400, `${label} 항목이 비어 있습니다.`);
  if (text.length > maxLength) throw httpError(400, `${label} 항목이 너무 깁니다.`);
  return text;
}

function cleanText(value, maxLength) {
  const text = String(value || "").trim();
  if (text.length > maxLength) throw httpError(400, `입력 내용은 ${maxLength.toLocaleString()}자를 넘을 수 없습니다.`);
  return text;
}

function safeSegment(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function utf8ToBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return btoa(binary);
}

function base64ToUtf8(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function randomToken(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function githubFetch(path, token, options = {}) {
  return fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "vcat-tcad-dashboard-v5",
      ...(options.headers || {})
    }
  });
}

async function parseGithubResponse(response) {
  return response.json().catch(() => ({}));
}

function githubApiError(status, payload) {
  return httpError(status, payload.message || "GitHub API 요청에 실패했습니다.");
}

async function githubJson(path, token, options = {}) {
  const response = await githubFetch(path, token, options);
  const payload = await parseGithubResponse(response);
  if (!response.ok) throw githubApiError(response.status, payload);
  return payload;
}

function corsJson(payload, request, env, status = 200) {
  return corsResponse(new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  }), request, env);
}

function corsResponse(response, request, env) {
  const origin = request.headers.get("Origin");
  const headers = new Headers(response.headers);
  if (origin && origin === env.FRONTEND_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  }
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  headers.set("Access-Control-Allow-Methods", "GET, PATCH, POST, OPTIONS");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
