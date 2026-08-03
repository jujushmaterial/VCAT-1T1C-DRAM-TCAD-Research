import assert from "node:assert/strict";
import worker, { __test } from "../worker/src/v12.js";

const folder = "members/TestMember/phases/phase-02/tasks/P02-T08/outputs/P02-T08-O01/submissions/raw-test-1";
const record = {
  submissionId: "raw-test-1",
  phaseId: 2,
  issueNumber: 2,
  taskId: "P02-T08",
  taskText: "GIDL 검증",
  outputId: "P02-T08-O01",
  outputText: "GIDL 결과",
  uploader: "result-owner",
  memberName: "테스트 연구원",
  memberFolder: "TestMember",
  type: "files",
  uploadedAt: "2026-08-03T15:00:00.000Z",
  folderPath: folder,
  folderUrl: "https://github.com/example/repo/tree/main/test",
  summary: "5개 파일",
  comment: "Raw 조회 검증",
  commentLabel: "제출 메모",
  review: {
    status: "pending",
    reviewer: null,
    reviewedAt: null,
    reason: null,
    history: [{ action: "submitted-for-review", reviewer: null, at: "2026-08-03T15:00:00.000Z" }],
    legacy: false
  },
  files: [
    { name: "device.cmd", path: `${folder}/files/device.cmd`, size: 14 },
    { name: "result.png", path: `${folder}/files/result.png`, size: 4 },
    { name: "report.pdf", path: `${folder}/files/report.pdf`, size: 4 },
    { name: "table.csv", path: `${folder}/files/table.csv`, size: 8 },
    { name: "workbook.xlsx", path: `${folder}/files/workbook.xlsx`, size: 8 }
  ]
};

const submissions = { version: 2, outputs: { "P02-T08-O01": [record] } };
const status = { phases: [{ id: 2, issueNumber: 2, assignees: ["phase-lead"] }] };
const calls = [];
let failRaw = false;

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, options = {}) => {
  const url = String(input);
  const headers = new Headers(options.headers || {});
  calls.push({ url, authorization: headers.get("Authorization"), range: headers.get("Range") });
  assert.ok(url.startsWith("https://raw.githubusercontent.com/"), `unexpected upstream: ${url}`);
  assert.equal(headers.get("Authorization"), null, "raw reads must not receive the user token");

  if (failRaw) {
    return new Response("limited", {
      status: 429,
      headers: { "Retry-After": "60" }
    });
  }
  if (url.endsWith("/docs/data/submissions.json")) return Response.json(submissions);
  if (url.endsWith("/docs/data/status.json")) return Response.json(status);
  if (url.endsWith("/device.cmd")) {
    if (headers.get("Range")) {
      return new Response("dev", {
        status: 206,
        headers: { "Content-Range": "bytes 0-2/14", "Accept-Ranges": "bytes" }
      });
    }
    return new Response("device-content", { headers: { ETag: '"cmd-etag"' } });
  }
  if (url.endsWith("/result.png")) return new Response(new Uint8Array([1, 2, 3, 4]));
  if (url.endsWith("/report.pdf")) return new Response(new Uint8Array([37, 80, 68, 70]));
  if (url.endsWith("/table.csv")) return new Response("a,b\n1,2\n");
  if (url.endsWith("/workbook.xlsx")) return new Response(new Uint8Array([80, 75, 3, 4]));
  return new Response("missing", { status: 404 });
};

const env = {
  REPOSITORY: "example/repo",
  FRONTEND_ORIGIN: "https://jujushmaterial.github.io",
  SESSIONS: {
    get: async (key) => key === "session:session-1"
      ? { token: "user-secret-token", user: { login: "phase-lead", isAdmin: false } }
      : null
  }
};

const manifestRequest = new Request(
  "https://api.example/api/submissions/raw-test-1/manifest?outputId=P02-T08-O01",
  {
    headers: {
      Origin: "https://jujushmaterial.github.io",
      Authorization: "Bearer session-1"
    }
  }
);
const manifestResponse = await worker.fetch(manifestRequest, env, {});
assert.equal(manifestResponse.status, 200);
assert.equal(manifestResponse.headers.get("X-Viewer-Source"), "github-raw");
assert.equal(manifestResponse.headers.get("X-GitHub-User-Token-Used"), "false");
const manifest = await manifestResponse.json();
assert.equal(manifest.source, "github-raw");
assert.deepEqual(manifest.submission.phaseAssignees, ["phase-lead"]);
assert.equal(manifest.submission.reviewPermissions.canDecidePending, true);
assert.deepEqual(manifest.files.map((file) => file.kind), ["code", "image", "pdf", "spreadsheet", "spreadsheet"]);
assert.equal(manifest.submission.comment, "Raw 조회 검증");

const fileResponse = await worker.fetch(new Request(
  "https://api.example/api/submissions/raw-test-1/files/f0?outputId=P02-T08-O01",
  { headers: { Origin: "https://jujushmaterial.github.io", Authorization: "Bearer session-1" } }
), env, {});
assert.equal(fileResponse.status, 200);
assert.equal(await fileResponse.text(), "device-content");
assert.equal(fileResponse.headers.get("X-GitHub-User-Token-Used"), "false");
assert.match(fileResponse.headers.get("Content-Type") || "", /text\/plain/);

const rangeResponse = await worker.fetch(new Request(
  "https://api.example/api/submissions/raw-test-1/files/f0?outputId=P02-T08-O01",
  { headers: { Range: "bytes=0-2" } }
), env, {});
assert.equal(rangeResponse.status, 206);
assert.equal(rangeResponse.headers.get("Content-Range"), "bytes 0-2/14");
assert.ok(calls.some((call) => call.range === "bytes=0-2"));
assert.ok(calls.every((call) => !call.url.includes("api.github.com")));

const originalPath = record.files[0].path;
record.files[0].path = "../outside.cmd";
const unsafe = await worker.fetch(new Request(
  "https://api.example/api/submissions/raw-test-1/manifest?outputId=P02-T08-O01"
), env, {});
assert.equal(unsafe.status, 500);
assert.equal((await unsafe.json()).dataChanged, false);
record.files[0].path = originalPath;

failRaw = true;
const limited = await worker.fetch(new Request(
  "https://api.example/api/submissions/raw-test-1/manifest?outputId=P02-T08-O01"
), env, {});
assert.equal(limited.status, 503);
const limitedPayload = await limited.json();
assert.equal(limitedPayload.code, "RAW_RATE_LIMIT");
assert.equal(limitedPayload.dataChanged, false);
assert.equal(limitedPayload.retryAfter, 60);

globalThis.fetch = originalFetch;

assert.equal(
  __test.rawUrl("example/repo", "members/Test Member/file.cmd"),
  "https://raw.githubusercontent.com/example/repo/main/members/Test%20Member/file.cmd"
);
assert.equal(__test.mutatesSubmissionState(new Request("https://api.example/api/submissions/x/review", { method: "PATCH" }), new URL("https://api.example/api/submissions/x/review")), true);

console.log("Worker v12 raw read tests: ok");
