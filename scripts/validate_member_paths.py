#!/usr/bin/env python3
"""Validate member folder ownership and mandatory TIMELINE updates in a PR."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MEMBERS_FILE = ROOT / "docs" / "data" / "members.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True, help="Base ref/commit for git diff")
    parser.add_argument("--head", default="HEAD", help="Head ref/commit for git diff")
    return parser.parse_args()


def load_members() -> tuple[dict[str, dict[str, str]], dict[str, str]]:
    data = json.loads(MEMBERS_FILE.read_text(encoding="utf-8"))
    by_folder: dict[str, dict[str, str]] = {}
    folder_by_user: dict[str, str] = {}

    for member in data.get("members", []):
        folder = str(member.get("folder", "")).strip()
        username = str(member.get("username", "")).strip().lower()
        if not folder or not username:
            continue
        by_folder[folder] = {
            "username": username,
            "role": str(member.get("role", "member")).strip().lower(),
        }
        folder_by_user[username] = folder

    return by_folder, folder_by_user


def git_diff(base: str, head: str) -> list[tuple[str, list[str]]]:
    command = ["git", "diff", "--name-status", "--find-renames=90%", f"{base}...{head}"]
    result = subprocess.run(
        command,
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    changes: list[tuple[str, list[str]]] = []
    for raw_line in result.stdout.splitlines():
        if not raw_line.strip():
            continue
        parts = raw_line.split("\t")
        changes.append((parts[0], parts[1:]))
    return changes


def member_folder(path: str) -> str | None:
    parts = Path(path).parts
    if len(parts) < 2 or parts[0] != "members":
        return None
    return parts[1]


def main() -> int:
    args = parse_args()
    members, folder_by_user = load_members()
    changes = git_diff(args.base, args.head)

    actor = os.environ.get("GITHUB_ACTOR", "").strip().lower()
    repository_owner = os.environ.get("GITHUB_REPOSITORY_OWNER", "").strip().lower()
    actor_folder = folder_by_user.get(actor)
    actor_role = members.get(actor_folder or "", {}).get("role")
    is_admin = bool(actor and (actor == repository_owner or actor_role == "admin"))

    errors: list[str] = []
    touched_member_folders: set[str] = set()
    changed_timelines: set[str] = set()

    def validate_active_path(path: str, status: str) -> None:
        folder = member_folder(path)
        if folder is None:
            return

        if folder not in members:
            errors.append(
                f"허용되지 않은 개인 폴더입니다: {path}\n"
                f"등록된 폴더만 members/ 바로 아래에 생성할 수 있습니다."
            )
            return

        if not is_admin:
            if not actor_folder:
                errors.append(
                    f"등록되지 않은 GitHub 사용자 @{actor or 'unknown'}는 개인 폴더를 변경할 수 없습니다: {path}"
                )
            elif folder != actor_folder:
                errors.append(
                    f"@{actor}는 members/{actor_folder}/만 변경할 수 있습니다: {path}"
                )

        timeline = f"members/{folder}/TIMELINE.md"
        if path == timeline:
            if not status.startswith("D"):
                changed_timelines.add(folder)
        else:
            touched_member_folders.add(folder)

    for status, paths in changes:
        code = status[0]

        if code in {"R", "C"} and len(paths) == 2:
            old_path, new_path = paths
            old_folder = member_folder(old_path)
            # Deleting/moving files out of an unregistered folder is allowed for cleanup.
            if old_folder in members:
                validate_active_path(old_path, "D")
            validate_active_path(new_path, "A")
            continue

        if not paths:
            continue
        path = paths[0]

        # Deletion of an unregistered folder is allowed so bad folders can be cleaned up.
        if code == "D":
            folder = member_folder(path)
            if folder in members:
                validate_active_path(path, status)
            continue

        validate_active_path(path, status)

    for folder in sorted(touched_member_folders):
        if folder not in changed_timelines:
            errors.append(
                f"members/{folder}/ 변경과 함께 members/{folder}/TIMELINE.md도 갱신해야 합니다."
            )

    if errors:
        print("Member path validation failed:\n", file=sys.stderr)
        for index, error in enumerate(errors, 1):
            print(f"{index}. {error}", file=sys.stderr)
        return 1

    print("Member path validation passed.")
    print(f"Actor: @{actor or 'unknown'}")
    print(f"Validated changes: {len(changes)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
