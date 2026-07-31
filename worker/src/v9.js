import v8 from "./v8.js";

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";
const COMMENT_LIMIT = 5000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const submissionCreate = request.method === "POST" && /^\/api\/phases\/\d+\/(?:tasks\/[A-Za-z0-9-]+\/)?outputs\/[A-Za-z0-9-]+\/submissions$/.test(url.pathname);
    const manifestMatch = request.method === "GET"
      ? url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/manifest$/)
      : null;

    if (submissionCreate) return handleSubmissionCreate(request, env, ctx);
    if (manifestMatch) return handleManifest(request, env, ctx, manifestMatch[1], url.searchParams.get("outputId"));
    return v8.fetch(request, env, ctx);
  }
};

async function handleSubmissionCreate(request, env, ctx) {
  const input = await request.clone().json().catch(() => ({}));
  const { comment, commentLabel } = normalizeSubmissionComment(input);
  const response = await v8.fetch(request, env, ctx);
  if (!response.ok || !comment) return response;

  const payload = await response.clone().json().catch(() => null);
  const record = payload?.submission;
  if (!record?.submissionId || !record?.outputId || !record?.folderPath) return response;

  try {
    const token = await requireWriteToken(request, env);
    await persistComment({ env, token, record, comment, commentLabel });
    payload.submission = { ...record, comment, commentLabel };
    return jsonFromResponse(payload, response);
  } catch (error) {
    // The base submission already exists. Do not turn a successful submission into a duplicate-prone client error.
    console.error("Submission comment persistence failed", error);
    return response;
  }
}

async function handleManifest(request, env, ctx, submissionId, outputId) {
  const response = await v8.fetch(request, env, ctx);
  if (!response.ok) return response;

  const payload = await response.clone().json().catch(() => null);
  if (!payload?.submission) return response;

  try {
    const token = await optionalReadToken(request, env);
    const record = await loadSubmissionRecord({ env, token, submissionId, outputId });
    const fallbackLabel = commentLabelForType(record?.type || payload.submission.type);
    payload.submission.comment = cleanComment(record?.comment || "");
    payload.submission.commentLabel = cleanLabel(record?.commentLabel || fallbackLabel);
    return jsonFromResponse(payload, response);
  } catch (error) {
    console.warn("Manifest comment lookup failed", error);
    payload.submission.comment = "";
    payload.submission.commentLabel = commentLabelForType(payload.submission.type);
    return jsonFromResponse(payload, response);
  }
}

function normalizeSubmissionComment(input) {
  const type = String(input?.type || "files").toLowerCase();
  const submission = input?.submission && typeof input.submission === "object" ? input.submission : {};
  const raw = submission.comment
    ?? (type === "code" ? submission.description : submission.note)
    ?? "";
  return {
    comment: cleanComment(raw),
    commentLabel: commentLabelForType(type)
  };
}

function commentLabelForType(type) {
  if (type === "code") return "실행 조건 및 설명";
  if (type === "files") return "제출 메모";
  if (type === "server") return "설명";
  if (type === "table") return "표 설명";
  return "제출 설명";
}

function cleanComment(value) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, COMMENT_LIMIT);
}

function cleanLabel(value) {
  return String(value || "제출 설명").replace(/[\r\n]+/g, " ").trim().slice(0, 80) || "제출 설명";
}

async function persistComment({ env, token, record, comment, commentLabel }) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const ref = await githubJson(`/repos/${env.REPOSITORY}/git/ref/heads/${DEFAULT_BRANCH}`, token);
    const baseSha = ref.object.sha;
    const baseCommit = await githubJson(`/repos/${env.REPOSITORY}/git/commits/${baseSha}`, token);
    const submissions = await loadJsonAtRef(SUBMISSIONS_PATH, baseSha, token, env);
    const records = Array.isArray(submissions.outputs?.[record.outputId]) ? submissions.outputs[record.outputId] : [];
    const target = records.find((item) => String(item.submissionId) === String(record.submissionId));
    if (!target) throw httpError(404, "설명을 연결할 제출본을 찾지 못했습니다.");

    target.comment = comment;
    target.commentLabel = commentLabel;
    submissions.updatedAt = new Date().toISOString();

    const submissionRecord = { ...record, comment, commentLabel };
    const submissionsBlob = await createTextBlob(JSON.stringify(submissions, null, 2) + "\n", token, env);
    const recordBlob = await createTextBlob(JSON.stringify(submissionRecord, null, 2) + "\n", token, env);
    const tree = await githubJson(`/repos/${env.REPOSITORY}/git/trees`, token, {
      method: "POST",
      body: JSON.stringify({
        base_tree: baseCommit.tree.sha,
        tree: [
          { path: SUBMISSIONS_PATH, mode: "100644", type: "blob", sha: submissionsBlob.sha },
          { path: `${record.folderPath}/submission.json`, mode: "100644", type: "blob", sha: recordBlob.sha }
        ]
      })
    });
    const commit = await githubJson(`/repos/${env.REPOSITORY}/git/commits`, token, {
      method: "POST",
      body: JSON.stringify({
        message: `Record ${record.outputId} submission comment by ${record.uploader || "researcher"}`,
        tree: tree.sha,
        parents: [baseSha]
      })
    });

    try {
      await githubJson(`/repos/${env.REPOSITORY}/git/refs/heads/${DEFAULT_BRANCH}`, token, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha, force: false })
      });
      return;
    } catch (error) {
      if (![409, 422].includes(Number(error.status)) || attempt === 2) throw error;
    }
  }
}

async function loadSubmissionRecord({ env, token, submissionId, outputId }) {
  const submissions = await loadJsonAtRef(SUBMISSIONS_PATH, DEFAULT_BRANCH, token, env);
  const normalizedOutputId = String(outputId || "").toUpperCase();
  const candidates = normalizedOutputId && Array.isArray(submissions.outputs?.[normalizedOutputId])
    ? submissions.outputs[normalizedOutputId]
    : Object.values(submissions.outputs || {}).flatMap((items) => Array.isArray(items) ? items : []);
  return candidates.find((item) => String(item?.submissionId) === String(submissionId)) || null;
}

async function loadJsonAtRef(path, ref, token, env) {
  const payload = await githubJson(
    `/repos/${env.REPOSITORY}/contents/${encodePath(path)}?ref=${encodeURIComponent(ref)}`,
    token
  );
  if (payload.encoding !== "base64") throw httpError(502, `${path} 파일을 읽지 못했습니다.`);
  try {
    return JSON.parse(base64ToUtf8(String(payload.content || "").replace(/\s/g, "")));
  } catch {
    throw httpError(500, `${path} 파일 형식이 올바르지 않습니다.`);
  }
}

async function requireWriteToken(request, env) {
  const sessionId = readBearer(request);
  if (!sessionId || !env.SESSIONS) throw httpError(401, "GitHub 로그인이 필요합니다.");
  const session = await env.SESSIONS.get(`session:${sessionId}`, "json");
  if (!session?.token) throw httpError(401, "로그인 세션이 만료되었습니다.");
  return session.token;
}

async function optionalReadToken(request, env) {
  const sessionId = readBearer(request);
  if (sessionId && env.SESSIONS) {
    try {
      const session = await env.SESSIONS.get(`session:${sessionId}`, "json");
      if (session?.token) return session.token;
    } catch (error) {
      console.warn("Comment session lookup failed", error);
    }
  }
  return env.GITHUB_READ_TOKEN || "";
}

function readBearer(request) {
  const value = request.headers.get("Authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "vcat-tcad-dashboard-v9",
      ...(options.headers || {})
    }
  });
}

async function githubJson(path, token, options = {}) {
  const response = await githubFetch(path, token, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw httpError(response.status, payload.message || "GitHub API 요청에 실패했습니다.");
  return payload;
}

function encodePath(path) {
  return String(path || "").split("/").map(encodeURIComponent).join("/");
}

function base64ToUtf8(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function jsonFromResponse(payload, response) {
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.delete("Content-Length");
  return new Response(JSON.stringify(payload), {
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
