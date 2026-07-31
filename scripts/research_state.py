#!/usr/bin/env python3
"""Reconcile research progress from Issue definitions and submitted evidence."""
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import sync_dashboard as legacy
from research_state_core import flatten, load_classifications, normalize_policy, parse_tasks, read_json, replace_issue_task_checkboxes, write_json
from research_state_integrity import validate_record, warning

STATUS = Path("docs/data/status.json")
MEMBERS = Path("docs/data/members.json")
SUBMISSIONS = Path("docs/data/submissions.json")
INTEGRITY = Path("docs/data/integrity-report.json")
GENERATED = Path("docs/generated/phases")
KST = timezone(timedelta(hours=9))
PHASE = re.compile(r"^Phase\s+(\d+)\.", re.I)


def phase_state(issue: dict[str, Any], tasks: list[dict[str, Any]]) -> tuple[str, int]:
    done, total = sum(task["checked"] for task in tasks), len(tasks)
    progress = round(done / total * 100) if total else 0
    if issue.get("state") == "closed":
        return ("completed", 100) if total and done == total else ("blocked", progress)
    if total and done == total:
        return "review", progress
    if done or any(task["state"] == "in-progress" for task in tasks):
        return "in-progress", progress
    return "waiting", progress


def build_status(issues: list[dict[str, Any]] | None = None, submissions_data: dict[str, Any] | None = None, policy: dict[str, Any] | None = None, classifications_data: dict[str, Any] | None = None, previous: dict[str, Any] | None = None) -> tuple[dict[str, Any], dict[str, Any]]:
    issues = issues if issues is not None else legacy.list_phase_issues()
    submissions_data = submissions_data if submissions_data is not None else read_json(SUBMISSIONS, {"version": 2, "outputs": {}})
    policy = normalize_policy(policy)
    classes = load_classifications(classifications_data)
    previous = previous if previous is not None else read_json(STATUS, {"phases": []})
    submission_map = submissions_data.get("outputs", {}) if isinstance(submissions_data, dict) else {}
    previous_map = {int(item["id"]): item for item in previous.get("phases", []) if isinstance(item, dict) and str(item.get("id", "")).isdigit()}
    event, phases, items, declared = legacy.issue_event_metadata(), [], [], set()
    for issue in issues:
        match = PHASE.match(str(issue.get("title") or ""))
        if not match:
            continue
        phase_id = int(match.group(1))
        section = legacy.extract_section(str(issue.get("body") or ""), "1. 해야 할 것", "2. 나와야 하는 결과물")
        tasks = parse_tasks(section, phase_id, submission_map, policy, classes)
        outputs = flatten(tasks)
        declared.update(output["id"] for output in outputs)
        for task in tasks:
            if task["checkboxDrift"]:
                warning(items, "CHECKBOX_STATE_DRIFT", "warning", "Issue 체크박스와 자동 완료 상태가 다릅니다.", phaseId=phase_id, issueNumber=issue.get("number"), taskId=task["id"], declaredChecked=task["declaredChecked"], calculatedChecked=task["checked"], missingRequiredOutputs=task["missingRequiredOutputs"])
            if (task["declaredChecked"] or task["outputsDone"]) and task["missingRequiredOutputs"]:
                warning(items, "MISSING_REQUIRED_OUTPUT", "warning", "진행 중인 과제에 필수 산출물이 부족합니다.", phaseId=phase_id, taskId=task["id"], missingRequiredOutputs=task["missingRequiredOutputs"])
        for output in outputs:
            for record in output["submissions"]:
                validate_record(output, record, classes, items)
        required = [output for output in outputs if output["required"]]
        state, progress = phase_state(issue, tasks)
        prior = previous_map.get(phase_id, {})
        modifier, action = prior.get("lastModifiedBy"), prior.get("lastModifiedAction")
        if event and event.get("issueNumber") == issue.get("number"):
            modifier, action = event.get("actor") or modifier, event.get("action") or action
        if not modifier:
            modifier, action = (issue.get("user") or {}).get("login"), "Issue 생성"
        phases.append({
            "id": phase_id, "issueNumber": issue.get("number"), "state": state, "progress": progress,
            "tasksDone": sum(task["checked"] for task in tasks), "tasksTotal": len(tasks),
            "issueTasksDone": sum(task["declaredChecked"] for task in tasks),
            "outputsDone": sum(output["submitted"] for output in outputs), "outputsTotal": len(outputs),
            "requiredOutputsDone": sum(output["submitted"] for output in required), "requiredOutputsTotal": len(required),
            "tasks": tasks, "outputs": outputs,
            "assignees": [user.get("login") for user in issue.get("assignees", []) if user.get("login")],
            "updatedAt": issue.get("updated_at"), "lastModifiedBy": modifier, "lastModifiedAction": action,
        })
    phases.sort(key=lambda item: item["id"])
    for index in range(1, len(phases)):
        if phases[index]["state"] == "waiting" and phases[index - 1]["state"] != "completed":
            phases[index]["state"] = "locked"
    for output_id, records in submission_map.items():
        if output_id not in declared:
            warning(items, "ORPHAN_SUBMISSION", "error", "Issue에 선언되지 않은 산출물 제출이 존재합니다.", outputId=output_id, submissionCount=len(records) if isinstance(records, list) else 0)
    for phase in phases:
        phase["integrityWarnings"] = sum(item.get("phaseId") == phase["id"] and item["severity"] in {"error", "warning"} for item in items)
    total = sum(phase["tasksTotal"] for phase in phases)
    semantic = {"calculationPolicy": {"source": "required-output-evidence", "policyVersion": policy.get("version", 1), "submissionVersion": submissions_data.get("version", 2), "reviewBlocksCompletion": policy["reviewBlocks"]}, "overallProgress": round(sum(phase["tasksDone"] for phase in phases) / total * 100) if total else 0, "phases": phases}
    generated = previous.get("generatedAt") if semantic == {key: previous.get(key) for key in semantic} and previous.get("generatedAt") else datetime.now(KST).isoformat(timespec="seconds")
    counts = {severity: sum(item["severity"] == severity for item in items) for severity in ("error", "warning", "info")}
    integrity = {"generatedAt": datetime.now(KST).isoformat(timespec="seconds"), "repository": legacy.REPO, "status": "error" if counts["error"] else ("warning" if counts["warning"] else "ok"), "counts": counts, "items": items}
    return {"generatedAt": generated, **semantic}, integrity


def patch_issue(issue_number: int, body: str) -> None:
    request = urllib.request.Request(f"https://api.github.com/repos/{legacy.REPO}/issues/{issue_number}", data=json.dumps({"body": body}, ensure_ascii=False).encode(), method="PATCH", headers={"Accept": "application/vnd.github+json", "Authorization": f"Bearer {legacy.TOKEN}", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "vcat-research-state"})
    with urllib.request.urlopen(request, timeout=30):
        pass


def reconcile_issues(issues: list[dict[str, Any]], status: dict[str, Any]) -> list[int]:
    tasks_by_phase = {phase["id"]: phase["tasks"] for phase in status["phases"]}
    changed = []
    for issue in issues:
        match = PHASE.match(str(issue.get("title") or ""))
        if not match:
            continue
        body = str(issue.get("body") or "")
        updated = replace_issue_task_checkboxes(body, tasks_by_phase.get(int(match.group(1)), []))
        if updated == body:
            continue
        if not legacy.TOKEN:
            print(f"Warning: Issue #{issue.get('number')} drift was not patched without GITHUB_TOKEN.", file=sys.stderr)
            continue
        patch_issue(int(issue["number"]), updated)
        changed.append(int(issue["number"]))
    return changed


def render_phase(phase: dict[str, Any], generated: str) -> str:
    labels = {"completed": "완료", "in-progress": "진행 중", "not-started": "진행 전"}
    rows = [f"| `{task['id']}` | {labels.get(task['state'], task['state'])} | {task['requiredOutputsDone']}/{task['requiredOutputsTotal']} | {', '.join(task['missingRequiredOutputs']) or '없음'} |" for task in phase["tasks"]]
    return "\n".join([f"# Phase {phase['id']} 자동 상태", "", "> `scripts/research_state.py`가 자동 생성합니다. 직접 수정하지 않습니다.", "", f"- 생성 시각: `{generated}`", f"- Issue: `#{phase['issueNumber']}`", f"- 상태: `{phase['state']}`", f"- 자동 완료 과제: `{phase['tasksDone']}/{phase['tasksTotal']}`", f"- 필수 산출물: `{phase['requiredOutputsDone']}/{phase['requiredOutputsTotal']}`", f"- 무결성 경고: `{phase['integrityWarnings']}`", "", "| 과제 | 상태 | 필수 산출물 | 누락 |", "|---|---|---:|---|", *rows, "", "완료 여부는 필수 산출물 제출 증거로 계산합니다.", ""])


def sync() -> int:
    issues = legacy.list_phase_issues()
    status, integrity = build_status(issues=issues)
    reconciled = reconcile_issues(issues, status)
    members = legacy.load_members()
    legacy.apply_member_event(members["members"])
    legacy.update_member_activity(members["members"])
    write_json(STATUS, status); write_json(MEMBERS, members); write_json(INTEGRITY, integrity)
    GENERATED.mkdir(parents=True, exist_ok=True)
    for phase in status["phases"]:
        (GENERATED / f"phase-{phase['id']:02d}.md").write_text(render_phase(phase, status["generatedAt"]), encoding="utf-8")
    print(f"Reconciled {len(status['phases'])} phases; integrity={integrity['counts']}; issues={reconciled}")
    return 0


def check() -> int:
    status, integrity = build_status()
    print(json.dumps({"overallProgress": status["overallProgress"], "phases": [{"id": phase["id"], "tasks": f"{phase['tasksDone']}/{phase['tasksTotal']}", "requiredOutputs": f"{phase['requiredOutputsDone']}/{phase['requiredOutputsTotal']}", "state": phase["state"]} for phase in status["phases"]], "integrity": integrity["counts"]}, ensure_ascii=False, indent=2))
    return 1 if integrity["counts"]["error"] else 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", nargs="?", choices=("sync", "check"), default="sync")
    args = parser.parse_args(argv)
    try:
        return sync() if args.command == "sync" else check()
    except Exception as exc:  # noqa: BLE001
        print(f"Research state reconciliation failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
