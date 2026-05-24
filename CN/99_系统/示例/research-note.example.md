---
type: research
status: draft
created: 2026-05-24
updated: 2026-05-24
sources:
  - "[[llm_wiki 设计参考]]"
tags:
  - LLM Wiki
  - 知识库
  - Agent Skills
---

# LLM Wiki 知识编译系统研究

## 研究问题

相比普通 Obsidian 笔记库，为什么 `obsidian_llm_wiki_plus` 需要引入“原始资料层 + 结构化知识层 + Skill 工作流”？

## 背景

普通知识库经常出现三个问题：资料来源丢失、AI 总结覆盖原文、研究结论无法持续更新。LLM Wiki 的核心价值是让 AI 不只是回答问题，而是持续维护结构化知识。

## 关键发现

1. 原始资料必须独立保存，避免结论失去证据来源。
2. 研究笔记和知识页需要分层：研究记录分析过程，知识页沉淀可复用结论。
3. 决策记录应独立于知识页，因为决策包含时间、约束、取舍和复查点。
4. Skill 不宜写成一个超长规则，而应拆分为 capture、research、integrate 等短流程。

## 分析

`obsidian_llm_wiki_plus` 的价值不在于多创建目录，而在于让资料进入系统之后可以沿着固定链路演化：

```text
source card → research note → wiki page / decision record / content brief
```

这条链路能减少 AI 对话结果流失，也能避免知识页变成无来源的二手总结。

## 可沉淀知识

- `40_知识库/概念/原始资料层.md`
- `40_知识库/概念/结构化 Wiki.md`
- `40_知识库/方法论/Source to Wiki 工作流.md`
- `80_决策中心/技术选型/AI 知识库是否需要原始资料层.md`

## 待验证问题

- 是否需要在 v0.8 增加结构校验脚本？
- 是否需要为 Obsidian 推荐固定插件组合？
