#!/usr/bin/env python3
"""GitHub Issue 체크 상태를 HTML 대시보드용 JSON으로 변환합니다."""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = os.environ.get("GITHUB_REPOSITORY", "jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
OUTPUT = Path("docs/data/status.json")
PHASE_PATTERN = re.compile(r"^Phase\s+(\d+)\.")
CHECK_PATTERN = re.compile(r"^- \[([ xX])\]", re.MULTILINE)
KST = timezone(timedelta(hours=9))


def api_get(url: str) -> object:
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "vcat-tcad-dashboard-sync",
    }
    if TOKEN:
        headers["Authorization"] = f"Bearer {TOKEN}"

    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def extract_section(body: str, heading: str, next_heading: str) -> str:
    pattern = re.compile(
        rf"##\s+{re.escape(heading)}\s*(.*?)(?=##\s+{re.escape(next_heading)}|\Z)",
        re.DOTALL,
    )
    match = pattern.search(body)
    return match.group(1) if match else ""


def count_checks(text: str) -> tuple[int, int]:
    checks = CHECK_PATTERN.findall(text)
    done = sum(1 for mark in checks if mark.lower() == "x")
    return done, len(checks)


def list_phase_issues() -> list[dict]:
    page = 1
    issues: list[dict] = []
    while True:
        url = f"https://api.github.com/repos/{REPO}/issues?state=all&per_page=100&page={page}"
        batch = api_get(url)
        if not isinstance(batch, list):
            raise RuntimeError("GitHub Issues 응답 형식이 올바르지 않습니다.")
        issues.extend(item for item in batch if "pull_request" not in item)
        if len(batch) < 100:
            break
        page += 1
    return issues


def build_status() -> dict:
    phases: list[dict] = []
    for issue in list_phase_issues():
        title = issue.get("title", "")
        match = PHASE_PATTERN.match(title)
        if not match:
            continue

        phase_id = int(match.group(1))
        body = issue.get("body") or ""
        task_text = extract_section(body, "1. 해야 할 것", "2. 나와야 하는 결과물")
        output_text = extract_section(body, "2. 나와야 하는 결과물", "3. 과정의 이유")
        tasks_done, tasks_total = count_checks(task_text)
        outputs_done, outputs_total = count_checks(output_text)
        done = tasks_done + outputs_done
        total = tasks_total + outputs_total
        progress = round(done / total * 100) if total else 0

        if issue.get("state") == "closed":
            state = "completed"
            progress = 100
        elif total and done == total:
            state = "review"
        elif done > 0:
            state = "in-progress"
        else:
            state = "waiting"

        phases.append(
            {
                "id": phase_id,
                "issueNumber": issue.get("number"),
                "state": state,
                "progress": progress,
                "tasksDone": tasks_done,
                "tasksTotal": tasks_total,
                "outputsDone": outputs_done,
                "outputsTotal": outputs_total,
                "assignees": [user.get("login") for user in issue.get("assignees", [])],
                "updatedAt": issue.get("updated_at"),
            }
        )

    phases.sort(key=lambda item: item["id"])

    # 앞 단계가 완료되지 않았고 현재 단계도 시작하지 않았다면 잠금으로 표시합니다.
    for index, phase in enumerate(phases):
        if index == 0:
            continue
        previous = phases[index - 1]
        if phase["state"] == "waiting" and previous["state"] != "completed":
            phase["state"] = "locked"

    total_done = sum(item["tasksDone"] + item["outputsDone"] for item in phases)
    total_checks = sum(item["tasksTotal"] + item["outputsTotal"] for item in phases)
    overall = round(total_done / total_checks * 100) if total_checks else 0

    return {
        "generatedAt": datetime.now(KST).isoformat(timespec="seconds"),
        "overallProgress": overall,
        "phases": phases,
    }


def main() -> int:
    try:
        status = build_status()
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(json.dumps(status, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Updated {OUTPUT} with {len(status['phases'])} phases.")
        return 0
    except Exception as exc:  # noqa: BLE001
        print(f"Dashboard sync failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
