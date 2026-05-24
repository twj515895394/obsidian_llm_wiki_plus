# Knowledge Integration Skill

## Goal

Use this skill to turn research notes, Q&A entries, project lessons, and decision discussions into structured wiki knowledge.

This skill updates `40_Knowledge_Base/`. Its goal is not to create more files, but to improve reusable knowledge quality.

## Triggers

Use this skill when the user asks to:

- organize something into the knowledge base
- extract concepts, entities, claims, or workflows
- update wiki pages
- integrate research results
- convert Q&A into reusable knowledge
- clean up duplicate pages
- build synthesis or comparison pages

## Knowledge Types

| Type | Directory | Use For |
|---|---|---|
| entity | `40_Knowledge_Base/entities/` | people, companies, products, tools, projects |
| concept | `40_Knowledge_Base/concepts/` | concepts, theories, terms |
| workflow | `40_Knowledge_Base/workflows/` | SOPs, processes, methods |
| claim | `40_Knowledge_Base/claims/` | verifiable judgments, conclusions, trends |
| decision | `40_Knowledge_Base/decisions/` | knowledge summaries of decisions |
| synthesis | `40_Knowledge_Base/synthesis/` | cross-source understanding |
| comparison | `40_Knowledge_Base/comparisons/` | comparisons between multiple objects |

## Workflow

1. Identify the source material: research note, Q&A, project note, decision record, or raw source.
2. Search existing wiki pages before creating new ones.
3. Decide whether to update, merge, or create pages.
4. Extract candidate knowledge objects.
5. Link each knowledge object to its sources.
6. Add or update frontmatter:
   - `type`
   - `status`
   - `confidence`
   - `created`
   - `updated`
   - `sources`
   - `related`
   - `review_after`
7. Update `40_Knowledge_Base/index.md` or `overview.md` when needed.
8. If there is uncertainty, conflict, or deletion/merge risk, place it into the review queue.

## Template

Use:

```text
99_System/templates/wiki-page.md
```

## Review Queue

Use:

```text
90_Planning/review-queue/
```

when:

- multiple sources conflict
- an old conclusion may be outdated
- two pages should be merged
- a page may need deletion or archival
- confidence is low but the page may affect decisions

## Boundaries

Do not overwrite raw sources.

Do not convert every sentence into a wiki page.

Prefer updating existing pages over creating duplicates.

## Quality Check

Before finishing, check:

- The target knowledge type is clear.
- Existing pages were checked.
- Sources are linked.
- Confidence and status are reasonable.
- Related pages are linked.
- Open conflicts are recorded instead of hidden.
