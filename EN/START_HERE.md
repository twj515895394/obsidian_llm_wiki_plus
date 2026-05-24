# Start Here

Welcome to the English vault template of `obsidian_llm_wiki_plus`.

This vault is not designed to make you create more notes. It is designed to help you turn sources, research, projects, content, and decisions into a reusable long-term knowledge system.

## 1. Understand the three layers

```text
Source layer: 60_Raw_Sources
Knowledge layer: 30_Research / 35_QA_Library / 40_Knowledge_Base
Action layer: 20_Projects / 70_Content_Creation / 80_Decision_Center / 90_Planning
```

## 2. Where should things go?

| Input | Recommended location | Recommended skill |
|---|---|---|
| A link, PDF, GitHub repo, or local file | `60_Raw_Sources/` | `capture` |
| A technical study, project analysis, or product research | `30_Research/` | `research` |
| A valuable AI conversation | `35_QA_Library/` | `integrate` |
| A reusable concept, workflow, or claim | `40_Knowledge_Base/` | `integrate` |
| A new project or initiative | `20_Projects/` | `kickoff` |
| Daily planning, logs, and reviews | `10_Daily/` | `daily-work` |
| Technical selection or strategy decision | `80_Decision_Center/` | `decision-record` |
| X posts, newsletters, Rednote posts, or video scripts | `70_Content_Creation/` | `content-create` |

## 3. Use it with agents

You can run Claude Code, Codex, Gemini CLI, or other agents from the vault root.

Agent entry files:

- `CLAUDE.md`
- `AGENTS.md`
- `GEMINI.md`

Core skills are located in:

```text
.agents/skills/
```

## 4. First recommended tests

Ask your agent:

```text
Use the capture skill to evaluate whether this link should be saved into 60_Raw_Sources.
```

Or:

```text
Start a new project with the kickoff skill and give me a project plan first.
```

## 5. See examples

Example outputs are located in:

```text
99_System/examples/
```

Start with:

- `source-card.example.md`
- `research-note.example.md`
- `wiki-page.example.md`
- `decision-record.example.md`
