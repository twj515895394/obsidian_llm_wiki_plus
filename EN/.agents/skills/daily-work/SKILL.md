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

## Modes

### Mode A: Start the Day / Morning Planning

1. Get today’s date.
2. Read yesterday’s daily note.
   - Path: `10_Daily/YYYY-MM-DD.md`
   - Extract unfinished tasks.
   - Note what was worked on yesterday.
3. Check active projects.
   - Search `20_Projects/` for projects with `status: active`.
   - Identify current phase, pending actions, last update date, and stale projects.
4. Check inbox.
   - Review pending items in `00_Inbox/`.
   - Count items and flag whether cleanup may be needed.
5. Check planning areas.
   - `90_Planning/todo/`
   - `90_Planning/review-queue/`
   - `90_Planning/roadmap/`
6. Ask the user for today’s main focus.
   - Prefer options based on active projects.
   - Allow new focus input.
7. Create or update today’s daily note.
   - Use `99_System/templates/daily-note.md`.
   - Save to `10_Daily/YYYY-MM-DD.md`.

### Mode B: During the Day

Record:

- completed work
- inserted tasks
- decision changes
- new sources
- new problems
- reusable knowledge candidates

If external material appears, route to `capture`.
If an important judgment appears, route to `decision-record`.
If reusable knowledge appears, route to `integrate`.

### Mode C: Evening Review

1. Compare against today’s plan.
2. Summarize completed work.
3. Record unfinished items.
4. Identify blockers and reasons.
5. Extract reusable lessons.
6. Prepare tomorrow’s next actions.
7. Update projects, knowledge base, or decision center when needed.

## Daily Note Structure

```markdown
# YYYY-MM-DD Daily Note

## Focus

## Planned Tasks

## Actual Progress

## Inserted Tasks

## Blockers and Problems

## New Sources

## New Judgments / Decisions

## Knowledge Candidates

## Review

## Tomorrow
```

## Output Location

```text
10_Daily/
```

Recommended filename:

```text
YYYY-MM-DD.md
```

Unprocessed ideas go to:

```text
00_Inbox/
```

Future tasks or review items go to:

```text
90_Planning/todo/
90_Planning/review-queue/
```

## Skill Links

- Quick question: use `ask`.
- External source: use `capture`.
- Research issue: use `research`.
- Reusable lesson: use `integrate`.
- Important judgment: use `decision-record`.
- New project: use `kickoff`.
- Phase closure: use `archive`.

## Boundaries

Do not overload the daily plan.

Keep today’s focus to at most 3 major items.

Do not turn every temporary idea into a wiki page.

Separate facts, feelings, problems, and next actions during review.

If today’s note already exists, update it carefully instead of overwriting it.

## Quality Check

Before finishing, check:

- Today’s priorities are clear and limited.
- Yesterday’s note and unfinished tasks were checked.
- Active projects and inbox were reviewed.
- Completed and unfinished items are separated.
- Blockers are visible.
- Tomorrow’s next actions are clear.
- Project, knowledge, or decision follow-ups are not lost.