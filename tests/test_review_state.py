from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import research_state_core as core  # noqa: E402


class ReviewAwareResearchStateTests(unittest.TestCase):
    def setUp(self) -> None:
        self.policy = core.normalize_policy({
            "version": 2,
            "defaults": {"outputRequired": True, "reviewBlocksCompletion": True},
            "outputs": {},
        })

    def test_approved_is_evidence_pending_and_held_are_not(self) -> None:
        approved = {"review": {"status": "approved"}}
        pending = {"review": {"status": "pending"}}
        held = {"review": {"status": "held", "reason": "수정 필요"}}
        self.assertTrue(core.submission_counts_as_evidence(approved, None, self.policy))
        self.assertFalse(core.submission_counts_as_evidence(pending, None, self.policy))
        self.assertFalse(core.submission_counts_as_evidence(held, None, self.policy))

    def test_classification_exclusion_still_wins_after_approval(self) -> None:
        approved = {"review": {"status": "approved"}}
        classification = {"countsAsEvidence": False}
        self.assertFalse(core.submission_counts_as_evidence(approved, classification, self.policy))

    def test_legacy_records_remain_approved(self) -> None:
        record = {"uploadedAt": "2026-07-31T23:59:59Z"}
        review = core.normalize_submission_review(record)
        self.assertEqual(review["status"], "approved")
        self.assertTrue(review["legacy"])

    def test_post_activation_record_without_review_is_safely_pending(self) -> None:
        record = {"uploadedAt": "2026-08-01T07:00:00Z"}
        review = core.normalize_submission_review(record)
        self.assertEqual(review["status"], "pending")
        self.assertTrue(review["implicit"])
        self.assertFalse(core.submission_counts_as_evidence(record, None, self.policy))

    def test_current_repository_review_states_are_valid_and_preserved(self) -> None:
        data = json.loads((ROOT / "docs/data/submissions.json").read_text(encoding="utf-8"))
        records = [record for values in data.get("outputs", {}).values() for record in values]
        self.assertGreater(len(records), 0)

        counts = {"approved": 0, "pending": 0, "held": 0}
        invalid = []
        for record in records:
            review = core.normalize_submission_review(record)
            status = review.get("status")
            if status not in counts:
                invalid.append(record.get("submissionId"))
                continue
            counts[status] += 1
            raw = record.get("review")
            if isinstance(raw, dict) and raw.get("status") in counts:
                self.assertEqual(status, raw["status"])
                self.assertIsInstance(review.get("history", []), list)
            if status == "held":
                self.assertTrue(str(review.get("reason") or "").strip())

        self.assertEqual(invalid, [], f"올바르지 않은 검토 상태: {invalid}")
        self.assertGreater(counts["approved"], 0, "기존 승인 제출본은 계속 유지되어야 합니다.")
        self.assertEqual(sum(counts.values()), len(records))


if __name__ == "__main__":
    unittest.main()
