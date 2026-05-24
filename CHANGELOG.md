# CHANGELOG

## v1.1

### Added

- Added repository-level `AGENTS.md` for maintaining the template repository itself.
- Added the `ask` skill for lightweight Q&A without forcing every interaction into capture, research, or integration workflows.
- Added the `archive` skill for archiving completed projects, processed inbox items, outdated plans, and phase-complete work.
- Added the `obsidian-markdown` skill for Obsidian Markdown conventions, including frontmatter, wikilinks, callouts, embeds, tags, and attachment references.
- Added CN / EN command adapters for the new skills under:
  - `.claude/commands/`
  - `.gemini/commands/`
  - `.codex/commands/`

### Improved

- Updated `CN/.agents/index.md` and `EN/.agents/index.md` to include the new v1.1 skills.
- Updated `CN/AGENTS.md`, `CN/CLAUDE.md`, and `CN/GEMINI.md` with v1.1 skill routing and clearer 40 / 50 / 60 directory boundaries.
- Updated `EN/AGENTS.md`, `EN/CLAUDE.md`, and `EN/GEMINI.md` with the same v1.1 routing and boundary rules.
- Absorbed the useful `parse-knowledge` workflow into `integrate` as an unstructured-text parsing mode.
- Absorbed the useful `start-my-day` workflow into `daily-work` as a start-day / morning planning mode.
- Clarified that `40_Knowledge_Base` is the core structured llm_wiki knowledge layer.
- Clarified that `50_Resources` is only for tools, links, cases, prompt templates, and lightweight references.
- Clarified that `60_Raw_Sources` is the traceable evidence and source archive layer.
- Updated `tools/validate-structure.py` to validate the new v1.1 skills and repository-level `AGENTS.md`.

### Not included

- Did not add `brainstorm` as a default skill.
- Did not add AI-newsletter or AI-product intelligence skills into the core template. These may become optional extensions later.

## v1.0

- Added `package.json` and `bin/olwp.mjs` for Node CLI installation.
- Added `install / init / merge / migrate` command modes.
- Added `docs/CN/agent-install.md` and `docs/EN/agent-install.md`.
- Updated README files with one-command install, merge, and migration usage.
- Installer is conservative by default: no deletion of old files, and non-empty targets require merge/migration choices.

## v0.9

### Added

- Added `tools/migrate.py` for safely migrating an existing Obsidian vault or document folder into a new vault.
- Added `tools/migrate-cn.sh` and `tools/migrate-en.sh`.
- Added `tools/migrate-cn.ps1` and `tools/migrate-en.ps1`.
- Extended `docs/EN/automation.md` with document migration instructions.
- Extended `README.md` with migration usage.

### Migration strategy

- Plan-only by default; no files are copied unless `--apply` is used.
- Copy-only by default; original files are never moved or deleted.
- Preserve the legacy folder structure.
- Import into `00_Inbox/migration-imports/` as a staging area.
- Generate `90_Planning/review-queue/migration-plan-*.md`.
- Generate `99_System/logs/migration-manifest-*.csv`.
- Support `--init-template` to initialize the target vault during migration.

### Improved

- Updated `tools/validate-structure.py` to check migration scripts and `automation.md`.

## v0.8

- Added cross-platform `tools/init.py`.
- Added CN/EN helper scripts.
- Added `tools/validate-structure.py`.
- Updated README files to recommend automated initialization.

## v0.7

- Pre-release polish.
- Added roadmap and release checklist files.
- Reworked examples around a realistic end-to-end workflow.

## v0.6

- Fixed docs/EN placeholder issue.
- Added quality check docs.

## v0.5

- Added START_HERE files.
- Improved directory README files.
- Added examples, version file, and changelogs.

## v0.4

- Completed EN vault rules, skills, and templates.

## v0.3

- Completed docs/CN and docs/EN.

## v0.2

- Completed CN skills, system rules, and templates.

## v0.1

- Initial CN / EN bilingual vault skeleton.
