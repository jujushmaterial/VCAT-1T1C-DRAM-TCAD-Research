import assert from "node:assert/strict";
import worker, { __test } from "../worker/src/v13.js";

const folder = "members/TestMember/phases/phase-02/tasks/P02-T01/outputs/P02-T01-O03/submissions/static-test-1";
const record = {
  submissionId: "static-test-1",
  phaseId: 2,
  issueNumber: 2,
  taskId: "P02-T01",
  outputId: "P02-T01-O03",
  outputText: "테스트 데이터",
  uploader: "member",
  memberName: "테스터",
  memberFolder: "TestMember",
  type: "files",
  uploadedAt: "2026-08-03T15:00:00.000Z",
  folderPath: folder,
  folderUrl: "https://github.com/example/repo/tree/main/test",
  summary: "1개 파일",
  review: { status: "pending", reviewer: null, reviewedAt: null, reason: null, history: [], legacy: false },
  files: [{ name: "result.csv", path: `${folder}/files/result.csv`, size: 8 }]
};
const submissions = { version: 2, outputs: { "P02-T01-O03": [record] } };
const status = { phases: [{ id: 2, issueNumber: 2, assignees: ["phase-owner"] }] };
const calls = [];

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, options = {}) => {
  const url = String(input);
  const headers = new Headers(options.headers || {});
  calls.push({ url, authorization: headers.get("Authorization"), range: headers.get("Range") });
  assert.equal(headers.get("Authorization"), null, "static reads must never receive a user token");

  if (url === "https://example.github.io/repo/data/submissions.json") return Response.json(submissions);
  if (url === "https://example.github.io/repo/data/status.json") return Response.json(status);
  if (url.includes("cdn.jsdelivr.net") && url.endsWith("/result.csv")) {
    if (headers.get("Range")) {
      return new Response("a,b", { status: 206, headers: { "Content-Range": "bytes 0-2/8", "Accept-Ranges": "bytes" } });
    }
    return new Response("a,b\n1,2\n");
  }
  if (url.includes("raw.githubusercontent.com")) {
    return new Response("limited", { status: 429, headers: { "Retry-After": "60" } });
  }
  return new Response("missing", { status: 404 });
};

const env = {
  REPOSITORY: "example/repo",
  FRONTEND_URL: "https://example.github.io/repo/",
  FRONTEND_ORIGIN: "https://example.github.io",
  SESSIONS: {
    get: async (key) => key === "session:s1"
      ? { token: "user-secret-token", user: { login: "phase-owner", isAdmin: false } }
      : null
  }
};

const manifest = await worker.fetch(new Request(
  "https://api.example/api/submissions/static-test-1/manifest?outputId=P02-T01-O03",
  { headers: { Origin: "https://example.github.io", Authorization: "Bearer s1" } }
), env, {});
assert.equal(manifest.status, 200);
assert.equal(manifest.headers.get("X-Viewer-Source"), "static-cdn");
assert.equal(manifest.headers.get("X-GitHub-User-Token-Used"), "false");
const payload = await manifest.json();
assert.equal(payload.source, "static-cdn");
assert.deepEqual(payload.submission.phaseAssignees, ["phase-owner"]);
assert.equal(payload.submission.reviewPermissions.canDecidePending, true);
assert.equal(payload.files[0].kind, "spreadsheet");
assert.equal(calls.some((call) => call.url.includes("raw.githubusercontent.com")), false, "manifest must not reach raw GitHub when Pages succeeds");

const file = await worker.fetch(new Request(
  "https://api.example/api/submissions/static-test-1/files/f0?outputId=P02-T01-O03",
  { headers: { Authorization: "Bearer s1" } }
), env, {});
assert.equal(file.status, 200);
assert.equal(file.headers.get("X-Viewer-Source"), "static-cdn");
assert.equal(file.headers.get("X-Viewer-Upstream"), "jsdelivr");
assert.equal(file.headers.get("X-GitHub-User-Token-Used"), "false");
assert.equal(await file.text(), "a,b\n1,2\n");

const range = await worker.fetch(new Request(
  "https://api.example/api/submissions/static-test-1/files/f0?outputId=P02-T01-O03",
  { headers: { Range: "bytes=0-2" } }
), env, {});
assert.equal(range.status, 206);
assert.equal(range.headers.get("Content-Range"), "bytes 0-2/8");
assert.ok(calls.every((call) => call.authorization === null));

const candidates = __test.sourceCandidates(env, "docs/data/submissions.json");
assert.deepEqual(candidates.map((item) => item.source), ["github-pages", "jsdelivr", "github-raw-fallback"]);
assert.equal(candidates[0].url, "https://example.github.io/repo/data/submissions.json");
assert.equal(candidates[1].url, "https://cdn.jsdelivr.net/gh/example/repo@main/docs/data/submissions.json");

const fileCandidates = __test.sourceCandidates(env, "members/Test Member/file.cmd");
assert.deepEqual(fileCandidates.map((item) => item.source), ["jsdelivr", "github-raw-fallback"]);
assert.equal(fileCandidates[0].url, "https://cdn.jsdelivr.net/gh/example/repo@main/members/Test%20Member/file.cmd");

globalThis.fetch = originalFetch;
console.log("Worker v13 static source failover tests: ok");
