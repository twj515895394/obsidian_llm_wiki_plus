# Quality Check Checklist

This checklist is used before release to check the structural consistency, bilingual consistency, and agent executability of `obsidian_llm_wiki_plus`.

## 1. Root Directory Check

- [ ] `README_CN.md` exists.
- [ ] `README.md` exists.
- [ ] `LICENSE` exists.
- [ ] `VERSION.md` exists.
- [ ] `CHANGELOG_CN.md` exists.
- [ ] `CHANGELOG.md` exists.
- [ ] `HANDOFF.md` exists.
- [ ] `CN/` and `EN/` exist.
- [ ] `docs/CN/` and `docs/EN/` exist.
- [ ] `tools/README.md` exists.

## 2. CN / EN Top-Level Directory Check

CN must include:

```text
00_收件箱
10_日记
20_项目
30_研究
35_问答沉淀
40_知识库
50_资源
60_原始资料
70_内容创作
80_决策中心
90_计划
99_系统
```

EN must include:

```text
00_Inbox
10_Daily
20_Projects
30_Research
35_QA_Library
40_Knowledge_Base
50_Resources
60_Raw_Sources
70_Content_Creation
80_Decision_Center
90_Planning
99_System
```

## 3. Agent Entry File Check

Both CN and EN should include:

```text
CLAUDE.md
AGENTS.md
GEMINI.md
START_HERE.md
```

These files should explain:

- vault positioning;
- core directory routing;
- skill routing;
- external source handling rules;
- why plans and confirmations are needed before batch operations.

## 4. Skill Check

Both CN and EN should include:

```text
.agents/index.md
.agents/skills/capture/SKILL.md
.agents/skills/research/SKILL.md
.agents/skills/integrate/SKILL.md
.agents/skills/kickoff/SKILL.md
.agents/skills/daily-work/SKILL.md
.agents/skills/decision-record/SKILL.md
.agents/skills/content-create/SKILL.md
```

Each skill should include:

- goal;
- triggers;
- workflow;
- output locations;
- template references;
- boundary rules;
- quality checklist.

## 5. Command Adapter Check

The following directories should each contain seven command adapter files in both CN and EN:

```text
.claude/commands/
.gemini/commands/
.codex/commands/
```

Each command file must point to:

```text
.agents/skills/<skill-name>/SKILL.md
```

Do not duplicate full skill rules inside command adapter files.

## 6. System Rule Check

CN must include:

```text
99_系统/purpose.md
99_系统/schema.md
99_系统/ingest.md
99_系统/review.md
99_系统/lifecycle.md
```

EN must include:

```text
99_System/purpose.md
99_System/schema.md
99_System/ingest.md
99_System/review.md
99_System/lifecycle.md
```

## 7. Template Check

Both CN and EN should contain the following templates with stable English filenames:

```text
source-card.md
research-note.md
wiki-page.md
decision-record.md
project-note.md
daily-note.md
content-brief.md
```

## 8. docs Check

Both CN and EN should include:

```text
design.md
directory-map.md
bilingual-rules.md
skill-system.md
usage-guide.md
quality-check.md
```

Requirements:

- no obvious placeholder documents;
- CN docs should be written in Chinese;
- EN docs should be written in English;
- CN / EN directory maps should remain consistent.

## 9. Pre-Release Check

- [ ] No obvious placeholder remains.
- [ ] `VERSION.md` has the correct version.
- [ ] `CHANGELOG_CN.md` and `CHANGELOG.md` are updated.
- [ ] `HANDOFF.md` is updated.
- [ ] The zip package contains `obsidian_llm_wiki_plus/` as the root directory.
- [ ] Users can copy `CN/` or `EN/` directly as an Obsidian Vault.
