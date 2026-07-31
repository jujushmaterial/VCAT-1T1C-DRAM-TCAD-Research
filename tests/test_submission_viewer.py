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
        self.assertIn('src="submission-viewer.js"', html)
        self.assertLess(html.index('src="submission-delete.js"'), html.index('src="submission-viewer.js"'))

    def test_viewer_features_and_phase3_exclusions(self):
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
        self.assertNotIn("SheetJS", js)
        self.assertNotIn("Univer", js)
        self.assertNotIn("xlsx", js.lower())

    def test_worker_routes_and_safety_contract(self):
        worker = read("worker/src/v8.js")
        self.assertIn("/api\\/submissions", worker)
        self.assertIn("manifestRoute", worker)
        self.assertIn("fileRoute", worker)
        self.assertIn("validateSubmissionFile", worker)
        self.assertIn("MAX_INLINE_BYTES", worker)
        self.assertIn("Content-Disposition", worker)
        self.assertIn("Range", worker)
        self.assertIn("GITHUB_READ_TOKEN", worker)
        self.assertIn('main = "src/v8.js"', read("worker/wrangler.toml"))

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
        self.assertIn("grid-template-columns: 300px minmax(0, 1fr)", css)
        self.assertIn("@media (max-width: 980px)", css)
        self.assertIn("@media (max-width: 720px)", css)
        self.assertIn("height: 100dvh", css)
        self.assertIn(".submission-viewer__minimap", css)


if __name__ == "__main__":
    unittest.main()
