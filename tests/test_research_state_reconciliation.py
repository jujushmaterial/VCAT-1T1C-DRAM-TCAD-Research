from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import research_state  # noqa: E402


def issue(body: str) -> dict:
    return {
        "number": 1,
        "title": "Phase 1. Test",
        "body": body,
        "state": "open",
        "assignees": [],
        "updated_at": "2026-07-31T00:00:00Z",
        "user": {"login": "tester"},
    }


class ReconciliationRegressionTests(unittest.TestCase):
    def test_rebuild_after_issue_patch_removes_checkbox_drift(self) -> None:
        body = """## 1. 해야 할 것

- [x] <!-- task-id:P01-T01 --> 첫 과제
  - <!-- output-id:P01-T01-O01 type:files review:none --> 결과

## 2. 나와야 하는 결과물
설명
"""
        issues = [issue(body)]
        submissions = {"version": 2, "outputs": {}}
        policy = {
            "version": 1,
            "defaults": {"outputRequired": True, "reviewBlocksCompletion": False},
            "outputs": {},
        }
        classifications = {"version": 1, "submissions": {}}

        status, integrity = research_state.build_status(
            issues=issues,
            submissions_data=submissions,
            policy=policy,
            classifications_data=classifications,
            previous={"phases": []},
        )
        self.assertTrue(any(item["code"] == "CHECKBOX_STATE_DRIFT" for item in integrity["items"]))

        with mock.patch.object(research_state.legacy, "TOKEN", "test-token"), mock.patch.object(research_state, "patch_issue"):
            changed = research_state.reconcile_issues(issues, status)

        self.assertEqual(changed, [1])
        self.assertIn("- [ ] <!-- task-id:P01-T01 -->", issues[0]["body"])

        _, refreshed_integrity = research_state.build_status(
            issues=issues,
            submissions_data=submissions,
            policy=policy,
            classifications_data=classifications,
            previous=status,
        )
        self.assertFalse(any(item["code"] == "CHECKBOX_STATE_DRIFT" for item in refreshed_integrity["items"]))

    def test_legacy_filename_repair_is_complete_and_idempotent(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            folder = root / "members/SongMinho/submission"
            files = folder / "files"
            files.mkdir(parents=True)
            old_name = "P02-T01-O01_SWB_Parameters.csv"
            new_name = "P02-T01-O03_SWB_Parameters.csv"
            (files / old_name).write_text("name,value\nLg,0.1\n", encoding="utf-8")
            (folder / "README.md").write_text(f"- [{old_name}](./files/{old_name})\n", encoding="utf-8")
            submission_payload = {
                "files": [{"name": old_name, "path": f"{folder.as_posix()}/files/{old_name}", "size": 18}]
            }
            (folder / "submission.json").write_text(json.dumps(submission_payload, indent=2), encoding="utf-8")
            timeline = root / "members/SongMinho/TIMELINE.md"
            timeline.parent.mkdir(parents=True, exist_ok=True)
            timeline.write_text("# Timeline\n", encoding="utf-8")
            submissions_path = root / "docs/data/submissions.json"
            submissions_path.parent.mkdir(parents=True, exist_ok=True)
            submissions_payload = {
                "version": 2,
                "updatedAt": "2026-07-31T00:00:00Z",
                "outputs": {
                    "P02-T01-O03": [
                        {
                            "submissionId": "legacy",
                            "folderPath": folder.as_posix(),
                            "files": [{"name": old_name, "path": f"{folder.as_posix()}/files/{old_name}", "size": 18}],
                        }
                    ]
                },
            }
            submissions_path.write_text(json.dumps(submissions_payload, indent=2), encoding="utf-8")
            repairs = (
                {
                    "outputId": "P02-T01-O03",
                    "submissionId": "legacy",
                    "oldName": old_name,
                    "newName": new_name,
                    "timeline": timeline,
                    "timelineMarker": "legacy-test",
                },
            )

            with mock.patch.object(research_state, "SUBMISSIONS", submissions_path), mock.patch.object(research_state, "LEGACY_FILENAME_REPAIRS", repairs):
                first = research_state.repair_legacy_submission_filenames()
                first_snapshot = submissions_path.read_text(encoding="utf-8")
                second = research_state.repair_legacy_submission_filenames()

            self.assertEqual(first, ["legacy"])
            self.assertEqual(second, [])
            self.assertFalse((files / old_name).exists())
            self.assertTrue((files / new_name).exists())
            self.assertEqual(first_snapshot, submissions_path.read_text(encoding="utf-8"))
            self.assertIn(new_name, (folder / "README.md").read_text(encoding="utf-8"))
            self.assertIn(new_name, (folder / "submission.json").read_text(encoding="utf-8"))
            self.assertIn("legacy-test", timeline.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
