#!/usr/bin/env python3
"""Static contract checks for the Phase 3 spreadsheet editor and viewer."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


index = read("docs/index.html")
frontend = read("docs/spreadsheet-v3.js")
styles = read("docs/spreadsheet-v3.css")
worker = read("worker/src/v5.js")
worker_v6 = read("worker/src/v6.js")
worker_v7 = read("worker/src/v7.js")
worker_v8 = read("worker/src/v8.js")
worker_v9 = read("worker/src/v9.js")
worker_v10 = read("worker/src/v10.js")
worker_v11 = read("worker/src/v11.js")
worker_v13 = read("worker/src/v13.js")
worker_v14 = read("worker/src/v14.js")
wrangler = read("worker/wrangler.toml")
sync = read("scripts/sync_dashboard_v5.py")

assert 'href="spreadsheet-v3.css"' in index
assert 'src="spreadsheet-v3.js"' in index
assert 'src="table-submission.js"' not in index
assert 'href="table-submission.css"' not in index
assert 'xlsx-0.20.3/package/dist/xlsx.full.min.js' in index
assert index.index('task-output-presence.js') < index.index('spreadsheet-v3.js')
assert index.index('spreadsheet-v3.js') < index.index('submission-viewer.js')

for required in (
    'taskOutputTypeLabels.table = "표 입력"',
    '["table", "표 입력"]',
    'submitOutput("table"',
    'parseDelimited',
    'parseClipboardRange',
    'workbookFromArrayBuffer',
    'XLSX.read',
    'sheet_to_json',
    'ArrowUp',
    'ArrowDown',
    'event.key === "Delete"',
    'event.key.toLowerCase() === "z"',
    'navigator.clipboard',
    'renderWorkbook',
    'spreadsheet',
):
    assert required in frontend, required

assert 'contenteditable' not in frontend.lower()
for required in (
    '.excel-grid',
    '.excel-grid td.is-active',
    '.spreadsheet-sheet-tabs',
    '.spreadsheet-readonly-table',
    '.spreadsheet-integrated-body',
):
    assert required in styles, required

for required in (
    'import v4 from "./v4.js"',
    '"table"',
    'table.tsv',
    'table.csv',
    'table.json',
    'TABLE_MAX_ROWS = 500',
    'TABLE_MAX_COLUMNS = 50',
    'TABLE_MAX_CELLS = 20_000',
    'dataUrl',
):
    assert required in worker, required

assert 'import v5 from "./v5.js"' in worker_v6
assert 'import v6 from "./v6.js"' in worker_v7
assert 'import v7 from "./v7.js"' in worker_v8
assert 'import v8 from "./v8.js"' in worker_v9
assert 'import v9 from "./v9.js"' in worker_v10
assert 'import v10 from "./v10.js"' in worker_v11
assert 'import v11, { __test as reviewTest } from "./v11.js"' in worker_v13
assert 'import v13 from "./v13.js"' in worker_v14
assert 'kind: "spreadsheet"' in worker_v10
assert 'spreadsheetTest.classifySpreadsheet' in worker_v13
assert 'main = "src/v14.js"' in wrangler
assert 'output["type"] = "table"' in sync

print("phase 3 spreadsheet contract test passed")
