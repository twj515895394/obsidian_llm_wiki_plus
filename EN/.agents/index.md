# Agent Skills Index

This directory is the single source of truth for project-level skills in this vault.

Tool-specific folders such as `.claude/`, `.gemini/`, and `.codex/` should only act as command adapters. They must not maintain independent copies of the skill rules.

## Core Skills

| Skill | Purpose | Main Output Area |
|---|---|---|
| `ask` | Quick Q&A, short explanations, lightweight judgment without heavy note-taking | Conversation first; optional `35_QA_Library/` |
| `capture` | Capture external sources and create traceable source records | `60_Raw_Sources/` |
| `research` | Run deep research, technical analysis, and project analysis | `30_Research/` |
| `integrate` | Integrate research, Q&A, and project lessons into the structured wiki | `40_Knowledge_Base/` |
| `kickoff` | Start a new project or long-running initiative | `20_Projects/` |
| `daily-work` | Support daily planning, daily logs, reviews, and start-day workflows | `10_Daily/` |
| `decision-record` | Record technical, architectural, product, content, and roadmap decisions | `80_Decision_Center/` |
| `content-create` | Create content from the knowledge base | `70_Content_Creation/` |
| `archive` | Archive completed projects, processed inbox items, outdated plans, and phase-complete work | `99_System/archive/`, `90_Planning/archive/` |
| `obsidian-markdown` | Define Obsidian Markdown conventions: frontmatter, wikilinks, callouts, embeds, attachments | Helper skill; no fixed output directory |

## Routing Rules

- Quick answer, simple explanation, lightweight judgment → `ask`
- External source, link, file, PDF, GitHub repository, video, or long pasted text → `capture`
- Deep analysis, topic research, technical investigation, project analysis → `research`
- Wiki update, concept extraction, synthesis, knowledge base cleanup → `integrate`
- New project, system design, initiative, roadmap, delivery plan → `kickoff`
- Daily plan, daily log, retrospective, next-day planning → `daily-work`
- Technical selection, architecture decision, strategy decision → `decision-record`
- X post, newsletter, Rednote post, video script, topic brief → `content-create`
- Completed projects, processed inbox items, outdated plans, phase closure → `archive`
- Frontmatter, wikilinks, callouts, embeds, attachment references → `obsidian-markdown`

## Collaboration Pattern

Skills are often chained:

```text
ask → capture → research → integrate → decision-record → content-create → archive
```

Typical examples:

- A simple question is answered with `ask`; if reusable, it can be saved to `35_QA_Library/` and later processed by `integrate`.
- A GitHub repository enters through `capture`, is analyzed with `research`, then produces concepts and decisions through `integrate` and `decision-record`.
- A useful AI conversation is saved to `35_QA_Library/`, then processed with `integrate` into reusable wiki pages.
- A project starts with `kickoff`, is tracked with `daily-work`, and later produces decision records, reusable methods, and archive output.

## Directory Layers

```text
60_Raw_Sources = raw evidence
30_Research = analysis process
35_QA_Library = high-value conversations
40_Knowledge_Base = core structured llm_wiki knowledge layer
50_Resources = tools / links / cases / prompts / lightweight references
20_Projects = project execution
70_Content_Creation = content output
80_Decision_Center = important decisions
90_Planning = todo / review queue / roadmap / archive
99_System = rules / templates / logs / archive
```

## Safety Rules

Before modifying many files, changing the folder structure, merging wiki pages, archiving content, or updating system rules, propose a plan and wait for user confirmation.

Do not overwrite raw sources. Do not delete or archive existing content unless the user explicitly confirms it.

## Obsidian Markdown Rules

When creating or editing Markdown files with frontmatter, wikilinks, callouts, embeds, or attachment references, consult:

```text
.agents/skills/obsidian-markdown/SKILL.md
```