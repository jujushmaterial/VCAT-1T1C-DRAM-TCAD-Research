#!/usr/bin/env python3
"""Run dashboard sync with spreadsheet table output support."""

from __future__ import annotations

import re
from typing import Any

import sync_dashboard as base


_original_parse_tasks = base.parse_tasks


def parse_tasks_v5(text: str, phase_id: int, submissions: dict[str, Any]) -> list[dict[str, Any]]:
    tasks = _original_parse_tasks(text, phase_id, submissions)
    declared_types: dict[str, str] = {}
    current_task_id: str | None = None
    fallback_task = 1
    fallback_output: dict[str, int] = {}

    for line in text.splitlines():
        task_match = base.TASK_LINE_PATTERN.match(line)
        if task_match:
            metadata = base.parse_metadata(task_match.group(2))
            supplied = str(metadata.get("task-id", "")).upper()
            current_task_id = supplied if re.fullmatch(r"P\d{2}-T\d{2}", supplied) else f"P{phase_id:02d}-T{fallback_task:02d}"
            fallback_task += 1
            fallback_output[current_task_id] = 1
            continue

        output_match = base.OUTPUT_LINE_PATTERN.match(line)
        if not output_match or current_task_id is None:
            continue
        metadata = base.parse_metadata(output_match.group(1))
        supplied = str(metadata.get("output-id", "")).upper()
        next_number = fallback_output.get(current_task_id, 1)
        output_id = supplied if re.fullmatch(r"P\d{2}-T\d{2}-O\d{2}", supplied) else f"{current_task_id}-O{next_number:02d}"
        fallback_output[current_task_id] = next_number + 1
        declared_types[output_id] = str(metadata.get("type", "any"))

    for task in tasks:
        for output in task.get("outputs", []):
            if declared_types.get(str(output.get("id"))) == "table":
                output["type"] = "table"
    return tasks


base.parse_tasks = parse_tasks_v5


if __name__ == "__main__":
    raise SystemExit(base.main())
