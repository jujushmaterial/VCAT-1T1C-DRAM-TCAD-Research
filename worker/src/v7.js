import v6 from "./v6.js";

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return corsResponse(new Response(null, { status: 204 }), request, env);
    }

    const taskRoute = url.pathname.match(
      /^\/api\/phases\/(\d+)\/tasks\/([A-Za-z0-9-]+)\/outputs\/([A-Za-z0-9-]+)\/submissions\/([A-Za-z0-9_-]+)$/
    );
    const legacyRoute = url.pathname.match(
      /^\/api\/phases\/(\d+)\/outputs\/([A-Za-z0-9-]+)\/submissions\/([A-Za-z0-9_-]+)$/
    );

    if (request.method !== "DELETE" || (!taskRoute && !legacyRoute)) {
      return v6.fetch(request, env, ctx);
    }

    try {
      const session = await requireSession(request, env);
      const route = taskRoute
        ? {
            phaseId: Number(taskRoute[1]),
            taskId: taskRoute[2].toUpperCase(),
            outputId: taskRoute[3].toUpperCase(),
            submissionId: taskRoute[4]
          }
        : {
            phaseId: Number(legacyRoute[1]),
            taskId: null,
            outputId: legacyRoute[2].toUpperCase(),
            submissionId: legacyRoute[3]
          };
      const result = await deleteSubmission({ ...route, session, env });
      return corsJson(result, request, env);
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

async function deleteSubmission({ phaseId, taskId, outputId, submissionId, session, env }) {
  if (!Number.isInteger(phaseId) || phaseId < 1) throw httpError(400, "Phase 번호가 올바르지 않습니다.");
  if (taskId && !/^P\d{2}-T\d{2}$/.test(taskId)) throw httpError(400, "과제 ID가 올바르지 않습니다.");
  if (!/^P\d{2}(?:-T\d{2})?-O\d{2}$/.test(outputId)) throw httpError(400, "산출물 ID가 올바르지 않습니다.");

  const ref = await githubJson(`/repos/${env.REPOSITORY}/git/ref/heads/${DEFAULT_BRANCH}`, session.token);
  const baseSha = ref.object.sha;
  const [baseCommit, submissionsData] = await Promise.all([
    githubJson(`/repos/${env.REPOSITORY}/git/commits/${baseSha}`, session.token),
    loadSubmissionsAtRef(session.token, env, baseSha)
  ]);

  const records = Array.isArray(submissionsData.outputs?.[outputId])
    ? submissionsData.outputs[outputId]
    : [];
  const targetIndex = records.findIndex((item) => String(item.submissionId) === submissionId);
  if (targetIndex < 0) throw httpError(404, "삭제할 제출본을 찾지 못했습니다.");

  const target = records[targetIndex];
  const targetTaskId = String(target.taskId || "").toUpperCase() || null;
  if (Number(target.phaseId) !== phaseId || String(target.outputId || "").toUpperCase() !== outputId) {
    throw httpError(400, "제출본과 Phase·산출물 정보가 일치하지 않습니다.");
  }
  if (taskId && targetTaskId !== taskId) {
    throw httpError(400, "제출본과 과제 정보가 일치하지 않습니다.");
  }

  const login = String(session.user.login || "").toLowerCase();
  const owner = String(env.REPOSITORY || "").split("/")[0].toLowerCase();
  const uploader = String(target.uploader || "").toLowerCase();
  const isAdmin = Boolean(session.user.isAdmin || login === owner);
  if (login !== uploader && !isAdmin) {
    throw httpError(403, "제출자 본인 또는 관리자만 이 제출본을 삭제할 수 있습니다.");
  }

  const memberFolder = safeSegment(target.memberFolder);
  if (!memberFolder) throw httpError(500, "제출자의 개인 폴더 정보가 올바르지 않습니다.");
  const phaseSegment = `phase-${String(phaseId).padStart(2, "0")}`;
  const expectedFolder = targetTaskId
    ? `members/${memberFolder}/phases/${phaseSegment}/tasks/${targetTaskId}/outputs/${outputId}/submissions/${submissionId}`
    : `members/${memberFolder}/phases/${phaseSegment}/outputs/${outputId}/submissions/${submissionId}`;
  const folderPath = String(target.folderPath || "");
  if (folderPath !== expectedFolder || folderPath.includes("..")) {
    throw httpError(500, "제출 폴더 경로가 표준 경로와 일치하지 않아 안전하게 삭제할 수 없습니다.");
  }
  const rootPath = folderPath.slice(0, -`/submissions/${submissionId}`.length);
  const rootReadmePath = `${rootPath}/README.md`;
  const timelinePath = `members/${memberFolder}/TIMELINE.md`;

  const recursiveTree = await githubJson(
    `/repos/${env.REPOSITORY}/git/trees/${baseCommit.tree.sha}?recursive=1`,
    session.token
  );
  if (recursiveTree.truncated) throw httpError(500, "저장소 파일 목록이 너무 커서 안전하게 삭제할 수 없습니다.");

  const treeItems = recursiveTree.tree || [];
  const existingPaths = new Map(treeItems.map((item) => [item.path, item]));
  const deletionEntries = treeItems
    .filter((item) => item.type === "blob" && item.path.startsWith(`${folderPath}/`))
    .map((item) => ({ path: item.path, mode: "100644", type: "blob", sha: null }));

  const remaining = records.filter((_, index) => index !== targetIndex);
  if (remaining.length) submissionsData.outputs[outputId] = remaining;
  else delete submissionsData.outputs[outputId];
  const now = new Date();
  submissionsData.updatedAt = now.toISOString();

  const treeEntries = [...deletionEntries];
  const submissionsBlob = await createTextBlob(JSON.stringify(submissionsData, null, 2) + "\n", session.token, env);
  treeEntries.push({ path: SUBMISSIONS_PATH, mode: "100644", type: "blob", sha: submissionsBlob.sha });

  const memberRemaining = remaining.filter(
    (item) => String(item.memberFolder || "").toLowerCase() === memberFolder.toLowerCase()
  );
  if (memberRemaining.length) {
    const readmeBlob = await createTextBlob(buildOutputReadme(target, memberRemaining), session.token, env);
    treeEntries.push({ path: rootReadmePath, mode: "100644", type: "blob", sha: readmeBlob.sha });
  } else if (existingPaths.has(rootReadmePath)) {
    treeEntries.push({ path: rootReadmePath, mode: "100644", type: "blob", sha: null });
  }

  const timelineText = await loadTimeline(existingPaths.get(timelinePath), session.token, env, memberFolder);
  const timelineEntry = buildTimelineEntry({
    now,
    target,
    phaseId,
    outputId,
    submissionId,
    folderPath,
    rootReadmePath,
    login: session.user.login,
    isAdmin,
    memberRemainingCount: memberRemaining.length,
    outputRemainingCount: remaining.length
  });
  const timelineBlob = await createTextBlob(`${timelineText.replace(/\s*$/, "")}\n\n${timelineEntry}\n`, session.token, env);
  treeEntries.push({ path: timelinePath, mode: "100644", type: "blob", sha: timelineBlob.sha });

  const tree = await githubJson(`/repos/${env.REPOSITORY}/git/trees`, session.token, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree: dedupeTreeEntries(treeEntries) })
  });
  const commit = await githubJson(`/repos/${env.REPOSITORY}/git/commits`, session.token, {
    method: "POST",
    body: JSON.stringify({
      message: `Delete ${outputId} submission ${submissionId} by ${session.user.login}`,
      tree: tree.sha,
      parents: [baseSha]
    })
  });

  try {
    await githubJson(`/repos/${env.REPOSITORY}/git/refs/heads/${DEFAULT_BRANCH}`, session.token, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha, force: false })
    });
  } catch (error) {
    if ([409, 422].includes(Number(error.status))) {
      throw httpError(409, "다른 변경이 먼저 반영됐습니다. 새로고침한 뒤 다시 삭제해 주세요.");
    }
    throw error;
  }

  return {
    ok: true,
    deletedSubmissionId: submissionId,
    outputId,
    remainingSubmissions: remaining.length,
    remainingMemberSubmissions: memberRemaining.length,
    deletedBy: session.user.login,
    commitSha: commit.sha
  };
}

function buildOutputReadme(target, submissions) {
  const rows = submissions.slice().reverse().map((item, index) => {
    const relative = String(item.folderPath || "").split("/").slice(-2).join("/");
    return `| v${submissions.length - index} | ${item.uploadedAt} | ${item.type} | [열기](./${relative}/) |`;
  });
  return [
    `# Phase ${target.phaseId} · ${target.outputText}`,
    "",
    ...(target.taskText ? [`- 과제: ${target.taskText}`] : []),
    ...(target.taskId ? [`- 과제 ID: \`${target.taskId}\``] : []),
    `- 산출물 ID: \`${target.outputId}\``,
    `- 연구원: ${target.memberName || target.uploader}`,
    "",
    "## 제출 이력",
    "",
    "| 버전 | 제출 시각 | 유형 | 제출본 |",
    "|---|---|---|---|",
    ...rows,
    ""
  ].join("\n");
}

async function loadTimeline(treeItem, token, env, memberFolder) {
  if (!treeItem?.sha) {
    return [
      `# ${memberFolder} 작업 타임라인`,
      "",
      "이 문서는 개인 폴더의 모든 생성·수정·삭제·이동·제출 작업을 시간순으로 기록합니다.",
      "",
      "---"
    ].join("\n");
  }
  const blob = await githubJson(`/repos/${env.REPOSITORY}/git/blobs/${treeItem.sha}`, token);
  if (blob.encoding !== "base64") throw httpError(500, "TIMELINE.md 파일을 읽지 못했습니다.");
  return base64ToUtf8(String(blob.content || "").replace(/\s/g, ""));
}

function buildTimelineEntry(context) {
  const kst = formatKst(context.now);
  const permission = context.isAdmin && String(context.login).toLowerCase() !== String(context.target.uploader || "").toLowerCase()
    ? "관리자 권한으로 삭제"
    : "본인 제출본 삭제";
  const remainingState = context.outputRemainingCount
    ? `해당 산출물에 ${context.outputRemainingCount}개 제출본이 남아 있습니다.`
    : "해당 산출물의 마지막 제출본이 삭제되어 대시보드에는 미제출 또는 파일 없음으로 표시됩니다.";
  return [
    `## ${kst} — 결과물 제출본 삭제`,
    "",
    `- **작성자:** ${context.login} (\`@${context.login}\`)`,
    `- **Phase / Issue:** Phase ${context.phaseId} / #${context.target.issueNumber || context.phaseId}`,
    `- **결과물 ID:** \`${context.outputId}\``,
    `- **변경 유형:** 삭제 / ${permission}`,
    `- **변경 파일:** \`${context.folderPath}/\`, \`${context.rootReadmePath}\`, \`${SUBMISSIONS_PATH}\``,
    `- **작업 내용:** 제출본 \`${context.submissionId}\`을 삭제하고 제출 폴더, 제출 인덱스와 개인 결과물 README 이력을 함께 정리했습니다.`,
    "- **작업 이유:** 잘못 제출했거나 중복된 제출본을 대시보드와 저장소에서 불일치 없이 제거하기 위해서입니다.",
    `- **결과 및 검증:** 삭제 작업을 하나의 Git 커밋으로 처리했습니다. ${remainingState}`,
    `- **남은 일:** ${context.memberRemainingCount ? "남아 있는 제출본을 확인합니다." : "필요하면 올바른 결과물을 다시 제출합니다."}`
  ].join("\n");
}

function formatKst(date) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute} KST`;
}

function dedupeTreeEntries(entries) {
  const map = new Map();
  for (const entry of entries) map.set(entry.path, entry);
  return [...map.values()];
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

async function loadSubmissionsAtRef(token, env, ref) {
  const response = await githubFetch(
    `/repos/${env.REPOSITORY}/contents/${encodePath(SUBMISSIONS_PATH)}?ref=${encodeURIComponent(ref)}`,
    token
  );
  if (response.status === 404) return { version: 2, updatedAt: null, outputs: {} };
  const payload = await parseGithubResponse(response);
  if (!response.ok) throw githubApiError(response.status, payload);
  try {
    const data = JSON.parse(base64ToUtf8(String(payload.content || "").replace(/\s/g, "")));
    if (!data.outputs || typeof data.outputs !== "object") data.outputs = {};
    return data;
  } catch {
    throw httpError(500, "제출 이력 파일 형식이 올바르지 않습니다.");
  }
}

async function createTextBlob(content, token, env) {
  return githubJson(`/repos/${env.REPOSITORY}/git/blobs`, token, {
    method: "POST",
    body: JSON.stringify({ content, encoding: "utf-8" })
  });
}

function githubFetch(path, token, options = {}) {
  return fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "vcat-tcad-dashboard-v7",
      ...(options.headers || {})
    }
  });
}

async function parseGithubResponse(response) {
  return response.json().catch(() => ({}));
}

async function githubJson(path, token, options = {}) {
  const response = await githubFetch(path, token, options);
  const payload = await parseGithubResponse(response);
  if (!response.ok) throw githubApiError(response.status, payload);
  return payload;
}

function githubApiError(status, payload) {
  return httpError(status, payload.message || "GitHub API 요청에 실패했습니다.");
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

function base64ToUtf8(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
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
  headers.set("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, OPTIONS");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
