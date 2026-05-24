# 质量检查清单

本清单用于发布前检查 `obsidian_llm_wiki_plus` 的结构一致性、双语一致性和 Agent 可执行性。

## 1. 根目录检查

- [ ] 存在 `README_CN.md`。
- [ ] 存在 `README.md`。
- [ ] 存在 `LICENSE`。
- [ ] 存在 `VERSION.md`。
- [ ] 存在 `CHANGELOG_CN.md`。
- [ ] 存在 `CHANGELOG.md`。
- [ ] 存在 `HANDOFF.md`。
- [ ] 存在 `CN/` 和 `EN/`。
- [ ] 存在 `docs/CN/` 和 `docs/EN/`。
- [ ] 存在 `tools/README.md`。

## 2. CN / EN 顶层目录检查

CN 必须包含：

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

EN 必须包含：

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

## 3. Agent 入口文件检查

CN 和 EN 均应包含：

```text
CLAUDE.md
AGENTS.md
GEMINI.md
START_HERE.md
```

这些文件应说明：

- Vault 定位。
- 核心目录路由。
- Skill 路由。
- 外部资料处理规则。
- 批量操作前需要计划和确认。

## 4. Skill 检查

CN 和 EN 均应包含：

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

每个 Skill 应包含：

- 目标。
- 触发条件。
- 执行流程。
- 输出位置。
- 模板引用。
- 边界规则。
- 质量检查。

## 5. 命令转发检查

CN 和 EN 的以下目录均应包含 7 个命令转发文件：

```text
.claude/commands/
.gemini/commands/
.codex/commands/
```

命令文件必须指向对应路径：

```text
.agents/skills/<skill-name>/SKILL.md
```

不要在命令转发文件中重复写完整 Skill。

## 6. 系统规则检查

CN 必须包含：

```text
99_系统/purpose.md
99_系统/schema.md
99_系统/ingest.md
99_系统/review.md
99_系统/lifecycle.md
```

EN 必须包含：

```text
99_System/purpose.md
99_System/schema.md
99_System/ingest.md
99_System/review.md
99_System/lifecycle.md
```

## 7. 模板检查

CN 和 EN 均应包含以下模板，文件名保持英文：

```text
source-card.md
research-note.md
wiki-page.md
decision-record.md
project-note.md
daily-note.md
content-brief.md
```

## 8. docs 检查

CN 和 EN 均应包含：

```text
design.md
directory-map.md
bilingual-rules.md
skill-system.md
usage-guide.md
quality-check.md
```

检查要求：

- 不应出现 placeholder 文档。
- CN 文档使用中文。
- EN 文档使用英文。
- CN / EN 目录映射一致。

## 9. 发布前检查

- [ ] 没有明显 placeholder。
- [ ] `VERSION.md` 版本号正确。
- [ ] `CHANGELOG_CN.md` 和 `CHANGELOG.md` 更新。
- [ ] `HANDOFF.md` 更新。
- [ ] 压缩包内根目录为 `obsidian_llm_wiki_plus/`。
- [ ] 用户复制 `CN/` 或 `EN/` 后可以直接作为 Obsidian Vault 使用。
