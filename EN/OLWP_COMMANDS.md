# OLWP Command Guide

This document lists common `olwp` CLI commands for `obsidian_llm_wiki_plus`.

Recommended GitHub usage:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus <command> [options]
```

Local repository usage:

```bash
node bin/olwp.mjs <command> [options]
```

---

## 1. Install into a new vault

Initialize the CN version when the target directory is empty:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

Initialize the EN version:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

If the target directory is not empty, `install` asks you to choose:

- merge the template and skip existing files
- overwrite template files
- migrate old documents into a staging area
- cancel

---

## 2. Direct initialization

```bash
npx github:twj515895394/obsidian_llm_wiki_plus init --lang EN --target ./my-vault
```

If the directory is not empty, the command refuses to run to avoid accidental overwrite.

Force initialization:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus init --lang EN --target ./my-vault --force
```

---

## 3. Merge template into an existing vault

Add missing files only. Existing files are not overwritten:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus merge --lang EN --target ./my-vault
```

Overwrite existing template files:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus merge --lang EN --target ./my-vault --overwrite
```

Use `--overwrite` carefully.

---

## 4. Migrate old documents

Plan-only by default. No files are copied:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus migrate --lang EN --source ./old-vault --target ./my-vault
```

Copy files after review:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus migrate --lang EN --source ./old-vault --target ./my-vault --apply
```

Migration strategy:

- never delete old files
- never move old files
- preserve the old folder structure
- import into `00_Inbox/migration-imports/`
- generate `90_Planning/review-queue/migration-plan-*.md`
- generate `99_System/logs/migration-manifest-*.csv`

---

## 5. Health check: doctor

Check whether an existing vault is missing directories, skills, command adapters, entry files, or state metadata:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang EN --target ./my-vault
```

`doctor` only checks. It does not modify files.

Use it before upgrading.

---

## 6. View differences: diff

Compare the current vault with the latest template:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus diff --lang EN --target ./my-vault
```

The output includes:

- missing files
- different files
- safe additions
- files requiring manual review

`diff` only checks. It does not modify files.

---

## 7. Safe upgrade: upgrade

Plan-only by default. No files are modified:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang EN --target ./my-vault
```

Generated files:

```text
90_Planning/review-queue/upgrade-plan-*.md
99_System/logs/upgrade-manifest-*.csv
.olwp/upgrade-plans/
.olwp/manifests/
.olwp/upgrade-staging/
```

Apply safe additions after review:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang EN --target ./my-vault --apply
```

Upgrade strategy:

- existing files are not overwritten
- user files are not deleted
- only safe missing files are copied automatically, such as new skills and command adapters
- different entry files, template files, and README files are copied to `.olwp/upgrade-staging/` for manual merge
- `.olwp/state.json` is created or updated

Skip interactive confirmation:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang EN --target ./my-vault --apply --yes
```

---

## Recommended upgrade flow

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang EN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus diff --lang EN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang EN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang EN --target ./my-vault --apply
```

---

## Safety principles

`olwp` is conservative by default:

- no overwrite by default
- no deletion
- no movement of user content
- plans and logs are generated first
- conflicting files go into review or staging
- user content directories are never overwritten automatically

User content directories include but are not limited to:

```text
20_Projects/
30_Research/
35_QA_Library/
40_Knowledge_Base/
70_Content_Creation/
80_Decision_Center/
```
