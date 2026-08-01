import v10 from "./v10.js";

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";
const DEFAULT_BRANCH = "main";
const SUBMISSIONS_PATH = "docs/data/submissions.json";
const REVIEW_ACTIVATION_AT = "2026-08-01T06:30:00.000Z";
const HOLD_REASON_MIN = 5;
const HOLD_REASON_MAX = 1000;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const createRoute = request.method === "POST"
      && /^\/api\/phases\/\d+\/(?:tasks\/[A-Za-z0-9-]+\/)?outputs\/[A-Za-z0-9-]+\/submissions$/.test(url.pathname);
    const manifestRoute = request.method === "GET"
      ? url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/manifest$/)
      : null;
    const reviewRoute = request.method === "PATCH"
      ? url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/review$/)
      : null;

    if (request.method === "OPTIONS") return v10.fetch(request, env, ctx);

    try {
      if (createRoute) return handleSubmissionCreate(request, env, ctx);
      if (manifestRoute) return handleManifest(request, env, ctx, manifestRoute[1], url.searchParams.get("outputId"));
      if (reviewRoute) return handleReview(request, env, reviewRoute[1]);
      return v10.fetch(request, env, ctx);
    } catch (error) {
      const status = Number(error.status || 500);
      const message = status >= 500
        ? (error.publicMessage || "검토 정보를 처리하는 중 오류가 발생했습니다.")
        : error.message;
      console.error(error);
      return corsJson({ message }, request, env, status);
    }
  }
};

async function handleSubmissionCreate(request, env, ctx) {
  const response = await v10.fetch(request, env, ctx);
  if (!response.ok) return response;

  const payload = await response.clone().json().catch(() => null);
  const record = payload?.submission;
  if (!record?.submissionId || !record?.outputId || !record?.folderPath) return response;

  const review = pendingReview(record.uploadedAt);
  try {
    const session = await requireSession(request, env);
    await persistInitialReview({ env, token: session.token, record, review });
    payload.submission = { ...record, review };
    return jsonFromResponse(payload, response);
  } catch (error) {
    // Submission creation already committed. Return success but keep the item implicitly pending.
    console.error("Initial review persistence failed", error);
    payload.submission = { ...record, review, reviewPersistenceWarning: true };
    return jsonFromResponse(payload, response);
  }
}

async function handleManifest(request, env, ctx, submissionId, outputId) {
  const response = await v10.fetch(request, env, ctx);
  if (!response.ok) return response;

  const payload = await response.clone().json().catch(() => null);
  if (!payload?.submission) return response;

  const token = await optionalReadToken(request, env);
  const context = await loadSubmissionRecord({ env, token, submissionId, outputId });
  const issue = await fetchIssue(Number(context.record.issueNumber || context.record.phaseId), token, env);
  const session = await optionalSession(request, env);
  const review = normalizeReview(context.record);
  const permissions = reviewPermissions({ record: context.record, review, issue, session, env });

  payload.submission.review = review;
  payload.submission.reviewPermissions = permissions;
  payload.submission.phaseAssignees = (issue.assignees || []).map((item) => item.login).filter(Boolean);
  return jsonFromResponse(payload, response);
}

async function handleReview(request, env, submissionId) {
  const session = await requireSession(request, env);
  const input = await request.json().catch(() => ({}));
  const outputId = normalizeOutputId(input.outputId);
  const action = String(input.action || "").toLowerCase();
  if (!new Set(["approve", "hold"]).has(action)) throw httpError(400, "검토 동작이 올바르지 않습니다.");
  const reason = cleanReason(input.reason || "");

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const ref = await githubJson(`/repos/${env.REPOSITORY}/git/ref/heads/${DEFAULT_BRANCH}`, session.token);
    const baseSha = ref.object.sha;
    const baseCommit = await githubJson(`/repos/${env.REPOSITORY}/git/commits/${baseSha}`, session.token);
    const submissions = await loadJsonAtRef(SUBMISSIONS_PATH, baseSha, session.token, env);
    const context = findSubmissionRecord(submissions, submissionId, outputId);
    const record = context.record;
    validateSubmissionPath(record);

    const issue = await fetchIssue(Number(record.issueNumber || record.phaseId), session.token, env);
    const current = normalizeReview(record);
    const permissions = reviewPermissions({ record, review: current, issue, session, env });
    validateReviewAction({ action, reason, current, permissions });

    const now = new Date().toISOString();
    const next = transitionReview({ action, reason, current, reviewer: session.user.login, now });
    record.review = next;
    submissions.updatedAt = now;

    const timelinePath = `members/${safeSegment(record.memberFolder)}/TIMELINE.md`;
    const timeline = await loadTextAtRef(timelinePath, baseSha, session.token, env, buildTimelineHeader(record.memberFolder));
    const timelineEntry = buildTimelineEntry({ record, current, next, action, reviewer: session.user.login, now });

    const submissionsBlob = await createTextBlob(JSON.stringify(submissions, null, 2) + "\n", session.token, env);
    const submissionBlob = await createTextBlob(JSON.stringify(record, null, 2) + "\n", session.token, env);
    const timelineBlob = await createTextBlob(`${timeline.replace(/\s*$/, "")}\n\n${timelineEntry}\n`, session.token, env);
    const tree = await githubJson(`/repos/${env.REPOSITORY}/git/trees`, session.token, {
      method: "POST",
      body: JSON.stringify({
        base_tree: baseCommit.tree.sha,
        tree: [
          { path: SUBMISSIONS_PATH, mode: "100644", type: "blob", sha: submissionsBlob.sha },
          { path: `${record.folderPath}/submission.json`, mode: "100644", type: "blob", sha: submissionBlob.sha },
          { path: timelinePath, mode: "100644", type: "blob", sha: timelineBlob.sha }
        ]
      })
    });
    const commit = await githubJson(`/repos/${env.REPOSITORY}/git/commits`, session.token, {
      method: "POST",
      body: JSON.stringify({
        message: reviewCommitMessage(record, action, current.status, session.user.login),
        tree: tree.sha,
        parents: [baseSha]
      })
    });

    try {
      await githubJson(`/repos/${env.REPOSITORY}/git/refs/heads/${DEFAULT_BRANCH}`, session.token, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha, force: false })
      });
      const updatedPermissions = reviewPermissions({ record, review: next, issue, session, env });
      return corsJson({
        ok: true,
        submissionId,
        outputId: context.outputId,
        review: next,
        reviewPermissions: updatedPermissions,
        commitSha: commit.sha
      }, request, env);
    } catch (error) {
      if (![409, 422].includes(Number(error.status)) || attempt === 2) {
        if ([409, 422].includes(Number(error.status))) {
          throw httpError(409, "다른 변경이 먼저 반영됐습니다. 새로고침한 뒤 다시 검토해 주세요.");
        }
        throw error;
      }
    }
  }
  throw httpError(409, "다른 변경이 먼저 반영됐습니다. 새로고침한 뒤 다시 검토해 주세요.");
}

async function persistInitialReview({ env, token, record, review }) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const ref = await githubJson(`/repos/${env.REPOSITORY}/git/ref/heads/${DEFAULT_BRANCH}`, token);
    const baseSha = ref.object.sha;
    const baseCommit = await githubJson(`/repos/${env.REPOSITORY}/git/commits/${baseSha}`, token);
    const submissions = await loadJsonAtRef(SUBMISSIONS_PATH, baseSha, token, env);
    const context = findSubmissionRecord(submissions, record.submissionId, record.outputId);
    context.record.review = review;
    submissions.updatedAt = new Date().toISOString();

    const submissionsBlob = await createTextBlob(JSON.stringify(submissions, null, 2) + "\n", token, env);
    const recordBlob = await createTextBlob(JSON.stringify(context.record, null, 2) + "\n", token, env);
    const tree = await githubJson(`/repos/${env.REPOSITORY}/git/trees`, token, {
      method: "POST",
      body: JSON.stringify({
        base_tree: baseCommit.tree.sha,
        tree: [
          { path: SUBMISSIONS_PATH, mode: "100644", type: "blob", sha: submissionsBlob.sha },
          { path: `${context.record.folderPath}/submission.json`, mode: "100644", type: "blob", sha: recordBlob.sha }
        ]
      })
    });
    const commit = await githubJson(`/repos/${env.REPOSITORY}/git/commits`, token, {
      method: "POST",
      body: JSON.stringify({
        message: `Mark ${record.outputId} submission ${record.submissionId} for review`,
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

function normalizeReview(record) {
  const raw = record?.review && typeof record.review === "object" ? record.review : null;
  if (raw && new Set(["pending", "approved", "held"]).has(String(raw.status))) {
    return {
      status: String(raw.status),
      reviewer: raw.reviewer || null,
      reviewedAt: raw.reviewedAt || null,
      reason: raw.status === "held" ? String(raw.reason || "") : null,
      history: Array.isArray(raw.history) ? raw.history : [],
      legacy: Boolean(raw.legacy)
    };
  }
  const uploadedAt = Date.parse(record?.uploadedAt || "");
  const activation = Date.parse(REVIEW_ACTIVATION_AT);
  if (Number.isFinite(uploadedAt) && uploadedAt >= activation) return pendingReview(record.uploadedAt);
  return {
    status: "approved",
    reviewer: "system-migration",
    reviewedAt: record?.uploadedAt || null,
    reason: null,
    history: [],
    legacy: true
  };
}

function pendingReview(uploadedAt = null) {
  return {
    status: "pending",
    reviewer: null,
    reviewedAt: null,
    reason: null,
    history: [{
      action: "submitted-for-review",
      reviewer: null,
      at: uploadedAt || new Date().toISOString()
    }],
    legacy: false
  };
}

function transitionReview({ action, reason, current, reviewer, now }) {
  const history = Array.isArray(current.history) ? [...current.history] : [];
  if (action === "hold") {
    history.push({ action: "held", reviewer, at: now, reason });
    return { status: "held", reviewer, reviewedAt: now, reason, history, legacy: false };
  }
  const actionName = current.status === "held" ? "approved-after-hold" : "approved";
  history.push({ action: actionName, reviewer, at: now, ...(reason ? { note: reason } : {}) });
  return { status: "approved", reviewer, reviewedAt: now, reason: null, history, legacy: false };
}

function validateReviewAction({ action, reason, current, permissions }) {
  if (current.status === "approved") throw httpError(409, "이미 승인된 제출본입니다.");
  if (current.status === "pending") {
    if (!permissions.canDecidePending) throw httpError(403, "해당 Phase 담당자 또는 관리자만 검토할 수 있습니다.");
    if (action === "hold" && reason.length < HOLD_REASON_MIN) {
      throw httpError(400, `보류 사유를 ${HOLD_REASON_MIN}자 이상 입력해 주세요.`);
    }
    return;
  }
  if (current.status === "held") {
    if (action !== "approve") throw httpError(409, "보류된 제출본은 관리자 승인만 가능합니다.");
    if (!permissions.canApproveHeld) throw httpError(403, "보류된 제출본은 관리자만 승인할 수 있습니다.");
  }
}

function reviewPermissions({ record, review, issue, session, env }) {
  const login = String(session?.user?.login || "").toLowerCase();
  const owner = String(env.REPOSITORY || "").split("/")[0].toLowerCase();
  const uploader = String(record?.uploader || "").toLowerCase();
  const assignees = (issue?.assignees || []).map((item) => String(item.login || "").toLowerCase());
  const isAdmin = Boolean(login && (session?.user?.isAdmin || login === owner));
  const isPhaseAssignee = Boolean(login && assignees.includes(login));
  const isOwnSubmission = Boolean(login && login === uploader);
  return {
    authenticated: Boolean(login),
    isAdmin,
    isPhaseAssignee,
    isOwnSubmission,
    canDecidePending: review.status === "pending" && (isAdmin || (isPhaseAssignee && !isOwnSubmission)),
    canApproveHeld: review.status === "held" && isAdmin
  };
}

function reviewCommitMessage(record, action, previousStatus, reviewer) {
  if (action === "hold") return `Review ${record.outputId} submission ${record.submissionId}: hold by ${reviewer}`;
  if (previousStatus === "held") return `Review ${record.outputId} submission ${record.submissionId}: approve held submission by ${reviewer}`;
  return `Review ${record.outputId} submission ${record.submissionId}: approve by ${reviewer}`;
}

function buildTimelineEntry({ record, current, next, action, reviewer, now }) {
  const title = action === "hold" ? "제출본 검토 보류" : "제출본 검토 승인";
  const previous = current.status === "pending" ? "검토 필요" : current.status === "held" ? "보류" : "승인";
  const result = next.status === "held" ? "보류" : "승인";
  return [
    `## ${formatKst(now)} — ${title}`,
    "",
    `- **검토자:** ${reviewer} (\`@${reviewer}\`)`,
    `- **Phase / Output:** Phase ${record.phaseId} / \`${record.outputId}\``,
    `- **제출본:** \`${record.submissionId}\``,
    `- **제출자:** ${record.memberName || record.uploader} (\`@${record.uploader}\`)`,
    `- **이전 상태:** ${previous}`,
    `- **검토 결과:** ${result}`,
    ...(next.status === "held" ? [`- **보류 사유:** ${next.reason}`] : []),
    `- **GitHub 기록:** \`${SUBMISSIONS_PATH}\`과 제출본 \`submission.json\`을 같은 커밋에서 갱신했습니다.`,
    `- **다음 작업:** ${next.status === "held" ? "사유를 확인해 수정본을 새 제출본으로 등록합니다." : "승인된 제출본을 연구 진행률 증거로 사용합니다."}`
  ].join("\n");
}

function buildTimelineHeader(folder) {
  return [
    `# ${folder || "Member"} 작업 타임라인`,
    "",
    "이 문서는 개인 폴더의 생성·수정·삭제·제출·검토 작업을 시간순으로 기록합니다.",
    "",
    "---"
  ].join("\n");
}

function formatKst(value) {
  const date = new Date(value);
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

function findSubmissionRecord(submissions, submissionId, outputId = null) {
  const outputs = submissions?.outputs && typeof submissions.outputs === "object" ? submissions.outputs : {};
  const normalizedOutputId = outputId ? normalizeOutputId(outputId) : null;
  const matches = [];
  for (const [candidateOutputId, records] of Object.entries(outputs)) {
    if (normalizedOutputId && candidateOutputId.toUpperCase() !== normalizedOutputId) continue;
    for (const record of Array.isArray(records) ? records : []) {
      if (String(record?.submissionId || "") === String(submissionId)) {
        matches.push({ outputId: candidateOutputId.toUpperCase(), record });
      }
    }
  }
  if (!matches.length) throw httpError(404, "검토할 제출본을 찾지 못했습니다.");
  if (matches.length > 1 && !normalizedOutputId) throw httpError(409, "같은 제출본 ID가 여러 산출물에 있어 outputId가 필요합니다.");
  return matches[0];
}

async function loadSubmissionRecord({ env, token, submissionId, outputId }) {
  if (!/^[A-Za-z0-9_-]+$/.test(String(submissionId || ""))) throw httpError(400, "제출본 ID가 올바르지 않습니다.");
  const submissions = await loadJsonAtRef(SUBMISSIONS_PATH, DEFAULT_BRANCH, token, env);
  return findSubmissionRecord(submissions, submissionId, outputId);
}

function validateSubmissionPath(record) {
  const folder = String(record?.folderPath || "");
  const memberFolder = safeSegment(record?.memberFolder);
  const phaseId = Number(record?.phaseId);
  const taskId = String(record?.taskId || "").toUpperCase();
  const outputId = String(record?.outputId || "").toUpperCase();
  const submissionId = String(record?.submissionId || "");
  if (!memberFolder || !Number.isInteger(phaseId) || !/^P\d{2}-T\d{2}$/.test(taskId)
      || !/^P\d{2}-T\d{2}-O\d{2}$/.test(outputId) || !/^[A-Za-z0-9_-]+$/.test(submissionId)) {
    throw httpError(500, "제출본 경로 메타데이터가 올바르지 않습니다.");
  }
  const expected = `members/${memberFolder}/phases/phase-${String(phaseId).padStart(2, "0")}/tasks/${taskId}/outputs/${outputId}/submissions/${submissionId}`;
  if (folder !== expected || folder.includes("..") || folder.includes("\\")) {
    throw httpError(500, "제출 폴더 경로가 표준 경로와 일치하지 않습니다.");
  }
}

function normalizeOutputId(value) {
  const outputId = String(value || "").toUpperCase();
  if (!/^P\d{2}-T\d{2}-O\d{2}$/.test(outputId)) throw httpError(400, "산출물 ID가 올바르지 않습니다.");
  return outputId;
}

function cleanReason(value) {
  const reason = String(value || "").replace(/\r\n?/g, "\n").trim();
  if (reason.length > HOLD_REASON_MAX) throw httpError(400, `사유는 ${HOLD_REASON_MAX.toLocaleString()}자를 넘을 수 없습니다.`);
  return reason;
}

async function fetchIssue(issueNumber, token, env) {
  if (!Number.isInteger(issueNumber) || issueNumber < 1) throw httpError(400, "Issue 번호가 올바르지 않습니다.");
  return githubJson(`/repos/${env.REPOSITORY}/issues/${issueNumber}`, token);
}

async function requireSession(request, env) {
  const sessionId = readBearer(request);
  if (!sessionId || !env.SESSIONS) throw httpError(401, "GitHub 로그인이 필요합니다.");
  const session = await env.SESSIONS.get(`session:${sessionId}`, "json");
  if (!session?.token || !session?.user) throw httpError(401, "로그인 세션이 만료되었습니다.");
  return session;
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

async function optionalReadToken(request, env) {
  const session = await optionalSession(request, env);
  return session?.token || env.GITHUB_READ_TOKEN || "";
}

function readBearer(request) {
  const value = request.headers.get("Authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

async function loadJsonAtRef(path, ref, token, env) {
  const payload = await githubJson(`/repos/${env.REPOSITORY}/contents/${encodePath(path)}?ref=${encodeURIComponent(ref)}`, token);
  if (payload.encoding !== "base64") throw httpError(502, `${path} 파일을 읽지 못했습니다.`);
  try {
    return JSON.parse(base64ToUtf8(String(payload.content || "").replace(/\s/g, "")));
  } catch {
    throw httpError(500, `${path} 파일 형식이 올바르지 않습니다.`);
  }
}

async function loadTextAtRef(path, ref, token, env, fallback) {
  const response = await githubFetch(`/repos/${env.REPOSITORY}/contents/${encodePath(path)}?ref=${encodeURIComponent(ref)}`, token);
  if (response.status === 404) return fallback;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw httpError(response.status, payload.message || "GitHub 파일을 읽지 못했습니다.");
  if (payload.encoding !== "base64") throw httpError(502, `${path} 파일을 읽지 못했습니다.`);
  return base64ToUtf8(String(payload.content || "").replace(/\s/g, ""));
}

async function createTextBlob(content, token, env) {
  return githubJson(`/repos/${env.REPOSITORY}/git/blobs`, token, {
    method: "POST",
    body: JSON.stringify({ content, encoding: "utf-8" })
  });
}

function safeSegment(value) {
  const text = String(value || "").trim();
  return /^[A-Za-z0-9_-]+$/.test(text) ? text : "";
}

function encodePath(path) {
  return String(path || "").split("/").map(encodeURIComponent).join("/");
}

function base64ToUtf8(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function githubFetch(path, token, options = {}) {
  return fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": "vcat-tcad-dashboard-v11",
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

function corsResponse(response, request, env) {
  const headers = new Headers(response.headers);
  const origin = request.headers.get("Origin");
  if (origin && origin === env.FRONTEND_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
    headers.set("Access-Control-Allow-Credentials", "true");
  }
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  headers.set("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, DELETE, OPTIONS");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function corsJson(payload, request, env, status = 200) {
  return corsResponse(new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  }), request, env);
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export const __test = {
  normalizeReview,
  pendingReview,
  transitionReview,
  reviewPermissions,
  validateReviewAction,
  cleanReason,
  reviewCommitMessage
};
