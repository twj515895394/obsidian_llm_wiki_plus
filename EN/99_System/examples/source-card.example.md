---
type: source
source_type: github
title: llm_wiki Design Reference
url: https://github.com/example/llm-wiki-reference
captured_at: 2026-05-24
status: active
importance: S
used_by:
  - "[[LLM Wiki Knowledge Compilation Research]]"
  - "[[Does an AI Knowledge Base Need a Raw Source Layer]]"
tags:
  - LLM Wiki
  - Obsidian
  - Agent
---

# llm_wiki Design Reference

## Original source

https://github.com/example/llm-wiki-reference

## Why it was captured

This source helps explain the design pattern of raw sources → structured wiki → traceable knowledge evolution. It is an important reference for `60_Raw_Sources`, `40_Knowledge_Base`, and the `integrate` skill in `obsidian_llm_wiki_plus`.

## Summary

The reference emphasizes that AI should not only retrieve sources at query time. Instead, the LLM should continuously maintain a structured wiki. Raw sources remain as evidence, while wiki pages become the evolving synthesis layer.

## Key notes

- Raw sources should not be overwritten by summaries.
- Wiki pages should evolve over time instead of becoming isolated reports.
- Sources, timestamps, status, conflicts, and review points should be part of the knowledge model.

## Future use

- Reference for the `capture` skill.
- Reference for the `integrate` skill.
- Evidence for the decision on why a raw source layer is needed.

## Derived content

- Research note: [[LLM Wiki Knowledge Compilation Research]]
- Wiki pages: [[Raw Source Layer]], [[Structured Wiki]]
- Decision record: [[Does an AI Knowledge Base Need a Raw Source Layer]]
