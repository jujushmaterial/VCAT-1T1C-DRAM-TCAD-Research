#!/usr/bin/env python3
"""개인 폴더 변경 시 해당 TIMELINE.md 갱신 여부를 검사하거나 자동 보완합니다."""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

MEMBER_PATH = re.compile(r"^members/([^/]+)/(.+)$")
PHASE_PATTERN = re.compile(r"(?:^|/)phase-(\d{2})(?:/|$)", re.IGNORECASE)
OUTPUT_PATTERN = re.compile(r"(?:^|/)(P\d{2}-O\d{2})(?:/|$)", re.IGNORECASE)
KST = timezone(timedelta(hours=9))


def run_git(*args: str) -> str:
    result = subprocess.run(
        ["git", *args],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
    )
    return result.stdout.strip()


def changed_paths(base: str | None, head: str | None) -> list[tuple[str, str]]:
    if base and set(base) != {"0"}:
        output = run_git("diff", "--name-status", base, head or "HEAD")
    else:
        output = run_git("show", "--pretty=format:", "--name-status", head or "HEAD")

    changes: list[tuple[str, str]] = []
    for line in output.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status = parts[0]
        # rename/copy는 새 경로를 기준으로 기록합니다.
        path = parts[-1]
        changes.append((status, path.replace("\\", "/")))
    return changes


def group_member_changes(changes: list[tuple[str, str]]) -> dict[str, dict[str, object]]:
    grouped: dict[str, dict[str, object]] = {}
    for status, path in changes:
        match = MEMBER_PATH.match(path)
        if not match:
            continue
        folder, relative = match.groups()
        data = grouped.setdefault(folder, {"files": [], "timeline_changed": False})
        if relative.lower() == "timeline.md":
            data["timeline_changed"] = True
        else:
            data["files"].append((status, path))
    return grouped


def infer_phase_and_output(paths: list[str]) -> tuple[str, str]:
    phase = "해당 없음"
    output = "해당 없음"
    for path in paths:
        phase_match = PHASE_PATTERN.search(path)
        output_match = OUTPUT_PATTERN.search(path)
        if phase_match:
            phase = f"Phase {int(phase_match.group(1))}"
        if output_match:
            output = output_match.group(1).upper()
    return phase, output


def status_label(status: str) -> str:
    code = status[0].upper()
    return {
        "A": "생성",
        "M": "수정",
        "D": "삭제",
        "R": "이동",
        "C": "복사",
    }.get(code, status)


def append_automatic_entry(folder: str, files: list[tuple[str, str]]) -> None:
    timeline = Path("members") / folder / "TIMELINE.md"
    timeline.parent.mkdir(parents=True, exist_ok=True)
    if not timeline.exists():
        timeline.write_text(
            f"# {folder} 작업 타임라인\n\n"
            "이 문서는 개인 폴더의 모든 변경 이력을 기록합니다.\n\n---\n",
            encoding="utf-8",
        )

    paths = [path for _, path in files]
    phase, output = infer_phase_and_output(paths)
    actor = os.environ.get("GITHUB_ACTOR", "자동 기록 시스템")
    sha = os.environ.get("GITHUB_SHA", "")[:12] or "미확인"
    commit_message = os.environ.get("TIMELINE_COMMIT_MESSAGE", "").strip() or "커밋 메시지 미확인"
    now = datetime.now(KST).strftime("%Y-%m-%d %H:%M KST")
    changed_lines = "\n".join(
        f"  - `{path}` ({status_label(status)})" for status, path in files
    )

    entry = f"""

## {now} — 자동 타임라인 보완

- **작성자:** GitHub Actions (`@{actor}`의 변경 감지)
- **Phase / Issue:** {phase} / Issue 미확인
- **결과물 ID:** `{output}`
- **변경 유형:** 자동 기록
- **변경 파일:**
{changed_lines}
- **작업 내용:** 개인 폴더 변경에서 수동 `TIMELINE.md` 기록이 확인되지 않아 변경 파일 목록을 자동으로 추가했습니다.
- **작업 이유:** 개인 폴더의 모든 변경 이력을 반드시 남기는 저장소 규칙을 보장하기 위해서입니다.
- **결과 및 검증:** 커밋 `{sha}` 감지. 커밋 메시지: `{commit_message}`. 파일 내용과 TCAD 결과의 타당성은 자동 검증하지 않았습니다.
- **남은 일:** 실제 작업자는 필요하면 이 자동 기록 아래에 목적, 조건, 결과와 검증 내용을 보완해야 합니다.
"""
    with timeline.open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(entry)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["check", "fix"], required=True)
    parser.add_argument("--base")
    parser.add_argument("--head", default="HEAD")
    args = parser.parse_args()

    try:
        changes = changed_paths(args.base, args.head)
    except subprocess.CalledProcessError as exc:
        print(exc.stderr, file=sys.stderr)
        return 2

    grouped = group_member_changes(changes)
    missing: list[tuple[str, list[tuple[str, str]]]] = []
    for folder, data in sorted(grouped.items()):
        files = list(data["files"])
        if files and not bool(data["timeline_changed"]):
            missing.append((folder, files))

    if not missing:
        print("Member timeline rule satisfied.")
        return 0

    if args.mode == "check":
        print("개인 폴더가 변경됐지만 TIMELINE.md가 함께 갱신되지 않았습니다:", file=sys.stderr)
        for folder, files in missing:
            print(f"- members/{folder}/TIMELINE.md", file=sys.stderr)
            for status, path in files:
                print(f"  {status}\t{path}", file=sys.stderr)
        print("각 개인 폴더의 TIMELINE.md를 같은 PR에서 갱신하세요.", file=sys.stderr)
        return 1

    for folder, files in missing:
        append_automatic_entry(folder, files)
        print(f"Auto-updated members/{folder}/TIMELINE.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
