import assert from "node:assert/strict";
import worker from "../worker/src/v9.js";

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
      uploader: "tester",
      memberName: "테스터",
      memberFolder: "Test",
      type: "code",
      uploadedAt: "2026-08-01T00:00:00Z",
      folderPath: folder,
      folderUrl: "https://github.com/example/repo/tree/main/test",
      summary: "1개 코드 파일",
      comment: "Vd=0.7 V\nSDevice 실행 후 SVisual 실행",
      commentLabel: "실행 조건 및 설명",
      files: [{ name: "device.cmd", path: `${folder}/source/device.cmd`, size: 14 }]
    }]
  }
};

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input) => {
  const url = String(input);
  if (url.includes("docs/data/submissions.json")) {
    return Response.json({
      type: "file",
      encoding: "base64",
      content: Buffer.from(JSON.stringify(submissions), "utf8").toString("base64")
    });
  }
  throw new Error(`Unexpected fetch: ${url}`);
};

const env = {
  REPOSITORY: "example/repo",
  FRONTEND_ORIGIN: "https://jujushmaterial.github.io",
  SESSIONS: { get: async () => null }
};

const response = await worker.fetch(new Request(
  "https://api.example/api/submissions/s1/manifest?outputId=P02-T01-O01",
  { headers: { Origin: "https://jujushmaterial.github.io" } }
), env, {});

assert.equal(response.status, 200);
const manifest = await response.json();
assert.equal(manifest.submission.comment, "Vd=0.7 V\nSDevice 실행 후 SVisual 실행");
assert.equal(manifest.submission.commentLabel, "실행 조건 및 설명");
assert.equal(manifest.files.length, 1);

globalThis.fetch = originalFetch;
console.log("submission comments manifest: ok");
