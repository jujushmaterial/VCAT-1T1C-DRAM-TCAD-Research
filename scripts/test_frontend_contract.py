from pathlib import Path

root = Path(__file__).resolve().parents[1]
js = (root / 'docs/task-output-presence.js').read_text(encoding='utf-8')
css = (root / 'docs/task-output-presence.css').read_text(encoding='utf-8')
table_js = (root / 'docs/table-submission.js').read_text(encoding='utf-8')
table_css = (root / 'docs/table-submission.css').read_text(encoding='utf-8')
delete_js = (root / 'docs/submission-delete.js').read_text(encoding='utf-8')
delete_css = (root / 'docs/submission-delete.css').read_text(encoding='utf-8')
index = (root / 'docs/index.html').read_text(encoding='utf-8')
wrangler = (root / 'worker/wrangler.toml').read_text(encoding='utf-8')
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
for token in ['submitOutput("table"', 'parseClipboardTable', 'table-preview-button']:
    assert token in table_js, token
for token in ['.sheet-grid-wrap', '.saved-table-wrap']:
    assert token in table_css, token
for token in ['submission-delete-button', 'method: "DELETE"', 'window.confirm', 'currentUser.isAdmin']:
    assert token in delete_js, token
assert '.submission-delete-button' in delete_css
assert 'task-output-presence.css' in index
assert 'task-output-presence.js' in index
assert 'table-submission.css' in index
assert 'table-submission.js' in index
assert 'submission-delete.css' in index
assert 'submission-delete.js' in index
assert index.index('table-submission.js') < index.index('submission-delete.js')
assert 'main = "src/v8.js"' in wrangler
print('frontend contract tests passed')
