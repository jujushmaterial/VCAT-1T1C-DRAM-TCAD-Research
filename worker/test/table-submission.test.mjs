import assert from "node:assert/strict";
import worker from "../src/v5.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const issueBody = `## 1. 해야 할 것

- [ ] <!-- task-id:P05-T08 --> 성능이 가장 좋은 조건을 찾는다.
  - <!-- output-id:P05-T08-O01 type:table review:recommended --> Nominal-best 구조와 조건표

## 2. 나와야 하는 결과물

표 입력

## 3. 과정의 이유

검증
`;

let issue = {
  number: 5,
  title: "Phase 5. 후보 구조 세밀하게 최적화하기",
  body: issueBody,
  updated_at: "2026-07-29T00:00:00Z",
  state: "open",
  html_url: "https://github.com/example/repo/issues/5",
  assignees: [{ login: "tester" }]
};

const members = {
  members: [{ username: "tester", name: "테스터", folder: "Tester" }]
};
const submissions = { version: 2, updatedAt: null, outputs: {} };
const blobs = new Map();
let blobCounter = 0;
let patchedChecklistBody = null;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function base64Json(data) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(String(input));
  const method = String(init.method || "GET").toUpperCase();
  const path = url.pathname;

  if (path.endsWith("/issues/5") && method === "GET") return jsonResponse(issue);
  if (path.endsWith("/issues/5") && method === "PATCH") {
    const payload = JSON.parse(init.body);
    patchedChecklistBody = payload.body;
    issue = { ...issue, body: payload.body, updated_at: "2026-07-29T00:01:00Z" };
    return jsonResponse(issue);
  }
  if (path.includes("/contents/docs/data/members.json")) {
    return jsonResponse({ content: base64Json(members) });
  }
  if (path.includes("/contents/docs/data/submissions.json")) {
    return jsonResponse({ content: base64Json(submissions) });
  }
  if (path.endsWith("/git/ref/heads/main")) return jsonResponse({ object: { sha: "base-sha" } });
  if (path.endsWith("/git/commits/base-sha")) return jsonResponse({ tree: { sha: "base-tree" } });
  if (path.endsWith("/git/blobs") && method === "POST") {
    const payload = JSON.parse(init.body);
    const sha = `blob-${++blobCounter}`;
    blobs.set(sha, payload.content);
    return jsonResponse({ sha }, 201);
  }
  if (path.endsWith("/git/trees") && method === "POST") {
    const payload = JSON.parse(init.body);
    const decoded = payload.tree.map((entry) => ({
      path: entry.path,
      content: decoder.decode(Uint8Array.from(atob(blobs.get(entry.sha)), (char) => char.charCodeAt(0)))
    }));
    globalThis.__committedFiles = decoded;
    return jsonResponse({ sha: "tree-sha" }, 201);
  }
  if (path.endsWith("/git/commits") && method === "POST") return jsonResponse({ sha: "commit-sha" }, 201);
  if (path.endsWith("/git/refs/heads/main") && method === "PATCH") return jsonResponse({ object: { sha: "commit-sha" } });
  throw new Error(`Unhandled GitHub request: ${method} ${path}`);
};

const env = {
  REPOSITORY: "example/repo",
  FRONTEND_ORIGIN: "https://example.github.io",
  SESSIONS: {
    async get(key) {
      assert.equal(key, "session:test-session");
      return {
        token: "github-token",
        user: { login: "tester", isAdmin: false }
      };
    }
  }
};

const authHeaders = {
  Authorization: "Bearer test-session",
  Origin: "https://example.github.io",
  "Content-Type": "application/json"
};

const getResponse = await worker.fetch(
  new Request("https://worker.example/api/issues/5", { headers: authHeaders }),
  env,
  {}
);
assert.equal(getResponse.status, 200);
const getData = await getResponse.json();
assert.equal(getData.tasks[0].outputs[0].type, "table");

const patchResponse = await worker.fetch(
  new Request("https://worker.example/api/issues/5/checklist", {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify({
      expectedUpdatedAt: issue.updated_at,
      tasks: [{
        id: "P05-T08",
        checked: false,
        text: "성능이 가장 좋은 조건을 찾는다.",
        outputs: [{
          id: "P05-T08-O01",
          text: "Nominal-best 구조와 조건표",
          type: "table",
          review: "recommended"
        }]
      }]
    })
  }),
  env,
  {}
);
assert.equal(patchResponse.status, 200);
assert.match(patchedChecklistBody, /type:table/);

const submitResponse = await worker.fetch(
  new Request("https://worker.example/api/phases/5/tasks/P05-T08/outputs/P05-T08-O01/submissions", {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      issueNumber: 5,
      expectedUpdatedAt: issue.updated_at,
      type: "table",
      submission: {
        hasHeader: true,
        note: "Workbench 최적값",
        rows: [
          ["Case", "WF", "Ion", "Ioff"],
          ["A", "4.8", "1.2E-4", "3.1E-12"],
          ["B", "4.9", "1.1E-4", "1.4E-12"]
        ]
      }
    })
  }),
  env,
  {}
);
assert.equal(submitResponse.status, 201);
const submitData = await submitResponse.json();
assert.equal(submitData.submission.type, "table");
assert.equal(submitData.submission.table.rowCount, 3);
assert.equal(submitData.submission.table.columnCount, 4);
assert.match(submitData.submission.table.dataUrl, /table\.json$/);

const committed = globalThis.__committedFiles || [];
const paths = new Set(committed.map((item) => item.path));
assert.ok([...paths].some((path) => path.endsWith("/table.tsv")));
assert.ok([...paths].some((path) => path.endsWith("/table.csv")));
assert.ok([...paths].some((path) => path.endsWith("/table.json")));
assert.ok([...paths].some((path) => path.endsWith("/README.md")));
const jsonFile = committed.find((item) => item.path.endsWith("/table.json"));
const storedTable = JSON.parse(jsonFile.content);
assert.deepEqual(storedTable.rows[1], ["A", "4.8", "1.2E-4", "3.1E-12"]);
const csvFile = committed.find((item) => item.path.endsWith("/table.csv"));
assert.match(csvFile.content, /1\.2E-4/);

console.log("table submission worker test passed");
