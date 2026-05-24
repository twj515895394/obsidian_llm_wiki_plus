# Deep Research Skill

## Goal

Use this skill to conduct structured research on a topic, technology, product, project, tool, document, or decision question.

Research should produce a clear analysis note, not just a chat answer. Reusable findings should later be processed by `integrate`.

## Triggers

Use this skill when the user asks to:

- analyze a project, repository, tool, product, or technical topic
- compare multiple options
- understand a document or source set
- produce a research note, investigation report, or technical analysis
- evaluate feasibility, risks, benefits, or architecture choices
- explain a topic in depth with evidence

## Inputs

Possible inputs include:

- existing source cards in `60_Raw_Sources/`
- links or files captured by `capture`
- user-provided notes or questions
- existing pages in `30_Research/`, `40_Knowledge_Base/`, `80_Decision_Center/`

## Workflow

1. Clarify the research question and expected output.
2. Search or inspect existing vault content before creating new pages.
3. Identify relevant raw sources and source cards.
4. Produce a research plan when the task is complex.
5. Analyze the topic by separating facts, interpretation, risks, open questions, and recommendations.
6. Save the research note into `30_Research/` when the user wants persistence.
7. Mark reusable items for `integrate`:
   - entities
   - concepts
   - workflows
   - claims
   - decisions
   - comparisons
   - synthesis
8. If the research supports an important choice, suggest `decision-record`.

## Output Location

Default output directory:

```text
30_Research/
```

High-value Q&A may also be saved under:

```text
35_QA_Library/
```

## Template

Use:

```text
99_System/templates/research-note.md
```

Recommended file naming:

```text
YYYY-MM-DD-research-topic.md
```

## Required Sections

A research note should include:

- research question
- background
- sources
- key findings
- analysis
- risks and limitations
- reusable knowledge candidates
- possible decisions
- next actions

## Boundaries

Do not silently turn research into final wiki knowledge. Research is an analysis layer. Use `integrate` to update the wiki.

Do not create many fragmented notes unless the user confirms the integration plan.

## Quality Check

Before finishing, check:

- The research question is explicit.
- Existing vault content was considered.
- Important claims have sources or uncertainty notes.
- Reusable knowledge candidates are marked.
- Next action is clear: stop, integrate, decide, or create content.
