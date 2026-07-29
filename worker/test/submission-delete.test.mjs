import assert from "node:assert/strict";
import worker from "../src/v6.js";

const repo = "jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research";
const outputId = "P01-T01-O01";
const taskId = "P01-T01";
const firstId = "202607290001-alice-one";
const secondId = "202607290002-alice-two";
const root = `members/Alice/phases/phase-01/tasks/${taskId}/outputs/${outputId}`;

function record(submissionId, uploader = "alice") {
  return {
    submissionId,
    phaseId: 1,
    issueNumber: 1,
    taskId,
    taskText: "테스트 과제",
    outputId,
    outputText: "테스트 산출물",
    uploader,
    memberName: "Alice",
    memberFolder: "Alice",
    type: "files",
    uploadedAt: "2026-07-29T00:00:00.000Z",
    folderPath: `${root}/submissions/${submissionId}`,
    folderUrl: `https://github.com/${repo}/tree/main/${root}/submissions/${submissionId}`,
    summary: "1개 파일"
  };
}

function makeEnv(user) {
  return {
    REPOSITORY: repo,
    FRONTEND_ORIGIN: "https://jujushmaterial.github.io",
    SESSIONS: {
      async get(key) {
        assert.equal(key, "session:test-session");
        return { token: "github-token", user };
      }
    }
  };
}

function deleteRequest(submissionId) {
  return new Request(
    `https://worker.example/api/phases/1/tasks/${taskId}/outputs/${outputId}/submissions/${submissionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer test-session",
        Origin: "https://jujushmaterial.github.io"
      }
    }
  );
}

async function testOwnerDeletesOwnSubmission() {
  const submissions = {
    version: 2,
    updatedAt: null,
    outputs: { [outputId]: [record(firstId), record(secondId)] }
  };
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    const method = options.method || "GET";
    if (String(url).includes(`/contents/docs/data/submissions.json?ref=main`)) {
      return Response.json({ content: Buffer.from(JSON.stringify(submissions)).toString("base64") });
    }
    if (String(url).endsWith("/git/ref/heads/main")) return Response.json({ object: { sha: "base-sha" } });
    if (String(url).endsWith("/git/commits/base-sha")) return Response.json({ tree: { sha: "base-tree" } });
    if (String(url).includes("/git/trees/base-tree?recursive=1")) {
      return Response.json({
        truncated: false,
        tree: [
          { path: `${root}/README.md`, type: "blob", sha: "readme-old" },
          { path: `${root}/submissions/${firstId}/README.md`, type: "blob", sha: "file-a" },
          { path: `${root}/submissions/${firstId}/files/wrong.txt`, type: "blob", sha: "file-b" },
          { path: `${root}/submissions/${secondId}/README.md`, type: "blob", sha: "file-c" },
          { path: "docs/data/submissions.json", type: "blob", sha: "submissions-old" }
        ]
      });
    }
    if (String(url).endsWith("/git/blobs") && method === "POST") {
      const body = JSON.parse(options.body);
      return Response.json({ sha: body.content.includes(secondId) ? "submissions-new" : "readme-new" });
    }
    if (String(url).endsWith("/git/trees") && method === "POST") return Response.json({ sha: "new-tree" });
    if (String(url).endsWith("/git/commits") && method === "POST") return Response.json({ sha: "new-commit" });
    if (String(url).endsWith("/git/refs/heads/main") && method === "PATCH") return Response.json({ object: { sha: "new-commit" } });
    throw new Error(`Unexpected GitHub request: ${method} ${url}`);
  };

  const response = await worker.fetch(deleteRequest(firstId), makeEnv({ login: "alice", isAdmin: false }), {});
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.ok, true);
  assert.equal(payload.remainingSubmissions, 1);
  assert.equal(response.headers.get("Access-Control-Allow-Methods").includes("DELETE"), true);

  const treeCall = calls.find((call) => call.url.endsWith("/git/trees") && call.options.method === "POST");
  const treeBody = JSON.parse(treeCall.options.body);
  const deletedPaths = treeBody.tree.filter((item) => item.sha === null).map((item) => item.path);
  assert.deepEqual(deletedPaths.sort(), [
    `${root}/submissions/${firstId}/README.md`,
    `${root}/submissions/${firstId}/files/wrong.txt`
  ].sort());
  assert.equal(treeBody.tree.some((item) => item.path === "docs/data/submissions.json" && item.sha === "submissions-new"), true);
  assert.equal(treeBody.tree.some((item) => item.path === `${root}/README.md` && item.sha === "readme-new"), true);
}

async function testOtherResearcherCannotDelete() {
  const submissions = { version: 2, outputs: { [outputId]: [record(firstId)] } };
  globalThis.fetch = async (url) => {
    if (String(url).includes(`/contents/docs/data/submissions.json?ref=main`)) {
      return Response.json({ content: Buffer.from(JSON.stringify(submissions)).toString("base64") });
    }
    throw new Error(`Unexpected request after authorization failure: ${url}`);
  };
  const response = await worker.fetch(deleteRequest(firstId), makeEnv({ login: "bob", isAdmin: false }), {});
  assert.equal(response.status, 403);
  assert.match((await response.json()).message, /제출자 본인 또는 관리자/);
}

async function testAdminCanDeleteOtherSubmission() {
  const submissions = { version: 2, outputs: { [outputId]: [record(firstId)] } };
  globalThis.fetch = async (url, options = {}) => {
    const method = options.method || "GET";
    if (String(url).includes(`/contents/docs/data/submissions.json?ref=main`)) {
      return Response.json({ content: Buffer.from(JSON.stringify(submissions)).toString("base64") });
    }
    if (String(url).endsWith("/git/ref/heads/main")) return Response.json({ object: { sha: "base-sha" } });
    if (String(url).endsWith("/git/commits/base-sha")) return Response.json({ tree: { sha: "base-tree" } });
    if (String(url).includes("/git/trees/base-tree?recursive=1")) {
      return Response.json({ truncated: false, tree: [
        { path: `${root}/README.md`, type: "blob", sha: "readme-old" },
        { path: `${root}/submissions/${firstId}/README.md`, type: "blob", sha: "file-a" }
      ] });
    }
    if (String(url).endsWith("/git/blobs") && method === "POST") return Response.json({ sha: "submissions-new" });
    if (String(url).endsWith("/git/trees") && method === "POST") return Response.json({ sha: "new-tree" });
    if (String(url).endsWith("/git/commits") && method === "POST") return Response.json({ sha: "new-commit" });
    if (String(url).endsWith("/git/refs/heads/main") && method === "PATCH") return Response.json({ object: { sha: "new-commit" } });
    throw new Error(`Unexpected GitHub request: ${method} ${url}`);
  };
  const response = await worker.fetch(deleteRequest(firstId), makeEnv({ login: "admin", isAdmin: true }), {});
  assert.equal(response.status, 200);
  assert.equal((await response.json()).remainingSubmissions, 0);
}

await testOwnerDeletesOwnSubmission();
await testOtherResearcherCannotDelete();
await testAdminCanDeleteOtherSubmission();
console.log("submission deletion worker tests passed");
