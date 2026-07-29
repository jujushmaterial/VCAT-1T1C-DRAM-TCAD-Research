import v5 from "./v5.js";

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

    const deletionMatch = url.pathname.match(
      /^\/api\/phases\/(\d+)\/tasks\/([A-Za-z0-9-]+)\/outputs\/([A-Za-z0-9-]+)\/submissions\/([A-Za-z0-9_-]+)$/
    );

    if (!deletionMatch || request.method !== "DELETE") {
      return v5.fetch(request, env, ctx);
    }

    try {
      const session = await requireSession(request, env);
      const result = await deleteSubmission({
        phaseId: Number(deletionMatch[1]),
        taskId: deletionMatch[2].toUpperCase(),
        outputId: deletionMatch[3].toUpperCase(),
        submissionId: deletionMatch[4],
        session,
        env
      });
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
  if (!/^P\d{2}-T\d{2}$/.test(taskId)) throw httpError(400, "과제 ID가 올바르지 않습니다.");
  if (!/^P\d{2}-T\d{2}-O\d{2}$/.test(outputId)) throw httpError(400, "산출물 ID가 올바르지 않습니다.");

  const submissionsData = await loadSubmissions(session.token, env);
  const records = Array.isArray(submissionsData.outputs?.[outputId])
    ? submissionsData.outputs[outputId]
    : [];
  const targetIndex = records.findIndex((item) => String(item.submissionId) === submissionId);
  if (targetIndex < 0) throw httpError(404, "삭제할 제출본을 찾지 못했습니다.");

  const target = records[targetIndex];
  if (Number(target.phaseId) !== phaseId || String(target.taskId).toUpperCase() !== taskId) {
    throw httpError(400, "제출본과 과제 정보가 일치하지 않습니다.");
  }

  const login = String(session.user.login || "").toLowerCase();
  const owner = String(env.REPOSITORY || "").split("/")[0].toLowerCase();
  const uploader = String(target.uploader || "").toLowerCase();
  const isAdmin = Boolean(session.user.isAdmin || login === owner);
  if (login !== uploader && !isAdmin) {
    throw httpError(403, "제출자 본인 또는 관리자만 이 제출본을 삭제할 수 있습니다.");
  }

  const folderPath = String(target.folderPath || "");
  const expectedSuffix = `/submissions/${submissionId}`;
  if (!folderPath.endsWith(expectedSuffix) || folderPath.includes("..")) {
    throw httpError(500, "제출 폴더 경로가 올바르지 않습니다.");
  }
  const rootPath = folderPath.slice(0, -expectedSuffix.length);
  const rootReadmePath = `${rootPath}/README.md`;

  const remaining = records.filter((_, index) => index !== targetIndex);
  if (remaining.length) submissionsData.outputs[outputId] = remaining;
  else delete submissionsData.outputs[outputId];
  submissionsData.updatedAt = new Date().toISOString();

  const ref = await githubJson(`/repos/${env.REPOSITORY}/git/ref/heads/${DEFAULT_BRANCH}`, session.token);
  const baseSha = ref.object.sha;
  const baseCommit = await githubJson(`/repos/${env.REPOSITORY}/git/commits/${baseSha}`, session.token);
  const recursiveTree = await githubJson(
    `/repos/${env.REPOSITORY}/git/trees/${baseCommit.tree.sha}?recursive=1`,
    session.token
  );
  if (recursiveTree.truncated) throw httpError(500, "저장소 파일 목록이 너무 커서 안전하게 삭제할 수 없습니다.");

  const existingPaths = new Set((recursiveTree.tree || []).map((item) => item.path));
  const deletionEntries = (recursiveTree.tree || [])
    .filter((item) => item.type === "blob" && item.path.startsWith(`${folderPath}/`))
    .map((item) => ({ path: item.path, mode: "100644", type: "blob", sha: null }));

  const treeEntries = [...deletionEntries];
  const submissionsBlob = await createTextBlob(JSON.stringify(submissionsData, null, 2) + "\n", session.token, env);
  treeEntries.push({ path: SUBMISSIONS_PATH, mode: "100644", type: "blob", sha: submissionsBlob.sha });

  const memberRemaining = remaining.filter(
    (item) => String(item.memberFolder || "").toLowerCase() === String(target.memberFolder || "").toLowerCase()
  );
  if (memberRemaining.length) {
    const readmeBlob = await createTextBlob(buildOutputReadme(target, memberRemaining), session.token, env);
    treeEntries.push({ path: rootReadmePath, mode: "100644", type: "blob", sha: readmeBlob.sha });
  } else if (existingPaths.has(rootReadmePath)) {
    treeEntries.push({ path: rootReadmePath, mode: "100644", type: "blob", sha: null });
  }

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
    remainingSubmissions: remaining.length
  };
}

function dedupeTreeEntries(entries) {
  const map = new Map();
  for (const entry of entries) map.set(entry.path, entry);
  return [...map.values()];
}

function buildOutputReadme(target, submissions) {
  const rows = submissions.slice().reverse().map((item, index) => {
    const relative = String(item.folderPath || "").split("/").slice(-2).join("/");
    return `| v${submissions.length - index} | ${item.uploadedAt} | ${item.type} | [열기](./${relative}/) |`;
  });
  return [
    `# Phase ${target.phaseId} · ${target.outputText}`,
    "",
    `- 과제: ${target.taskText}`,
    `- 과제 ID: \`${target.taskId}\``,
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

async function loadSubmissions(token, env) {
  const response = await githubFetch(
    `/repos/${env.REPOSITORY}/contents/${encodePath(SUBMISSIONS_PATH)}?ref=${DEFAULT_BRANCH}`,
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
      "User-Agent": "vcat-tcad-dashboard-v6",
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
