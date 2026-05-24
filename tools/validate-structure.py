#!/usr/bin/env python3
"""
Validate the repository / vault template structure.

Examples:
  python tools/validate-structure.py
  python tools/validate-structure.py --root /path/to/obsidian_llm_wiki_plus
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path
from typing import Iterable

SKILLS = [
    "ask",
    "capture",
    "research",
    "integrate",
    "kickoff",
    "daily-work",
    "decision-record",
    "content-create",
    "archive",
    "obsidian-markdown",
]
TOOLS = [".claude", ".gemini", ".codex"]
ROOT_FILES = [
    "README.md",
    "README_CN.md",
    "VERSION.md",
    "CHANGELOG.md",
    "CHANGELOG_CN.md",
    "ROADMAP.md",
    "ROADMAP_CN.md",
    "RELEASE_CHECKLIST.md",
    "RELEASE_CHECKLIST_CN.md",
    "package.json",
    "AGENTS.md",
]
CN_DIRS = [
    "00_收件箱",
    "10_日记",
    "20_项目",
    "30_研究",
    "35_问答沉淀",
    "40_知识库",
    "50_资源",
    "60_原始资料",
    "70_内容创作",
    "80_决策中心",
    "90_计划",
    "99_系统",
]
EN_DIRS = [
    "00_Inbox",
    "10_Daily",
    "20_Projects",
    "30_Research",
    "35_QA_Library",
    "40_Knowledge_Base",
    "50_Resources",
    "60_Raw_Sources",
    "70_Content_Creation",
    "80_Decision_Center",
    "90_Planning",
    "99_System",
]
PLACEHOLDER_MARKERS = [
    "TODO:",
    "TBD:",
    "PLACEHOLDER_CONTENT",
    "[待补充]",
    "（待补充）",
]


def project_root() -> Path:
    return Path(__file__).resolve().parents[1]


def check_path(path: Path, errors: list[str]) -> None:
    if not path.exists():
        errors.append(f"missing: {path}")


def scan_placeholders(root: Path) -> list[str]:
    hits: list[str] = []
    for path in root.rglob("*.md"):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for marker in PLACEHOLDER_MARKERS:
            if marker in text:
                hits.append(f"{path}: contains '{marker}'")
                break
    return hits


def validate(root: Path, strict_placeholders: bool = False) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    for file in ROOT_FILES:
        check_path(root / file, errors)

    for lang, dirs in [("CN", CN_DIRS), ("EN", EN_DIRS)]:
        base = root / lang
        check_path(base, errors)
        for file in ["README.md", "START_HERE.md", "CLAUDE.md", "AGENTS.md", "GEMINI.md"]:
            check_path(base / file, errors)
        for d in dirs:
            check_path(base / d, errors)
        check_path(base / ".agents" / "index.md", errors)
        for skill in SKILLS:
            check_path(base / ".agents" / "skills" / skill / "SKILL.md", errors)
        for tool in TOOLS:
            check_path(base / tool / "README.md", errors)
            for skill in SKILLS:
                check_path(base / tool / "commands" / f"{skill}.md", errors)

    for doc_lang in ["CN", "EN"]:
        for doc in [
            "design.md",
            "directory-map.md",
            "bilingual-rules.md",
            "skill-system.md",
            "usage-guide.md",
            "quality-check.md",
            "automation.md",
            "agent-install.md",
        ]:
            check_path(root / "docs" / doc_lang / doc, errors)

    check_path(root / "bin" / "olwp.mjs", errors)

    for tool_file in [
        "README.md",
        "init.py",
        "migrate.py",
        "validate-structure.py",
        "init-cn.sh",
        "init-en.sh",
        "init-cn.ps1",
        "init-en.ps1",
        "migrate-cn.sh",
        "migrate-en.sh",
        "migrate-cn.ps1",
        "migrate-en.ps1",
    ]:
        check_path(root / "tools" / tool_file, errors)

    placeholder_hits = scan_placeholders(root)
    if placeholder_hits:
        target = errors if strict_placeholders else warnings
        target.extend(placeholder_hits)

    return errors, warnings


def count_items(root: Path) -> tuple[int, int]:
    files = sum(1 for p in root.rglob("*") if p.is_file())
    dirs = sum(1 for p in root.rglob("*") if p.is_dir())
    return files, dirs


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Validate obsidian_llm_wiki_plus structure.")
    parser.add_argument("--root", default=None, help="Project root. Defaults to repository root.")
    parser.add_argument("--strict-placeholders", action="store_true", help="Treat placeholder markers as errors.")
    args = parser.parse_args(argv)

    root = Path(args.root).expanduser().resolve() if args.root else project_root()
    errors, warnings = validate(root, strict_placeholders=args.strict_placeholders)
    files, dirs = count_items(root)

    print(f"root: {root}")
    print(f"total files: {files}")
    print(f"total dirs:  {dirs}")
    print(f"warnings:    {len(warnings)}")
    print(f"errors:      {len(errors)}")

    if warnings:
        print("\nWarnings:")
        for item in warnings:
            print(f"  - {item}")
    if errors:
        print("\nErrors:")
        for item in errors:
            print(f"  - {item}")
        return 1

    print("\nStructure validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
