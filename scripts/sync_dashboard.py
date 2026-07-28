#!/usr/bin/env python3
"""GitHub Issue와 연구원 활동을 HTML 대시보드용 JSON으로 변환합니다."""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

REPO = os.environ.get("GITHUB_REPOSITORY", "jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
EVENT_NAME = os.environ.get("GITHUB_EVENT_NAME", "")
EVENT_PATH = Path(os.environ.get("GITHUB_EVENT_PATH", "")) if os.environ.get("GITHUB_EVENT_PATH") else None
STATUS_OUTPUT = Path("docs/data/status.json")
MEMBERS_OUTPUT = Path("docs/data/members.json")
PHASE_PATTERN = re.compile(r"^Phase\s+(\d+)\.")
CHECK_LINE_PATTERN = re.compile(r"^- \[([ xX])\]\s*(.*)$", re.MULTILINE)
KST = timezone(timedelta(hours=9))
ACTIVE_LIMIT = timedelta(hours=24)
RECENT_LIMIT = timedelta(days=7)


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
        rf"^##\s+{re.escape(heading)}\s*$\s*(.*?)(?=^##\s+{re.escape(next_heading)}\s*$|\Z)",
        re.DOTALL | re.MULTILINE,
    )
    match = pattern.search(body)
    return match.group(1) if match else ""


def parse_check_items(text: str) -> list[dict[str, Any]]:
    return [
        {"checked": mark.lower() == "x", "text": label.strip()}
        for mark, label in CHECK_LINE_PATTERN.findall(text)
        if label.strip()
    ]


def list_phase_issues() -> list[dict[str, Any]]:
    page = 1
    issues: list[dict[str, Any]] = []
    while True:
        url = f"https://api.github.com/repos/{REPO}/issues?state=all&per_page=100&page={page}"
        batch = api_get(url)
        if not isinstance(batch, list):
            raise RuntimeError("GitHub Issues 응답 형식이 올바르지 않습니다.")
        issues.extend(item for item in batch if isinstance(item, dict) and "pull_request" not in item)
        if len(batch) < 100:
            break
        page += 1
    return issues


def build_status() -> dict[str, Any]:
    phases: list[dict[str, Any]] = []

    for issue in list_phase_issues():
        title = str(issue.get("title", ""))
        match = PHASE_PATTERN.match(title)
        if not match:
            continue

        phase_id = int(match.group(1))
        body = str(issue.get("body") or "")
        task_text = extract_section(body, "1. 해야 할 것", "2. 나와야 하는 결과물")
        output_text = extract_section(body, "2. 나와야 하는 결과물", "3. 과정의 이유")
        tasks = parse_check_items(task_text)
        outputs = parse_check_items(output_text)
        tasks_done = sum(1 for item in tasks if item["checked"])
        outputs_done = sum(1 for item in outputs if item["checked"])
        total = len(tasks) + len(outputs)
        done = tasks_done + outputs_done
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
                "tasksTotal": len(tasks),
                "outputsDone": outputs_done,
                "outputsTotal": len(outputs),
                "tasks": tasks,
                "outputs": outputs,
                "assignees": [
                    user.get("login")
                    for user in issue.get("assignees", [])
                    if isinstance(user, dict) and user.get("login")
                ],
                "updatedAt": issue.get("updated_at"),
            }
        )

    phases.sort(key=lambda item: item["id"])

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


def parse_time(value: object) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def describe_repo_event(event: dict[str, Any]) -> str:
    event_type = str(event.get("type", ""))
    payload = event.get("payload") if isinstance(event.get("payload"), dict) else {}
    issue = payload.get("issue") if isinstance(payload.get("issue"), dict) else {}
    pull_request = payload.get("pull_request") if isinstance(payload.get("pull_request"), dict) else {}
    action = str(payload.get("action", ""))

    if event_type == "PushEvent":
        return "코드 변경"
    if event_type == "IssuesEvent":
        number = issue.get("number")
        return f"Issue #{number} {action}" if number else f"Issue {action}".strip()
    if event_type == "IssueCommentEvent":
        number = issue.get("number")
        return f"Issue #{number} 댓글" if number else "Issue 댓글"
    if event_type == "PullRequestEvent":
        number = pull_request.get("number")
        return f"PR #{number} {action}" if number else f"Pull Request {action}".strip()
    if event_type == "PullRequestReviewEvent":
        number = pull_request.get("number")
        return f"PR #{number} 검토" if number else "Pull Request 검토"
    if event_type == "CreateEvent":
        return "브랜치·태그 생성"
    if event_type == "DeleteEvent":
        return "브랜치·태그 정리"
    return "GitHub 활동"


def list_recent_repo_events() -> list[dict[str, Any]]:
    try:
        data = api_get(f"https://api.github.com/repos/{REPO}/events?per_page=100")
    except Exception as exc:  # noqa: BLE001
        print(f"Warning: recent repository events unavailable: {exc}", file=sys.stderr)
        return []
    return data if isinstance(data, list) else []


def latest_commit_activity(username: str) -> tuple[datetime | None, str | None]:
    author = urllib.parse.quote(username, safe="")
    url = f"https://api.github.com/repos/{REPO}/commits?author={author}&per_page=1"
    try:
        data = api_get(url)
    except Exception as exc:  # noqa: BLE001
        print(f"Warning: commit activity unavailable for {username}: {exc}", file=sys.stderr)
        return None, None
    if not isinstance(data, list) or not data:
        return None, None

    commit = data[0] if isinstance(data[0], dict) else {}
    metadata = commit.get("commit") if isinstance(commit.get("commit"), dict) else {}
    committer = metadata.get("committer") if isinstance(metadata.get("committer"), dict) else {}
    author_data = metadata.get("author") if isinstance(metadata.get("author"), dict) else {}
    activity_at = parse_time(committer.get("date") or author_data.get("date"))
    message = str(metadata.get("message") or "").splitlines()[0].strip()
    label = f"커밋 · {message[:44]}" if message else "코드 변경"
    return activity_at, label


def apply_member_event(members: list[dict[str, Any]]) -> bool:
    if EVENT_NAME != "member" or EVENT_PATH is None or not EVENT_PATH.exists():
        return False

    event = json.loads(EVENT_PATH.read_text(encoding="utf-8"))
    action = event.get("action")
    username = (event.get("member") or {}).get("login")
    if not username:
        return False

    changed = False
    for member in members:
        if str(member.get("username", "")).lower() != str(username).lower():
            continue
        new_membership = "inactive" if action == "deleted" else "active"
        if action not in {"added", "edited", "deleted"}:
            return False
        if member.get("membership") != new_membership:
            member["membership"] = new_membership
            changed = True
        break
    return changed


def update_member_activity(members: list[dict[str, Any]]) -> bool:
    events = list_recent_repo_events()
    event_activity: dict[str, tuple[datetime, str]] = {}

    for event in events:
        if not isinstance(event, dict):
            continue
        actor = event.get("actor") if isinstance(event.get("actor"), dict) else {}
        login = str(actor.get("login") or "").lower()
        created_at = parse_time(event.get("created_at"))
        if not login or created_at is None:
            continue
        previous = event_activity.get(login)
        if previous is None or created_at > previous[0]:
            event_activity[login] = (created_at, describe_repo_event(event))

    changed = False
    now = datetime.now(timezone.utc)
    owner = REPO.split("/", 1)[0].lower()

    for member in members:
        username = str(member.get("username", ""))
        login_key = username.lower()
        membership = str(member.get("membership", "active"))
        role = str(member.get("role") or ("admin" if login_key == owner else "member"))
        member["role"] = role
        member["membership"] = membership

        candidates: list[tuple[datetime, str]] = []
        previous_time = parse_time(member.get("lastActivityAt"))
        if previous_time:
            candidates.append((previous_time, str(member.get("recentActivity") or "GitHub 활동")))
        if login_key in event_activity:
            candidates.append(event_activity[login_key])
        commit_time, commit_label = latest_commit_activity(username)
        if commit_time and commit_label:
            candidates.append((commit_time, commit_label))

        if membership != "active":
            new_state = "left"
            new_label = "참여 종료"
            latest_time = max(candidates, key=lambda item: item[0])[0] if candidates else None
            recent_activity = max(candidates, key=lambda item: item[0])[1] if candidates else "참여 종료"
        elif candidates:
            latest_time, recent_activity = max(candidates, key=lambda item: item[0])
            elapsed = now - latest_time
            if elapsed <= ACTIVE_LIMIT:
                new_state = "active"
                base_label = "활동 중"
            elif elapsed <= RECENT_LIMIT:
                new_state = "recent"
                base_label = "최근 활동"
            else:
                new_state = "inactive"
                base_label = "미활동"
            new_label = f"관리자 · {base_label}" if role == "admin" else base_label
        else:
            latest_time = None
            recent_activity = "활동 기록 없음"
            new_state = "inactive"
            new_label = "관리자 · 미활동" if role == "admin" else "미활동"

        new_values = {
            "status": new_state,
            "statusLabel": new_label,
            "activityState": new_state,
            "lastActivityAt": latest_time.isoformat().replace("+00:00", "Z") if latest_time else None,
            "recentActivity": recent_activity,
        }
        for key, value in new_values.items():
            if member.get(key) != value:
                member[key] = value
                changed = True

    return changed


def load_members() -> dict[str, Any]:
    if not MEMBERS_OUTPUT.exists():
        return {"members": []}
    data = json.loads(MEMBERS_OUTPUT.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or not isinstance(data.get("members"), list):
        raise RuntimeError("members.json 형식이 올바르지 않습니다.")
    return data


def write_json(path: Path, data: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    try:
        status = build_status()
        members_data = load_members()
        members = members_data["members"]
        member_event_changed = apply_member_event(members)
        member_activity_changed = update_member_activity(members)

        write_json(STATUS_OUTPUT, status)
        write_json(MEMBERS_OUTPUT, members_data)

        print(
            f"Updated {STATUS_OUTPUT} with {len(status['phases'])} phases; "
            f"member event changed={member_event_changed}; "
            f"member activity changed={member_activity_changed}."
        )
        return 0
    except Exception as exc:  # noqa: BLE001
        print(f"Dashboard sync failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
