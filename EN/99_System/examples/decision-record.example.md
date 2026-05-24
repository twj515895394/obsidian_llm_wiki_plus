---
type: decision
status: accepted
created: 2026-05-24
updated: 2026-05-24
review_after: 2026-08-24
tags:
  - Knowledge Base Design
  - Raw Sources
---

# Does an AI Knowledge Base Need a Raw Source Layer

## Decision question

Should the first version of `obsidian_llm_wiki_plus` include a dedicated `60_Raw_Sources/` layer instead of only keeping research notes and wiki pages?

## Background

Users often give agents GitHub links, technical articles, PDFs, product documents, and long-form text for analysis. If the system only stores the analysis output, it becomes hard to verify conclusions, handle source updates, resolve conflicts, or detect outdated information.

## Alternatives

| Option | Pros | Cons |
|---|---|---|
| No raw source layer | Simpler structure | Conclusions are hard to verify |
| Store links only | Lightweight | Broken links make review difficult |
| Tiered raw source capture | Balances traceability and cost | Requires capture rules |

## Decision

Use tiered raw source capture. The `capture` skill should classify source importance and ask the user before saving source cards when needed.

## Rationale

- Technical and AI tool information changes quickly.
- Research notes, wiki pages, and decision records need evidence chains.
- Tiered capture avoids turning the vault into a raw-data dump.

## Risks and review

- Risk: users may find capture confirmations too frequent.
- Mitigation: proactively ask only for S/A-level sources.
- Review date: 2026-08-24.
