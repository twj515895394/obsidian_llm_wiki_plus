# CLAUDE.md

你正在一个 `obsidian_llm_wiki_plus` Vault 中工作。本文件面向 Claude Code。

这是一个面向 Obsidian + LLM + Agent Skills 的综合型知识操作系统。你的任务不是简单回答问题，而是在用户需要时，帮助用户把资料、研究、项目、内容和决策沉淀到可追溯、可复用、可演化的知识库中。

---

## Claude Code 使用原则

1. 复杂任务先读取 `.agents/index.md`。
2. 再根据任务读取 `.agents/skills/<skill>/SKILL.md`。
3. 批量创建、批量修改、移动、归档、重构目录前，先给计划并等待用户确认。
4. 不要把复杂流程复制到本文件；本文件只做入口。

---

## Skill 路由

| 用户意图 | 应使用的 Skill |
|---|---|
| 简单问题、快速解释、轻量判断 | `.agents/skills/ask/SKILL.md` |
| 外部链接、GitHub、本地路径、PDF、网页、视频、论文、长文本资料 | `.agents/skills/capture/SKILL.md` |
| 深度研究、项目分析、技术调研、方案对比 | `.agents/skills/research/SKILL.md` |
| 整理成知识库、提取概念、沉淀 Wiki、更新知识页 | `.agents/skills/integrate/SKILL.md` |
| 启动项目、设计系统、创建专题、规划交付物 | `.agents/skills/kickoff/SKILL.md` |
| 今日计划、每日记录、每日复盘、明日安排、开始一天 | `.agents/skills/daily-work/SKILL.md` |
| 技术选型、架构决策、产品判断、内容策略、项目路线 | `.agents/skills/decision-record/SKILL.md` |
| X、公众号、小红书、视频脚本、选题库、内容草稿 | `.agents/skills/content-create/SKILL.md` |
| 已完成项目、已处理收件箱、过期计划、阶段收尾 | `.agents/skills/archive/SKILL.md` |
| frontmatter、wikilink、callout、embed、附件引用、Markdown 格式 | `.agents/skills/obsidian-markdown/SKILL.md` |

---

## 目录路由规则

| 内容类型 | 目标目录 |
|---|---|
| 临时输入、碎片想法、未处理内容 | `00_收件箱/` |
| 每日计划、每日记录、每日复盘 | `10_日记/` |
| 项目文档、任务推进、交付物 | `20_项目/` |
| 深度研究、主题调研、分析报告 | `30_研究/` |
| 高价值 AI 问答、可复用对话结果 | `35_问答沉淀/` |
| 结构化知识、概念、实体、观点、方法论 | `40_知识库/` |
| 工具、链接、案例、提示词模板、轻量参考资源 | `50_资源/` |
| 原始链接、原始文件、附件、网页快照、仓库快照 | `60_原始资料/` |
| X、公众号、小红书、视频脚本、选题、素材 | `70_内容创作/` |
| 技术选型、架构决策、策略判断、项目路线 | `80_决策中心/` |
| 待执行、待审核、路线图、归档 | `90_计划/` |
| 规则、模板、日志、归档、生命周期管理 | `99_系统/` |

---

## 40 / 50 / 60 三层边界

```text
40_知识库 = llm_wiki 核心结构化知识层
50_资源 = 工具 / 链接 / 案例 / Prompt / 轻量参考资源层
60_原始资料 = 可追溯证据和来源归档层
```

不要把正式证据放进 `50_资源/`。
不要把结构化知识页放进 `50_资源/`。
如果资料会支撑研究、知识页或决策记录，必须进入 `60_原始资料/` 并建立 source card。

---

## 强制规则

- 外部资料必须先判断是否触发 `capture`。
- 不要在未获得用户确认的情况下批量复制、移动、归档或删除文件。
- 原始资料、研究分析、结构化知识、决策记录和内容输出必须分层保存。
- 创建新知识页前，优先检查已有页面。
- 重要结论必须尽量保留来源。
- 不确定、冲突、需合并或可能过期的内容进入 `90_计划/待审核/`。

---

## 语言规则

当前目录是 CN 版本。请优先使用中文进行回答、写作和生成文档。

保留工具路径、Skill 名称和模板文件名的英文形式。

---

## 模板使用规则

常用模板位于：`99_系统/模板/`。

- `source-card.md`
- `research-note.md`
- `wiki-page.md`
- `decision-record.md`
- `project-note.md`
- `daily-note.md`
- `content-brief.md`

创建对应类型文件时，应优先参考模板。涉及 Obsidian Markdown 细节时，参考 `.agents/skills/obsidian-markdown/SKILL.md`。