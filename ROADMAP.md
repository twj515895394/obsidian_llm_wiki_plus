# Roadmap

`obsidian_llm_wiki_plus` is an evolving Obsidian + LLM Wiki + Agent Skills knowledge operating system.

This roadmap focuses on future direction. Completed work is tracked in `CHANGELOG.md`, and current project context is summarized in `HANDOFF.md`.

---

## Current Status: v1.2

The project currently provides a usable bilingual vault template with safe installation, migration, and upgrade workflows.

### Completed foundation

- CN / EN bilingual Obsidian vault templates.
- 10 core skills:
  - `ask`
  - `capture`
  - `research`
  - `integrate`
  - `kickoff`
  - `daily-work`
  - `decision-record`
  - `content-create`
  - `archive`
  - `obsidian-markdown`
- Agent entry files:
  - `AGENTS.md`
  - `CLAUDE.md`
  - `GEMINI.md`
- Command adapter layers for:
  - Claude Code
  - Gemini CLI / Gemini Agent
  - Codex
- Node CLI:
  - `install`
  - `init`
  - `merge`
  - `migrate`
  - `doctor`
  - `diff`
  - `upgrade`
- Safe migration workflow for existing vaults.
- Safe upgrade workflow for existing `obsidian_llm_wiki_plus` vaults.
- `.olwp/state.json` version tracking.
- CN / EN command guides:
  - `CN/OLWP_COMMANDS.md`
  - `EN/OLWP_COMMANDS.md`

### Current design boundary

```text
40_Knowledge_Base = core structured llm_wiki knowledge layer
50_Resources = tools / links / cases / prompts / lightweight reference resources
60_Raw_Sources = traceable evidence and source archive layer
```

---

## v1.3 Candidate Direction: Upgrade Experience and Documentation Polish

The v1.2 upgrade mechanism works, but the user experience can still be improved.

### Candidate goals

- Add a short upgrade section to `README.md` and `README_CN.md`.
- Add a realistic example showing how to upgrade an older v1.0 vault to the latest template.
- Improve `olwp diff` output so users can better understand:
  - safe additions;
  - review-needed files;
  - changed entry files;
  - changed templates;
  - changed skill files.
- Improve upgrade plan readability.
- Add better examples for `.olwp/upgrade-staging/` manual merge workflows.
- Add test cases for:
  - empty vault install;
  - non-empty vault merge;
  - old vault migration;
  - v1.0 → v1.2 upgrade;
  - CN / EN parity checks.

### Possible commands

```text
olwp doctor
olwp diff
olwp upgrade
```

Possible improvements:

```text
olwp upgrade --dry-run
olwp upgrade --list-actions
olwp diff --json
```

---

## v1.4 Candidate Direction: Recovery, Rollback, and Safer Operations

The current upgrade mechanism is conservative. Future versions can improve recovery and rollback.

### Candidate goals

- Add `olwp restore` or `olwp rollback` for recovering from upgrade mistakes.
- Improve `.olwp/backups/` usage.
- Generate restore instructions after every applied upgrade.
- Add machine-readable upgrade manifests for agent-assisted review.
- Add optional JSON output for automation and CI.
- Add more explicit conflict categories:
  - entry file conflict;
  - template conflict;
  - skill conflict;
  - directory README conflict;
  - user content conflict.

### Possible commands

```text
olwp rollback
olwp restore
olwp list-upgrades
olwp doctor --json
```

---

## v1.5 Candidate Direction: Optional Skills and Obsidian Enhancements

The core template should remain general-purpose. Some advanced capabilities are useful but should not become default core skills too early.

### Candidate optional skills

- `json-canvas`
  - Create and edit Obsidian `.canvas` files.
  - Useful for knowledge maps, project maps, and agent workflow diagrams.
- `obsidian-bases`
  - Create and edit Obsidian Bases views.
  - Useful for source cards, decisions, review queues, and content pipelines.
- `content-intelligence`
  - Optional content research workflow.
  - Could include AI newsletters, AI products, GitHub trending, and X topic tracking.

### Possible structure

```text
.optional-skills/
├── json-canvas/
├── obsidian-bases/
└── content-intelligence/
```

or:

```text
.agents/optional-skills/
```

This needs careful design so optional skills do not pollute the core template.

---

## Long-Term Direction

### 1. Make the vault easier to maintain over time

- Better version tracking.
- Better upgrade reports.
- Better conflict resolution.
- Better restore / rollback workflows.

### 2. Make knowledge integration more reliable

- Better source-to-claim traceability.
- Better review queue workflows.
- Better stale-knowledge detection.
- Better entity / concept / claim / comparison linking.

### 3. Make agent behavior more predictable

- Keep `.agents/skills/` as the single source of truth.
- Keep `.claude/`, `.gemini/`, and `.codex/` as adapter layers only.
- Keep CN / EN templates semantically equivalent.
- Add tests whenever new skills or commands are introduced.

### 4. Support teams without making the personal workflow heavy

Possible future team-oriented features:

- shared decision records;
- team source libraries;
- review ownership;
- content approval workflows;
- lightweight governance docs.

These should remain optional and not make the base template too complex.

---

## Not Planned for the Core Template Right Now

The following ideas may be useful, but they are not planned as default core capabilities for now:

- `brainstorm` as a separate core skill.
- AI newsletter ingestion as a default core skill.
- AI product intelligence as a default core skill.
- Heavy database-like workflows that require many Obsidian plugins.
- Automatic deletion or automatic overwriting of user content.

Reason:

The core template should remain a stable knowledge operating system. Specialized intelligence workflows should be optional extensions.

---

## Release Principles

Future releases should follow these principles:

1. Do not break existing vaults.
2. Do not overwrite user content automatically.
3. Keep CN and EN semantically aligned.
4. Keep skills short enough to be executable.
5. Keep detailed explanations in `docs/`, not inside every entry file.
6. Update `CHANGELOG.md`, `CHANGELOG_CN.md`, and `HANDOFF.md` when a major capability changes.
7. Update `tools/validate-structure.py` whenever a new required file, directory, or skill is introduced.
