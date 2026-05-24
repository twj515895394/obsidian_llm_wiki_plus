# lifecycle.md

## Purpose

Knowledge in this vault has a lifecycle. It can be drafted, validated, become active, grow stale, be superseded, or be archived.

This document defines lifecycle states and review practices.

## Status Values

| Status | Meaning |
|---|---|
| draft | Initial note or incomplete page |
| active | Currently useful and valid |
| needs-review | Requires user or agent review |
| stale | Possibly outdated because time or context changed |
| deprecated | Superseded by newer knowledge |
| archived | Kept for history, not active use |

## Review Timing

Suggested review intervals:

| Content Type | Review Interval |
|---|---|
| AI tools and model capability notes | 30–60 days |
| technical architecture decisions | 90–180 days |
| project plans | weekly or milestone-based |
| content strategy | 30–90 days |
| stable concepts | 180–365 days |
| raw source cards | review only when linked conclusions change |

## Lifecycle Actions

### Promote

Move a page from `draft` to `active` when it has clear structure, enough evidence, and useful links.

### Mark for Review

Set `status: needs-review` when the page may affect future work but is uncertain.

### Mark Stale

Set `status: stale` when the page may be outdated but not yet replaced.

### Deprecate

Set `status: deprecated` when a newer page, decision, or source supersedes it.

### Archive

Set `status: archived` or move content to an archive folder when it is kept only for historical context.

## Supersession

When replacing old knowledge, use:

```yaml
superseded_by: [[new-page]]
supersedes: [[old-page]]
```

## Rule

Do not delete knowledge just because it is old. Mark lifecycle status first, then archive or remove only after confirmation.
