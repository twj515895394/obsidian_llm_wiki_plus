# Design Overview

`obsidian_llm_wiki_plus` is a new bilingual Obsidian + LLM Wiki + Agent Skills template project.

It is not a regular Obsidian folder template or a simple task management system. Its goal is to connect raw sources, research analysis, structured knowledge, project execution, content creation, and decision records into one evolving vault that can be maintained with the help of agents such as Claude Code, Codex, Gemini CLI, or similar tools.

## Design Goals

The first version is designed around these goals:

1. **Traceable sources**: External links, GitHub repositories, PDFs, local files, web pages, papers, videos, and pasted text should enter `60_Raw_Sources/` with source cards.
2. **Reusable research**: Deep research notes go into `30_Research/`, while reusable entities, concepts, claims, workflows, decisions, synthesis, and comparisons can be integrated into `40_Knowledge_Base/`.
3. **Evolving knowledge**: Wiki pages should keep metadata such as sources, status, confidence, updated time, open questions, and review dates.
4. **Executable projects**: Projects should preserve goals, context, phase plans, decisions, risks, and reviews instead of only task lists.
5. **Knowledge-driven content creation**: X posts, newsletters, Rednote posts, and video scripts should grow from existing research, wiki pages, Q&A entries, and decision records.
6. **Auditable decisions**: Technical selections, architecture decisions, product judgments, content strategies, and project roadmaps should be recorded in `80_Decision_Center/`.

## Core Layer Model

This project uses a six-layer knowledge operating model:

```text
Source layer: 60_Raw_Sources/
Research layer: 30_Research/, 35_QA_Library/
Knowledge layer: 40_Knowledge_Base/
Project layer: 20_Projects/, 90_Planning/
Content layer: 70_Content_Creation/
Decision layer: 80_Decision_Center/
```

These layers form a long-term workflow:

```text
External source → source capture → deep research → wiki integration → project execution / content creation / decision record → review and evolution
```

## Relationship to llm_wiki

This project is inspired by llm_wiki, especially the idea that:

- raw sources should be separated from processed knowledge;
- schema should guide the structure of the wiki;
- LLMs can help maintain an evolving structured wiki;
- sources should be compiled into reusable knowledge instead of being retrieved and summarized from scratch every time.

However, this project is not a direct copy of llm_wiki. It is designed for practical Obsidian Vault usage and extends the model with project execution, content creation, daily planning, decision records, and multi-agent skill routing.

## Relationship to OrbitOS-style Projects

This project references the vault-first style used by projects such as OrbitOS:

- separate CN and EN templates;
- copy a language directory and use it as an Obsidian Vault;
- run AI agents inside the vault directory;
- use project-level entry files and skills or commands to drive workflows.

This project is not an OrbitOS fork. Its core model is Obsidian + LLM Wiki + Agent Skills + decision/content/project extensions.

## Why Skills Are Needed

If every rule were placed inside `CLAUDE.md`, `AGENTS.md`, or `GEMINI.md`, the entry files would become too long and agents would be more likely to miss important steps.

This project uses layered rules instead:

```text
Entry files: core rules, directory routing, and skill routing.
.agents/skills/: executable rules for specific tasks.
99_System/: system governance, templates, logs, and lifecycle rules.
.claude/.gemini/.codex: command adapters only; no duplicated skill rules.
```

This keeps the entry files lightweight while allowing complex workflows to be loaded only when needed.

## Design Boundaries

This project is not:

- a full application;
- a cloud knowledge base product;
- an automatic RAG system;
- a replacement for Obsidian;
- a framework tied to one specific AI tool.

This project is:

- an Obsidian Vault template;
- a structured LLM Wiki model;
- an Agent Skills workflow collection;
- a long-term knowledge operating system skeleton for individuals or teams.

## First-Version Priorities

The first version focuses on:

1. complete CN and EN vault skeletons;
2. usable CN and EN agent entry files;
3. executable core skills;
4. system rules and templates for source capture, research, wiki integration, projects, daily work, decision records, and content creation;
5. `START_HERE.md` guides that help users start quickly after copying the vault.
