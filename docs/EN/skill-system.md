# Skill System

This project uses `.agents/skills/` as the main location for executable task rules. Entry files only provide routing. Each complex task is handled by its corresponding skill.

## Why Skills Are Needed

If all rules are placed inside `CLAUDE.md`, `AGENTS.md`, or `GEMINI.md`, entry files become too long and agents are more likely to miss steps.

This project uses the following division:

```text
Entry files route tasks.
Skill files execute specific workflows.
System documents define long-term governance rules.
Templates stabilize output formats.
```

## Main Skill Directory

```text
.agents/skills/
```

The current version includes 10 core skills:

| Skill | Purpose |
|---|---|
| `ask` | Answer quick questions, explain concepts, make lightweight judgments, and avoid over-engineering simple interactions |
| `capture` | Capture external links, GitHub repositories, PDFs, local paths, web pages, videos, and long-form text as raw sources |
| `research` | Analyze projects, technologies, products, and topics systematically |
| `integrate` | Convert research, Q&A, project lessons, and unstructured text into structured wiki pages |
| `kickoff` | Create project goals, plans, structure, and execution notes |
| `daily-work` | Support start-day workflows, daily planning, logs, reviews, and next-day planning |
| `decision-record` | Record technical selections, architecture decisions, product judgments, content strategies, and project roadmap decisions |
| `content-create` | Create X posts, newsletters, Rednote posts, video scripts, and other content from the knowledge base |
| `archive` | Archive completed projects, processed inbox items, outdated plans, and phase-complete materials |
| `obsidian-markdown` | Define Obsidian Markdown conventions for frontmatter, wikilinks, callouts, embeds, tags, and attachments |

## Tool Adapter Structure

`.agents/skills/` is the single source of skill rules.

The following directories are command adapter layers only:

```text
.claude/commands/
.gemini/commands/
.codex/commands/
```

For example:

```text
.claude/commands/research.md
```

should only point to:

```text
.agents/skills/research/SKILL.md
```

Do not duplicate full skill rules inside tool adapters, otherwise the rules may drift across tools.

## Common Skill Chains

### 1. Quick Q&A Chain

```text
ask → 35_QA_Library (optional) → integrate (optional)
```

Use this for short explanations, quick judgments, placement questions, and temporary Q&A that does not need a heavy workflow.

### 2. External Source Research Chain

```text
capture → research → integrate → decision-record (optional)
```

Use this for GitHub projects, papers, technical documents, and competitor materials.

### 3. Project Kickoff Chain

```text
kickoff → decision-record → daily-work → integrate
```

Use this for new projects, systems, and long-running initiatives.

### 4. Content Creation Chain

```text
research / integrate → content-create → decision-record (optional)
```

Use this for X posts, newsletters, Rednote posts, video scripts, and briefings.

### 5. Daily Work Chain

```text
daily-work → kickoff / research / decision-record / integrate / archive
```

Use this for starting the day, tracking progress, reviewing work, and closing phases.

### 6. Lifecycle Closure Chain

```text
daily-work / kickoff → archive
```

Use this for completed projects, processed inbox items, outdated plans, and phase-complete materials.

## 40 / 50 / 60 Boundary

```text
40_Knowledge_Base = core structured llm_wiki knowledge layer
50_Resources = tools / links / cases / prompts / lightweight reference resources
60_Raw_Sources = traceable evidence and source archive layer
```

Structured wiki pages should not go into `50_Resources/`. Formal evidence should enter `60_Raw_Sources/` through `capture`.

## Execution Safety Boundaries

The agent should provide a plan and wait for user confirmation before:

- creating many files;
- moving or renaming many files;
- modifying system rules;
- modifying skill files;
- restructuring directories;
- merging multiple wiki pages;
- archiving large amounts of content;
- deleting user materials.

## Skill Writing Principles

Each skill should follow a standard structure:

```text
Goal
Triggers
Input judgment
Workflow
Output location
Template references
Boundary rules
Quality checklist
```

Do not turn a skill into a long essay. Put broader explanations into `docs/` or `99_System/`.

## Maintenance Recommendations

- When updating a skill, sync CN and EN.
- When changing paths, update the command adapter files.
- When adding a new skill, update `.agents/index.md`, entry files, docs, changelog, and `tools/validate-structure.py`.
- Do not allow `.claude/.gemini/.codex` to become a second source of rules.
- Current-facing documentation should say “10 core skills”; historical changelog / handoff entries may keep older version records.