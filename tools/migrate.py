#!/usr/bin/env python3
"""
Safely migrate an existing Obsidian folder or document directory into an
obsidian_llm_wiki_plus vault.

Default behavior is intentionally conservative:
- plan mode by default: no files are copied
- copy instead of move
- preserve the original directory structure under an import staging folder
- generate a reviewable migration plan

Examples:
  python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault --plan
  python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault --apply
  python tools/migrate.py --lang EN --source ./docs --target ./my-vault --apply --init-template
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable, List, Tuple

EXCLUDE_DIRS = {
    ".git",
    ".obsidian",
    ".trash",
    ".DS_Store",
    "node_modules",
    "__pycache__",
    ".agents",
    ".claude",
    ".gemini",
    ".codex",
}
EXCLUDE_FILES = {".DS_Store", "Thumbs.db"}
DEFAULT_EXTENSIONS = {
    ".md", ".markdown", ".txt", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    ".csv", ".json", ".yaml", ".yml", ".png", ".jpg", ".jpeg", ".webp", ".gif",
    ".svg", ".mp3", ".wav", ".m4a", ".mp4", ".mov", ".zip"
}

LANG_CONFIG = {
    "CN": {
        "template": "CN",
        "inbox_import": Path("00_收件箱") / "迁移导入",
        "review_queue": Path("90_计划") / "待审核",
        "system_logs": Path("99_系统") / "日志",
        "title": "迁移计划",
        "review_note": "请人工审核这些迁移文件，再使用 integrate / research / decision-record 等 Skill 进行二次整理。",
    },
    "EN": {
        "template": "EN",
        "inbox_import": Path("00_Inbox") / "migration-imports",
        "review_queue": Path("90_Planning") / "review-queue",
        "system_logs": Path("99_System") / "logs",
        "title": "Migration Plan",
        "review_note": "Review these migrated files manually, then use integrate / research / decision-record skills for further organization.",
    },
}

@dataclass
class Candidate:
    source: Path
    relative: Path
    size: int
    sha1: str
    destination: Path


def project_root() -> Path:
    return Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def sha1_file(path: Path) -> str:
    h = hashlib.sha1()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def should_skip(path: Path) -> bool:
    if path.name in EXCLUDE_FILES:
        return True
    if any(part in EXCLUDE_DIRS for part in path.parts):
        return True
    return False


def copy_template(src: Path, dst: Path, overwrite: bool = False) -> None:
    if not src.exists():
        fail(f"template directory not found: {src}")
    dst.mkdir(parents=True, exist_ok=True)
    for item in src.iterdir():
        if item.name in EXCLUDE_FILES:
            continue
        target = dst / item.name
        if item.is_dir():
            copy_template(item, target, overwrite=overwrite)
        else:
            if target.exists() and not overwrite:
                continue
            shutil.copy2(item, target)


def collect_candidates(source: Path, destination_root: Path, extensions: set[str]) -> List[Candidate]:
    candidates: List[Candidate] = []
    for path in source.rglob("*"):
        if path.is_dir() or should_skip(path):
            continue
        if path.suffix.lower() not in extensions:
            continue
        relative = path.relative_to(source)
        destination = destination_root / relative
        candidates.append(
            Candidate(
                source=path,
                relative=relative,
                size=path.stat().st_size,
                sha1=sha1_file(path),
                destination=destination,
            )
        )
    return candidates


def write_manifest_csv(path: Path, candidates: List[Candidate]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["source", "relative_path", "destination", "size_bytes", "sha1"])
        for c in candidates:
            writer.writerow([str(c.source), str(c.relative), str(c.destination), c.size, c.sha1])


def write_plan_md(path: Path, lang: str, source: Path, target: Path, import_root: Path, manifest: Path, candidates: List[Candidate], dry_run: bool) -> None:
    cfg = LANG_CONFIG[lang]
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    total_size = sum(c.size for c in candidates)
    title = cfg["title"]
    action = "PLAN ONLY" if dry_run else "APPLIED"
    if lang == "CN":
        content = f"""# {title} - {now}

状态：**{action}**

## 迁移来源

- 来源目录：`{source}`
- 目标 Vault：`{target}`
- 导入暂存区：`{import_root}`
- Manifest：`{manifest}`

## 迁移策略

- 默认只复制，不移动，不删除原始文件。
- 保留原目录结构，统一导入到收件箱暂存区。
- 不自动判断旧笔记最终归属，避免误分类污染知识库。
- 导入后请在 `90_计划/待审核/` 中审核，并按需使用 `integrate`、`research`、`decision-record` 等 Skill 二次整理。

## 统计

- 文件数量：{len(candidates)}
- 总大小：{total_size} bytes

## 下一步建议

1. 先查看导入暂存区，确认文件是否完整。
2. 删除明显无价值或重复内容。
3. 将资料类文件用 `capture` 建立 source 记录。
4. 将研究类笔记用 `integrate` 沉淀到 `40_知识库/`。
5. 将项目相关内容迁移到 `20_项目/`。
6. 将重要判断整理到 `80_决策中心/`。

## 待审核文件预览

"""
        for c in candidates[:200]:
            content += f"- `{c.relative}` → `{c.destination.relative_to(target) if c.destination.is_relative_to(target) else c.destination}`\n"
        if len(candidates) > 200:
            content += f"\n仅展示前 200 个文件，完整清单见 manifest。\n"
    else:
        content = f"""# {title} - {now}

Status: **{action}**

## Migration source

- Source directory: `{source}`
- Target vault: `{target}`
- Import staging area: `{import_root}`
- Manifest: `{manifest}`

## Migration strategy

- Copy only by default. Do not move or delete original files.
- Preserve the original directory structure under the inbox staging area.
- Do not auto-classify old notes into final knowledge categories, to avoid polluting the new system.
- After import, review the files in `90_Planning/review-queue/`, then use `integrate`, `research`, `decision-record`, and other skills for further processing.

## Statistics

- File count: {len(candidates)}
- Total size: {total_size} bytes

## Suggested next steps

1. Check the import staging area and verify file completeness.
2. Remove obviously useless or duplicated content.
3. Use `capture` to create source records for source-like files.
4. Use `integrate` to turn research notes into `40_Knowledge_Base/` pages.
5. Move project-related notes into `20_Projects/`.
6. Turn important judgments into `80_Decision_Center/` records.

## Files to review preview

"""
        for c in candidates[:200]:
            try:
                dest_display = c.destination.relative_to(target)
            except ValueError:
                dest_display = c.destination
            content += f"- `{c.relative}` → `{dest_display}`\n"
        if len(candidates) > 200:
            content += "\nOnly the first 200 files are shown. See the manifest for the complete list.\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def apply_copy(candidates: List[Candidate], force: bool = False) -> Tuple[int, int]:
    copied = 0
    skipped = 0
    for c in candidates:
        c.destination.parent.mkdir(parents=True, exist_ok=True)
        if c.destination.exists() and not force:
            skipped += 1
            continue
        shutil.copy2(c.source, c.destination)
        copied += 1
    return copied, skipped


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Plan or apply a safe migration into an obsidian_llm_wiki_plus vault.")
    parser.add_argument("--lang", choices=["CN", "EN"], required=True, help="Target vault language.")
    parser.add_argument("--source", required=True, help="Existing Obsidian vault or document directory to migrate from.")
    parser.add_argument("--target", required=True, help="Target obsidian_llm_wiki_plus vault directory.")
    parser.add_argument("--plan", action="store_true", help="Only generate a migration plan. This is the default.")
    parser.add_argument("--apply", action="store_true", help="Copy files into the target import staging area.")
    parser.add_argument("--init-template", action="store_true", help="Initialize the target vault template before migration if needed.")
    parser.add_argument("--force", action="store_true", help="Overwrite existing migrated files if destination files already exist.")
    parser.add_argument("--extensions", default="", help="Comma-separated extensions to include. Default includes common document/media formats.")
    args = parser.parse_args(argv)

    if args.plan and args.apply:
        fail("choose only one of --plan or --apply")
    dry_run = not args.apply

    source = Path(args.source).expanduser().resolve()
    target = Path(args.target).expanduser().resolve()
    if not source.exists() or not source.is_dir():
        fail(f"source directory not found: {source}")

    cfg = LANG_CONFIG[args.lang]
    if args.init_template:
        copy_template(project_root() / cfg["template"], target, overwrite=False)
    elif not target.exists():
        fail("target does not exist. Use --init-template or initialize it with tools/init.py first.")

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    import_root = target / cfg["inbox_import"] / f"import-{timestamp}"
    review_dir = target / cfg["review_queue"]
    log_dir = target / cfg["system_logs"]

    if args.extensions.strip():
        extensions = {e.strip().lower() if e.strip().startswith(".") else f".{e.strip().lower()}" for e in args.extensions.split(",") if e.strip()}
    else:
        extensions = DEFAULT_EXTENSIONS

    candidates = collect_candidates(source, import_root, extensions)
    if not candidates:
        fail("no migratable files found with the selected extensions")

    plan_path = review_dir / f"migration-plan-{timestamp}.md"
    manifest_path = log_dir / f"migration-manifest-{timestamp}.csv"

    write_manifest_csv(manifest_path, candidates)
    write_plan_md(plan_path, args.lang, source, target, import_root, manifest_path, candidates, dry_run=dry_run)

    copied = skipped = 0
    if not dry_run:
        copied, skipped = apply_copy(candidates, force=args.force)

    print("Migration plan generated")
    print(f"  language: {args.lang}")
    print(f"  source:   {source}")
    print(f"  target:   {target}")
    print(f"  plan:     {plan_path}")
    print(f"  manifest: {manifest_path}")
    print(f"  files:    {len(candidates)}")
    if dry_run:
        print("  mode:     plan only; no files copied")
        print("\nApply with:")
        print(f"  python tools/migrate.py --lang {args.lang} --source {source} --target {target} --apply")
    else:
        print("  mode:     applied")
        print(f"  copied:   {copied}")
        print(f"  skipped:  {skipped}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
