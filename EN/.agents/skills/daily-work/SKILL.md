# Daily Work Skill

## Goal

Use this skill to support daily planning, daily logging, review, and next-day preparation.

Daily work connects projects, plans, inbox items, and reviews.

## Triggers

Use this skill when the user asks for:

- start my day
- today’s plan
- daily plan
- daily log
- daily review
- summarize today
- plan tomorrow
- review progress

## Workflow

### Morning / Planning

1. Check recent project notes, planning items, and unresolved tasks.
2. Identify today’s priorities.
3. Separate must-do, should-do, and optional items.
4. Note risks, blockers, and focus areas.
5. Create or update today’s daily note.

### During the Day

1. Capture progress updates.
2. Link work to projects or research notes.
3. Move new ideas into `00_Inbox/` if not immediately processed.
4. Record important decisions or issues.

### Evening / Review

1. Summarize what was completed.
2. Record what changed.
3. Identify unfinished items.
4. Extract reusable lessons or knowledge candidates.
5. Prepare tomorrow’s next actions.

## Output Location

```text
10_Daily/
```

Tasks and future items may go to:

```text
90_Planning/todo/
```

Unprocessed ideas may go to:

```text
00_Inbox/
```

## Template

Use:

```text
99_System/templates/daily-note.md
```

## Boundaries

Do not turn the daily note into a dumping ground.

Project-specific details should link to `20_Projects/`.

Reusable knowledge should later be processed by `integrate`.

## Quality Check

Before finishing, check:

- Today’s priorities are clear.
- Completed and unfinished items are separated.
- Follow-ups are visible.
- Project links exist when relevant.
- Knowledge candidates are not lost.
