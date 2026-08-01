import assert from "node:assert/strict";
import worker, { __test } from "../worker/src/v11.js";

const beforeActivation = {
  submissionId: "legacy",
  uploadedAt: "2026-07-31T00:00:00Z",
  uploader: "member"
};
const afterActivation = {
  submissionId: "new",
  uploadedAt: "2026-08-01T07:00:00Z",
  uploader: "member"
};

assert.equal(__test.normalizeReview(beforeActivation).status, "approved");
assert.equal(__test.normalizeReview(beforeActivation).legacy, true);
assert.equal(__test.normalizeReview(afterActivation).status, "pending");

const issue = { assignees: [{ login: "phase-owner" }] };
const env = { REPOSITORY: "admin/example" };
const pending = __test.pendingReview("2026-08-01T07:00:00Z");

const adminOwn = __test.reviewPermissions({
  record: { uploader: "admin" }, review: pending, issue,
  session: { user: { login: "admin", isAdmin: true } }, env
});
assert.equal(adminOwn.canDecidePending, true);

const assigneeOther = __test.reviewPermissions({
  record: { uploader: "member" }, review: pending, issue,
  session: { user: { login: "phase-owner", isAdmin: false } }, env
});
assert.equal(assigneeOther.canDecidePending, true);

const assigneeOwn = __test.reviewPermissions({
  record: { uploader: "phase-owner" }, review: pending, issue,
  session: { user: { login: "phase-owner", isAdmin: false } }, env
});
assert.equal(assigneeOwn.canDecidePending, false);

assert.throws(
  () => __test.validateReviewAction({ action: "hold", reason: "짧음", current: pending, permissions: assigneeOther }),
  /5자 이상/
);

const held = __test.transitionReview({
  action: "hold",
  reason: "전압 조건을 다시 확인해 주세요.",
  current: pending,
  reviewer: "phase-owner",
  now: "2026-08-01T08:00:00Z"
});
assert.equal(held.status, "held");
assert.equal(held.reason, "전압 조건을 다시 확인해 주세요.");
assert.equal(held.history.at(-1).action, "held");

const heldAssignee = __test.reviewPermissions({
  record: { uploader: "member" }, review: held, issue,
  session: { user: { login: "phase-owner", isAdmin: false } }, env
});
assert.equal(heldAssignee.canApproveHeld, false);
assert.throws(
  () => __test.validateReviewAction({ action: "approve", reason: "", current: held, permissions: heldAssignee }),
  /관리자만 승인/
);

const heldAdmin = __test.reviewPermissions({
  record: { uploader: "member" }, review: held, issue,
  session: { user: { login: "admin", isAdmin: true } }, env
});
assert.equal(heldAdmin.canApproveHeld, true);
__test.validateReviewAction({ action: "approve", reason: "", current: held, permissions: heldAdmin });
const approved = __test.transitionReview({
  action: "approve", reason: "", current: held, reviewer: "admin", now: "2026-08-01T09:00:00Z"
});
assert.equal(approved.status, "approved");
assert.equal(approved.reason, null);
assert.equal(approved.history.at(-1).action, "approved-after-hold");
assert.equal(approved.history[1].reason, "전압 조건을 다시 확인해 주세요.");

// Full GET manifest chain: v11 -> v10 -> v9 -> v8, including review enrichment.
const folder = "members/Test/phases/phase-02/tasks/P02-T01/outputs/P02-T01-O01/submissions/s1";
const submissions = {
  version: 2,
  outputs: {
    "P02-T01-O01": [{
      submissionId: "s1",
      phaseId: 2,
      issueNumber: 2,
      taskId: "P02-T01",
      outputId: "P02-T01-O01",
      outputText: "테스트 산출물",
      uploader: "member",
      memberName: "테스터",
      memberFolder: "Test",
      type: "code",
      uploadedAt: "2026-08-01T07:00:00Z",
      folderPath: folder,
      folderUrl: "https://github.com/example/repo/tree/main/test",
      summary: "1개 코드 파일",
      review: held,
      files: [{ name: "device.cmd", path: `${folder}/source/device.cmd`, size: 14 }]
    }]
  }
};

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input) => {
  const url = String(input);
  if (url.includes("/contents/docs/data/submissions.json")) {
    return Response.json({
      type: "file",
      encoding: "base64",
      content: Buffer.from(JSON.stringify(submissions), "utf8").toString("base64")
    });
  }
  if (url.endsWith("/issues/2")) {
    return Response.json({ number: 2, assignees: [{ login: "phase-owner" }] });
  }
  throw new Error(`Unexpected fetch: ${url}`);
};

const manifestResponse = await worker.fetch(new Request(
  "https://api.example/api/submissions/s1/manifest?outputId=P02-T01-O01",
  { headers: { Origin: "https://jujushmaterial.github.io" } }
), {
  REPOSITORY: "example/repo",
  FRONTEND_ORIGIN: "https://jujushmaterial.github.io",
  SESSIONS: { get: async () => null }
}, {});
assert.equal(manifestResponse.status, 200);
const manifest = await manifestResponse.json();
assert.equal(manifest.submission.review.status, "held");
assert.equal(manifest.submission.review.reason, "전압 조건을 다시 확인해 주세요.");
assert.equal(manifest.submission.reviewPermissions.authenticated, false);
assert.equal(manifest.submission.reviewPermissions.canApproveHeld, false);
assert.deepEqual(manifest.submission.phaseAssignees, ["phase-owner"]);
assert.equal(manifest.files.length, 1);

globalThis.fetch = originalFetch;
console.log("submission review worker tests: ok");
