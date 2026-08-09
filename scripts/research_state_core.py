"""Core parsing and completion rules for research-state reconciliation."""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import sync_dashboard as legacy

POLICY = Path("docs/data/completion-policy.json")
CLASSIFICATIONS = Path("docs/data/submission-classifications.json")
TASK_ID = re.compile(r"^P\d{2}-T\d{2}$")
OUTPUT_ID = re.compile(r"^P\d{2}-T\d{2}-O\d{2}$")
REVIEW_ACTIVATION_AT = "2026-08-01T06:30:00.000Z"
VALID_REVIEW_STATES = {"pending", "approved", "held"}


def read_json(path: Path, fallback: Any) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return fallback


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def as_bool(value: Any, default: bool = True) -> bool:
    if value is None:
        return default
    return str(value).strip().lower() not in {"0", "false", "no", "optional"}


def normalize_policy(raw: dict[str, Any] | None = None) -> dict[str, Any]:
    if raw is None:
        raw = read_json(POLICY, {})
    if not isinstance(raw, dict):
        raw = {}
    if "defaultRequired" in raw and "reviewBlocks" in raw:
        return raw
    defaults = raw.get("defaults", {}) if isinstance(raw.get("defaults"), dict) else {}
    return {
        "version": int(raw.get("version", 1)),
        "defaultRequired": as_bool(defaults.get("outputRequired"), True),
        "reviewBlocks": as_bool(defaults.get("reviewBlocksCompletion"), False),
        "outputs": raw.get("outputs", {}) if isinstance(raw.get("outputs"), dict) else {},
    }


def load_classifications(raw: dict[str, Any] | None = None) -> dict[str, dict[str, Any]]:
    if raw is None:
        raw = read_json(CLASSIFICATIONS, {})
    values = raw.get("submissions", {}) if isinstance(raw, dict) else {}
    return values if isinstance(values, dict) else {}


def output_rule(output_id: str, metadata: dict[str, str], policy: dict[str, Any]) -> tuple[bool, str | None]:
    rule = policy["outputs"].get(output_id, {})
    rule = rule if isinstance(rule, dict) else {}
    required = as_bool(rule.get("required", metadata.get("required")), policy["defaultRequired"])
    return required, str(rule.get("reason") or "").strip() or None


def normalize_submission_review(record: dict[str, Any]) -> dict[str, Any]:
    raw = record.get("review") if isinstance(record.get("review"), dict) else None
    if raw and str(raw.get("status") or "") in VALID_REVIEW_STATES:
        status = str(raw.get("status"))
        return {
            "status": status,
            "reviewer": raw.get("reviewer"),
            "reviewedAt": raw.get("reviewedAt"),
            "reason": str(raw.get("reason") or "") if status == "held" else None,
            "history": raw.get("history") if isinstance(raw.get("history"), list) else [],
            "legacy": bool(raw.get("legacy", False)),
        }
    uploaded_at = str(record.get("uploadedAt") or "")
    if uploaded_at and uploaded_at >= REVIEW_ACTIVATION_AT:
        return {
            "status": "pending",
            "reviewer": None,
            "reviewedAt": None,
            "reason": None,
            "history": [],
            "legacy": False,
            "implicit": True,
        }
    return {
        "status": "approved",
        "reviewer": "system-migration",
        "reviewedAt": record.get("uploadedAt"),
        "reason": None,
        "history": [],
        "legacy": True,
    }


def submission_counts_as_evidence(
    record: dict[str, Any],
    classification: dict[str, Any] | None,
    policy: dict[str, Any],
) -> bool:
    if isinstance(classification, dict) and not as_bool(classification.get("countsAsEvidence"), True):
        return False
    if not policy.get("reviewBlocks", False):
        return True
    return normalize_submission_review(record)["status"] == "approved"


def parse_tasks(section: str, phase_id: int, submissions: dict[str, Any], policy: dict[str, Any], classes: dict[str, Any]) -> list[dict[str, Any]]:
    tasks: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    fallback_task = 1
    fallback_output: dict[str, int] = {}
    for line in str(section).splitlines():
        task_match = legacy.TASK_LINE_PATTERN.match(line)
        if task_match:
            meta = legacy.parse_metadata(task_match.group(2))
            supplied = str(meta.get("task-id", "")).upper()
            task_id = supplied if TASK_ID.fullmatch(supplied) else f"P{phase_id:02d}-T{fallback_task:02d}"
            fallback_task += 1
            current = {"id": task_id, "text": legacy.strip_metadata(task_match.group(2)), "declaredChecked": task_match.group(1).lower() == "x", "outputs": []}
            tasks.append(current)
            fallback_output[task_id] = 1
            continue
        output_match = legacy.OUTPUT_LINE_PATTERN.match(line)
        if not output_match or current is None:
            continue
        meta = legacy.parse_metadata(output_match.group(1))
        supplied = str(meta.get("output-id", "")).upper()
        number = fallback_output[current["id"]]
        output_id = supplied if OUTPUT_ID.fullmatch(supplied) else f"{current['id']}-O{number:02d}"
        fallback_output[current["id"]] = number + 1
        records = submissions.get(output_id, [])
        records = records if isinstance(records, list) else []
        decorated: list[dict[str, Any]] = []
        evidence: list[dict[str, Any]] = []
        review_counts = {"approved": 0, "pending": 0, "held": 0}
        for record in records:
            if not isinstance(record, dict):
                continue
            item = dict(record)
            classification = classes.get(str(record.get("submissionId") or ""))
            if isinstance(classification, dict):
                item["classification"] = classification
            review = normalize_submission_review(record)
            item["review"] = review
            review_counts[review["status"]] += 1
            decorated.append(item)
            if submission_counts_as_evidence(record, classification, policy):
                evidence.append(record)
        required, reason = output_rule(output_id, meta, policy)
        output_type, review_mode = str(meta.get("type") or "any").lower(), str(meta.get("review") or "none").lower()
        if evidence:
            state = "submitted"
        elif review_counts["held"]:
            state = "held"
        elif review_counts["pending"]:
            state = "review-pending"
        else:
            state = "missing" if required else "optional"
        current["outputs"].append({
            "id": output_id,
            "text": legacy.strip_metadata(output_match.group(1)),
            "type": output_type if output_type in {"any", "files", "code", "server", "table"} else "any",
            "review": review_mode if review_mode in {"none", "recommended", "required"} else "none",
            "reviewBlocksCompletion": bool(policy.get("reviewBlocks", False)),
            "required": required,
            "policyReason": reason,
            "submitted": bool(evidence),
            "submissionCount": len(records),
            "evidenceSubmissionCount": len(evidence),
            "approvedSubmissionCount": review_counts["approved"],
            "pendingReviewCount": review_counts["pending"],
            "heldSubmissionCount": review_counts["held"],
            "state": state,
            "submissions": decorated,
        })
    for task in tasks:
        required = [item for item in task["outputs"] if item["required"]]
        missing = [item["id"] for item in required if not item["submitted"]]
        submitted = sum(1 for item in task["outputs"] if item["submitted"])
        activity = sum(1 for item in task["outputs"] if item["submissionCount"] > 0)
        completed = all(item["submitted"] for item in required) if required else True
        task.update({
            "checked": completed,
            "state": "completed" if completed else ("in-progress" if activity else "not-started"),
            "requiredOutputsDone": len(required) - len(missing),
            "requiredOutputsTotal": len(required),
            "outputsDone": submitted,
            "outputsTotal": len(task["outputs"]),
            "missingRequiredOutputs": missing,
            "checkboxDrift": task["declaredChecked"] != completed,
        })
    return [task for task in tasks if task["text"]]


def flatten(tasks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [{**output, "taskId": task["id"]} for task in tasks for output in task["outputs"]]


def replace_issue_task_checkboxes(body: str, tasks: list[dict[str, Any]]) -> str:
    calculated = {str(task["id"]): bool(task["checked"]) for task in tasks}
    lines, fallback = [], iter(calculated)
    for line in str(body).splitlines():
        match = legacy.TASK_LINE_PATTERN.match(line)
        if not match:
            lines.append(line)
            continue
        task_id = str(legacy.parse_metadata(match.group(2)).get("task-id") or "").upper()
        if task_id not in calculated:
            task_id = next(fallback, "")
        marker = "x" if calculated.get(task_id, match.group(1).lower() == "x") else " "
        lines.append(re.sub(r"^- \[[ xX]\]", f"- [{marker}]", line, count=1))
    return "\n".join(lines) + ("\n" if str(body).endswith("\n") else "")
