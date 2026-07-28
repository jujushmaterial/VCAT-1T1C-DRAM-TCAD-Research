const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const STATE_TTL_SECONDS = 10 * 60;

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
        const issue = await fetchIssue(Number(issueMatch[1]), session.token, env);
        return corsJson(issuePayload(issue), request, env);
      }

      const checklistMatch = url.pathname.match(/^\/api\/issues\/(\d+)\/checklist$/);
      if (checklistMatch && request.method === "PATCH") {
        const session = await requireSession(request, env);
        const result = await updateChecklist(
          Number(checklistMatch[1]),
          await request.json(),
          session.token,
          env
        );
        return corsJson(result, request, env);
      }

      return corsJson({ message: "경로를 찾을 수 없습니다." }, request, env, 404);
    } catch (error) {
      const status = Number(error.status || 500);
      const message = status >= 500 ? "서버 처리 중 오류가 발생했습니다." : error.message;
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
        avatarUrl: user.avatar_url
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

function issuePayload(issue) {
  const body = issue.body || "";
  return {
    issueNumber: issue.number,
    issueUrl: issue.html_url,
    updatedAt: issue.updated_at,
    tasks: parseChecklist(extractSection(body, "1. 해야 할 것", "2. 나와야 하는 결과물")),
    outputs: parseChecklist(extractSection(body, "2. 나와야 하는 결과물", "3. 과정의 이유"))
  };
}

async function updateChecklist(issueNumber, input, token, env) {
  const tasks = validateItems(input?.tasks, "해야 할 것");
  const outputs = validateItems(input?.outputs, "나와야 하는 결과물");
  const expectedUpdatedAt = String(input?.expectedUpdatedAt || "");
  const issue = await fetchIssue(issueNumber, token, env);

  if (expectedUpdatedAt && issue.updated_at !== expectedUpdatedAt) {
    throw httpError(409, "다른 연구원이 먼저 수정했습니다.");
  }

  let body = issue.body || "";
  body = replaceSection(body, "1. 해야 할 것", "2. 나와야 하는 결과물", tasks);
  body = replaceSection(body, "2. 나와야 하는 결과물", "3. 과정의 이유", outputs);

  const updated = await githubJson(
    `/repos/${env.REPOSITORY}/issues/${issueNumber}`,
    token,
    {
      method: "PATCH",
      body: JSON.stringify({ body })
    }
  );
  return issuePayload(updated);
}

function validateItems(value, label) {
  if (!Array.isArray(value)) throw httpError(400, `${label} 항목 형식이 올바르지 않습니다.`);
  if (value.length > 200) throw httpError(400, `${label} 항목이 너무 많습니다.`);
  return value.map((item, index) => {
    const text = String(item?.text || "").trim();
    if (!text) throw httpError(400, `${label} ${index + 1}번 항목이 비어 있습니다.`);
    if (text.length > 500) throw httpError(400, `${label} ${index + 1}번 항목이 너무 깁니다.`);
    return { checked: Boolean(item?.checked), text: text.replace(/\r?\n/g, " ") };
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

function parseChecklist(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^- \[([ xX])\]\s*(.*)$/))
    .filter(Boolean)
    .map((match) => ({ checked: match[1].toLowerCase() === "x", text: match[2].trim() }))
    .filter((item) => item.text);
}

function replaceSection(body, heading, nextHeading, items) {
  const pattern = new RegExp(
    `(^##\\s+${escapeRegExp(heading)}\\s*$\\r?\\n?)([\\s\\S]*?)(?=^##\\s+${escapeRegExp(nextHeading)}\\s*$)`,
    "m"
  );
  const match = pattern.exec(body);
  if (!match) throw httpError(422, `${heading} 영역을 Issue 본문에서 찾지 못했습니다.`);

  const lines = items.map((item) => `- [${item.checked ? "x" : " "}] ${item.text}`).join("\n");
  const replacement = `${match[1]}\n${lines}\n\n`;
  return `${body.slice(0, match.index)}${replacement}${body.slice(match.index + match[0].length)}`;
}

async function githubJson(path, token, options = {}) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "vcat-tcad-dashboard",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw httpError(response.status, payload.message || "GitHub API 요청에 실패했습니다.");
  }
  return payload;
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
