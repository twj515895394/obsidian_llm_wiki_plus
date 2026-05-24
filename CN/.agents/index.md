# Agent Skills Index

本目录是 `obsidian_llm_wiki_plus` 的项目级 Skill 中心。

## 使用原则

- `.agents/skills/` 是唯一主规则源。
- `.claude/commands/`、`.gemini/commands/`、`.codex/commands/` 只做命令转发。
- 复杂任务先读取对应 Skill，再执行。
- 不要把复杂流程塞进 `CLAUDE.md`、`AGENTS.md`、`GEMINI.md`。
- 批量创建、批量修改、重构目录、合并知识页前，必须先给计划并等待用户确认。

## Skill 路由

| Skill | 中文名 | 触发场景 | 主要输出位置 |
|---|---|---|---|
| `ask` | 轻量问答 | 简单问题、快速解释、轻量判断、无需沉淀的问答 | 对话为主；可选 `35_问答沉淀/` |
| `capture` | 资料捕获 | 外部链接、GitHub、本地路径、PDF、网页、视频、论文、长文本、上传文件 | `60_原始资料/` |
| `research` | 深度研究 | 项目分析、技术调研、方案对比、主题研究 | `30_研究/` |
| `integrate` | 知识沉淀 | 整理成知识库、提取概念、更新 Wiki、沉淀方法论 | `40_知识库/` |
| `kickoff` | 项目启动 | 启动项目、设计系统、创建专题、规划交付物 | `20_项目/` |
| `daily-work` | 每日计划 / 复盘 | 今日计划、每日记录、复盘、明日安排、开始一天 | `10_日记/` |
| `decision-record` | 决策记录 | 技术选型、架构判断、内容策略、项目路线 | `80_决策中心/` |
| `content-create` | 内容创作 | X、公众号、小红书、视频脚本、选题库、热点早晚报 | `70_内容创作/` |
| `archive` | 归档 | 已完成项目、已处理收件箱、过期计划、阶段收尾 | `99_系统/归档/`、`90_计划/归档/` |
| `obsidian-markdown` | Obsidian Markdown 规范 | wikilink、frontmatter、callout、embed、附件引用、模板格式 | 规范辅助，不固定输出目录 |

## 目录分层

```text
60_原始资料 = 原始证据
30_研究 = 分析过程
35_问答沉淀 = 高价值对话
40_知识库 = llm_wiki 核心结构化知识层
50_资源 = 工具 / 链接 / 案例 / Prompt / 轻量参考资源
20_项目 = 项目推进
70_内容创作 = 内容输出
80_决策中心 = 重要判断
90_计划 = 待办 / 审核 / 路线图 / 归档
99_系统 = 规则 / 模板 / 日志 / 归档
```

## 推荐链路

```text
ask → capture → research → integrate → decision-record → content-create → archive
```

典型用法：

- 简单问题先用 `ask`，不要过度流程化。
- 外部资料先用 `capture` 建立来源。
- 需要分析时进入 `research`。
- 可复用知识进入 `integrate`。
- 重要选择进入 `decision-record`。
- 对外表达进入 `content-create`。
- 阶段结束后用 `archive` 收尾。

## Obsidian 写作规范

创建或修改 Markdown 文件时，如涉及 frontmatter、wikilink、callout、embed、附件路径，应参考：

```text
.agents/skills/obsidian-markdown/SKILL.md
```