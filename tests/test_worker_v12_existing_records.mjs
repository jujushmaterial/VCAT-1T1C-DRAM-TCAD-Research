import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { __test } from "../worker/src/v12.js";
import { __test as reviewTest } from "../worker/src/v11.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const submissions = JSON.parse(fs.readFileSync(path.join(root, "docs/data/submissions.json"), "utf8"));
const kinds = new Set();
let records = 0;
let files = 0;
let reviewed = 0;

for (const [outputId, entries] of Object.entries(submissions.outputs || {})) {
  for (const record of Array.isArray(entries) ? entries : []) {
    records += 1;
    const found = __test.findSubmissionRecord(submissions, record.submissionId, outputId);
    assert.equal(found.record.submissionId, record.submissionId);
    __test.validateRecord(record);
    const review = reviewTest.normalizeReview(record);
    assert.ok(["pending", "approved", "held"].includes(review.status));
    reviewed += 1;

    for (const file of Array.isArray(record.files) ? record.files : []) {
      files += 1;
      assert.ok(String(file.path).startsWith(`${record.folderPath}/`), file.path);
      const diskPath = path.join(root, file.path);
      assert.ok(fs.existsSync(diskPath), diskPath);
      assert.ok(fs.statSync(diskPath).isFile(), diskPath);
      const classified = __test.classifyFile(file, record.type);
      assert.ok(classified.kind);
      kinds.add(classified.kind);
      fs.openSync(diskPath, "r");
    }
  }
}

assert.ok(records > 0, "existing submission records are required");
assert.ok(files > 0, "existing submission files are required");
assert.equal(reviewed, records);
assert.ok(kinds.size >= 2, `expected multiple existing preview kinds, got ${[...kinds].join(", ")}`);

console.log(JSON.stringify({ records, files, kinds: [...kinds].sort() }));
console.log("Worker v12 existing record scan: ok");
