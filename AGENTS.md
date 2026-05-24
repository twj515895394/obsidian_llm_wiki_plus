# AGENTS.md

This file is for maintaining the `obsidian_llm_wiki_plus` repository itself.

For vault usage rules, see:

```text
CN/AGENTS.md
EN/AGENTS.md
CN/.agents/index.md
EN/.agents/index.md
```

## Repository maintenance principles

1. Keep CN and EN templates semantically equivalent.
2. Content directories are localized; tool directories stay stable in English.
3. `.agents/skills/` is the main skill source. `.claude/`, `.gemini/`, and `.codex/` are command adapters only.
4. When adding a skill, update:
   - `CN/.agents/skills/<skill>/SKILL.md`
   - `EN/.agents/skills/<skill>/SKILL.md`
   - `CN/.agents/index.md`
   - `EN/.agents/index.md`
   - command adapters under `.claude/commands/`, `.gemini/commands/`, `.codex/commands/`
   - `tools/validate-structure.py`
5. When changing directory semantics, update both docs and skills that route to those directories.
6. Run validation before release:

```bash
npm run validate
```

## 40 / 50 / 60 boundary

```text
40_知识库 / 40_Knowledge_Base = core structured llm_wiki knowledge layer
50_资源 / 50_Resources = tools, links, cases, prompts, and lightweight reference resources
60_原始资料 / 60_Raw_Sources = traceable evidence and source archive layer
```

Do not put formal evidence into `50_资源 / 50_Resources`.
Do not put structured wiki concepts into `50_资源 / 50_Resources`.

## Safety rules

- Do not delete or rename user-facing template directories without updating migration and validation logic.
- Do not introduce CN-only or EN-only features unless explicitly marked as experimental.
- Do not duplicate full skill logic inside tool-specific command adapters.
- Prefer small, reviewable changes for templates, CLI, migration, and skill routing.