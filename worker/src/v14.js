import v13 from "./v13.js";
import {
  archiveCacheKey,
  buildArchiveFilename,
  contentDisposition,
  createZipStream,
  manifestFingerprint
} from "./archive-zip.js";

const ARCHIVE_CACHE_SECONDS = 7 * 24 * 60 * 60;
const archiveBuilds = new Map();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const archiveRoute = url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/archive$/);
    const readMethod = request.method === "GET" || request.method === "HEAD";

    if (readMethod && archiveRoute) {
      try {
        return await handleArchive(request, env, ctx, {
          submissionId: archiveRoute[1],
          outputId: url.searchParams.get("outputId")
        });
      } catch (error) {
        return archiveErrorResponse(request, env, error);
      }
    }

    return v13.fetch(request, env, ctx);
  }
};

async function handleArchive(request, env, ctx, { submissionId, outputId }) {
  const startedAt = Date.now();
  const manifest = await loadManifest(request, env, ctx, submissionId, outputId);
  const files = Array.isArray(manifest.files) ? manifest.files : [];
  if (!files.length) throw httpError(404, "다운로드할 파일이 없습니다.", "ARCHIVE_EMPTY");

  const fingerprint = await manifestFingerprint(manifest);
  const cache = defaultCache();
  const key = archiveCacheKey(env, manifest, fingerprint);
  const filename = buildArchiveFilename(manifest);
  const responseMeta = { filename, fileCount: files.length, fingerprint };

  if (request.method === "HEAD") {
    return archiveResponse(null, request, env, { ...responseMeta, cacheState: cache ? "CHECKED" : "DISABLED" });
  }

  if (cache) {
    const cached = await cache.match(key);
    if (cached) {
      logArchive("hit", manifest, files.length, Date.now() - startedAt);
      return archiveResponse(cached.body, request, env, { ...responseMeta, cacheState: "HIT" });
    }

    const pending = archiveBuilds.get(key.url);
    if (pending) {
      try {
        await pending;
        const completed = await cache.match(key);
        if (completed) {
          logArchive("hit-after-wait", manifest, files.length, Date.now() - startedAt);
          return archiveResponse(completed.body, request, env, { ...responseMeta, cacheState: "HIT" });
        }
      } catch (error) {
        console.warn("[archive] pending generation failed; retrying", archiveLogContext(manifest, files.length, startedAt, error));
      }
    }
  }

  const zipStream = createZipStream(files, (file) => loadArchiveFile(request, env, ctx, file), {
    modifiedAt: manifest.submission?.uploadedAt,
    onComplete: ({ totalBytes }) => {
      console.info("[archive] generated", {
        ...archiveLogContext(manifest, files.length, startedAt),
        totalBytes
      });
    },
    onError: (error) => {
      console.error("[archive] generation failed", archiveLogContext(manifest, files.length, startedAt, error));
    }
  });

  const internalResponse = new Response(zipStream, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": contentDisposition(filename),
      "Cache-Control": `public, max-age=${ARCHIVE_CACHE_SECONDS}, immutable`,
      "ETag": `\"${fingerprint}\"`,
      "X-Archive-File-Count": String(files.length),
      "X-Archive-Manifest": fingerprint
    }
  });

  if (cache) {
    const write = cache.put(key, internalResponse.clone());
    archiveBuilds.set(key.url, write);
    const tracked = write
      .catch((error) => {
        console.warn("[archive] cache write failed", archiveLogContext(manifest, files.length, startedAt, error));
        throw error;
      })
      .finally(() => archiveBuilds.delete(key.url));
    if (ctx?.waitUntil) ctx.waitUntil(tracked.catch(() => undefined));
    else tracked.catch(() => undefined);
  }

  logArchive("miss", manifest, files.length, Date.now() - startedAt);
  return archiveResponse(internalResponse.body, request, env, {
    ...responseMeta,
    cacheState: cache ? "MISS" : "DISABLED"
  });
}

async function loadManifest(request, env, ctx, submissionId, outputId) {
  const url = new URL(request.url);
  url.pathname = `/api/submissions/${encodeURIComponent(submissionId)}/manifest`;
  url.search = outputId ? `?outputId=${encodeURIComponent(outputId)}` : "";
  const response = await v13.fetch(new Request(url.toString(), {
    method: "GET",
    headers: forwardReadHeaders(request.headers)
  }), env, ctx);
  if (!response.ok) throw await responseToError(response, "제출본 목록을 불러오지 못했습니다.");
  return response.json();
}

async function loadArchiveFile(request, env, ctx, file) {
  const response = await v13.fetch(new Request(file.downloadUrl, {
    method: "GET",
    headers: forwardReadHeaders(request.headers)
  }), env, ctx);
  if (!response.ok || !response.body) {
    throw await responseToError(response, `${file.name || "파일"} 원본을 찾지 못했습니다.`);
  }
  return response;
}

function forwardReadHeaders(source) {
  const headers = new Headers();
  for (const name of ["Authorization", "Origin"]) {
    const value = source.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

async function responseToError(response, fallback) {
  const payload = await response.json().catch(() => ({}));
  return httpError(response.status || 502, payload.message || fallback, payload.code || "ARCHIVE_SOURCE_ERROR");
}

function archiveResponse(body, request, env, { filename, fileCount, fingerprint, cacheState }) {
  const headers = new Headers({
    "Content-Type": "application/zip",
    "Content-Disposition": contentDisposition(filename),
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Archive-Cache": cacheState,
    "X-Archive-File-Count": String(fileCount),
    "X-Archive-Manifest": fingerprint
  });
  return corsResponse(new Response(request.method === "HEAD" ? null : body, { status: 200, headers }), request, env);
}

function archiveErrorResponse(request, env, error) {
  const status = Number(error.status || 502);
  return corsResponse(new Response(JSON.stringify({
    message: error.message || "전체 파일을 준비하지 못했습니다. 다시 시도해 주세요.",
    code: error.code || "ARCHIVE_ERROR",
    dataChanged: false
  }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
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
  headers.set("Access-Control-Expose-Headers", "Content-Disposition, X-Archive-Cache, X-Archive-File-Count, X-Archive-Manifest");
  headers.set("Vary", "Origin");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function defaultCache() {
  return typeof caches !== "undefined" && caches?.default ? caches.default : null;
}

function logArchive(state, manifest, fileCount, durationMs) {
  console.info("[archive] request", {
    state,
    submissionId: manifest.submission?.submissionId || null,
    outputId: manifest.outputId || null,
    fileCount,
    durationMs
  });
}

function archiveLogContext(manifest, fileCount, startedAt, error = null) {
  return {
    submissionId: manifest.submission?.submissionId || null,
    outputId: manifest.outputId || null,
    fileCount,
    durationMs: Date.now() - startedAt,
    ...(error ? { reason: safeErrorMessage(error) } : {})
  };
}

function safeErrorMessage(error) {
  return String(error?.message || error || "unknown error").slice(0, 300);
}

function httpError(status, message, code = "ARCHIVE_ERROR") {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}
