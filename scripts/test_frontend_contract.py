from pathlib import Path

root = Path(__file__).resolve().parents[1]
js = (root / 'docs/task-output-presence.js').read_text(encoding='utf-8')
css = (root / 'docs/task-output-presence.css').read_text(encoding='utf-8')
spreadsheet_js = (root / 'docs/spreadsheet-v3.js').read_text(encoding='utf-8')
spreadsheet_css = (root / 'docs/spreadsheet-v3.css').read_text(encoding='utf-8')
delete_js = (root / 'docs/submission-delete.js').read_text(encoding='utf-8')
delete_css = (root / 'docs/submission-delete.css').read_text(encoding='utf-8')
index = (root / 'docs/index.html').read_text(encoding='utf-8')
wrangler = (root / 'worker/wrangler.toml').read_text(encoding='utf-8')
worker_v10 = (root / 'worker/src/v10.js').read_text(encoding='utf-8')
required_js = [
    'function renderTask(',
    'function renderTaskOutput(',
    'function addTaskOutput(',
    'function readEditableChecklist()',
    '/api/presence/heartbeat',
    '/api/presence',
    '/tasks/${encodeURIComponent(submissionOutput.taskId)}/outputs/',
    '목록 수정',
    '파일 없음',
    '미제출',
]
for token in required_js:
    assert token in js, token
for token in ['.task-toggle', '.task-output-panel', '.presence-dot.is-online', '.task-output-row']:
    assert token in css, token
for token in ['submitOutput("table"', 'workbookFromArrayBuffer', 'renderWorkbook']:
    assert token in spreadsheet_js, token
for token in ['.excel-grid-wrap', '.spreadsheet-readonly-grid']:
    assert token in spreadsheet_css, token
for token in ['submission-delete-button', 'method: "DELETE"', 'window.confirm', 'currentUser.isAdmin']:
    assert token in delete_js, token
assert '.submission-delete-button' in delete_css
assert 'task-output-presence.css' in index
assert 'task-output-presence.js' in index
assert 'spreadsheet-v3.css' in index
assert 'spreadsheet-v3.js' in index
assert 'submission-delete.css' in index
assert 'submission-delete.js' in index
assert index.index('spreadsheet-v3.js') < index.index('submission-delete.js')
assert 'main = "src/v10.js"' in wrangler
assert 'import v9 from "./v9.js"' in worker_v10
print('frontend contract tests passed')
