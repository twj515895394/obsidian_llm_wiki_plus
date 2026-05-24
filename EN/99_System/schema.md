# schema.md

## Directory Layers

| Layer | Directory | Responsibility |
|---|---|---|
| Input | `00_Inbox/` | Temporary ideas and unprocessed inputs |
| Time | `10_Daily/` | Daily planning, logs, and reviews |
| Project | `20_Projects/` | Project execution, deliverables, and retrospectives |
| Research | `30_Research/` | Topic research, analysis reports, investigation notes |
| Q&A | `35_QA_Library/` | High-value AI conversations and reusable answers |
| Knowledge | `40_Knowledge_Base/` | Structured wiki and reusable knowledge |
| Resources | `50_Resources/` | Tools, links, examples, materials |
| Evidence | `60_Raw_Sources/` | Raw sources, assets, snapshots |
| Output | `70_Content_Creation/` | Articles, posts, scripts, topic briefs |
| Decision | `80_Decision_Center/` | Important decisions, selections, strategies |
| Planning | `90_Planning/` | Todo, review queue, roadmap, archive |
| System | `99_System/` | Rules, templates, logs, lifecycle |

## Knowledge Base Types

| Type | Directory | Description |
|---|---|---|
| entity | `entities/` | people, companies, products, tools, projects |
| concept | `concepts/` | concepts, theories, terms |
| workflow | `workflows/` | SOPs, processes, practices |
| claim | `claims/` | verifiable judgments, conclusions, trends |
| decision | `decisions/` | knowledge summaries of decisions |
| synthesis | `synthesis/` | cross-source understanding |
| comparison | `comparisons/` | comparisons between multiple objects |

## Recommended Frontmatter

```yaml
---
type: concept
status: active
confidence: 0.7
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: []
related: []
review_after: YYYY-MM-DD
---
```

## Status Values

| Status | Meaning |
|---|---|
| draft | Work in progress |
| active | Currently valid |
| needs-review | Requires review |
| stale | Possibly outdated |
| deprecated | Replaced or no longer recommended |
| archived | Kept for history |

## Confidence Guide

| Score | Meaning |
|---|---|
| 0.3 | Early personal judgment with weak sources |
| 0.5 | Some evidence but still needs validation |
| 0.7 | Clear sources and analysis |
| 0.9 | Multi-source or practice-validated conclusion |

## Linking Rules

- Research notes should link to source cards.
- Wiki pages should link to sources, related concepts, and related projects.
- Decision records should link to research notes, source cards, and knowledge pages.
- Content drafts should link to the knowledge or research they reuse.
- Review items should link to the pages or sources that need action.
