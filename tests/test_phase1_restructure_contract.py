import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ISSUE_SPEC = ROOT / "members/JuSanghyeon/phases/phase-01/ISSUE_BODY.md"
PLAN = ROOT / "members/JuSanghyeon/phases/phase-01/README.md"
POLICY = ROOT / "docs/data/completion-policy.json"
SUBMISSIONS = ROOT / "docs/data/submissions.json"


class Phase1RestructureContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.issue = ISSUE_SPEC.read_text(encoding="utf-8")
        cls.plan = PLAN.read_text(encoding="utf-8")
        cls.policy = json.loads(POLICY.read_text(encoding="utf-8"))
        cls.submissions = json.loads(SUBMISSIONS.read_text(encoding="utf-8"))
        cls.task_ids = re.findall(r"task-id:(P01-T\d{2})", cls.issue)
        cls.output_ids = re.findall(r"output-id:(P01-T\d{2}-O\d{2})", cls.issue)

    def test_task_ids_are_reduced_to_the_six_step_flow(self):
        self.assertEqual(
            self.task_ids,
            ["P01-T01", "P01-T03", "P01-T04", "P01-T05", "P01-T09", "P01-T10"],
        )
        self.assertEqual(len(self.task_ids), len(set(self.task_ids)))

    def test_output_ids_are_unique_and_belong_to_their_task(self):
        current_task = None
        seen = set()
        for line in self.issue.splitlines():
            task_match = re.search(r"task-id:(P01-T\d{2})", line)
            if task_match:
                current_task = task_match.group(1)
            output_match = re.search(r"output-id:(P01-T\d{2}-O\d{2})", line)
            if not output_match:
                continue
            output_id = output_match.group(1)
            self.assertIsNotNone(current_task)
            self.assertTrue(output_id.startswith(current_task + "-"), output_id)
            self.assertNotIn(output_id, seen)
            seen.add(output_id)
        self.assertEqual(len(seen), 10)

    def test_protected_existing_outputs_keep_identity_and_meaning(self):
        required_lines = (
            "output-id:P01-T05-O01 type:code review:none --> Dual-Metal Gap 구조 전체 코드",
            "output-id:P01-T05-O02 type:files review:none --> Dual-Metal Gap 구조 단면 이미지",
            "output-id:P01-T05-O03 type:files review:none --> Gap과 금속 경계 위치 확인값",
            "output-id:P01-T10-O05 type:any review:none --> DIBL 코드 수정 자료(확인요망)",
        )
        for line in required_lines:
            self.assertIn(line, self.issue)

    def test_required_outputs_are_exactly_six(self):
        expected = {
            "P01-T01-O01",
            "P01-T01-O02",
            "P01-T03-O01",
            "P01-T04-O01",
            "P01-T09-O01",
            "P01-T10-O01",
        }
        optional = {
            output_id
            for output_id, rule in self.policy.get("outputs", {}).items()
            if isinstance(rule, dict) and rule.get("required") is False
        }
        actual = set(self.output_ids) - optional
        self.assertEqual(actual, expected)
        self.assertEqual(len(actual), 6)

    def test_all_existing_phase1_submission_outputs_remain_declared(self):
        existing = {
            output_id
            for output_id, records in self.submissions.get("outputs", {}).items()
            if output_id.startswith("P01-") and isinstance(records, list) and records
        }
        self.assertTrue(existing)
        self.assertTrue(existing.issubset(set(self.output_ids)), existing - set(self.output_ids))

    def test_research_scope_is_simple_and_explicit(self):
        combined = self.issue + self.plan
        for token in (
            "필수 산출물은 다음 6개다",
            "네 WF 조건 실행 → Device 프로파일 확인 → 공통 cutline 검증",
            "Potential",
            "ConductionBandEnergy",
            "ElectricField",
            "eDensity",
            "eCurrent",
            "Id–Vg",
            "Gap 효과는 미평가",
        ):
            self.assertIn(token, combined)
        self.assertIn("변수별 문서 분할은 수행하지 않는다", self.issue)

    def test_unverified_values_are_not_claimed_as_verified(self):
        self.assertIn("실제 `n1_fps.tdr` geometry를 확인하기 전에는 Gap 치수를 확정하지 않는다", self.issue)
        self.assertIn("실제 WF·Vd 치환값과 로그를 확인하기 전에는 공식 성공 결과로 확정하지 않는다", self.issue)
        self.assertIn("실행 로그와 TDR을 확인하지 않은 조건은 성공으로 기록하지 않는다", self.issue)


if __name__ == "__main__":
    unittest.main()
