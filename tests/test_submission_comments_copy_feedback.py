import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


class SubmissionCommentsAndCopyFeedbackTests(unittest.TestCase):
    def test_worker_normalizes_all_submission_comment_types(self):
        worker = read("worker/src/v9.js")
        self.assertIn('type === "code" ? submission.description : submission.note', worker)
        self.assertIn('if (type === "code") return "실행 조건 및 설명"', worker)
        self.assertIn('if (type === "files") return "제출 메모"', worker)
        self.assertIn('if (type === "server") return "설명"', worker)
        self.assertIn('if (type === "table") return "표 설명"', worker)
        self.assertIn("target.comment = comment", worker)
        self.assertIn("target.commentLabel = commentLabel", worker)
        self.assertIn("submission.json", worker)

    def test_manifest_exposes_comment_with_empty_fallback(self):
        worker = read("worker/src/v9.js")
        self.assertIn("payload.submission.comment", worker)
        self.assertIn("payload.submission.commentLabel", worker)
        self.assertIn('payload.submission.comment = ""', worker)

    def test_comment_button_is_before_github_action(self):
        script = read("docs/submission-viewer-comments.js")
        self.assertIn('button.textContent = "설명 보기"', script)
        self.assertIn("actions.insertBefore(button, actions.firstChild)", script)
        self.assertIn('details.comment.trim() || "등록된 설명이 없습니다."', script)
        self.assertIn('event.key === "Escape"', script)
        self.assertIn("document.addEventListener(\"click\", closeActivePopover)", script)

    def test_copy_feedback_has_success_error_and_reset_states(self):
        script = read("docs/submission-viewer-comments.js")
        css = read("docs/submission-viewer-comments.css")
        self.assertIn('button.textContent = success ? "✓ 복사됨" : "복사 실패"', script)
        self.assertIn('showToast("코드를 클립보드에 복사했습니다.")', script)
        self.assertIn('showToast("코드를 복사하지 못했습니다.")', script)
        self.assertIn("is-copy-success", css)
        self.assertIn("is-copy-error", css)
        self.assertIn("1600", script)

    def test_assets_load_after_core_and_polish(self):
        html = read("docs/index.html")
        self.assertIn('href="submission-viewer-comments.css"', html)
        self.assertIn('src="submission-viewer-comments.js"', html)
        self.assertLess(
            html.index('src="submission-viewer-polish.js"'),
            html.index('src="submission-viewer-comments.js"'),
        )


if __name__ == "__main__":
    unittest.main()
