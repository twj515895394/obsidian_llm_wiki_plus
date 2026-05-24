---
type: source
source_type: github
title: llm_wiki 设计参考
url: https://github.com/example/llm-wiki-reference
captured_at: 2026-05-24
status: active
importance: S
used_by:
  - "[[LLM Wiki 知识编译系统研究]]"
  - "[[AI 知识库是否需要原始资料层]]"
tags:
  - LLM Wiki
  - Obsidian
  - Agent
---

# llm_wiki 设计参考

## 原始来源

https://github.com/example/llm-wiki-reference

## 保存原因

该资料用于理解“原始资料 → 结构化 Wiki → 可追溯知识演化”的设计模式，是 `obsidian_llm_wiki_plus` 中 `60_原始资料`、`40_知识库` 和 `integrate` Skill 的重要参考。

## 内容摘要

该项目强调不要只在查询时临时 RAG，而是让 LLM 持续维护一个结构化 Wiki。原始资料保留为证据层，Wiki 页面作为综合层，并通过日志、索引和 schema 保持可维护性。

## 关键片段

- 原始资料不应被总结覆盖。
- Wiki 页面应持续更新，而不是每次生成孤立报告。
- 来源、时间、状态、冲突和复查点应成为知识页的一部分。

## 后续用途

- 作为 `capture` Skill 的来源管理参考。
- 作为 `integrate` Skill 的知识沉淀参考。
- 作为决策记录中“为什么需要原始资料层”的依据。

## 派生内容

- 研究笔记：[[LLM Wiki 知识编译系统研究]]
- 知识页：[[原始资料层]]、[[结构化 Wiki]]
- 决策记录：[[AI 知识库是否需要原始资料层]]
