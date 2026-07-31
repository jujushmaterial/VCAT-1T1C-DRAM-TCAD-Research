from __future__ import annotations

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import research_state  # noqa: E402


def issue(number: int, title: str, body: str, state: str = "open") -> dict:
    return {
        "number": number,
        "title": title,
        "body": body,
        "state": state,
        "assignees": [],
        "updated_at": "2026-07-31T00:00:00Z",
        "user": {"login": "tester"},
    }


class ResearchStateTests(unittest.TestCase):
    def setUp(self) -> None:
        self.policy = {
            "version": 1,
            "defaults": {"outputRequired": True, "reviewBlocksCompletion": False},
            "outputs": {
                "P01-T10-O05": {
                    "required": False,
                    "reason": "진행 중 참고자료",
                }
            },
        }
        self.classifications = {"version": 1, "submissions": {}}

    def test_required_outputs_override_declared_checkbox(self) -> None:
        body = """## 1. 해야 할 것

- [x] <!-- task-id:P01-T10 --> 결론을 정리한다.
  - <!-- output-id:P01-T10-O01 type:files review:recommended --> 통합 비교표
  - <!-- output-id:P01-T10-O02 type:files review:recommended --> 결론
  - <!-- output-id:P01-T10-O05 type:any review:none --> 참고자료

## 2. 나와야 하는 결과물
설명
"""
        submissions = {
            "version": 2,
            "outputs": {
                "P01-T10-O05": [
                    {
                        "submissionId": "s1",
                        "phaseId": 1,
                        "taskId": "P01-T10",
                        "outputId": "P01-T10-O05",
                        "folderPath": "members/Test/phases/phase-01/tasks/P01-T10/outputs/P01-T10-O05/submissions/s1",
                        "files": [],
                    }
                ]
            },
        }
        status, integrity = research_state.build_status(
            issues=[issue(1, "Phase 1. Test", body)],
            submissions_data=submissions,
            policy=self.policy,
            classifications_data=self.classifications,
            previous={"phases": []},
        )
        task = status["phases"][0]["tasks"][0]
        self.assertFalse(task["checked"])
        self.assertEqual(task["state"], "in-progress")
        self.assertEqual(task["missingRequiredOutputs"], ["P01-T10-O01", "P01-T10-O02"])
        self.assertTrue(any(item["code"] == "CHECKBOX_STATE_DRIFT" for item in integrity["items"]))

    def test_task_completes_when_all_required_outputs_exist(self) -> None:
        body = """## 1. 해야 할 것

- [ ] <!-- task-id:P02-T04 --> 접합을 확인한다.
  - <!-- output-id:P02-T04-O01 type:files review:none --> 조건표
  - <!-- output-id:P02-T04-O02 type:files review:none --> 분포 이미지
  - <!-- output-id:P02-T04-O03 type:files review:none --> 접합 위치

## 2. 나와야 하는 결과물
설명
"""
        output_ids = ["P02-T04-O01", "P02-T04-O02", "P02-T04-O03"]
        submissions = {
            "version": 2,
            "outputs": {
                output_id: [
                    {
                        "submissionId": output_id,
                        "phaseId": 2,
                        "taskId": "P02-T04",
                        "outputId": output_id,
                        "folderPath": f"members/Test/phases/phase-02/tasks/P02-T04/outputs/{output_id}/submissions/{output_id}",
                        "files": [],
                    }
                ]
                for output_id in output_ids
            },
        }
        status, integrity = research_state.build_status(
            issues=[issue(2, "Phase 2. Test", body)],
            submissions_data=submissions,
            policy=self.policy,
            classifications_data=self.classifications,
            previous={"phases": []},
        )
        task = status["phases"][0]["tasks"][0]
        self.assertTrue(task["checked"])
        self.assertEqual(task["requiredOutputsDone"], 3)
        self.assertEqual(status["phases"][0]["progress"], 100)
        self.assertEqual(integrity["counts"]["error"], 0)

    def test_classified_misfile_is_reported_and_can_be_excluded(self) -> None:
        body = """## 1. 해야 할 것

- [ ] <!-- task-id:P02-T04 --> 접합을 확인한다.
  - <!-- output-id:P02-T04-O02 type:files review:none --> 분포 이미지

## 2. 나와야 하는 결과물
설명
"""
        submission_id = "misfile"
        submissions = {
            "version": 2,
            "outputs": {
                "P02-T04-O02": [
                    {
                        "submissionId": submission_id,
                        "phaseId": 2,
                        "taskId": "P02-T04",
                        "outputId": "P02-T04-O02",
                        "folderPath": "members/Test/phases/phase-02/tasks/P02-T04/outputs/P02-T04-O02/submissions/misfile",
                        "files": [{"name": "P02-T04-O03_Doping_Xcut.png"}],
                    }
                ]
            },
        }
        classifications = {
            "version": 1,
            "submissions": {
                submission_id: {
                    "status": "misfiled-duplicate",
                    "severity": "warning",
                    "intendedOutputId": "P02-T04-O03",
                    "countsAsEvidence": False,
                    "note": "잘못 연결된 중복 제출본",
                }
            },
        }
        status, integrity = research_state.build_status(
            issues=[issue(2, "Phase 2. Test", body)],
            submissions_data=submissions,
            policy=self.policy,
            classifications_data=classifications,
            previous={"phases": []},
        )
        output = status["phases"][0]["outputs"][0]
        self.assertFalse(output["submitted"])
        self.assertEqual(output["submissionCount"], 1)
        self.assertEqual(output["evidenceSubmissionCount"], 0)
        self.assertTrue(any(item["code"] == "FILENAME_PREFIX_MISMATCH" for item in integrity["items"]))
        self.assertTrue(any(item["code"] == "CLASSIFIED_SUBMISSION" for item in integrity["items"]))

    def test_issue_checkbox_mirror_changes_only_task_markers(self) -> None:
        body = """## 1. 해야 할 것

- [x] <!-- task-id:P01-T01 --> 첫 과제
  - <!-- output-id:P01-T01-O01 type:files review:none --> 결과
- [ ] <!-- task-id:P01-T02 --> 둘째 과제

## 2. 나와야 하는 결과물
설명
"""
        tasks = [
            {"id": "P01-T01", "checked": False},
            {"id": "P01-T02", "checked": True},
        ]
        updated = research_state.replace_issue_task_checkboxes(body, tasks)
        self.assertIn("- [ ] <!-- task-id:P01-T01 --> 첫 과제", updated)
        self.assertIn("- [x] <!-- task-id:P01-T02 --> 둘째 과제", updated)
        self.assertIn("output-id:P01-T01-O01", updated)


if __name__ == "__main__":
    unittest.main()
