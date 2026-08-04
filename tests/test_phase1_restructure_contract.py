import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ISSUE_SPEC = ROOT / "members/JuSanghyeon/phases/phase-01/ISSUE_BODY.md"
PLAN = ROOT / "members/JuSanghyeon/phases/phase-01/README.md"
POLICY = ROOT / "docs/data/completion-policy.json"


class Phase1RestructureContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.issue = ISSUE_SPEC.read_text(encoding="utf-8")
        cls.plan = PLAN.read_text(encoding="utf-8")
        cls.policy = json.loads(POLICY.read_text(encoding="utf-8"))

    def test_task_ids_are_preserved_and_unique(self):
        task_ids = re.findall(r"task-id:(P01-T\d{2})", self.issue)
        self.assertEqual(task_ids, [f"P01-T{i:02d}" for i in range(1, 11)])
        self.assertEqual(len(task_ids), len(set(task_ids)))

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
        self.assertGreaterEqual(len(seen), 45)

    def test_protected_existing_outputs_keep_identity_and_meaning(self):
        required_lines = (
            "output-id:P01-T05-O01 type:code review:none --> Dual-Metal Gap 구조 전체 코드",
            "output-id:P01-T05-O02 type:files review:none --> Dual-Metal Gap 구조 단면 이미지",
            "output-id:P01-T05-O03 type:files review:recommended --> Gap과 금속 경계 위치 확인값",
            "output-id:P01-T10-O05 type:any review:none --> DIBL 코드 수정 자료(확인요망)",
        )
        for line in required_lines:
            self.assertIn(line, self.issue)

    def test_new_research_scope_is_explicit(self):
        for token in (
            "LL·LH·HL·HH",
            "n1_fps.tdr",
            "Potential",
            "ConductionBandEnergy",
            "ElectricField",
            "eDensity",
            "eCurrent",
            "WF 공간 배치 방향 효과",
            "Gap 효과는 미평가",
        ):
            self.assertIn(token, self.issue + self.plan)
        self.assertNotIn("Gap 효과가 없다", self.issue + self.plan)
        self.assertIn("새로운 SDE 구조 재구성과 Gap sweep은 수행하지 않는다", self.issue)

    def test_unverified_values_are_not_claimed_as_verified(self):
        self.assertIn("실제 `n1_fps.tdr` geometry를 확인하기 전에는 Gap 치수를 확정하지 않는다", self.issue)
        self.assertIn("실제 WF·Vd 치환값과 로그를 확인하기 전에는 공식 성공 결과로 확정하지 않는다", self.issue)

    def test_existing_optional_dibl_reference_policy_is_preserved(self):
        output_policy = self.policy.get("outputs", {}).get("P01-T10-O05", {})
        self.assertIs(output_policy.get("required"), False)


if __name__ == "__main__":
    unittest.main()
