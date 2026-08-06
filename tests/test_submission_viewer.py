from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


class SubmissionViewerContractTests(unittest.TestCase):
    def test_dashboard_loads_viewer_without_replacing_phase_ui(self):
        html = read("docs/index.html")
        self.assertIn('id="phase-grid"', html)
        self.assertIn('id="phase-dialog"', html)
        self.assertIn('id="submission-viewer-dialog"', html)
        self.assertIn('href="submission-viewer.css"', html)
        self.assertIn('href="submission-viewer-comments.css"', html)
        self.assertIn('href="submission-review.css"', html)
        self.assertIn('href="spreadsheet-v3.css"', html)
        self.assertIn('href="submission-viewer-download.css"', html)
        self.assertIn('src="submission-viewer.js"', html)
        self.assertIn('src="submission-viewer-polish.js"', html)
        self.assertIn('src="submission-viewer-comments.js"', html)
        self.assertIn('src="submission-viewer-download.js"', html)
        self.assertIn('src="submission-review.js"', html)
        self.assertIn('src="submission-viewer-read-errors.js"', html)
        self.assertIn('src="spreadsheet-v3.js"', html)
        self.assertIn('src="review-state-ui.js"', html)
        self.assertLess(html.index('src="spreadsheet-v3.js"'), html.index('src="submission-viewer.js"'))
        self.assertLess(html.index('src="submission-delete.js"'), html.index('src="submission-viewer.js"'))
        self.assertLess(html.index('src="submission-viewer.js"'), html.index('src="submission-viewer-polish.js"'))
        self.assertLess(html.index('src="submission-viewer-polish.js"'), html.index('src="submission-viewer-comments.js"'))
        self.assertLess(html.index('src="submission-viewer-comments.js"'), html.index('src="submission-viewer-download.js"'))
        self.assertLess(html.index('src="submission-viewer-download.js"'), html.index('src="submission-review.js"'))
        self.assertLess(html.index('src="submission-review.js"'), html.index('src="submission-viewer-read-errors.js"'))

    def test_core_viewer_features_remain_available(self):
        js = read("docs/submission-viewer.js")
        for token in (
            "data-code-file-id",
            "viewer-code-search",
            "viewer-line-jump",
            "viewer-copy-code",
            "viewer-code-minimap",
            "viewer-image-prev",
            "viewer-image-next",
            "viewer-image-zoom-in",
            "viewer-image-fit",
            "renderPdf",
            "renderJson",
            "renderMarkdown",
            "renderPlainText",
            "renderUnsupported",
            "GitHub 원본",
            "다운로드",
        ):
            self.assertIn(token, js)

    def test_worker_routes_spreadsheet_review_and_static_read_contract(self):
        worker = read("worker/src/v8.js")
        comments = read("worker/src/v9.js")
        spreadsheets = read("worker/src/v10.js")
        reviews = read("worker/src/v11.js")
        static_reads = read("worker/src/v13.js")
        archive_reads = read("worker/src/v14.js")
        self.assertIn("/api\\/submissions", worker)
        self.assertIn("manifestRoute", worker)
        self.assertIn("fileRoute", worker)
        self.assertIn("validateSubmissionFile", worker)
        self.assertIn("MAX_INLINE_BYTES", worker)
        self.assertIn("Content-Disposition", worker)
        self.assertIn("Range", worker)
        self.assertIn("GITHUB_READ_TOKEN", worker)
        self.assertIn('import v8 from "./v8.js"', comments)
        self.assertIn("persistComment", comments)
        self.assertIn('import v9 from "./v9.js"', spreadsheets)
        self.assertIn('kind: "spreadsheet"', spreadsheets)
        self.assertIn('import v10 from "./v10.js"', reviews)
        self.assertIn('/review$/', reviews)
        self.assertIn("reviewPermissions", reviews)
        self.assertIn('import v11, { __test as reviewTest } from "./v11.js"', static_reads)
        self.assertIn("github-pages", static_reads)
        self.assertIn("cdn.jsdelivr.net", static_reads)
        self.assertIn('"X-GitHub-User-Token-Used": "false"', static_reads)
        self.assertIn('import v13 from "./v13.js"', archive_reads)
        self.assertIn("archiveRoute", archive_reads)
        self.assertIn("return v13.fetch(request, env, ctx)", archive_reads)
        self.assertIn('main = "src/v14.js"', read("worker/wrangler.toml"))

    def test_existing_submission_index_has_viewer_safe_examples(self):
        import json
        data = json.loads(read("docs/data/submissions.json"))
        outputs = data.get("outputs", {})
        for output_id in ("P01-T05-O01", "P01-T05-O02", "P02-T01-O03"):
            self.assertIn(output_id, outputs)
            record = outputs[output_id][0]
            self.assertTrue(record.get("folderPath"))
            self.assertTrue(record.get("files"))
            for file_data in record["files"]:
                self.assertTrue(file_data["path"].startswith(record["folderPath"] + "/"))

    def test_mobile_and_desktop_layout_contract(self):
        css = read("docs/submission-viewer.css")
        spreadsheet_css = read("docs/spreadsheet-v3.css")
        review_css = read("docs/submission-review.css")
        download_css = read("docs/submission-viewer-download.css")
        self.assertIn("grid-template-columns: 230px minmax(0, 1fr)", css)
        self.assertIn("width: 42px", css)
        self.assertIn(":has(.submission-viewer__editor-shell)", css)
        self.assertIn("@media (max-width: 900px)", css)
        self.assertIn("@media (max-width: 680px)", css)
        self.assertIn("height: 100dvh", css)
        self.assertIn(".submission-viewer__minimap", css)
        self.assertIn(".spreadsheet-integrated-body", spreadsheet_css)
        self.assertIn(".spreadsheet-sheet-tabs", spreadsheet_css)
        self.assertIn(".submission-review__popover", review_css)
        self.assertIn("@media (max-width: 680px)", review_css)
        self.assertIn("@media (max-width: 760px)", download_css)
        self.assertIn(".submission-viewer__download-options", download_css)


if __name__ == "__main__":
    unittest.main()
