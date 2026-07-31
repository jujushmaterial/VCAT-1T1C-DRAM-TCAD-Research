import assert from "node:assert/strict";
import worker, { __test } from "../worker/src/v8.js";

assert.deepEqual(__test.classifyFile("device.cmd", "code"), {
  extension: "cmd",
  kind: "code",
  language: "sentaurus",
  mimeType: "text/plain; charset=utf-8",
  previewSupported: true
});
assert.equal(__test.classifyFile("result.png").kind, "image");
assert.equal(__test.classifyFile("report.pdf").kind, "pdf");
assert.equal(__test.classifyFile("notes.md").kind, "markdown");
assert.equal(__test.classifyFile("sheet.xlsx").kind, "unsupported");
assert.match(__test.contentDisposition("결과 파일.csv", true), /^attachment;/);
assert.doesNotThrow(() => __test.validateSubmissionFile(
  { folderPath: "members/Test/phases/phase-02/tasks/P02-T01/outputs/P02-T01-O01/submissions/s1" },
  { path: "members/Test/phases/phase-02/tasks/P02-T01/outputs/P02-T01-O01/submissions/s1/files/result.png" }
));
assert.throws(() => __test.validateSubmissionFile(
  { folderPath: "members/Test/submissions/s1" },
  { path: "members/Other/secret.txt" }
));

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
      files: [
        { name: "device.cmd", path: `${folder}/source/device.cmd`, size: 14 },
        { name: "result.png", path: `${folder}/files/result.png`, size: 4 },
        { name: "report.pdf", path: `${folder}/files/report.pdf`, size: 4 },
        { name: "sheet.xlsx", path: `${folder}/files/sheet.xlsx`, size: 4 }
      ]
    }]
  }
};

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, options = {}) => {
  const url = String(input);
  if (url.includes("docs/data/submissions.json")) {
    return Response.json({
      type: "file",
      encoding: "base64",
      content: Buffer.from(JSON.stringify(submissions), "utf8").toString("base64")
    });
  }
  if (url.includes("source/device.cmd")) {
    return Response.json({ type: "file", size: 14, download_url: "https://raw.example/device.cmd" });
  }
  if (url === "https://raw.example/device.cmd") {
    return new Response("set x 1\n# test", { status: options.headers?.get?.("Range") ? 206 : 200, headers: { "Content-Type": "text/plain" } });
  }
  throw new Error(`Unexpected fetch: ${url}`);
};

const env = {
  REPOSITORY: "example/repo",
  FRONTEND_ORIGIN: "https://jujushmaterial.github.io",
  SESSIONS: { get: async () => null }
};
const manifestResponse = await worker.fetch(new Request(
  "https://api.example/api/submissions/s1/manifest?outputId=P02-T01-O01",
  { headers: { Origin: "https://jujushmaterial.github.io" } }
), env, {});
assert.equal(manifestResponse.status, 200);
assert.equal(manifestResponse.headers.get("Access-Control-Allow-Origin"), "https://jujushmaterial.github.io");
const manifest = await manifestResponse.json();
assert.equal(manifest.files.length, 4);
assert.deepEqual(manifest.files.map((file) => file.kind), ["code", "image", "pdf", "unsupported"]);
assert.equal(manifest.files[0].id, "f0");
assert.match(manifest.files[0].previewUrl, /\/api\/submissions\/s1\/files\/f0\?outputId=P02-T01-O01$/);

const fileResponse = await worker.fetch(new Request(
  "https://api.example/api/submissions/s1/files/f0?outputId=P02-T01-O01",
  { headers: { Origin: "https://jujushmaterial.github.io", Range: "bytes=0-13" } }
), env, {});
assert.equal(fileResponse.status, 206);
assert.equal(await fileResponse.text(), "set x 1\n# test");
assert.match(fileResponse.headers.get("Content-Disposition"), /^inline;/);
assert.equal(fileResponse.headers.get("Content-Type"), "text/plain; charset=utf-8");

globalThis.fetch = originalFetch;
console.log("submission viewer worker routes: ok");
