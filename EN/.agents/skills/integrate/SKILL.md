# Knowledge Integration Skill

## Goal

Use this skill to turn research notes, Q&A entries, project lessons, source analysis, and decision discussions into structured wiki knowledge.

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
- structure a block of unorganized text
- extract entities, concepts, workflows, claims, or comparisons from source material

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

1. Identify the source material: research note, Q&A, project note, decision record, raw source, or pasted text.
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

## Unstructured Text Parsing Mode

Use this mode when the user provides a large block of unorganized text, chat history, meeting notes, research excerpts, or scattered notes and asks to organize, parse, or integrate it.

### Steps

1. Decide whether the input should first enter `60_Raw_Sources/`.
   - If it is external material or a traceable source, route through `capture` first.
   - If it is the user's own temporary notes, process it directly here.

2. Identify the main topic.
   - Extract one main topic.
   - Decide whether it should become a `30_Research/` note or update existing wiki pages directly.

3. Extract atomic knowledge candidates.
   - Entities: people, companies, products, projects, tools.
   - Concepts: terms, models, theories, mechanisms.
   - Workflows: steps, procedures, SOPs, practice patterns.
   - Claims: judgments, conclusions, trends, hypotheses.
   - Comparisons: differences between multiple objects.

4. Create or update the main note.
   - If the input contains a full analysis process, save it under `30_Research/`.
   - If it only contains reusable knowledge points, update `40_Knowledge_Base/` directly.

5. Create or update atomic wiki pages.
   - Prefer updating existing pages.
   - New pages must have a clear definition, sources, current judgment, and open questions.

6. Build bidirectional links.
   - Main note links to atomic pages.
   - Atomic pages link back to the main note or source card.

### Report Format

```markdown
## Knowledge Integration Complete

**Main note:** [[Topic]]

**Updated / created knowledge entries:**
- [[Concept A]]: one-line explanation
- [[Entity B]]: one-line explanation
- [[Workflow C]]: one-line explanation

**Relationships:**
- Main note links to N knowledge entries
- M cross-page links were created

**Review queue:**
- [ ] Question that needs confirmation
```

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

Strong claims must have sources or be clearly marked as personal judgment.

Full decision records belong in `80_Decision_Center/`; `40_Knowledge_Base/decisions/` should only keep knowledge-level summaries.

`50_Resources/` is for resource links, tools, cases, and prompt templates. Do not place structured wiki pages there.

## Quality Check

Before finishing, check:

- The target knowledge type is clear.
- Existing pages were checked.
- Sources are linked.
- Confidence and status are reasonable.
- Related pages are linked.
- Open conflicts are recorded instead of hidden.