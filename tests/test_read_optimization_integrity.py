import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


class RawReadOptimizationIntegrityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.submissions = json.loads(read("docs/data/submissions.json"))
        cls.status = json.loads(read("docs/data/status.json"))
        cls.worker = read("worker/src/v13.js")
        cls.index = read("docs/index.html")
        cls.error_ui = read("docs/submission-viewer-read-errors.js")

    def test_existing_submission_paths_and_review_history_remain_valid(self):
        record_count = 0
        file_count = 0
        reviewed_count = 0
        for output_id, records in self.submissions.get("outputs", {}).items():
            self.assertRegex(output_id, r"^P\d{2}-T\d{2}-O\d{2}$")
            for record in records:
                record_count += 1
                self.assertTrue(record.get("submissionId"))
                folder = str(record.get("folderPath") or "").rstrip("/")
                self.assertTrue(folder)
                self.assertNotIn("..", folder)
                review = record.get("review")
                if isinstance(review, dict):
                    reviewed_count += 1
                    self.assertIn(review.get("status"), {"pending", "approved", "held"})
                    self.assertIsInstance(review.get("history", []), list)
                    if review.get("status") == "held":
                        self.assertTrue(str(review.get("reason") or "").strip())
                for file_info in record.get("files", []):
                    file_count += 1
                    path = str(file_info.get("path") or "")
                    self.assertTrue(path.startswith(folder + "/"), path)
                    self.assertNotIn("..", path)
                    self.assertTrue((ROOT / path).exists(), path)
        self.assertGreater(record_count, 0)
        self.assertGreater(file_count, 0)
        self.assertGreater(reviewed_count, 0)

    def test_phase_assignees_are_reused_from_generated_status(self):
        phases = self.status.get("phases", [])
        self.assertGreater(len(phases), 0)
        for phase in phases:
            self.assertIn("assignees", phase)
            self.assertIsInstance(phase["assignees"], list)
        self.assertIn('const STATUS_PATH = "docs/data/status.json"', self.worker)
        self.assertIn("findPhase(status, record)", self.worker)
        self.assertNotIn("/issues/", self.worker)

    def test_user_token_is_not_forwarded_to_static_sources(self):
        self.assertIn('"X-GitHub-User-Token-Used": "false"', self.worker)
        self.assertIn("github-pages", self.worker)
        self.assertIn("cdn.jsdelivr.net", self.worker)
        self.assertIn("raw.githubusercontent.com", self.worker)
        self.assertNotIn("api.github.com", self.worker)
        self.assertNotIn("headers.set(\"Authorization\"", self.worker)

    def test_write_operations_delegate_to_worker_v11(self):
        self.assertIn('import v11, { __test as reviewTest } from "./v11.js"', self.worker)
        self.assertIn("const response = await v11.fetch(request, env, ctx)", self.worker)
        self.assertIn("mutatesSubmissionState(request, url)", self.worker)
        wrangler = read("worker/wrangler.toml")
        self.assertIn('main = "src/v13.js"', wrangler)

    def test_viewer_error_message_is_updated_without_rewriting_core_viewer(self):
        self.assertIn('src="submission-viewer-read-errors.js"', self.index)
        self.assertLess(
            self.index.index('src="submission-review.js"'),
            self.index.index('src="submission-viewer-read-errors.js"'),
        )
        self.assertIn("Worker v8 배포 전", self.error_ui)
        self.assertIn("기존 제출 파일과 검토 기록은 변경되지 않았습니다", self.error_ui)
        self.assertIn("다시 시도", self.error_ui)


if __name__ == "__main__":
    unittest.main()
