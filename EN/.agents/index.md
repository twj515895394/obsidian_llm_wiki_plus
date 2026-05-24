# Agent Skills Index

This directory is the single source of truth for project-level skills in this vault.

Tool-specific folders such as `.claude/`, `.gemini/`, and `.codex/` should only act as command adapters. They must not maintain independent copies of the skill rules.

## Core Skills

| Skill | Purpose | Main Output Area |
|---|---|---|
| `capture` | Capture external sources and create traceable source records | `60_Raw_Sources/` |
| `research` | Run deep research, technical analysis, and project analysis | `30_Research/` |
| `integrate` | Integrate research, Q&A, and project lessons into the structured wiki | `40_Knowledge_Base/` |
| `kickoff` | Start a new project or long-running initiative | `20_Projects/` |
| `daily-work` | Support daily planning, daily logs, and reviews | `10_Daily/` |
| `decision-record` | Record technical, architectural, product, content, and roadmap decisions | `80_Decision_Center/` |
| `content-create` | Create content from the knowledge base | `70_Content_Creation/` |

## Routing Rules

- External source, link, file, PDF, GitHub repository, video, or long pasted text → `capture`
- Deep analysis, topic research, technical investigation, project analysis → `research`
- Wiki update, concept extraction, synthesis, knowledge base cleanup → `integrate`
- New project, system design, initiative, roadmap, delivery plan → `kickoff`
- Daily plan, daily log, retrospective, next-day planning → `daily-work`
- Technical selection, architecture decision, strategy decision → `decision-record`
- X post, newsletter, Rednote post, video script, topic brief → `content-create`

## Collaboration Pattern

Skills are often chained:

```text
capture → research → integrate → decision-record → content-create
```

Typical examples:

- A GitHub repository enters through `capture`, is analyzed with `research`, then produces concepts and decisions through `integrate` and `decision-record`.
- A useful AI conversation is saved to `35_QA_Library/`, then processed with `integrate` into reusable wiki pages.
- A project starts with `kickoff`, is tracked with `daily-work`, and later produces decision records and reusable methods.

## Safety Rules

Before modifying many files, changing the folder structure, merging wiki pages, or updating system rules, propose a plan and wait for user confirmation.

Do not overwrite raw sources. Do not delete or archive existing content unless the user explicitly confirms it.
