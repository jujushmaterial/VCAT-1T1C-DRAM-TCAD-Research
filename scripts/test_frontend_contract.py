from pathlib import Path

root = Path(__file__).resolve().parents[1]
js = (root / 'docs/task-output-presence.js').read_text(encoding='utf-8')
css = (root / 'docs/task-output-presence.css').read_text(encoding='utf-8')
spreadsheet_js = (root / 'docs/spreadsheet-v3.js').read_text(encoding='utf-8')
spreadsheet_css = (root / 'docs/spreadsheet-v3.css').read_text(encoding='utf-8')
delete_js = (root / 'docs/submission-delete.js').read_text(encoding='utf-8')
delete_css = (root / 'docs/submission-delete.css').read_text(encoding='utf-8')
review_js = (root / 'docs/submission-review.js').read_text(encoding='utf-8')
review_css = (root / 'docs/submission-review.css').read_text(encoding='utf-8')
review_state_js = (root / 'docs/review-state-ui.js').read_text(encoding='utf-8')
read_error_js = (root / 'docs/submission-viewer-read-errors.js').read_text(encoding='utf-8')
index = (root / 'docs/index.html').read_text(encoding='utf-8')
wrangler = (root / 'worker/wrangler.toml').read_text(encoding='utf-8')
worker_v10 = (root / 'worker/src/v10.js').read_text(encoding='utf-8')
worker_v11 = (root / 'worker/src/v11.js').read_text(encoding='utf-8')
worker_v12 = (root / 'worker/src/v12.js').read_text(encoding='utf-8')
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
for token in ['검토 필요', '보류', 'data-review-approve', 'data-review-hold', '/review`']:
    assert token in review_js, token
for token in ['.submission-review__popover', '.submission-review__status.is-pending', '.submission-review__status.is-held']:
    assert token in review_css, token
for token in ['countsAsEvidence', 'status === "approved"', '필수 승인']:
    assert token in review_state_js, token
for token in ['Worker v8 배포 전', '기존 제출 파일과 검토 기록은 변경되지 않았습니다', '다시 시도']:
    assert token in read_error_js, token
assert '.submission-delete-button' in delete_css
assert 'task-output-presence.css' in index
assert 'task-output-presence.js' in index
assert 'spreadsheet-v3.css' in index
assert 'spreadsheet-v3.js' in index
assert 'submission-delete.css' in index
assert 'submission-delete.js' in index
assert 'submission-review.css' in index
assert 'submission-review.js' in index
assert 'review-state-ui.js' in index
assert 'submission-viewer-read-errors.js' in index
assert index.index('spreadsheet-v3.js') < index.index('submission-delete.js')
assert index.index('research-state-ui.js') < index.index('review-state-ui.js')
assert index.index('submission-viewer-comments.js') < index.index('submission-review.js')
assert index.index('submission-review.js') < index.index('submission-viewer-read-errors.js')
assert 'main = "src/v12.js"' in wrangler
assert 'import v9 from "./v9.js"' in worker_v10
assert 'import v10 from "./v10.js"' in worker_v11
assert 'import v11, { __test as reviewTest } from "./v11.js"' in worker_v12
assert 'raw.githubusercontent.com' in worker_v12
assert 'api.github.com' not in worker_v12
print('frontend contract tests passed')
