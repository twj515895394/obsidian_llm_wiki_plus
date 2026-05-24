# Usage Guide

This guide explains how to use `obsidian_llm_wiki_plus` to initialize and maintain your own Obsidian + LLM Wiki vault.

## 1. Choose a Language Version

If you mainly work in Chinese, copy `CN/`:

```bash
cp -r CN my-knowledge-vault
```

If you mainly work in English, copy `EN/`:

```bash
cp -r EN my-knowledge-vault
```

Then open the copied directory in Obsidian.

## 2. Start with START_HERE

Inside the vault, read:

```text
START_HERE.md
```

It explains:

- what each core directory is for;
- how agents should read entry rules;
- what the seven skills are used for;
- recommended daily workflows.

## 3. Work with AI Agents

Run Claude Code, Codex, Gemini CLI, or another agent tool from the vault root.

Entry files:

```text
CLAUDE.md
AGENTS.md
GEMINI.md
```

These files tell the agent:

- what this vault is;
- how directories are routed;
- which skill to read for each task type;
- which operations require user confirmation.

## 4. Common Workflows

### Capture Sources

When you provide a link, PDF, local path, GitHub repository, web article, or long-form text, the agent should consider using:

```text
.agents/skills/capture/SKILL.md
```

Long-term valuable sources should go into:

```text
60_Raw_Sources/
```

### Deep Research

When you ask the agent to analyze a project, technical solution, product, or topic, it should use:

```text
.agents/skills/research/SKILL.md
```

Research outputs usually go into:

```text
30_Research/
```

### Wiki Integration

When research results or Q&A entries have long-term value, the agent should use:

```text
.agents/skills/integrate/SKILL.md
```

Integrated knowledge goes into:

```text
40_Knowledge_Base/
```

### Project Kickoff

When you start a project, initiative, or system design, the agent should use:

```text
.agents/skills/kickoff/SKILL.md
```

Project content goes into:

```text
20_Projects/
```

### Daily Planning and Review

When you start the day, review the day, or plan tomorrow, the agent should use:

```text
.agents/skills/daily-work/SKILL.md
```

Daily notes go into:

```text
10_Daily/
```

### Decision Records

When discussing technical selections, architecture direction, product judgment, content strategy, or project roadmap, the agent should use:

```text
.agents/skills/decision-record/SKILL.md
```

Decision records go into:

```text
80_Decision_Center/
```

### Content Creation

When creating X posts, newsletters, Rednote posts, video scripts, or briefings, the agent should use:

```text
.agents/skills/content-create/SKILL.md
```

Drafts go into:

```text
70_Content_Creation/
```

## 5. File Placement Rules

- Temporary inputs go into `00_Inbox/`.
- Source-backed materials go into `60_Raw_Sources/`.
- Research process goes into `30_Research/`.
- Reusable knowledge goes into `40_Knowledge_Base/`.
- Explicit decisions go into `80_Decision_Center/`.
- Content outputs go into `70_Content_Creation/`.
- Uncertain items go into `90_Planning/review-queue/`.

## 6. Use Templates

Templates are located in:

```text
99_System/templates/
```

Common templates:

```text
source-card.md
research-note.md
wiki-page.md
decision-record.md
project-note.md
daily-note.md
content-brief.md
```

Agents should use these templates when creating matching files.

## 7. Examples

Examples are located in:

```text
99_System/examples/
```

Use them to understand the intended output structure for each workflow.

## 8. Maintenance Suggestions

- Review `90_Planning/review-queue/` weekly.
- Review important decision records monthly.
- Set review dates for technical claims.
- Do not leave high-value Q&A only in chat history.
- Do not organize for the sake of organizing; every integrated note should support future reuse.

## Automated initialization

Recommended command:

```bash
python tools/init.py --lang EN --target ./my-knowledge-vault
```

See `docs/EN/automation.md` for details.
