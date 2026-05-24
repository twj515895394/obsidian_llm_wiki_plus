# 使用指南

本文说明如何使用 `obsidian_llm_wiki_plus` 初始化和维护自己的 Obsidian + LLM Wiki Vault。

## 1. 选择语言版本

如果你主要使用中文，复制 `CN/`：

```bash
cp -r CN my-knowledge-vault
```

如果你主要使用英文，复制 `EN/`：

```bash
cp -r EN my-knowledge-vault
```

然后用 Obsidian 打开复制后的目录。

## 2. 从 START_HERE 开始

进入 Vault 后，先阅读：

```text
START_HERE.md
```

它会告诉你：

- 每个核心目录放什么。
- Agent 应如何读取入口规则。
- 7 个 Skill 分别用于什么场景。
- 日常使用的推荐流程。

## 3. 配合 Agent 使用

在 Vault 根目录中启动 Claude Code、Codex、Gemini CLI 或其他 Agent 工具。

入口文件：

```text
CLAUDE.md
AGENTS.md
GEMINI.md
```

这些文件会告诉 Agent：

- 当前 Vault 是什么。
- 目录如何路由。
- 遇到不同任务时读取哪个 Skill。
- 哪些操作需要先询问用户。

## 4. 常见工作流

### 保存资料

当你给 Agent 一个链接、PDF、本地路径、GitHub 仓库、网页文章或长文本时，Agent 应考虑使用：

```text
.agents/skills/capture/SKILL.md
```

长期有价值的资料会进入：

```text
60_原始资料/
```

### 深度研究

当你要求分析一个项目、技术方案、产品或主题时，Agent 应使用：

```text
.agents/skills/research/SKILL.md
```

研究结果通常进入：

```text
30_研究/
```

### 知识沉淀

当研究结果或问答内容具有长期价值时，Agent 应使用：

```text
.agents/skills/integrate/SKILL.md
```

沉淀到：

```text
40_知识库/
```

### 项目启动

当你要启动项目、专题或系统设计时，Agent 应使用：

```text
.agents/skills/kickoff/SKILL.md
```

项目内容进入：

```text
20_项目/
```

### 每日计划和复盘

当你要开始今天、总结今天或安排明天时，Agent 应使用：

```text
.agents/skills/daily-work/SKILL.md
```

每日内容进入：

```text
10_日记/
```

### 决策记录

当你讨论技术选型、架构判断、产品方向、内容策略或项目路线时，Agent 应使用：

```text
.agents/skills/decision-record/SKILL.md
```

决策进入：

```text
80_决策中心/
```

### 内容创作

当你要写 X、公众号、小红书、视频脚本、热点早晚报时，Agent 应使用：

```text
.agents/skills/content-create/SKILL.md
```

草稿进入：

```text
70_内容创作/
```

## 5. 文件创建建议

- 临时内容先进入 `00_收件箱/`。
- 有来源的资料先进入 `60_原始资料/`。
- 研究过程进入 `30_研究/`。
- 可复用知识进入 `40_知识库/`。
- 明确决策进入 `80_决策中心/`。
- 内容输出进入 `70_内容创作/`。
- 不确定事项进入 `90_计划/待审核/`。

## 6. 使用模板

模板位于：

```text
99_系统/模板/
```

常用模板：

```text
source-card.md
research-note.md
wiki-page.md
decision-record.md
project-note.md
daily-note.md
content-brief.md
```

Agent 创建文件时应优先参考这些模板。

## 7. 使用示例

示例位于：

```text
99_系统/示例/
```

你可以通过这些示例理解每类产物的目标结构。

## 8. 维护建议

- 每周检查一次 `90_计划/待审核/`。
- 每月复查重要决策记录。
- 对技术判断设置复查日期。
- 高价值问答不要只留在聊天记录里，要沉淀到 Vault。
- 不要为了整理而整理，所有沉淀都应该服务于后续复用。

## 自动化初始化

推荐使用：

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault
```

更多说明见 `docs/CN/automation.md`。
