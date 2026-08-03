import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


class SubmissionReviewContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.worker = read("worker/src/v11.js")
        cls.raw_worker = read("worker/src/v12.js")
        cls.ui = read("docs/submission-review.js")
        cls.css = read("docs/submission-review.css")
        cls.state_ui = read("docs/review-state-ui.js")
        cls.state_core = read("scripts/research_state_core.py")
        cls.policy = json.loads(read("docs/data/completion-policy.json"))
        cls.index = read("docs/index.html")

    def test_state_machine_and_permissions_exist(self):
        for token in (
            'new Set(["approve", "hold"])',
            'current.status === "pending"',
            'current.status === "held"',
            'current.status === "approved"',
            'canDecidePending',
            'canApproveHeld',
            'isPhaseAssignee && !isOwnSubmission',
            'login === owner',
            'approved-after-hold',
        ):
            self.assertIn(token, self.worker)

    def test_hold_reason_and_self_approval_rules(self):
        self.assertIn("HOLD_REASON_MIN = 5", self.worker)
        self.assertIn("HOLD_REASON_MAX = 1000", self.worker)
        self.assertIn("보류 사유를", self.worker)
        self.assertIn("본인 제출본은 관리자가 검토합니다.", self.ui)
        self.assertIn("보류된 제출본은 관리자만 승인", self.worker)

    def test_atomic_github_recording_contract(self):
        self.assertIn("SUBMISSIONS_PATH", self.worker)
        self.assertIn('`${record.folderPath}/submission.json`', self.worker)
        self.assertIn('`members/${safeSegment(record.memberFolder)}/TIMELINE.md`', self.worker)
        self.assertIn("base_tree: baseCommit.tree.sha", self.worker)
        self.assertIn("reviewCommitMessage", self.worker)
        self.assertIn("buildTimelineEntry", self.worker)
        self.assertIn("GitHub 기록", self.worker)

    def test_ui_matches_requested_single_button_flow(self):
        self.assertIn('button.textContent = review.status === "held" ? "보류" : "검토 필요"', self.ui)
        self.assertIn("data-review-approve", self.ui)
        self.assertIn("data-review-hold", self.ui)
        self.assertIn("승인 시에는 비워도 됩니다", self.ui)
        self.assertIn("보류 사유가 기록되지 않았습니다", self.ui)
        self.assertIn("permissions.canApproveHeld", self.ui)
        self.assertIn("permissions.canDecidePending", self.ui)
        self.assertIn(".submission-review__status.is-pending", self.css)
        self.assertIn(".submission-review__status.is-held", self.css)

    def test_approved_only_completion_and_legacy_compatibility(self):
        self.assertTrue(self.policy["defaults"]["reviewBlocksCompletion"])
        self.assertIn('return normalize_submission_review(record)["status"] == "approved"', self.state_core)
        self.assertIn('"legacy": True', self.state_core)
        self.assertIn('"status": "pending"', self.state_core)
        self.assertIn('status === "approved"', self.state_ui)
        self.assertIn("필수 승인", self.state_ui)

    def test_assets_and_worker_entrypoint_are_connected(self):
        self.assertIn('href="submission-review.css"', self.index)
        self.assertIn('src="review-state-ui.js"', self.index)
        self.assertIn('src="submission-review.js"', self.index)
        self.assertLess(self.index.index('src="research-state-ui.js"'), self.index.index('src="review-state-ui.js"'))
        self.assertLess(self.index.index('src="submission-viewer-comments.js"'), self.index.index('src="submission-review.js"'))
        self.assertIn('import v11, { __test as reviewTest } from "./v11.js"', self.raw_worker)
        self.assertIn("reviewTest.reviewPermissions", self.raw_worker)
        self.assertIn('main = "src/v12.js"', read("worker/wrangler.toml"))


if __name__ == "__main__":
    unittest.main()
