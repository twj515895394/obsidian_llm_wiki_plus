# Bilingual Maintenance Rules

This project maintains separate CN and EN vault templates. The following rules help prevent the two versions from drifting apart.

## 1. Content Directories Are Localized

The CN version uses Chinese names for content directories.

Example:

```text
CN/40_知识库/
CN/60_原始资料/
CN/99_系统/
```

The EN version uses English names for content directories.

Example:

```text
EN/40_Knowledge_Base/
EN/60_Raw_Sources/
EN/99_System/
```

## 2. Tool Directories Stay Stable in English

The following directories are used by agents, command adapters, and future scripts. They must remain the same in CN and EN:

```text
.agents/
.claude/
.gemini/
.codex/
```

Do not localize these paths.

## 3. Skill Names Stay the Same

The first version includes seven skills with stable names:

```text
capture
research
integrate
kickoff
daily-work
decision-record
content-create
```

CN `SKILL.md` files are written in Chinese.

EN `SKILL.md` files are written in English.

## 4. Template Filenames Stay in English

Template filenames remain the same in CN and EN:

```text
source-card.md
research-note.md
wiki-page.md
decision-record.md
project-note.md
daily-note.md
content-brief.md
```

Reason: templates are frequently referenced by skills, and stable English filenames reduce path-mapping complexity.

Template content is localized: Chinese in CN, English in EN.

## 5. System Rule Filenames Stay in English

System rule filenames remain stable:

```text
purpose.md
schema.md
ingest.md
review.md
lifecycle.md
```

File content is localized: Chinese in CN, English in EN.

## 6. Command Adapter Filenames Stay in English

Files under `.claude/commands/`, `.gemini/commands/`, and `.codex/commands/` use stable English names:

```text
capture.md
research.md
integrate.md
kickoff.md
daily-work.md
decision-record.md
content-create.md
```

These files are command adapters only. They must not duplicate complete skill rules.

## 7. Documentation Content Is Maintained Separately

`docs/CN/` is written in Chinese.

`docs/EN/` is written in English.

Do not mix the two languages in the same document except for mapping tables or terminology tables.

## 8. Synchronization Requirements

When changing the following areas, always check both CN and EN:

- top-level directory structure;
- `40_知识库` / `40_Knowledge_Base` substructure;
- `60_原始资料` / `60_Raw_Sources` substructure;
- responsibilities of the seven skills;
- template fields;
- system rule files;
- documentation.

## 9. Recommended Sync Workflow

Recommended process:

```text
Update CN → check paths and terminology → translate and sync EN → update directory map → update changelog → run structure check
```

If a change applies only to one language version, record the reason in the changelog or handoff document.

## 10. Terminology Table

| CN | EN |
|---|---|
| 原始资料 | raw sources |
| 资料捕获 | source capture |
| 深度研究 | deep research |
| 知识沉淀 | wiki integration |
| 决策记录 | decision record |
| 待审核 | review queue |
| 生命周期 | lifecycle |
| 置信度 | confidence |
| 来源卡片 | source card |
| 知识页 | wiki page |
