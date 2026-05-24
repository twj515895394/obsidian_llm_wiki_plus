# Agent Install and One-command Setup

This document explains how a user or AI agent can install `obsidian_llm_wiki_plus` with one command, while safely choosing initialization, merge, or migration when the target directory already contains files.

## Goal

Users should not always copy the `CN/` or `EN/` directory manually. A better workflow is:

```text
User asks the agent to install obsidian_llm_wiki_plus into an Obsidian folder
Agent fetches the project → runs the installer → checks target state → asks whether to initialize, merge, or migrate
```

## Recommended installation methods

### Method 1: degit a template directory directly

Best for a brand-new vault:

```bash
npx degit MarsWang42/obsidian_llm_wiki_plus/CN my-vault
npx degit MarsWang42/obsidian_llm_wiki_plus/EN my-vault
```

This is simple, but it is mainly for empty-vault initialization. It does not handle existing vault migration or merge workflows.

### Method 2: degit the full project, then run tools

Best for initialization, merge, or migration workflows:

```bash
npx degit MarsWang42/obsidian_llm_wiki_plus .olwp
python .olwp/tools/init.py --lang EN --target ./my-vault
python .olwp/tools/migrate.py --lang EN --source ./old-vault --target ./my-vault --init-template --apply
```

### Method 3: use the Node CLI

If the project is published as an npm package, or executed from GitHub through npx, use:

```bash
npx obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

Or:

```bash
npx github:MarsWang42/obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

This repository includes `package.json` and `bin/olwp.mjs` to support this mode.

## CLI command design

### Initialize an empty directory

```bash
npx obsidian_llm_wiki_plus init --lang EN --target ./my-vault
```

If the target is not empty, the command refuses to run by default to avoid accidental overwrite.

### Merge the template into an existing vault

```bash
npx obsidian_llm_wiki_plus merge --lang EN --target ./existing-vault
```

By default, merge mode only adds missing files and skips existing files.

To overwrite template files explicitly:

```bash
npx obsidian_llm_wiki_plus merge --lang EN --target ./existing-vault --overwrite
```

### Migrate an old vault or document directory

Generate a migration plan first:

```bash
npx obsidian_llm_wiki_plus migrate --lang EN --source ./old-vault --target ./new-vault
```

Apply the migration after review:

```bash
npx obsidian_llm_wiki_plus migrate --lang EN --source ./old-vault --target ./new-vault --apply
```

If the target vault has not been initialized yet:

```bash
npx obsidian_llm_wiki_plus migrate --lang EN --source ./old-vault --target ./new-vault --init-template --apply
```

### Interactive install

```bash
npx obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

If the target is empty, it initializes the vault.

If the target is not empty, it asks whether to:

1. Merge missing template files
2. Overwrite template files
3. Migrate another source directory into the staging area
4. Cancel

## Prompt for AI agents

Users may say:

```text
Install obsidian_llm_wiki_plus into the current Obsidian Vault.
If the directory is empty, initialize the EN version.
If it is not empty, ask whether I want to merge the template or migrate existing documents.
Do not overwrite existing files without confirmation.
```

The agent may run:

```bash
npx github:MarsWang42/obsidian_llm_wiki_plus install --lang EN --target .
```

If the user provides an old vault path:

```bash
npx github:MarsWang42/obsidian_llm_wiki_plus install --lang EN --target ./new-vault --source ./old-vault --apply
```

## Safety principles

- Do not overwrite existing files by default.
- Do not delete old user files.
- Migration defaults to plan-only mode.
- Copy files only after the user confirms `--apply`.
- Old files go into `00_Inbox/migration-imports/` by default, not directly into `40_Knowledge_Base/`.
- The user and agent can later process them with `research`, `integrate`, and `decision-record`.

## Recommended agent behavior

When the user says “install this project”, the agent should first check:

1. Whether the current directory is empty.
2. Whether it is already an Obsidian Vault.
3. Whether there are old documents to migrate.
4. Whether the user prefers CN or EN.
5. Whether overwriting existing files is allowed.

If information is missing, ask only one key question at a time.
