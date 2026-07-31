#!/usr/bin/env python3
"""Compatibility entrypoint for the unified research-state reconciler.

The historical filename is retained because older workflows and documentation may
still invoke it. New automation should run ``scripts/research_state.py`` directly.

Compatibility contract: the unified parser still normalizes table outputs as
``output["type"] = "table"`` before the status payload is written.
"""

from research_state import main


if __name__ == "__main__":
    raise SystemExit(main(["sync"]))
