import v11, { __test as reviewTest } from "./v11.js";
import { __test as fileTest } from "./v8.js";
import { __test as spreadsheetTest } from "./v10.js";

const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";
const STATUS_PATH = "docs/data/status.json";
const MAX_INLINE_BYTES = 10 * 1024 * 1024;
const DATA_CACHE_SECONDS = 20;
const STATUS_CACHE_SECONDS = 120;
const FILE_CACHE_SECONDS = 300;
const CACHE_ORIGIN = "https://vcat-read-cache.invalid";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const manifestRoute = url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/manifest$/);
    const fileRoute = url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/files\/(f\d+)(\/download)?$/);
    const readMethod = request.method === "GET" || request.method === "HEAD";

    if (readMethod && manifestRoute) {
      try {
        return await handleManifest(request, env, ctx, manifestRoute[1], url.searchParams.get("outputId"));
      } catch (error) {
        return readErrorResponse(request, env, error, "제출본 목록을 불러오지 못했습니다.");
      }
    }

    if (readMethod && fileRoute) {
      try {
        return await handleFile(request, env, ctx, {
          submissionId: fileRoute[1],
          fileId: fileRoute[2],
          download: Boolean(fileRoute[3]),
          outputId: url.searchParams.get("outputId")
        });
      } catch (error) {
        return readErrorResponse(request, env, error, "파일을 불러오지 못했습니다.");
      }
    }

    const response = await v11.fetch(request, env, ctx);
    if (response.ok && mutatesSubmissionState(request, url)) {
      const invalidation = invalidateDataCaches(env);
      if (ctx?.waitUntil) ctx.waitUntil(invalidation);
      else await invalidation;
    }
    return response;
  }
};

async function handleManifest(request, env, ctx, submissionId, outputId) {
  if (request.method === "HEAD") {
    return corsResponse(new Response(null, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-Viewer-Source": "github-raw"
      }
    }), request, env);
  }

  const [submissions, status, session] = await Promise.all([
    loadRawJson(SUBMISSIONS_PATH, DATA_CACHE_SECONDS, env, ctx),
    loadRawJson(STATUS_PATH, STATUS_CACHE_SECONDS, env, ctx).catch(() => ({ phases: [] })),
    optionalSession(request, env)
  ]);
  const context = findSubmissionRecord(submissions, submissionId, outputId);
  const record = context.record;
  validateRecord(record);

  const phase = findPhase(status, record);
  const assignees = Array.isArray(phase?.assignees) ? phase.assignees.filter(Boolean) : [];
  const issue = { assignees: assignees.map((login) => ({ login })) };
  const review = reviewTest.normalizeReview(record);
  const permissions = reviewTest.reviewPermissions({ record, review, issue, session, env });
  const origin = new URL(request.url).origin;
  const query = `?outputId=${encodeURIComponent(context.outputId)}`;
  const files = (Array.isArray(record.files) ? record.files : []).map((file, index) => {
    fileTest.validateSubmissionFile(record, file);
    const classified = classifyFile(file, record.type);
    const fileId = `f${index}`;
    const basePath = `/api/submissions/${encodeURIComponent(submissionId)}/files/${fileId}`;
    return {
      id: fileId,
      name: file.name,
      path: file.path,
      size: Number(file.size || 0),
      extension: classified.extension,
      kind: classified.kind,
      language: classified.language,
      mimeType: classified.mimeType,
      previewSupported: classified.previewSupported && Number(file.size || 0) <= MAX_INLINE_BYTES,
      previewUrl: `${origin}${basePath}${query}`,
      downloadUrl: `${origin}${basePath}/download${query}`,
      githubUrl: githubBlobUrl(env.REPOSITORY, file.path)
    };
  });

  return corsJson({
    version: 2,
    source: "github-raw",
    repository: env.REPOSITORY,
    branch: DEFAULT_BRANCH,
    outputId: context.outputId,
    submission: {
      submissionId: record.submissionId,
      phaseId: record.phaseId,
      issueNumber: record.issueNumber,
      taskId: record.taskId || null,
      taskText: record.taskText || "",
      outputId: record.outputId,
      outputText: record.outputText || "",
      uploader: record.uploader || "",
      memberName: record.memberName || "",
      memberFolder: record.memberFolder || "",
      type: record.type || "files",
      uploadedAt: record.uploadedAt || null,
      summary: record.summary || "제출본",
      serverPath: record.serverPath || null,
      folderPath: record.folderPath,
      folderUrl: record.folderUrl || githubTreeUrl(env.REPOSITORY, record.folderPath),
      classification: record.classification || null,
      comment: String(record.comment || ""),
      commentLabel: String(record.commentLabel || commentLabelForType(record.type)),
      review,
      reviewPermissions: permissions,
      phaseAssignees: assignees
    },
    files
  }, request, env, 200, {
    "Cache-Control": "no-store",
    "X-Viewer-Source": "github-raw",
    "X-GitHub-User-Token-Used": "false"
  });
}

async function handleFile(request, env, ctx, { submissionId, fileId, download, outputId }) {
  const submissions = await loadRawJson(SUBMISSIONS_PATH, DATA_CACHE_SECONDS, env, ctx);
  const context = findSubmissionRecord(submissions, submissionId, outputId);
  const record = context.record;
  validateRecord(record);
  const index = Number(String(fileId).slice(1));
  const file = Array.isArray(record.files) ? record.files[index] : null;
  if (!file) throw httpError(404, "요청한 파일을 찾지 못했습니다.", "FILE_NOT_FOUND");
  fileTest.validateSubmissionFile(record, file);

  const classified = classifyFile(file, record.type);
  const declaredSize = Number(file.size || 0);
  if (!download && declaredSize > MAX_INLINE_BYTES) {
    throw httpError(413, "웹 미리보기 제한을 초과한 파일입니다. 다운로드를 이용해 주세요.", "INLINE_SIZE_LIMIT");
  }

  const range = request.headers.get("Range");
  const raw = await loadRawFile(file.path, {
    env,
    ctx,
    range,
    cacheSeconds: !range && declaredSize <= MAX_INLINE_BYTES ? FILE_CACHE_SECONDS : 0
  });
  const headers = new Headers({
    "Content-Type": classified.mimeType,
    "Content-Disposition": fileTest.contentDisposition(file.name, download),
    "Cache-Control": download ? "private, max-age=0" : `public, max-age=${FILE_CACHE_SECONDS}, immutable`,
    "X-Content-Type-Options": "nosniff",
    "X-Viewer-Source": "github-raw",
    "X-GitHub-User-Token-Used": "false"
  });
  if (classified.extension === "svg" || ["html", "htm"].includes(classified.extension)) {
    headers.set("Content-Security-Policy", "default-src 'none'; sandbox");
  }
  for (const name of ["content-length", "content-range", "accept-ranges", "etag", "last-modified"]) {
    const value = raw.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (request.method === "HEAD") return corsResponse(new Response(null, { status: raw.status, headers }), request, env);
  return corsResponse(new Response(raw.body, { status: raw.status, headers }), request, env);
}

async function loadRawJson(path, cacheSeconds, env, ctx) {
  const response = await loadRawResource(path, { env, ctx, cacheSeconds, category: "data" });
  try {
    return await response.json();
  } catch {
    throw httpError(502, `${path} 파일 형식이 올바르지 않습니다.`, "RAW_JSON_INVALID");
  }
}

async function loadRawFile(path, { env, ctx, range = null, cacheSeconds = 0 }) {
  return loadRawResource(path, { env, ctx, cacheSeconds, category: "file", range });
}

async function loadRawResource(path, { env, ctx, cacheSeconds, category, range = null }) {
  const cache = defaultCache();
  const key = cacheKey(env, category, path);
  if (cache && cacheSeconds > 0 && !range) {
    const cached = await cache.match(key);
    if (cached) return cached;
  }

  const headers = new Headers({
    Accept: "*/*",
    "User-Agent": "vcat-dashboard-raw-reader-v12"
  });
  if (range) headers.set("Range", range);
  const upstream = await fetch(rawUrl(env.REPOSITORY, path), { headers, redirect: "follow" });
  if (!upstream.ok && upstream.status !== 206) throw rawHttpError(upstream, path);

  const normalizedHeaders = new Headers(upstream.headers);
  if (cacheSeconds > 0 && !range) normalizedHeaders.set("Cache-Control", `public, max-age=${cacheSeconds}`);
  const response = new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: normalizedHeaders
  });
  if (cache && cacheSeconds > 0 && !range) {
    const write = cache.put(key, response.clone());
    if (ctx?.waitUntil) ctx.waitUntil(write);
    else await write;
  }
  return response;
}

function findSubmissionRecord(submissions, submissionId, outputId = null) {
  if (!/^[A-Za-z0-9_-]+$/.test(String(submissionId || ""))) {
    throw httpError(400, "제출본 ID가 올바르지 않습니다.", "SUBMISSION_ID_INVALID");
  }
  const normalizedOutputId = outputId ? normalizeOutputId(outputId) : null;
  const outputs = submissions?.outputs && typeof submissions.outputs === "object" ? submissions.outputs : {};
  const matches = [];
  for (const [candidateOutputId, records] of Object.entries(outputs)) {
    if (normalizedOutputId && candidateOutputId.toUpperCase() !== normalizedOutputId) continue;
    for (const record of Array.isArray(records) ? records : []) {
      if (String(record?.submissionId || "") === String(submissionId)) {
        matches.push({ outputId: candidateOutputId.toUpperCase(), record });
      }
    }
  }
  if (!matches.length) throw httpError(404, "제출본을 찾지 못했습니다.", "SUBMISSION_NOT_FOUND");
  if (matches.length > 1 && !normalizedOutputId) {
    throw httpError(409, "같은 제출본 ID가 여러 산출물에 있어 outputId가 필요합니다.", "OUTPUT_ID_REQUIRED");
  }
  return matches[0];
}

function classifyFile(file, submissionType) {
  const basic = fileTest.classifyFile(file.name, submissionType);
  return spreadsheetTest.classifySpreadsheet({ ...file, ...basic });
}

function findPhase(status, record) {
  const phases = Array.isArray(status?.phases) ? status.phases : [];
  return phases.find((phase) => Number(phase.issueNumber) === Number(record.issueNumber))
    || phases.find((phase) => Number(phase.id) === Number(record.phaseId))
    || null;
}

function validateRecord(record) {
  if (!record || typeof record !== "object") throw httpError(500, "제출본 메타데이터가 없습니다.", "RECORD_MISSING");
  const folder = String(record.folderPath || "");
  if (!folder || folder.includes("..") || folder.includes("\\") || folder.startsWith("/")) {
    throw httpError(500, "제출 폴더 경로가 올바르지 않습니다.", "FOLDER_PATH_INVALID");
  }
}

function normalizeOutputId(value) {
  const outputId = String(value || "").toUpperCase();
  if (!/^P\d{2}-T\d{2}-O\d{2}$/.test(outputId)) {
    throw httpError(400, "산출물 ID가 올바르지 않습니다.", "OUTPUT_ID_INVALID");
  }
  return outputId;
}

async function optionalSession(request, env) {
  const sessionId = readBearer(request);
  if (!sessionId || !env.SESSIONS) return null;
  try {
    const session = await env.SESSIONS.get(`session:${sessionId}`, "json");
    return session?.token && session?.user ? session : null;
  } catch {
    return null;
  }
}

function readBearer(request) {
  const value = request.headers.get("Authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

function mutatesSubmissionState(request, url) {
  if (!["POST", "PATCH", "DELETE"].includes(request.method)) return false;
  return url.pathname.includes("/submissions") || url.pathname.includes("/review");
}

async function invalidateDataCaches(env) {
  const cache = defaultCache();
  if (!cache) return;
  await Promise.all([
    cache.delete(cacheKey(env, "data", SUBMISSIONS_PATH)),
    cache.delete(cacheKey(env, "data", STATUS_PATH))
  ]);
}

function defaultCache() {
  return typeof caches !== "undefined" && caches?.default ? caches.default : null;
}

function cacheKey(env, category, path) {
  const repository = encodeURIComponent(String(env.REPOSITORY || "repository"));
  return new Request(`${CACHE_ORIGIN}/${repository}/${category}/${encodePath(path)}`, { method: "GET" });
}

function rawUrl(repository, path) {
  return `https://raw.githubusercontent.com/${repository}/${DEFAULT_BRANCH}/${encodePath(path)}`;
}

function githubBlobUrl(repository, path) {
  return `https://github.com/${repository}/blob/${DEFAULT_BRANCH}/${encodePath(path)}`;
}

function githubTreeUrl(repository, path) {
  return `https://github.com/${repository}/tree/${DEFAULT_BRANCH}/${encodePath(path)}`;
}

function encodePath(path) {
  return String(path || "").split("/").map(encodeURIComponent).join("/");
}

function commentLabelForType(type) {
  if (type === "code") return "실행 조건 및 설명";
  if (type === "files") return "제출 메모";
  if (type === "server") return "설명";
  if (type === "table") return "표 설명";
  return "제출 설명";
}

function rawHttpError(response, path) {
  const remaining = response.headers.get("X-RateLimit-Remaining");
  const reset = response.headers.get("X-RateLimit-Reset");
  const retryAfter = response.headers.get("Retry-After");
  if (response.status === 429 || (response.status === 403 && remaining === "0")) {
    const retryAt = reset ? new Date(Number(reset) * 1000).toISOString() : null;
    const message = retryAt
      ? `GitHub 원본 조회가 일시적으로 제한되었습니다. ${retryAt} 이후 다시 시도해 주세요.`
      : "GitHub 원본 조회가 일시적으로 제한되었습니다. 잠시 후 다시 시도해 주세요.";
    const error = httpError(503, message, "RAW_RATE_LIMIT");
    error.retryAt = retryAt;
    error.retryAfter = retryAfter ? Number(retryAfter) : null;
    return error;
  }
  if (response.status === 404) return httpError(404, `저장소 파일을 찾지 못했습니다: ${path}`, "RAW_NOT_FOUND");
  return httpError(502, "GitHub 원본 파일 조회가 일시적으로 지연되고 있습니다.", "RAW_UPSTREAM_ERROR");
}

function readErrorResponse(request, env, error, fallback) {
  const status = Number(error.status || 502);
  const payload = {
    message: error.message || fallback,
    code: error.code || "RAW_READ_ERROR",
    retryAt: error.retryAt || null,
    retryAfter: error.retryAfter || null,
    source: "github-raw",
    dataChanged: false
  };
  return corsJson(payload, request, env, status, {
    "Cache-Control": "no-store",
    "X-Viewer-Source": "github-raw",
    "X-GitHub-User-Token-Used": "false"
  });
}

function corsJson(payload, request, env, status = 200, extraHeaders = {}) {
  return corsResponse(new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders }
  }), request, env);
}

function corsResponse(response, request, env) {
  const headers = new Headers(response.headers);
  const origin = request.headers.get("Origin");
  const allowedOrigin = env.FRONTEND_ORIGIN || "https://jujushmaterial.github.io";
  if (!origin || origin === allowedOrigin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    headers.set("Access-Control-Allow-Origin", origin || allowedOrigin);
  }
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type, Range");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, DELETE, POST, PATCH");
  headers.set("Access-Control-Expose-Headers", "Content-Disposition, Content-Length, Content-Range, Accept-Ranges, ETag, Last-Modified, X-Viewer-Source, X-GitHub-User-Token-Used");
  headers.set("Vary", "Origin");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function httpError(status, message, code = "READ_ERROR") {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

export const __test = {
  findSubmissionRecord,
  classifyFile,
  findPhase,
  rawUrl,
  cacheKey,
  mutatesSubmissionState,
  validateRecord
};
