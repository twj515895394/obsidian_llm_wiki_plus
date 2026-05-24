---
type: research
status: draft
created: 2026-05-24
updated: 2026-05-24
sources:
  - "[[llm_wiki Design Reference]]"
tags:
  - LLM Wiki
  - Knowledge Base
  - Agent Skills
---

# LLM Wiki Knowledge Compilation Research

## Research question

Compared with a normal Obsidian note vault, why does `obsidian_llm_wiki_plus` need a raw source layer, structured knowledge layer, and skill-based workflow?

## Background

Ordinary knowledge bases often suffer from weak traceability, AI summaries replacing original evidence, and research conclusions that are difficult to update. The core value of an LLM Wiki is that AI does not only answer questions; it helps maintain structured knowledge over time.

## Key findings

1. Raw sources must be preserved separately so conclusions can be traced back to evidence.
2. Research notes and wiki pages should be separated: research notes record reasoning, while wiki pages preserve reusable conclusions.
3. Decision records should be separate because decisions include context, constraints, trade-offs, and review dates.
4. Skills should not become one huge rule file; they should be split into short workflows such as capture, research, and integrate.

## Analysis

The value of `obsidian_llm_wiki_plus` is not the number of folders. The value is the stable evolution path from source to knowledge:

```text
source card → research note → wiki page / decision record / content brief
```

This path reduces the loss of useful AI conversation results and prevents wiki pages from becoming unsourced second-hand summaries.

## Reusable knowledge

- `40_Knowledge_Base/concepts/Raw Source Layer.md`
- `40_Knowledge_Base/concepts/Structured Wiki.md`
- `40_Knowledge_Base/workflows/Source to Wiki Workflow.md`
- `80_Decision_Center/technical-selection/Does an AI Knowledge Base Need a Raw Source Layer.md`

## Open questions

- Should v0.8 add a structure validation script?
- Should the project recommend a specific Obsidian plugin set?
