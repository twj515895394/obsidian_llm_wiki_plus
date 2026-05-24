# Quick Ask Skill

## Goal

Use this skill to answer quick questions without forcing every interaction into a heavy capture, research, or integration workflow.

The goal is to answer clearly first. Only suggest saving the answer when it has reusable value.

## Triggers

Use this skill when the user asks for:

- quick concept explanation
- command, error, or configuration meaning
- where something should be placed in the vault
- quick judgment about a tool or term
- quick Q&A over existing vault content
- explicit `/ask` usage or “just answer briefly”

## Workflow

1. Decide whether the vault should be searched.
   - If related to existing projects, research, wiki pages, or decisions, quickly check `30_Research/`, `35_QA_Library/`, `40_Knowledge_Base/`, or `80_Decision_Center/`.
   - If it is a temporary or general question, answer directly.

2. Answer directly.
   - Start with a clear answer.
   - Add short reasoning, examples, or code snippets when helpful.
   - Link existing notes with Obsidian wikilinks when relevant.

3. Decide whether the answer should be saved.
   - Temporary answer: do not save.
   - High-value Q&A: suggest saving to `35_QA_Library/`.
   - Reusable concept, method, or judgment: suggest later processing with `integrate`.

## Output Format

```markdown
[Direct answer]

[Short explanation / example]

[Optional: related notes]

[Optional: save suggestion]
```

## Save Suggestion

```text
This answer may be reusable later. I suggest saving it to `35_QA_Library/`, and it can later be integrated into `40_Knowledge_Base/` with `integrate`. Should I save it?
```

## Boundaries

- Do not create plan files for simple questions.
- Do not create wiki pages for trivial Q&A.
- Do not turn quick Q&A into deep research unless the user asks for it.
- If the question includes external sources, links, PDFs, GitHub repositories, or long text, consider switching to `capture` or `research`.
- If the answer affects an important decision, suggest `decision-record`.

## Quality Check

Before finishing, check:

- The question was answered directly.
- The workflow was not over-engineered.
- Existing notes were linked when useful.
- Saving was suggested only when the answer has reusable value.