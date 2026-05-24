#!/usr/bin/env python3
"""
Initialize an Obsidian LLM Wiki Plus vault from the CN or EN template.

Examples:
  python tools/init.py --lang CN --target ~/Vaults/my-wiki
  python tools/init.py --lang EN --target ./my-wiki --force
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path
from typing import Iterable

EXCLUDE_NAMES = {".DS_Store", "Thumbs.db"}


def project_root() -> Path:
    return Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def copy_template(src: Path, dst: Path, force: bool = False) -> None:
    if not src.exists():
        fail(f"template directory not found: {src}")

    if dst.exists():
        if not dst.is_dir():
            fail(f"target exists and is not a directory: {dst}")
        existing = [p for p in dst.iterdir() if p.name not in EXCLUDE_NAMES]
        if existing and not force:
            fail(
                "target directory is not empty. Use --force to merge/overwrite files, "
                "or choose an empty directory."
            )
    else:
        dst.mkdir(parents=True)

    for item in src.iterdir():
        if item.name in EXCLUDE_NAMES:
            continue
        target = dst / item.name
        if item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)
        else:
            shutil.copy2(item, target)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Initialize an Obsidian LLM Wiki Plus vault from CN or EN template."
    )
    parser.add_argument("--lang", choices=["CN", "EN"], required=True, help="Template language to use.")
    parser.add_argument("--target", required=True, help="Target vault directory.")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Allow copying into a non-empty directory and overwrite files with template files.",
    )
    args = parser.parse_args(argv)

    src = project_root() / args.lang
    dst = Path(args.target).expanduser().resolve()

    copy_template(src, dst, force=args.force)

    print("Initialized Obsidian LLM Wiki Plus vault")
    print(f"  language: {args.lang}")
    print(f"  target:   {dst}")
    print("\nNext steps:")
    print("  1. Open the target directory in Obsidian.")
    print("  2. Read START_HERE.md first.")
    print("  3. Run your AI agent from inside the vault directory.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
