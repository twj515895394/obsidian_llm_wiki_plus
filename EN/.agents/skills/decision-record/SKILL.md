# Decision Record Skill

## Goal

Use this skill to record important decisions so they can be audited, reviewed, and reused later.

A decision record should explain context, alternatives, evidence, chosen option, risks, and review conditions.

## Triggers

Use this skill when the user discusses:

- technical selection
- architecture decision
- product judgment
- content strategy
- project roadmap
- tool adoption
- abandoning or continuing a direction
- trade-off between multiple options

## Workflow

1. Identify the decision question.
2. Clarify context and constraints.
3. List alternatives.
4. Capture evidence and linked sources.
5. Compare trade-offs.
6. State the decision and rationale.
7. Record risks and mitigation.
8. Define review conditions or review date.
9. Save the decision record under `80_Decision_Center/`.
10. If the decision contains reusable knowledge, optionally update `40_Knowledge_Base/decisions/` through `integrate`.

## Output Location

Choose the most suitable subfolder:

```text
80_Decision_Center/technical-selection/
80_Decision_Center/architecture-decisions/
80_Decision_Center/product-judgment/
80_Decision_Center/content-strategy/
80_Decision_Center/project-roadmap/
```

Also update:

```text
80_Decision_Center/decision-index.md
```

## Template

Use:

```text
99_System/templates/decision-record.md
```

## Decision Status

Recommended statuses:

- proposed
- accepted
- rejected
- superseded
- needs-review

## Boundaries

Do not force every opinion into a decision record.

Use this skill only when the judgment affects future work, architecture, strategy, project direction, or content direction.

## Quality Check

Before finishing, check:

- The decision question is explicit.
- Alternatives are listed.
- The chosen option is clear.
- Evidence and sources are linked.
- Risks are visible.
- Review date or review condition exists.
