# review.md

## Purpose

The review system prevents the vault from being polluted by uncertain merges, outdated conclusions, hidden conflicts, or unsafe automated edits.

## When to Create a Review Item

Create a review item when:

- sources conflict
- an old conclusion may be outdated
- a page may need to be merged with another page
- a page may need to be deleted or archived
- a decision may need to be changed
- confidence is low but the topic affects future work
- an agent is about to make a large structural change

## Review Queue

Use:

```text
90_Planning/review-queue/
```

## Review Item Format

```markdown
# Review: {{title}}

## Reason

Why this item needs review.

## Related Pages

- [[page-a]]
- [[page-b]]

## Related Sources

- [[source-card]]

## Options

1. Keep as is
2. Update
3. Merge
4. Archive
5. Delete after confirmation

## Recommended Action

Agent recommendation with reason.

## User Decision

Pending.
```

## Rules

- Do not hide uncertainty.
- Do not merge important pages without confirmation.
- Do not delete user content without explicit confirmation.
- Do not downgrade or deprecate important decisions silently.
- Prefer review items over risky automatic edits.
