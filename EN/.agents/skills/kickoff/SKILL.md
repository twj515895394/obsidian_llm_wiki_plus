# Project Kickoff Skill

## Goal

Use this skill to start a new project, system design, long-running initiative, research program, content program, or structured task.

The output should create clarity: goal, scope, deliverables, milestones, risks, and next actions.

## Triggers

Use this skill when the user says things like:

- start a new project
- design a system
- create a plan
- launch a topic or initiative
- organize a long-running task
- build a product, tool, article series, or research series

## Workflow

1. Clarify project goal and success criteria.
2. Identify background, constraints, stakeholders, and assumptions.
3. Define deliverables.
4. Break the project into phases.
5. Identify dependencies and risks.
6. Propose a project structure.
7. Ask for confirmation before creating multiple files.
8. Create the project note under `20_Projects/` after confirmation.
9. Link related research, sources, decisions, and daily plans.

## Output Location

```text
20_Projects/
```

If the project creates a roadmap, also update:

```text
90_Planning/roadmap/
```

If the project requires key decisions, use `decision-record`.

## Template

Use:

```text
99_System/templates/project-note.md
```

## Project Note Sections

A project note should include:

- project background
- goal
- success criteria
- scope
- deliverables
- phases and milestones
- risks
- decisions needed
- related sources and research
- next actions

## Boundaries

Do not create a large project tree without user confirmation.

Do not mix project plans with raw sources or wiki pages. Link them instead.

## Quality Check

Before finishing, check:

- The project goal is clear.
- Deliverables are concrete.
- Next actions are visible.
- Risks and assumptions are recorded.
- Related research or decisions are linked when available.
