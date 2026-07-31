import assert from "node:assert/strict";
import { __test } from "../worker/src/v10.js";

for (const [name, mimeType] of [
  ["result.csv", "text/csv; charset=utf-8"],
  ["result.tsv", "text/tab-separated-values; charset=utf-8"],
  ["legacy.xls", "application/vnd.ms-excel"],
  ["workbook.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
]) {
  const result = __test.classifySpreadsheet({
    name,
    extension: name.split(".").pop(),
    kind: "unsupported",
    previewSupported: false
  });
  assert.equal(result.kind, "spreadsheet");
  assert.equal(result.previewSupported, true);
  assert.equal(result.mimeType, mimeType);
  assert.equal(result.language, null);
}

const code = { name: "device.cmd", extension: "cmd", kind: "code", previewSupported: true };
assert.deepEqual(__test.classifySpreadsheet(code), code);
console.log("spreadsheet worker classification: ok");
