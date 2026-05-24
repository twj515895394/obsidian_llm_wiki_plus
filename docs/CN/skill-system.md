# Skill 系统说明

本项目通过 `.agents/skills/` 承载核心执行规则。顶层入口文件只做路由，复杂任务由对应 Skill 负责。

## 为什么需要 Skill

如果把所有规则都写进 `CLAUDE.md`、`AGENTS.md` 或 `GEMINI.md`，入口文件会过长，Agent 执行时容易漏规则。

因此本项目采用：

```text
入口文件负责判断和路由。
Skill 文件负责具体任务执行。
系统文档负责长期治理规则。
模板文件负责稳定输出格式。
```

## Skill 主目录

```text
.agents/skills/
```

当前版本包含 10 个核心 Skill：

| Skill | 中文名 | 主要职责 |
|---|---|---|
| `ask` | 轻量问答 | 快速回答简单问题、解释概念、判断目录放置，避免过度流程化 |
| `capture` | 资料捕获 | 保存外部链接、GitHub、PDF、本地路径、网页、视频、长文本等原始资料 |
| `research` | 深度研究 | 对项目、技术、产品、主题进行系统分析 |
| `integrate` | 知识沉淀 | 将研究、问答、项目经验转化为结构化 Wiki，并支持非结构化文本解析 |
| `kickoff` | 项目启动 | 创建项目目标、计划、结构和推进文档 |
| `daily-work` | 每日计划 / 复盘 | 支持开始一天、每日计划、记录、复盘和明日安排 |
| `decision-record` | 决策记录 | 记录技术选型、架构决策、产品判断、内容策略和项目路线 |
| `content-create` | 内容创作 | 从知识库生成 X、公众号、小红书、视频脚本等内容 |
| `archive` | 归档 | 归档已完成项目、已处理收件箱、过期计划和阶段性资料 |
| `obsidian-markdown` | Obsidian Markdown 规范 | 规范 frontmatter、wikilink、callout、embed、tag 和附件引用 |

## Tool Adapter 结构

`.agents/skills/` 是唯一主规则源。

以下目录只做命令转发：

```text
.claude/commands/
.gemini/commands/
.codex/commands/
```

例如：

```text
.claude/commands/research.md
```

只需要指向：

```text
.agents/skills/research/SKILL.md
```

不要在工具适配层重复维护完整 Skill，否则多工具之间会出现规则不一致。

## 常见组合链路

### 1. 轻量问答链路

```text
ask → 35_问答沉淀（可选） → integrate（可选）
```

适用于简单解释、快速判断、目录放置建议和无需重型沉淀的临时问答。

### 2. 外部资料研究链路

```text
capture → research → integrate → decision-record（可选）
```

适用于分析 GitHub 项目、论文、技术文档、竞品资料。

### 3. 项目启动链路

```text
kickoff → decision-record → daily-work → integrate
```

适用于新项目、新系统、新专题。

### 4. 内容创作链路

```text
research / integrate → content-create → decision-record（可选）
```

适用于 X、公众号、小红书、视频脚本、热点早晚报。

### 5. 每日工作链路

```text
daily-work → kickoff / research / decision-record / integrate / archive
```

适用于开始一天、记录进展、晚间复盘和阶段收尾。

### 6. 生命周期收尾链路

```text
daily-work / kickoff → archive
```

适用于已完成项目、已处理收件箱、过期计划和阶段性资料归档。

## 40 / 50 / 60 三层边界

```text
40_知识库 = llm_wiki 核心结构化知识层
50_资源 = 工具 / 链接 / 案例 / Prompt / 轻量参考资源层
60_原始资料 = 可追溯证据和来源归档层
```

结构化知识页不要放入 `50_资源/`。正式证据应通过 `capture` 进入 `60_原始资料/`。

## 执行安全边界

以下操作需要先给计划，再等用户确认：

- 批量创建文件。
- 批量移动或重命名文件。
- 修改系统规则。
- 修改 Skill 文件。
- 重组目录结构。
- 合并多个知识页。
- 归档大量内容。
- 删除用户资料。

## Skill 编写原则

每个 Skill 应保持标准结构：

```text
目标
触发条件
输入判断
执行流程
输出位置
模板引用
边界规则
质量检查
```

不要把 Skill 写成过长的论文。复杂解释应放到 `docs/` 或 `99_系统/` 中。

## 维护建议

- 修改 Skill 时，必须同步 CN 和 EN。
- 修改路径时，更新对应命令转发文件。
- 新增 Skill 时，需要同步更新 `.agents/index.md`、入口文件、docs、changelog 和 `tools/validate-structure.py`。
- 不要让 `.claude/.gemini/.codex` 成为第二套规则源。
- 介绍类文档应使用“当前版本包含 10 个核心 Skill”，历史 changelog / handoff 可保留旧版本记录。