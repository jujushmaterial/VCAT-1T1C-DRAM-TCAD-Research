import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../docs/output-status-dots.js", import.meta.url), "utf8");
let policyRemoved = false;

const context = {
  escapeHtml: (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;"),
  taskOutputTypeLabels: { file: "파일", code: "코드", any: "제출 방식 선택" },
  taskOutputAction: () => '<button class="action">결과 확인</button>',
  outputTypeSelect: () => "TYPE",
  outputReviewSelect: () => "REVIEW",
  renderTaskOutput: () => "ORIGINAL",
  renderDialog: () => {},
  document: {
    querySelector: (selector) => selector === "#dialog-content .output-policy"
      ? { remove: () => { policyRemoved = true; } }
      : null
  }
};

vm.runInNewContext(source, context, { filename: "output-status-dots.js" });

const base = {
  id: "P02-T08-O01",
  text: "GIDL 그래프",
  type: "file",
  required: true,
  approvedSubmissionCount: 0,
  pendingReviewCount: 0,
  heldSubmissionCount: 0
};

const pending = context.renderTaskOutput({ ...base, pendingReviewCount: 1 }, {}, 0, 0, false);
assert.ok(pending.includes("output-review-dot is-pending"));
assert.ok(pending.indexOf("output-review-dot") < pending.indexOf("output-kind"));
assert.ok(!pending.includes("검토 권장"));
assert.ok(!pending.includes(">필수<"));

const held = context.renderTaskOutput({ ...base, approvedSubmissionCount: 1, pendingReviewCount: 1, heldSubmissionCount: 1 }, {}, 0, 0, false);
assert.ok(held.includes("output-review-dot is-held"), "held must take visual priority");

const approved = context.renderTaskOutput({ ...base, approvedSubmissionCount: 1 }, {}, 0, 0, false);
assert.ok(approved.includes("output-review-dot is-approved"));

const empty = context.renderTaskOutput(base, {}, 0, 0, false);
assert.ok(!empty.includes("output-review-dot"));

const optional = context.renderTaskOutput({ ...base, required: false }, {}, 0, 0, false);
assert.ok(optional.includes(">선택<"));

assert.equal(context.renderTaskOutput(base, {}, 0, 0, true), "ORIGINAL", "editable mode must remain unchanged");
context.renderDialog({}, {});
assert.equal(policyRemoved, true, "output policy box must be removed after dialog render");

console.log("output status dots behavior: ok");
