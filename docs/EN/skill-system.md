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

The first version includes seven core skills:

| Skill | Purpose |
|---|---|
| `capture` | Capture external links, GitHub repositories, PDFs, local paths, web pages, videos, and long-form text as raw sources |
| `research` | Analyze projects, technologies, products, and topics systematically |
| `integrate` | Convert research, Q&A, and project lessons into structured wiki pages |
| `kickoff` | Create project goals, plans, structure, and execution notes |
| `daily-work` | Support daily planning, logs, reviews, and next-day planning |
| `decision-record` | Record technical selections, architecture decisions, product judgments, content strategies, and project roadmap decisions |
| `content-create` | Create X posts, newsletters, Rednote posts, video scripts, and other content from the knowledge base |

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

### 1. External Source Research Chain

```text
capture → research → integrate → decision-record (optional)
```

Use this for GitHub projects, papers, technical documents, and competitor materials.

### 2. Project Kickoff Chain

```text
kickoff → decision-record → daily-work → integrate
```

Use this for new projects, systems, and long-running initiatives.

### 3. Content Creation Chain

```text
research / integrate → content-create → decision-record (optional)
```

Use this for X posts, newsletters, Rednote posts, video scripts, and briefings.

### 4. Daily Work Chain

```text
daily-work → kickoff / research / decision-record / integrate
```

Use this for starting the day, tracking progress, and reviewing work.

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

- When updating a skill, sync CN and EN whenever possible.
- When changing paths, update the command adapter files.
- When adding a new skill, update `.agents/index.md`, entry files, docs, and changelog.
- Do not allow `.claude/.gemini/.codex` to become a second source of rules.
