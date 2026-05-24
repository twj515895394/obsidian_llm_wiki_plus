# Release Checklist

Use this checklist before publishing a new `obsidian_llm_wiki_plus` release.

## 1. Root files

- [ ] `README_CN.md` is updated.
- [ ] `README.md` is updated.
- [ ] `VERSION.md` uses the current version.
- [ ] `CHANGELOG_CN.md` includes the release notes.
- [ ] `CHANGELOG.md` includes the release notes.
- [ ] `HANDOFF.md` is updated to the current version.
- [ ] `LICENSE` exists and the license is clear.

## 2. CN / EN vaults

- [ ] `CN/` and `EN/` can each be used as an independent Obsidian Vault.
- [ ] `CN/START_HERE.md` and `EN/START_HERE.md` exist.
- [ ] `CN/CLAUDE.md`, `CN/AGENTS.md`, and `CN/GEMINI.md` exist.
- [ ] `EN/CLAUDE.md`, `EN/AGENTS.md`, and `EN/GEMINI.md` exist.
- [ ] CN content directories use Chinese names.
- [ ] EN content directories use English names.
- [ ] `.agents/.claude/.gemini/.codex` stay stable in English in both CN and EN.

## 3. Skills

- [ ] Both CN and EN include the seven core skills.
- [ ] Skill names match: `capture`, `research`, `integrate`, `kickoff`, `daily-work`, `decision-record`, `content-create`.
- [ ] Each skill includes purpose, triggers, workflow, output location, and boundaries.
- [ ] Command adapter files point to the correct `.agents/skills/<skill>/SKILL.md` paths.

## 4. System rules and templates

- [ ] `purpose.md`, `schema.md`, `ingest.md`, `review.md`, and `lifecycle.md` exist in both CN and EN.
- [ ] The seven template files exist in both CN and EN.
- [ ] Template file names stay stable in English.
- [ ] CN template content is Chinese; EN template content is English.

## 5. Examples and docs

- [ ] CN and EN both include the seven example output types.
- [ ] Examples are realistic enough to show actual usage.
- [ ] `docs/CN` and `docs/EN` are complete.
- [ ] No obvious placeholder, TODO, or unfinished notes remain.

## 6. First-use experience

- [ ] A user can copy `CN/` and start from `START_HERE.md`.
- [ ] A user can copy `EN/` and start from `START_HERE.md`.
- [ ] Quick-start commands in README files match the actual structure.
- [ ] Root documentation does not conflict with vault-level rules.
- [ ] The release does not introduce unconfirmed architecture changes.
## v0.8 Automation checks

- [ ] Run `python tools/validate-structure.py`
- [ ] Run `python tools/validate-structure.py --strict-placeholders`
- [ ] Test `python tools/init.py --lang CN --target ./tmp-cn-vault`
- [ ] Test `python tools/init.py --lang EN --target ./tmp-en-vault`
