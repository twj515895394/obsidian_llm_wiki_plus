# obsidian_llm_wiki_plus

> English README is included in the EN vault and will be expanded in the next iteration. For now, see `docs/EN/` and `EN/README.md` for English usage.

**Obsidian + LLM Wiki + Agent Skills = a traceable, reusable, and evolving knowledge operating system.**

`obsidian_llm_wiki_plus` 是一个面向 Obsidian 和 AI Agent 的双语知识库模板项目。

它不是普通的 Obsidian 笔记模板，也不是单纯的任务管理系统，而是尝试把以下能力组合到一个 Vault 中：

- 原始资料保存
- 深度研究分析
- 结构化 Wiki 沉淀
- 项目推进管理
- 每日计划与复盘
- 内容创作素材管理
- 长期决策记录
- Agent Skills 工作流

你可以直接复制 `CN/` 或 `EN/` 目录作为自己的 Obsidian Vault，然后在该目录中使用 Claude Code、Codex、Gemini CLI 等 AI Agent 协同维护知识系统。

---

## 这个项目解决什么问题？

很多人使用 Obsidian、Notion、Markdown 或各种知识库工具时，会遇到几个长期问题：

1. **资料很多，但很难追溯来源**：看过很多网页、PDF、GitHub 项目、文章、视频，但后面很难知道某个结论来自哪里。
2. **笔记很多，但没有变成知识系统**：笔记是孤立的，缺少概念、观点、决策、方法论之间的连接。
3. **AI 对话很有价值，但用完就丢了**：和 LLM 讨论出来的方案、判断、代码思路、内容选题，经常散落在聊天记录里，无法复用。
4. **研究、项目、内容创作是割裂的**：今天调研的东西，明天写文章用不上；项目里的经验，后续也很难沉淀成方法论。
5. **知识会过期，但没人提醒你复查**：技术选型、AI 工具、模型能力、产品策略都在变化，旧结论如果不标记生命周期，容易误导后续判断。

---

## 核心理念

本项目围绕 6 个原则设计：

1. **原始资料可追溯**：外部链接、GitHub 项目、PDF、网页、论文、视频、本地文件、粘贴文本等，都可以作为原始资料进入 `60_原始资料/`。原始资料是证据层，不应该被 AI 直接改写覆盖。
2. **研究过程可沉淀**：深度研究不只是生成一篇报告，还应该提取实体、概念、方法论、观点、决策、综合分析和对比分析。
3. **知识结构可演化**：知识页需要保留来源、更新时间、置信度、状态、待验证问题、相关页面和后续复查时间。
4. **项目经验可复用**：项目不只是任务清单，还应该沉淀背景、目标、方案、关键决策、风险、复盘和可复用经验。
5. **内容创作可从知识库生长**：X、公众号、小红书、视频脚本、热点早晚报等内容，应从已有研究、知识页、决策记录、问答沉淀中提取素材。
6. **重要决策可审计**：技术选型、架构判断、产品方向、内容策略、项目路线，都应该形成决策记录。

---

## 项目结构

```text
obsidian_llm_wiki_plus/
├── README.md
├── README_CN.md
├── LICENSE
├── docs/
│   ├── CN/
│   └── EN/
├── tools/
├── CN/
└── EN/
```

| 路径 | 说明 |
|---|---|
| `README_CN.md` | 中文项目说明 |
| `README.md` | 英文项目说明 |
| `docs/CN/` | 中文设计文档 |
| `docs/EN/` | 英文设计文档 |
| `tools/` | 后续初始化、同步、校验脚本预留目录 |
| `CN/` | 中文版 Obsidian Vault 模板 |
| `EN/` | 英文版 Obsidian Vault 模板 |

---

## 快速开始

### 使用中文版 Vault

```bash
cp -r CN my-knowledge-vault
```

然后用 Obsidian 打开 `my-knowledge-vault`，也可以在该目录中启动 Claude Code、Codex、Gemini CLI 等 Agent 工具。

### 使用英文版 Vault

```bash
cp -r EN my-knowledge-vault
```

然后用 Obsidian 打开该目录。

---

## CN 版 Vault 目录结构

```text
CN/
├── README.md
├── CLAUDE.md
├── AGENTS.md
├── GEMINI.md
├── 00_收件箱/
├── 10_日记/
├── 20_项目/
├── 30_研究/
├── 35_问答沉淀/
├── 40_知识库/
├── 50_资源/
├── 60_原始资料/
├── 70_内容创作/
├── 80_决策中心/
├── 90_计划/
├── 99_系统/
├── .agents/
├── .claude/
├── .gemini/
└── .codex/
```

| 目录 | 说明 |
|---|---|
| `00_收件箱/` | 临时输入、碎片想法、待处理内容 |
| `10_日记/` | 每日计划、工作记录、每日复盘 |
| `20_项目/` | 项目文档、任务推进、交付物 |
| `30_研究/` | 深度研究、主题调研、技术分析 |
| `35_问答沉淀/` | 高价值 AI 问答、可复用对话结果 |
| `40_知识库/` | 结构化 Wiki，包含实体、概念、观点、方法论等 |
| `50_资源/` | 工具、链接、素材、案例、参考资料 |
| `60_原始资料/` | 原始来源、附件、网页快照、仓库快照、导入资料 |
| `70_内容创作/` | X、公众号、小红书、视频脚本、选题库、素材库 |
| `80_决策中心/` | 技术选型、架构决策、产品判断、内容策略、项目路线 |
| `90_计划/` | 待执行、待审核、路线图、归档 |
| `99_系统/` | 系统规则、模板、日志、生命周期管理 |
| `.agents/` | 通用 Agent Skills 主目录 |
| `.claude/` | Claude Code 命令适配层 |
| `.gemini/` | Gemini CLI 命令适配层 |
| `.codex/` | Codex 命令适配层 |

---

## Agent Skills 系统

本项目使用 `.agents/skills/` 作为统一 Skill 主目录。

第一版包含 7 个核心 Skill：

```text
.agents/skills/
├── capture/
├── research/
├── integrate/
├── kickoff/
├── daily-work/
├── decision-record/
└── content-create/
```

| Skill | 中文名 | 作用 |
|---|---|---|
| `capture` | 资料捕获 | 处理外部链接、GitHub、PDF、本地文件、网页、视频、长文本等原始资料 |
| `research` | 深度研究 | 对项目、技术、产品、主题进行系统分析 |
| `integrate` | 知识沉淀 | 将研究结果、问答、项目经验沉淀到结构化 Wiki |
| `kickoff` | 项目启动 | 创建项目计划、项目文档和推进结构 |
| `daily-work` | 每日计划 / 复盘 | 支持每日启动、每日记录、每日复盘 |
| `decision-record` | 决策记录 | 记录技术选型、架构判断、内容策略、项目路线等重要决策 |
| `content-create` | 内容创作 | 从知识库生成 X、公众号、小红书、视频脚本等内容 |

`.claude/`、`.gemini/`、`.codex/` 只做命令转发，不维护重复 Skill 内容。

---

## 典型使用场景

1. **保存外部资料**：用户提供 GitHub 链接、文章链接、PDF 或本地文件路径时，Agent 先判断是否触发 `capture`。
2. **做深度研究**：研究结果进入 `30_研究/`，可复用知识通过 `integrate` 沉淀到 `40_知识库/`。
3. **沉淀高价值问答**：AI 对话可保存到 `35_问答沉淀/`，再提取概念、观点、方法论或决策。
4. **启动项目**：项目文档进入 `20_项目/`。
5. **记录决策**：技术选型、架构路线、产品判断、内容策略进入 `80_决策中心/`。
6. **内容创作**：X、公众号、小红书、视频脚本等进入 `70_内容创作/`。

---

## 双语设计原则

- 内容目录本地化：CN 使用中文目录名，EN 使用英文目录名。
- 工具目录保持英文稳定：`.agents/`、`.claude/`、`.gemini/`、`.codex/` 在 CN/EN 中一致。
- Skill 目录保持英文：`capture`、`research`、`integrate` 等保持一致。
- 文档内容本地化：CN 中文，EN 英文。

---

## 当前状态

第一版目标：完整 CN/EN 骨架、根目录 README、CN/EN Agent 入口文件、7 个核心 Skill、系统规则文档、基础模板、命令转发层和详细 handoff 文档。

`tools/` 目录暂时只保留说明文档，后续再提供初始化脚本、结构同步脚本和校验脚本。


---

## v0.5 usability notes

v0.5 adds `START_HERE.md`, improved directory-level README files, and example outputs.

New users should start with:

1. `EN/START_HERE.md`
2. `EN/CLAUDE.md` or `EN/AGENTS.md`
3. `EN/.agents/index.md`
4. `EN/99_System/examples/`
