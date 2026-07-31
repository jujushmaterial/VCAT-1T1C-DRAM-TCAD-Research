"""Submission-integrity checks used by the research-state reconciler."""
from __future__ import annotations

import re
from typing import Any

from research_state_core import as_bool

FILE_PREFIX = re.compile(r"^(P\d{2}-T\d{2}-O\d{2})(?:[_\-.]|$)", re.I)


def warning(items: list[dict[str, Any]], code: str, severity: str, message: str, **context: Any) -> None:
    items.append({"code": code, "severity": severity, "message": message, **{key: value for key, value in context.items() if value not in (None, "", [])}})


def validate_record(output: dict[str, Any], record: dict[str, Any], classes: dict[str, Any], items: list[dict[str, Any]]) -> None:
    output_id, task_id = output["id"], output["taskId"]
    phase_id = int(output_id[1:3])
    submission_id = str(record.get("submissionId") or "")
    classification = classes.get(submission_id, {})
    classification = classification if isinstance(classification, dict) else {}
    if str(record.get("outputId") or "").upper() != output_id:
        warning(items, "OUTPUT_ID_MISMATCH", "error", "제출 메타데이터의 산출물 ID가 다릅니다.", phaseId=phase_id, outputId=output_id, submissionId=submission_id)
    if str(record.get("taskId") or "").upper() != task_id:
        warning(items, "TASK_ID_MISMATCH", "error", "제출 메타데이터의 과제 ID가 다릅니다.", phaseId=phase_id, outputId=output_id, submissionId=submission_id)
    fragment = f"/tasks/{task_id}/outputs/{output_id}/submissions/{submission_id}"
    if submission_id and fragment not in f"/{record.get('folderPath', '')}":
        warning(items, "PATH_MISMATCH", "error", "제출 폴더 경로가 ID와 일치하지 않습니다.", phaseId=phase_id, outputId=output_id, submissionId=submission_id, folderPath=record.get("folderPath"))
    for file_data in record.get("files", []) if isinstance(record.get("files"), list) else []:
        name = str(file_data.get("name") or "") if isinstance(file_data, dict) else ""
        match = FILE_PREFIX.match(name)
        if match and match.group(1).upper() != output_id:
            warning(items, "FILENAME_PREFIX_MISMATCH", str(classification.get("severity") or "warning"), "파일명 산출물 ID와 등록 산출물 ID가 다릅니다.", phaseId=phase_id, outputId=output_id, submissionId=submission_id, fileName=name, fileOutputId=match.group(1).upper(), classification=classification.get("status"), intendedOutputId=classification.get("intendedOutputId"))
    if classification:
        warning(items, "CLASSIFIED_SUBMISSION", str(classification.get("severity") or "info"), str(classification.get("note") or "분류된 제출본입니다."), phaseId=phase_id, outputId=output_id, submissionId=submission_id, classification=classification.get("status"), intendedOutputId=classification.get("intendedOutputId"), countsAsEvidence=as_bool(classification.get("countsAsEvidence"), True))
