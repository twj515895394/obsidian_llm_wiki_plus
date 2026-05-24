---
type: concept
status: active
confidence: 0.78
created: 2026-05-24
updated: 2026-05-24
sources:
  - "[[llm_wiki Design Reference]]"
review_after: 2026-08-24
tags:
  - Knowledge Base
  - LLM Wiki
---

# Raw Source Layer

## Definition

The raw source layer is the part of a knowledge base that preserves external evidence, including links, files, web snapshots, repository snapshots, uploaded documents, and pasted text. Its core principle is: **raw sources should not be overwritten by AI summaries, and all derived content should remain traceable to its sources.**

## Why it matters

Without a raw source layer, AI-generated research notes and wiki pages can become polished but unverifiable second-hand content. This weakens long-term trust in technical selections, architecture decisions, product strategy, and content creation.

## Key points

- Raw sources go into `60_Raw_Sources/`.
- Source cards record origin, capture reason, summary, future use, and derived content.
- Research notes, wiki pages, and decision records should reference source cards when possible.
- Raw sources and analysis results must stay separate.

## Related pages

- [[Structured Wiki]]
- [[Source to Wiki Workflow]]
- [[Does an AI Knowledge Base Need a Raw Source Layer]]

## Open questions

- Do different source types need different capture levels?
- Should GitHub repository snapshots include explicit version or commit metadata?
