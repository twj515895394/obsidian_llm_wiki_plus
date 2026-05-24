# Archive Skill

## Goal

Use this skill to archive completed projects, processed inbox items, outdated plans, and phase-complete materials while keeping active workspaces clean.

The principle is: archive, do not delete; confirm before moving; preserve sources, links, and metadata.

## Triggers

Use this skill when the user asks to:

- archive projects
- clean up the inbox
- archive completed work
- organize processed items
- close a project phase
- clean old plans or tasks

## Archive Targets

| Item | Active Location | Archive Location |
|---|---|---|
| Completed projects | `20_Projects/` | `99_System/archive/projects/YYYY/` |
| Processed inbox items | `00_Inbox/` | `99_System/archive/inbox/YYYY/MM/` |
| Completed plans | `90_Planning/todo/` | `90_Planning/archive/YYYY/` |
| Expired review items | `90_Planning/review-queue/` | `90_Planning/archive/YYYY/` |

## Workflow

1. Identify archive candidates.
   - Look for `status: done`, `status: processed`, or `status: archived` candidates.
   - For files without frontmatter, infer from title, directory, and user instruction.

2. Present an archive plan.
   - List candidate files.
   - Show target archive paths.
   - Explain that content will not be deleted.
   - Wait for user confirmation.

3. Archive after confirmation.
   - Move files or folders to the archive location.
   - Add or update frontmatter: `archived: YYYY-MM-DD`.
   - Preserve existing metadata, wikilinks, and asset references.

4. Update records.
   - Update today’s `10_Daily/YYYY-MM-DD.md` when useful.
   - Log actions in `99_System/logs/` when needed.

5. Output an archive report.
   - Count archived items.
   - Show target paths.
   - Show remaining pending items.
   - Suggest follow-up actions.

## Output Example

```markdown
## Archive Complete

Archived projects:
- [[Project A]] → `99_System/archive/projects/2026/Project A.md`

Archived inbox items:
- `idea-note.md` → `99_System/archive/inbox/2026/05/idea-note.md`

Suggested follow-ups:
- Create a retrospective for Project A
- Process 3 remaining inbox items
```

## Boundaries

- Do not move files in bulk without user confirmation.
- Do not delete files.
- Do not archive unfinished projects unless the user explicitly asks.
- Before archiving a large project, ask whether a project retrospective is needed.
- If archive movement may affect file embeds or asset paths, remind the user to verify them.
- If a wiki page is outdated, do not archive it directly; put it into `90_Planning/review-queue/` first.

## Quality Check

Before finishing, check:

- An archive plan was shown and confirmed.
- Files were moved, not deleted.
- Metadata was preserved.
- Archive date was added.
- An archive report was produced.
- Retrospective or follow-up needs were identified.