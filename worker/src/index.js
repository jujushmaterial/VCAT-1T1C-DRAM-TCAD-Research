const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const STATE_TTL_SECONDS = 10 * 60;
const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";
const MEMBERS_PATH = "docs/data/members.json";
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return corsResponse(new Response(null, { status: 204 }), request, env);
    }

    try {
      if (url.pathname === "/health" && request.method === "GET") {
        return corsJson({ ok: true }, request, env);
      }
      if (url.pathname === "/auth/start" && request.method === "GET") {
        return startAuth(env);
      }
      if (url.pathname === "/auth/callback" && request.method === "GET") {
        return finishAuth(url, env);
      }
      if (url.pathname === "/api/me" && request.method === "GET") {
        const session = await requireSession(request, env);
        return corsJson({ user: session.user }, request, env);
      }
      if (url.pathname === "/auth/logout" && request.method === "POST") {
        const sessionId = readBearer(request);
        if (sessionId) await env.SESSIONS.delete(`session:${sessionId}`);
        return corsJson({ ok: true }, request, env);
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
        const result = await updateChecklist(
          Number(checklistMatch[1]),
          await request.json(),
          session,
          env
        );
        return corsJson(result, request, env);
      }

      const submissionMatch = url.pathname.match(/^\/api\/phases\/(\d+)\/outputs\/([A-Za-z0-9-]+)\/submissions$/);
      if (submissionMatch && request.method === "POST") {
        const session = await requireSession(request, env);
        const result = await createSubmission(
          Number(submissionMatch[1]),
          submissionMatch[2],
          await request.json(),
          session,
          env
        );
        return corsJson(result, request, env, 201);
      }

      return corsJson({ message: "경로를 찾을 수 없습니다." }, request, env, 404);
    } catch (error) {
      const status = Number(error.status || 500);
      const message = status >= 500 ? (error.publicMessage || "서버 처리 중 오류가 발생했습니다.") : error.message;
      console.error(error);
      return corsJson({ message }, request, env, status);
    }
  }
};

async function startAuth(env) {
  assertConfiguration(env);
  const state = randomToken(24);
  const verifier = randomToken(48);
  const challenge = await sha256Base64Url(verifier);

  await env.SESSIONS.put(
    `state:${state}`,
    JSON.stringify({ verifier }),
    { expirationTtl: STATE_TTL_SECONDS }
  );

  const callbackUrl = `${env.API_BASE_URL.replace(/\/$/, "")}/auth/callback`;
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: callbackUrl,
    scope: "public_repo",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    allow_signup: "false"
  });
  return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
}

async function finishAuth(url, env) {
  assertConfiguration(env);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) throw httpError(400, "GitHub 인증 정보가 없습니다.");

  const savedState = await env.SESSIONS.get(`state:${state}`, "json");
  if (!savedState?.verifier) throw httpError(400, "인증 요청이 만료되었거나 올바르지 않습니다.");

  const callbackUrl = `${env.API_BASE_URL.replace(/\/$/, "")}/auth/callback`;
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: callbackUrl,
      code_verifier: savedState.verifier
    })
  });
  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenData.access_token) {
    throw httpError(401, tokenData.error_description || "GitHub 인증에 실패했습니다.");
  }

  const token = tokenData.access_token;
  const user = await githubJson("/user", token);
  const repo = await githubJson(`/repos/${env.REPOSITORY}`, token);
  const permissions = repo.permissions || {};
  const canWrite = Boolean(permissions.push || permissions.maintain || permissions.admin);
  if (!canWrite) {
    throw httpError(403, "이 저장소에 쓰기 권한이 있는 공동 연구원만 편집할 수 있습니다.");
  }

  const sessionId = randomToken(32);
  await env.SESSIONS.put(
    `session:${sessionId}`,
    JSON.stringify({
      token,
      user: {
        login: user.login,
        avatarUrl: user.avatar_url,
        isAdmin: Boolean(permissions.admin || permissions.maintain),
        canWrite
      }
    }),
    { expirationTtl: SESSION_TTL_SECONDS }
  );
  await env.SESSIONS.delete(`state:${state}`);

  const target = `${env.FRONTEND_URL.replace(/#.*$/, "")}#session=${encodeURIComponent(sessionId)}`;
  return Response.redirect(target, 302);
}

async function requireSession(request, env) {
  const sessionId = readBearer(request);
  if (!sessionId) throw httpError(401, "GitHub 로그인이 필요합니다.");
  const session = await env.SESSIONS.get(`session:${sessionId}`, "json");
  if (!session?.token || !session?.user) throw httpError(401, "로그인 세션이 만료되었습니다.");
  return session;
}

function readBearer(request) {
  const value = request.headers.get("Authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
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

function outputId(phaseId, index) {
  return `P${String(phaseId).padStart(2, "0")}-O${String(index + 1).padStart(2, "0")}`;
}

function issuePayload(issue, submissionsData = emptySubmissions(), modifiedBy = null, modifiedAction = null) {
  const body = issue.body || "";
  const phaseId = phaseIdFromIssue(issue);
  const outputs = parseChecklist(
    extractSection(body, "2. 나와야 하는 결과물", "3. 과정의 이유"),
    { phaseId, listName: "outputs" }
  ).map((item) => ({
    ...item,
    submissions: submissionsData.outputs?.[item.id] ?? []
  }));

  return {
    issueNumber: issue.number,
    issueUrl: issue.html_url,
    updatedAt: issue.updated_at,
    assignees: (issue.assignees || []).map((user) => user.login).filter(Boolean),
    tasks: parseChecklist(
      extractSection(body, "1. 해야 할 것", "2. 나와야 하는 결과물"),
      { phaseId, listName: "tasks" }
    ),
    outputs,
    ...(modifiedBy ? { modifiedBy } : {}),
    ...(modifiedAction ? { modifiedAction } : {})
  };
}

async function updateChecklist(issueNumber, input, session, env) {
  const issue = await fetchIssue(issueNumber, session.token, env);
  const phaseId = phaseIdFromIssue(issue);
  const tasks = validateItems(input?.tasks, "해야 할 것", { phaseId, listName: "tasks" });
  const outputs = validateItems(input?.outputs, "나와야 하는 결과물", { phaseId, listName: "outputs" });
  const expectedUpdatedAt = String(input?.expectedUpdatedAt || "");

  if (expectedUpdatedAt && issue.updated_at !== expectedUpdatedAt) {
    throw httpError(409, "다른 연구원이 먼저 수정했습니다.");
  }

  let body = issue.body || "";
  body = replaceSection(body, "1. 해야 할 것", "2. 나와야 하는 결과물", tasks, "tasks");
  body = replaceSection(body, "2. 나와야 하는 결과물", "3. 과정의 이유", outputs, "outputs");

  const updated = await githubJson(
    `/repos/${env.REPOSITORY}/issues/${issueNumber}`,
    session.token,
    {
      method: "PATCH",
      body: JSON.stringify({ body })
    }
  );
  const submissions = await loadSubmissions(session.token, env);
  return issuePayload(updated, submissions, session.user.login, "체크리스트 수정");
}

async function createSubmission(phaseId, requestedOutputId, input, session, env) {
  if (!Number.isInteger(phaseId) || phaseId < 1) throw httpError(400, "Phase 번호가 올바르지 않습니다.");
  if (!/^P\d{2}-O\d{2}$/i.test(requestedOutputId)) throw httpError(400, "결과물 ID가 올바르지 않습니다.");

  const issueNumber = Number(input?.issueNumber || phaseId);
  const issue = await fetchIssue(issueNumber, session.token, env);
  if (phaseIdFromIssue(issue) !== phaseId) throw httpError(400, "Phase와 Issue가 일치하지 않습니다.");
  assertSubmissionPermission(issue, session, env);

  const expectedUpdatedAt = String(input?.expectedUpdatedAt || "");
  if (expectedUpdatedAt && issue.updated_at !== expectedUpdatedAt) {
    throw httpError(409, "다른 연구원이 먼저 수정했습니다.");
  }

  const currentOutputs = parseChecklist(
    extractSection(issue.body || "", "2. 나와야 하는 결과물", "3. 과정의 이유"),
    { phaseId, listName: "outputs" }
  );
  const target = currentOutputs.find((item) => item.id.toLowerCase() === requestedOutputId.toLowerCase());
  if (!target) throw httpError(404, "해당 결과물 항목을 찾지 못했습니다.");

  const tasks = validateItems(input?.tasks, "해야 할 것", { phaseId, listName: "tasks" });
  const outputs = validateItems(input?.outputs, "나와야 하는 결과물", { phaseId, listName: "outputs" });
  const targetInput = outputs.find((item) => item.id.toLowerCase() === requestedOutputId.toLowerCase());
  if (!targetInput) throw httpError(400, "제출할 결과물이 현재 체크리스트에 없습니다.");
  targetInput.checked = true;

  const member = await resolveMember(session.user.login, session.token, env);
  const type = String(input?.type || "");
  if (!new Set(["files", "code", "server"]).has(type)) throw httpError(400, "제출 방식이 올바르지 않습니다.");

  const now = new Date();
  const compactTime = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const submissionId = `${compactTime}-${safeSegment(session.user.login)}-${randomToken(4).slice(0, 6)}`;
  const outputIdValue = targetInput.id.toUpperCase();
  const rootPath = `members/${member.folder}/phases/phase-${String(phaseId).padStart(2, "0")}/outputs/${outputIdValue}`;
  const submissionPath = `${rootPath}/submissions/${submissionId}`;
  const repositoryUrl = `https://github.com/${env.REPOSITORY}`;
  const folderUrl = `${repositoryUrl}/tree/${DEFAULT_BRANCH}/${encodePath(submissionPath)}`;

  const built = buildSubmissionFiles({
    type,
    submission: input?.submission || {},
    target: targetInput,
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
    outputId: outputIdValue,
    outputText: targetInput.text,
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
  if (!submissionsData.outputs[outputIdValue]) submissionsData.outputs[outputIdValue] = [];
  submissionsData.outputs[outputIdValue].push(record);
  submissionsData.updatedAt = now.toISOString();

  const userSubmissions = submissionsData.outputs[outputIdValue].filter(
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
      contentBase64: utf8ToBase64(buildOutputReadme(targetInput, phaseId, member, userSubmissions))
    },
    {
      path: SUBMISSIONS_PATH,
      contentBase64: utf8ToBase64(JSON.stringify(submissionsData, null, 2) + "\n")
    }
  ];

  await commitFilesAtomic(
    filesToCommit,
    `Submit ${outputIdValue} result by ${session.user.login}`,
    session.token,
    env
  );

  let body = issue.body || "";
  body = replaceSection(body, "1. 해야 할 것", "2. 나와야 하는 결과물", tasks, "tasks");
  body = replaceSection(body, "2. 나와야 하는 결과물", "3. 과정의 이유", outputs, "outputs");
  let updated;
  try {
    updated = await githubJson(`/repos/${env.REPOSITORY}/issues/${issueNumber}`, session.token, {
      method: "PATCH",
      body: JSON.stringify({ body })
    });
  } catch (error) {
    error.publicMessage = "결과물 파일은 저장됐지만 Issue 체크 갱신에 실패했습니다. Issue를 다시 열어 체크해 주세요.";
    throw error;
  }

  return {
    submission: record,
    issue: issuePayload(updated, submissionsData, session.user.login, "결과물 제출")
  };
}

function assertSubmissionPermission(issue, session, env) {
  const assignees = (issue.assignees || []).map((user) => String(user.login || "").toLowerCase()).filter(Boolean);
  const login = String(session.user.login || "").toLowerCase();
  const owner = String(env.REPOSITORY || "").split("/", 1)[0].toLowerCase();
  const isAdmin = Boolean(session.user.isAdmin || login === owner);
  if (assignees.length && !assignees.includes(login) && !isAdmin) {
    throw httpError(403, "이 Phase의 담당자 또는 관리자만 결과물을 제출할 수 있습니다.");
  }
}

async function resolveMember(login, token, env) {
  const data = await loadJsonRepoFile(MEMBERS_PATH, token, env, { members: [] });
  const member = (data.members || []).find(
    (item) => String(item.username || "").toLowerCase() === String(login).toLowerCase()
  );
  if (!member) throw httpError(403, "등록된 공동 연구원 계정만 결과물을 제출할 수 있습니다.");
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
      `## 제출 파일`,
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
    `# Phase ${context.phaseId} 결과물 — ${context.target.text}`,
    "",
    `- 결과물 ID: \`${context.target.id}\``,
    `- 제출자: ${context.member.name} (\`@${context.login}\`)`,
    `- 제출 시각: ${context.uploadedAt}`,
    `- 관련 Issue: [#${context.issueNumber}](https://github.com/${context.folderUrl.split("/tree/")[0].split("github.com/")[1]}/issues/${context.issueNumber})`,
    `- 제출 방식: ${context.type}`,
    "",
    body,
    ""
  ].join("\n");
}

function buildOutputReadme(output, phaseId, member, submissions) {
  const rows = submissions.slice().reverse().map((item, index) => {
    const relative = item.folderPath.split("/").slice(-2).join("/");
    return `| v${submissions.length - index} | ${item.uploadedAt} | ${item.type} | [열기](./${relative}/) |`;
  });
  return [
    `# Phase ${phaseId} · ${output.text}`,
    "",
    `- 결과물 ID: \`${output.id}\``,
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

function validateItems(value, label, { phaseId, listName }) {
  if (!Array.isArray(value)) throw httpError(400, `${label} 항목 형식이 올바르지 않습니다.`);
  if (value.length > 200) throw httpError(400, `${label} 항목이 너무 많습니다.`);
  const usedIds = new Set(
    listName === "outputs"
      ? value.map((item) => String(item?.id || "").toUpperCase()).filter((id) => /^P\d{2}-O\d{2}$/.test(id))
      : []
  );
  let nextOutputNumber = 1;
  return value.map((item, index) => {
    const text = String(item?.text || "").trim().replace(/\r?\n/g, " ");
    if (!text) throw httpError(400, `${label} ${index + 1}번 항목이 비어 있습니다.`);
    if (text.length > 500) throw httpError(400, `${label} ${index + 1}번 항목이 너무 깁니다.`);
    const result = { checked: Boolean(item?.checked), text };
    if (listName === "outputs") {
      const supplied = String(item?.id || "").toUpperCase();
      if (/^P\d{2}-O\d{2}$/.test(supplied)) {
        result.id = supplied;
      } else {
        let candidate;
        do {
          candidate = `P${String(phaseId).padStart(2, "0")}-O${String(nextOutputNumber).padStart(2, "0")}`;
          nextOutputNumber += 1;
        } while (usedIds.has(candidate));
        usedIds.add(candidate);
        result.id = candidate;
      }
    }
    return result;
  });
}

function extractSection(body, heading, nextHeading) {
  const pattern = new RegExp(
    `^##\\s+${escapeRegExp(heading)}\\s*$\\s*([\\s\\S]*?)(?=^##\\s+${escapeRegExp(nextHeading)}\\s*$)`,
    "m"
  );
  const match = body.match(pattern);
  return match ? match[1] : "";
}

function parseChecklist(text, { phaseId, listName }) {
  let index = 0;
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^- \[([ xX])\]\s*(.*)$/))
    .filter(Boolean)
    .map((match) => {
      let rawText = match[2].trim();
      const idMatch = rawText.match(/<!--\s*output-id:([A-Za-z0-9-]+)\s*-->/i);
      rawText = rawText.replace(/\s*<!--\s*output-id:[A-Za-z0-9-]+\s*-->\s*/gi, "").trim();
      const item = { checked: match[1].toLowerCase() === "x", text: rawText };
      if (listName === "outputs") item.id = (idMatch?.[1] || outputId(phaseId, index)).toUpperCase();
      index += 1;
      return item;
    })
    .filter((item) => item.text);
}

function replaceSection(body, heading, nextHeading, items, listName) {
  const pattern = new RegExp(
    `(^##\\s+${escapeRegExp(heading)}\\s*$\\r?\\n?)([\\s\\S]*?)(?=^##\\s+${escapeRegExp(nextHeading)}\\s*$)`,
    "m"
  );
  const match = pattern.exec(body);
  if (!match) throw httpError(422, `${heading} 영역을 Issue 본문에서 찾지 못했습니다.`);

  const lines = items.map((item) => {
    const metadata = listName === "outputs" ? ` <!-- output-id:${item.id} -->` : "";
    return `- [${item.checked ? "x" : " "}] ${item.text}${metadata}`;
  }).join("\n");
  const replacement = `${match[1]}\n${lines}\n\n`;
  return `${body.slice(0, match.index)}${replacement}${body.slice(match.index + match[0].length)}`;
}

function emptySubmissions() {
  return { version: 1, updatedAt: null, outputs: {} };
}

async function loadSubmissions(token, env) {
  const data = await loadJsonRepoFile(SUBMISSIONS_PATH, token, env, emptySubmissions());
  if (!data.outputs || typeof data.outputs !== "object") data.outputs = {};
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
      "User-Agent": "vcat-tcad-dashboard",
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

function assertConfiguration(env) {
  const required = [
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "REPOSITORY",
    "FRONTEND_URL",
    "FRONTEND_ORIGIN",
    "API_BASE_URL"
  ];
  const missing = required.filter((name) => !env[name]);
  if (missing.length) throw httpError(500, `Worker 환경 변수가 없습니다: ${missing.join(", ")}`);
}

function randomToken(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function sha256Base64Url(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return base64Url(new Uint8Array(digest));
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
