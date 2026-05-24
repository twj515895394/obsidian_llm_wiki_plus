# AGENTS.md

You are working inside an `obsidian_llm_wiki_plus` Vault.

This vault is an Obsidian + LLM Wiki + Agent Skills knowledge operating system. Your job is not only to answer questions, but to help the user preserve raw sources, run research, integrate knowledge, manage projects, create content, record decisions, and archive completed work in a traceable and reusable way.

---

## Working Principles

### 1. Identify the task type before choosing a skill

For complex tasks, read `.agents/index.md` first, then read the corresponding skill under `.agents/skills/`.

| User intent | Skill |
|---|---|
| Quick question, short explanation, lightweight judgment | `.agents/skills/ask/SKILL.md` |
| External links, GitHub repositories, local paths, PDFs, web pages, videos, papers, long-form text | `.agents/skills/capture/SKILL.md` |
| Deep research, project analysis, technical research, comparison | `.agents/skills/research/SKILL.md` |
| Integrating notes into the knowledge base, extracting concepts, updating wiki pages | `.agents/skills/integrate/SKILL.md` |
| Starting a project, designing a system, planning deliverables | `.agents/skills/kickoff/SKILL.md` |
| Daily planning, daily logs, daily review, start-day workflow | `.agents/skills/daily-work/SKILL.md` |
| Technical selection, architecture decision, product judgment, content strategy | `.agents/skills/decision-record/SKILL.md` |
| X posts, newsletters, Rednote posts, video scripts, content briefs | `.agents/skills/content-create/SKILL.md` |
| Completed projects, processed inbox items, outdated plans, phase closure | `.agents/skills/archive/SKILL.md` |
| frontmatter, wikilinks, callouts, embeds, attachments, Markdown formatting | `.agents/skills/obsidian-markdown/SKILL.md` |

---

## Directory Routing

| Content type | Target directory |
|---|---|
| Temporary input and unprocessed notes | `00_Inbox/` |
| Daily planning and review | `10_Daily/` |
| Project notes and deliverables | `20_Projects/` |
| Deep research and analysis | `30_Research/` |
| Reusable Q&A | `35_QA_Library/` |
| Structured wiki knowledge | `40_Knowledge_Base/` |
| Tools, links, cases, prompt templates, lightweight references | `50_Resources/` |
| Raw sources, assets, snapshots | `60_Raw_Sources/` |
| Content drafts and topics | `70_Content_Creation/` |
| Decision records | `80_Decision_Center/` |
| To-do, review queue, roadmap, archive | `90_Planning/` |
| Rules, templates, logs, archive, lifecycle management | `99_System/` |

---

## 40 / 50 / 60 Boundary

```text
40_Knowledge_Base = core structured llm_wiki knowledge layer
50_Resources = tools / links / cases / prompts / lightweight reference resources
60_Raw_Sources = traceable evidence and source archive layer
```

Do not put formal evidence into `50_Resources/`.
Do not put structured wiki pages into `50_Resources/`.
If material will support research, wiki pages, or decision records, it must enter `60_Raw_Sources/` with a source card.

---

## Mandatory Rules

- When the user provides an external source, check whether `capture` should be used.
- Do not copy, move, archive, or delete files in bulk without user confirmation.
- Keep raw sources, analysis, structured knowledge, decisions, and content output separated.
- Prefer updating existing pages over creating duplicates.
- Important conclusions should preserve sources.
- If there are conflicts, uncertainty, merge risk, or outdated conclusions, place them in `90_Planning/review-queue/`.

---

## Language

This is the EN version. Use English by default.

Keep tool paths, skill names, and template filenames in English.

---

## Template Rules

Common templates are located in `99_System/templates/`.

- `source-card.md`
- `research-note.md`
- `wiki-page.md`
- `decision-record.md`
- `project-note.md`
- `daily-note.md`
- `content-brief.md`

When creating corresponding files, use the templates when possible. For Obsidian Markdown details, follow `.agents/skills/obsidian-markdown/SKILL.md`.