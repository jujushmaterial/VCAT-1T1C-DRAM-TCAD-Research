import legacy from "./index.js";

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";
const MEMBERS_PATH = "docs/data/members.json";
const PRESENCE_PREFIX = "presence:";
const PRESENCE_TTL_SECONDS = 180;
const PRESENCE_ONLINE_SECONDS = 90;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_FILE_BYTES = 30 * 1024 * 1024;
const MAX_FILES = 10;
const MAX_CODE_BLOCK_BYTES = 500_000;
const MAX_CODE_TOTAL_BYTES = 1_000_000;

const ALLOWED_FILE_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "svg", "webp", "pdf", "docx", "pptx", "xlsx",
  "csv", "json", "txt", "md", "zip"
]);
const CODE_TYPES = {
  sde: { label: "Sentaurus SDE", extension: "cmd", language: "tcl" },
  sprocess: { label: "Sentaurus SProcess", extension: "cmd", language: "tcl" },
  sdevice: { label: "Sentaurus SDevice", extension: "cmd", language: "tcl" },
  svisual: { label: "Sentaurus SVisual", extension: "tcl", language: "tcl" },
  tcl: { label: "Tcl", extension: "tcl", language: "tcl" },
  python: { label: "Python", extension: "py", language: "python" },
  other: { label: "기타", extension: "txt", language: "text" }
};
const OUTPUT_TYPES = new Set(["any", "files", "code", "server"]);
const REVIEW_MODES = new Set(["none", "recommended"]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return corsResponse(new Response(null, { status: 204 }), request, env);
    }

    try {
      if (url.pathname === "/api/presence/heartbeat" && request.method === "POST") {
        return corsJson(await presenceHeartbeat(request, env), request, env);
      }
      if (url.pathname === "/api/presence" && request.method === "GET") {
        return corsJson(await listPresence(request, env), request, env);
      }
      if (url.pathname === "/api/presence/offline" && request.method === "POST") {
        return corsJson(await presenceOffline(request, env), request, env);
      }

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
        const session = await requireSession(request, env);
        const result = await createTaskSubmission(
          Number(submissionMatch[1]),
          submissionMatch[2],
          submissionMatch[3],
          await request.json(),
          session,
          env
        );
        return corsJson(result, request, env, 201);
      }

      return legacy.fetch(request, env, ctx);
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

async function presenceHeartbeat(request, env) {
  const session = await requireSession(request, env);
  const input = await request.json().catch(() => ({}));
  const login = String(session.user.login || "").toLowerCase();
  const phaseId = Number.isInteger(Number(input?.phaseId)) && Number(input.phaseId) > 0
    ? Number(input.phaseId)
    : null;
  const record = {
    login: session.user.login,
    lastSeen: new Date().toISOString(),
    phaseId
  };
  await env.SESSIONS.put(
    `${PRESENCE_PREFIX}${login}`,
    JSON.stringify(record),
    { expirationTtl: PRESENCE_TTL_SECONDS }
  );
  return { ok: true, presence: record };
}

async function listPresence(request, env) {
  await requireSession(request, env);
  const now = Date.now();
  const items = [];
  let cursor;
  do {
    const page = await env.SESSIONS.list({ prefix: PRESENCE_PREFIX, cursor });
    for (const key of page.keys || []) {
      const record = await env.SESSIONS.get(key.name, "json");
      if (!record?.login || !record?.lastSeen) continue;
      if (presenceIsOnline(record.lastSeen, now)) items.push(record);
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return { onlineWindowSeconds: PRESENCE_ONLINE_SECONDS, users: items };
}

async function presenceOffline(request, env) {
  const session = await requireSession(request, env);
  const login = String(session.user.login || "").toLowerCase();
  await env.SESSIONS.delete(`${PRESENCE_PREFIX}${login}`);
  return { ok: true };
}

function presenceIsOnline(lastSeen, now = Date.now()) {
  const time = new Date(lastSeen).getTime();
  return Number.isFinite(time) && now - time <= PRESENCE_ONLINE_SECONDS * 1000;
}

async function fetchIssue(issueNumber, token, env) {
  if (!Number.isInteger(issueNumber) || issueNumber < 1) {
    throw httpError(400, "Issue 번호가 올바르지 않습니다.");
  }
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
  let body = String(issue.body || "");
  body = replaceTaskSection(body, tasks);
  const updated = await githubJson(
    `/repos/${env.REPOSITORY}/issues/${issueNumber}`,
    session.token,
    { method: "PATCH", body: JSON.stringify({ body }) }
  );
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
  const lines = serializeTasks(tasks);
  const replacement = `${match[1]}\n${lines}\n\n`;
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

async function createTaskSubmission(phaseId, requestedTaskId, requestedOutputId, input, session, env) {
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

  const type = String(input?.type || "");
  if (!new Set(["files", "code", "server"]).has(type)) throw httpError(400, "제출 방식이 올바르지 않습니다.");
  if (target.type !== "any" && target.type !== type) {
    throw httpError(400, `이 산출물은 ${target.type} 방식으로 제출해야 합니다.`);
  }

  const member = await resolveMember(session.user.login, session.token, env);
  const now = new Date();
  const compactTime = now.toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const submissionId = `${compactTime}-${safeSegment(session.user.login)}-${randomToken(4).slice(0, 6)}`;
  const rootPath = `members/${member.folder}/phases/phase-${String(phaseId).padStart(2, "0")}/tasks/${taskId}/outputs/${outputId}`;
  const submissionPath = `${rootPath}/submissions/${submissionId}`;
  const repositoryUrl = `https://github.com/${env.REPOSITORY}`;
  const folderUrl = `${repositoryUrl}/tree/${DEFAULT_BRANCH}/${encodePath(submissionPath)}`;

  const built = buildSubmissionFiles({
    type,
    submission: input?.submission || {},
    target,
    task,
    phaseId,
    issueNumber,
    submissionId,
    submissionPath,
    folderUrl,
    member,
    login: session.user.login,
    uploadedAt: now.toISOString()
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
    type,
    uploadedAt: now.toISOString(),
    folderPath: submissionPath,
    folderUrl,
    summary: built.summary,
    files: built.recordFiles,
    ...(built.serverPath ? { serverPath: built.serverPath } : {})
  };
  if (!submissionsData.outputs[outputId]) submissionsData.outputs[outputId] = [];
  submissionsData.outputs[outputId].push(record);
  submissionsData.updatedAt = now.toISOString();

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

  await commitFilesAtomic(
    filesToCommit,
    `Submit ${outputId} result by ${session.user.login}`,
    session.token,
    env
  );

  return {
    submission: record,
    issue: issuePayload(issue, submissionsData, session.user.login, "산출물 제출")
  };
}

function assertSubmissionPermission(issue, session, env) {
  const assignees = (issue.assignees || []).map((user) => String(user.login || "").toLowerCase()).filter(Boolean);
  const login = String(session.user.login || "").toLowerCase();
  const owner = String(env.REPOSITORY || "").split("/", 1)[0].toLowerCase();
  const isAdmin = Boolean(session.user.isAdmin || login === owner);
  if (assignees.length && !assignees.includes(login) && !isAdmin) {
    throw httpError(403, "이 Phase의 담당자 또는 관리자만 산출물을 제출할 수 있습니다.");
  }
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

function buildSubmissionFiles(context) {
  if (context.type === "files") return buildUploadedFiles(context);
  if (context.type === "code") return buildCodeFiles(context);
  return buildServerFiles(context);
}

function buildUploadedFiles(context) {
  const inputFiles = context.submission?.files;
  if (!Array.isArray(inputFiles) || !inputFiles.length) throw httpError(400, "업로드할 파일이 없습니다.");
  if (inputFiles.length > MAX_FILES) throw httpError(400, `파일은 한 번에 ${MAX_FILES}개까지 제출할 수 있습니다.`);

  let totalBytes = 0;
  const usedNames = new Set();
  const files = [];
  const recordFiles = [];
  for (const item of inputFiles) {
    const originalName = String(item?.name || "").trim();
    const safeName = uniqueFileName(sanitizeFileName(originalName), usedNames);
    const extension = safeName.includes(".") ? safeName.split(".").pop().toLowerCase() : "";
    if (!ALLOWED_FILE_EXTENSIONS.has(extension)) throw httpError(400, `${originalName}: 허용되지 않는 확장자입니다.`);
    const contentBase64 = normalizeBase64(item?.contentBase64);
    const byteSize = base64ByteLength(contentBase64);
    if (!byteSize || byteSize > MAX_FILE_BYTES) throw httpError(400, `${originalName}: 파일 크기가 허용 범위를 벗어났습니다.`);
    totalBytes += byteSize;
    if (totalBytes > MAX_TOTAL_FILE_BYTES) throw httpError(400, "한 번의 제출은 전체 30MB를 넘을 수 없습니다.");
    const path = `${context.submissionPath}/files/${safeName}`;
    files.push({ path, contentBase64 });
    recordFiles.push({ name: safeName, path, size: byteSize });
  }

  const note = cleanText(context.submission?.note, 3000);
  const readme = buildSubmissionReadme(context, {
    body: [
      "## 제출 파일",
      "",
      ...recordFiles.map((item) => `- [${item.name}](./files/${encodeURIComponent(item.name)}) (${formatBytes(item.size)})`),
      ...(note ? ["", "## 제출 메모", "", note] : [])
    ].join("\n")
  });
  files.push({ path: `${context.submissionPath}/README.md`, contentBase64: utf8ToBase64(readme) });
  return { files, recordFiles, summary: `${recordFiles.length}개 파일 · ${formatBytes(totalBytes)}` };
}

function buildCodeFiles(context) {
  const blocks = context.submission?.blocks;
  if (!Array.isArray(blocks) || !blocks.length) throw httpError(400, "붙여넣은 코드가 없습니다.");
  if (blocks.length > 12) throw httpError(400, "코드 블록은 최대 12개까지 제출할 수 있습니다.");

  let totalBytes = 0;
  const files = [];
  const recordFiles = [];
  const markdownParts = [];
  const usedNames = new Set();
  blocks.forEach((block, index) => {
    const type = CODE_TYPES[String(block?.type || "other")] || CODE_TYPES.other;
    const title = cleanText(block?.title, 200);
    const content = String(block?.content || "").replace(/\r\n/g, "\n");
    if (!title) throw httpError(400, `코드 ${index + 1}의 제목이 비어 있습니다.`);
    if (!content.trim()) throw httpError(400, `코드 ${index + 1}의 내용이 비어 있습니다.`);
    const byteSize = new TextEncoder().encode(content).length;
    if (byteSize > MAX_CODE_BLOCK_BYTES) throw httpError(400, `코드 ${index + 1}은 500KB를 넘을 수 없습니다.`);
    totalBytes += byteSize;
    if (totalBytes > MAX_CODE_TOTAL_BYTES) throw httpError(400, "한 번의 코드 제출은 전체 1MB를 넘을 수 없습니다.");

    const baseName = safeSegment(String(block?.fileName || `code-${index + 1}`).replace(/\.[^.]+$/, "")) || `code-${index + 1}`;
    const fileName = uniqueFileName(`${baseName}.${type.extension}`, usedNames);
    const path = `${context.submissionPath}/source/${fileName}`;
    files.push({ path, contentBase64: utf8ToBase64(content.endsWith("\n") ? content : `${content}\n`) });
    recordFiles.push({ name: fileName, path, size: byteSize });
    const fence = markdownFence(content);
    markdownParts.push([
      `## ${index + 1}. ${title}`,
      "",
      `- 코드 종류: ${type.label}`,
      `- 원본 파일: [\`${fileName}\`](./source/${encodeURIComponent(fileName)})`,
      "",
      `${fence}${type.language}`,
      content,
      fence,
      ""
    ].join("\n"));
  });

  const description = cleanText(context.submission?.description, 5000);
  const codeMarkdown = buildSubmissionReadme(context, {
    body: [
      ...markdownParts,
      ...(description ? ["## 실행 조건 및 설명", "", description, ""] : [])
    ].join("\n")
  });
  files.push({ path: `${context.submissionPath}/code-submission.md`, contentBase64: utf8ToBase64(codeMarkdown) });
  files.push({
    path: `${context.submissionPath}/README.md`,
    contentBase64: utf8ToBase64(buildSubmissionReadme(context, {
      body: [
        "## 코드 제출본",
        "",
        "- [보기용 코드 문서](./code-submission.md)",
        ...recordFiles.map((item) => `- [원본 ${item.name}](./source/${encodeURIComponent(item.name)})`)
      ].join("\n")
    }))
  });
  return { files, recordFiles, summary: `${recordFiles.length}개 코드 파일 · ${formatBytes(totalBytes)}` };
}

function buildServerFiles(context) {
  const serverPath = cleanText(context.submission?.serverPath, 1000);
  if (!serverPath) throw httpError(400, "서버 경로가 비어 있습니다.");
  const note = cleanText(context.submission?.note, 5000);
  const readme = buildSubmissionReadme(context, {
    body: [
      "## 서버 원본 위치",
      "",
      "```text",
      serverPath,
      "```",
      ...(note ? ["", "## 설명", "", note] : [])
    ].join("\n")
  });
  return {
    files: [{ path: `${context.submissionPath}/README.md`, contentBase64: utf8ToBase64(readme) }],
    recordFiles: [],
    summary: "대용량 결과의 서버 경로 등록",
    serverPath
  };
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
    `- 제출 방식: ${context.type}`,
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

async function githubFetch(path, token, options = {}) {
  return fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "vcat-tcad-dashboard-v4",
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

function normalizeBase64(value) {
  const text = String(value || "").replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(text)) throw httpError(400, "파일 인코딩이 올바르지 않습니다.");
  return text;
}

function base64ByteLength(value) {
  if (!value) return 0;
  const padding = value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0;
  return Math.floor(value.length * 3 / 4) - padding;
}

function sanitizeFileName(value) {
  const trimmed = String(value || "").trim().replace(/[\\/]/g, "-");
  const cleaned = trimmed.replace(/[<>:"|?*\u0000-\u001F]/g, "-").replace(/\s+/g, " ");
  if (!cleaned || cleaned === "." || cleaned === "..") throw httpError(400, "파일명이 올바르지 않습니다.");
  return cleaned.slice(0, 180);
}

function uniqueFileName(name, used) {
  let candidate = name;
  let counter = 2;
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const extension = dot > 0 ? name.slice(dot) : "";
  while (used.has(candidate.toLowerCase())) {
    candidate = `${base}-${counter}${extension}`;
    counter += 1;
  }
  used.add(candidate.toLowerCase());
  return candidate;
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

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

function markdownFence(content) {
  const runs = String(content).match(/`+/g) || [];
  const max = runs.reduce((value, run) => Math.max(value, run.length), 2);
  return "`".repeat(Math.max(3, max + 1));
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

function corsJson(payload, request, env, status = 200) {
  return corsResponse(
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    }),
    request,
    env
  );
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
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function randomToken(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

function base64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export {
  parseTaskSection,
  validateTasks,
  replaceTaskSection,
  serializeTasks,
  flattenOutputs,
  presenceIsOnline
};
