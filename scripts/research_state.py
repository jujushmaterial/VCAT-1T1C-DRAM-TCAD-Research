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

LEGACY_FILENAME_REPAIRS = (
    {
        "outputId": "P02-T01-O03",
        "submissionId": "20260731055642-minhosong-mse-I4zyaA",
        "oldName": "P02-T01-O01_SWB_Parameters.csv",
        "newName": "P02-T01-O03_SWB_Parameters.csv",
        "timeline": Path("members/SongMinho/TIMELINE.md"),
        "timelineMarker": "legacy-filename-repair:20260731055642-minhosong-mse-I4zyaA",
    },
)


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
        issue["body"] = updated
        changed.append(int(issue["number"]))
    return changed


def _replace_file_metadata(files: list[dict[str, Any]], old_name: str, new_name: str) -> bool:
    changed = False
    for item in files:
        if item.get("name") != old_name:
            continue
        item["name"] = new_name
        if item.get("path"):
            item["path"] = str(Path(str(item["path"])).with_name(new_name)).replace("\\", "/")
        changed = True
    return changed


def _append_repair_timeline(path: Path, marker: str, old_name: str, new_name: str) -> bool:
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    marker_comment = f"<!-- {marker} -->"
    if marker_comment in text:
        return False
    now = datetime.now(KST).strftime("%Y-%m-%d %H:%M KST")
    entry = "\n".join([
        "",
        marker_comment,
        f"## {now} — P02-T01-O03 제출 파일명 정합성 보정",
        "",
        "- **작성자:** OpenAI ChatGPT (`@jujushmaterial` 승인)",
        "- **Phase / Issue:** Phase 2 / #2",
        "- **결과물 ID:** `P02-T01-O03`",
        "- **변경 유형:** 이름 변경 / 메타데이터 보정",
        f"- **변경 파일:** `{old_name}` → `{new_name}`, `submission.json`, `README.md`, `docs/data/submissions.json`",
        "- **작업 내용:** O03에 등록됐지만 O01 접두어가 붙어 있던 CSV 파일명을 O03 기준으로 통일하고 연결 경로를 함께 수정했습니다.",
        "- **작업 이유:** 파일명 산출물 ID와 등록 산출물 ID 불일치 경고를 제거하고 웹 제출본 링크가 실제 파일과 일치하도록 하기 위해서입니다.",
        "- **결과 및 검증:** 파일 내용은 변경하지 않고 이름과 참조 경로만 수정했습니다. 상태 계산과 무결성 검사를 다시 실행합니다.",
        "- **남은 일:** 없음.",
        "",
    ])
    path.write_text(text.rstrip() + "\n" + entry, encoding="utf-8")
    return True


def repair_legacy_submission_filenames() -> list[str]:
    data = read_json(SUBMISSIONS, {"version": 2, "outputs": {}})
    outputs = data.get("outputs", {}) if isinstance(data, dict) else {}
    repaired: list[str] = []

    for spec in LEGACY_FILENAME_REPAIRS:
        records = outputs.get(spec["outputId"], [])
        record = next((item for item in records if item.get("submissionId") == spec["submissionId"]), None)
        if not record:
            continue

        folder = Path(str(record.get("folderPath") or ""))
        old_path = folder / "files" / spec["oldName"]
        new_path = folder / "files" / spec["newName"]
        metadata_changed = _replace_file_metadata(record.get("files", []), spec["oldName"], spec["newName"])
        file_changed = False

        if old_path.exists() and new_path.exists():
            if old_path.read_bytes() != new_path.read_bytes():
                raise RuntimeError(f"Both legacy and corrected files exist with different contents: {old_path}")
            old_path.unlink()
            file_changed = True
        elif old_path.exists():
            old_path.rename(new_path)
            file_changed = True
        elif not new_path.exists() and metadata_changed:
            raise FileNotFoundError(f"Submission file not found for legacy repair: {old_path}")

        submission_changed = False
        submission_json = folder / "submission.json"
        if submission_json.exists():
            payload = read_json(submission_json, {})
            submission_changed = _replace_file_metadata(payload.get("files", []), spec["oldName"], spec["newName"])
            if submission_changed:
                write_json(submission_json, payload)

        readme_changed = False
        readme = folder / "README.md"
        if readme.exists():
            text = readme.read_text(encoding="utf-8")
            updated = text.replace(spec["oldName"], spec["newName"])
            readme_changed = updated != text
            if readme_changed:
                readme.write_text(updated, encoding="utf-8")

        changed = metadata_changed or file_changed or submission_changed or readme_changed
        if changed:
            repaired.append(spec["submissionId"])
            _append_repair_timeline(spec["timeline"], spec["timelineMarker"], spec["oldName"], spec["newName"])

    if repaired:
        data["updatedAt"] = datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")
        write_json(SUBMISSIONS, data)
    return repaired


def render_phase(phase: dict[str, Any], generated: str) -> str:
    labels = {"completed": "완료", "in-progress": "진행 중", "not-started": "진행 전"}
    rows = [f"| `{task['id']}` | {labels.get(task['state'], task['state'])} | {task['requiredOutputsDone']}/{task['requiredOutputsTotal']} | {', '.join(task['missingRequiredOutputs']) or '없음'} |" for task in phase["tasks"]]
    return "\n".join([f"# Phase {phase['id']} 자동 상태", "", "> `scripts/research_state.py`가 자동 생성합니다. 직접 수정하지 않습니다.", "", f"- 생성 시각: `{generated}`", f"- Issue: `#{phase['issueNumber']}`", f"- 상태: `{phase['state']}`", f"- 자동 완료 과제: `{phase['tasksDone']}/{phase['tasksTotal']}`", f"- 필수 산출물: `{phase['requiredOutputsDone']}/{phase['requiredOutputsTotal']}`", f"- 무결성 경고: `{phase['integrityWarnings']}`", "", "| 과제 | 상태 | 필수 산출물 | 누락 |", "|---|---|---:|---|", *rows, "", "완료 여부는 필수 산출물 제출 증거로 계산합니다.", ""])


def sync() -> int:
    repaired = repair_legacy_submission_filenames()
    issues = legacy.list_phase_issues()
    status, integrity = build_status(issues=issues)
    reconciled = reconcile_issues(issues, status)
    if reconciled:
        status, integrity = build_status(issues=issues, previous=status)
    members = legacy.load_members()
    legacy.apply_member_event(members["members"])
    legacy.update_member_activity(members["members"])
    write_json(STATUS, status); write_json(MEMBERS, members); write_json(INTEGRITY, integrity)
    GENERATED.mkdir(parents=True, exist_ok=True)
    for phase in status["phases"]:
        (GENERATED / f"phase-{phase['id']:02d}.md").write_text(render_phase(phase, status["generatedAt"]), encoding="utf-8")
    print(f"Reconciled {len(status['phases'])} phases; integrity={integrity['counts']}; issues={reconciled}; repaired={repaired}")
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
