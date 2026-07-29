#!/usr/bin/env python3
"""Static contract checks for spreadsheet-style table submission."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


index = read("docs/index.html")
frontend = read("docs/table-submission.js")
styles = read("docs/table-submission.css")
worker = read("worker/src/v5.js")
worker_v6 = read("worker/src/v6.js")
worker_v7 = read("worker/src/v7.js")
wrangler = read("worker/wrangler.toml")
sync = read("scripts/sync_dashboard_v5.py")

assert 'href="table-submission.css"' in index
assert 'src="table-submission.js"' in index
assert 'task-output-presence.js' in index and index.index('task-output-presence.js') < index.index('table-submission.js')

for required in (
    'taskOutputTypeLabels.table = "표 입력"',
    '["table", "표 입력"]',
    'parseClipboardTable',
    'event.clipboardData',
    'submitOutput("table"',
    'table-preview-button',
    'Workbench',
):
    assert required in frontend, required

for required in (
    '.sheet-grid-wrap',
    '.sheet-grid td > div:focus',
    '.saved-table-wrap',
    '.table-result-actions',
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
assert 'main = "src/v7.js"' in wrangler
assert 'output["type"] = "table"' in sync

print("table submission contract test passed")
