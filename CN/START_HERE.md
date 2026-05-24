# 从这里开始

欢迎使用 `obsidian_llm_wiki_plus` 中文版 Vault。

这个 Vault 的目标不是让你“多写笔记”，而是帮助你把资料、研究、项目、内容和决策变成一个长期可复用的知识系统。

## 1. 先理解三个层次

```text
资料层：60_原始资料
知识层：30_研究 / 35_问答沉淀 / 40_知识库
行动层：20_项目 / 70_内容创作 / 80_决策中心 / 90_计划
```

## 2. 常见输入应该放哪里？

| 你手里的东西 | 推荐位置 | 推荐 Skill |
|---|---|---|
| 一个链接、PDF、GitHub 仓库、本地文件 | `60_原始资料/` | `capture` |
| 一次技术调研、项目分析、产品分析 | `30_研究/` | `research` |
| 一次高价值 AI 问答 | `35_问答沉淀/` | `integrate` |
| 一个可复用概念、方法论、观点 | `40_知识库/` | `integrate` |
| 一个新项目或专题 | `20_项目/` | `kickoff` |
| 每日计划、复盘、明日安排 | `10_日记/` | `daily-work` |
| 技术选型、架构判断、内容策略 | `80_决策中心/` | `decision-record` |
| X、公众号、小红书、视频脚本 | `70_内容创作/` | `content-create` |

## 3. 和 Agent 一起使用

你可以在 Vault 根目录中使用 Claude Code、Codex、Gemini CLI 等工具。

Agent 入口文件：

- `CLAUDE.md`
- `AGENTS.md`
- `GEMINI.md`

核心 Skill 位于：

```text
.agents/skills/
```

## 4. 第一次推荐尝试

你可以对 Agent 说：

```text
帮我基于这个链接做一次 capture，判断是否需要保存到 60_原始资料。
```

或者：

```text
帮我启动一个新项目，先按 kickoff 给我一个项目计划。
```

## 5. 查看示例

示例文件位于：

```text
99_系统/示例/
```

建议先看：

- `source-card.example.md`
- `research-note.example.md`
- `wiki-page.example.md`
- `decision-record.example.md`

这些文件展示了不同 Skill 的典型产物长什么样。
