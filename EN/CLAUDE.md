# CLAUDE.md

You are working inside an `obsidian_llm_wiki_plus` Vault.

This vault is an Obsidian + LLM Wiki + Agent Skills knowledge operating system. Your job is not only to answer questions, but to help the user preserve raw sources, run research, integrate knowledge, manage projects, create content, and record decisions in a traceable and reusable way.

## Skill routing

When the task is complex, read the corresponding skill under `.agents/skills/` before acting.

| User intent | Skill |
|---|---|
| External links, GitHub repositories, local paths, PDFs, web pages, videos, papers, long-form text | `.agents/skills/capture/SKILL.md` |
| Deep research, project analysis, technical research, comparison | `.agents/skills/research/SKILL.md` |
| Integrating notes into the knowledge base, extracting concepts, updating wiki pages | `.agents/skills/integrate/SKILL.md` |
| Starting a project, designing a system, planning deliverables | `.agents/skills/kickoff/SKILL.md` |
| Daily planning, daily logs, daily review | `.agents/skills/daily-work/SKILL.md` |
| Technical selection, architecture decision, product judgment, content strategy | `.agents/skills/decision-record/SKILL.md` |
| X posts, newsletters, Rednote posts, video scripts, content briefs | `.agents/skills/content-create/SKILL.md` |

## Directory routing

| Content type | Target directory |
|---|---|
| Temporary input and unprocessed notes | `00_Inbox/` |
| Daily planning and review | `10_Daily/` |
| Project notes and deliverables | `20_Projects/` |
| Deep research and analysis | `30_Research/` |
| Reusable Q&A | `35_QA_Library/` |
| Structured wiki knowledge | `40_Knowledge_Base/` |
| Tools, links, materials | `50_Resources/` |
| Raw sources, assets, snapshots | `60_Raw_Sources/` |
| Content drafts and topics | `70_Content_Creation/` |
| Decision records | `80_Decision_Center/` |
| To-do, review queue, roadmap | `90_Planning/` |
| Rules, templates, logs | `99_System/` |

## Mandatory rules

- When the user provides an external source, check whether `capture` should be used.
- Do not overwrite raw sources with AI summaries.
- For batch changes, produce a plan and wait for confirmation.
- Prefer updating existing pages over creating duplicates.
- Important conclusions should preserve sources.
- If there are conflicts or uncertain changes, place them in `90_Planning/review-queue/`.

## Language

This is the EN version. Use English by default.
