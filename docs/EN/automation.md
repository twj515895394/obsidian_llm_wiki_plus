# Automation: Initialization and Structure Validation

Starting from v0.8, `obsidian_llm_wiki_plus` provides lightweight automation scripts so users do not have to manually copy the entire `CN/` or `EN/` template directory every time.

## Initialize a Chinese vault

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault
```

Or use the shell helper:

```bash
tools/init-cn.sh ./my-knowledge-vault
```

Windows PowerShell:

```powershell
./tools/init-cn.ps1 -Target ./my-knowledge-vault
```

## Initialize an English vault

```bash
python tools/init.py --lang EN --target ./my-knowledge-vault
```

Or use the shell helper:

```bash
tools/init-en.sh ./my-knowledge-vault
```

Windows PowerShell:

```powershell
./tools/init-en.ps1 -Target ./my-knowledge-vault
```

## Merge / overwrite an existing directory

By default, the initializer refuses to copy into a non-empty target directory to avoid accidental overwrites.

If you intentionally want to merge and overwrite template files, add `--force`:

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault --force
```

## Validate structure

Before release or after changing the template, run:

```bash
python tools/validate-structure.py
```

Strict placeholder checking:

```bash
python tools/validate-structure.py --strict-placeholders
```

## Script boundaries

The automation scripts only:

1. Copy the CN or EN template into a target directory.
2. Avoid overwriting existing files by default.
3. Validate repository structure.

They do not:

- Install Obsidian plugins
- Modify system settings
- Call AI APIs
- Commit to Git automatically
- Delete user files automatically

---

## Document migration: importing an existing Obsidian vault or document folder

Many users already have an Obsidian vault or a Markdown document directory. `obsidian_llm_wiki_plus` should not blindly push old files directly into `40_Knowledge_Base/`, because legacy notes may not have source metadata, lifecycle fields, or clear knowledge types.

Recommended migration flow:

```text
old document folder → migration plan → inbox staging area → human review → skill-based processing → projects/research/wiki/decision center
```

### Design principles

1. **Plan first by default**  
   Show what will be migrated and where it will go before copying files.

2. **Copy only by default**  
   The migration tool does not move or delete original files.

3. **Import into an inbox staging area**  
   Legacy files go into `00_Inbox/migration-imports/`, not directly into the knowledge base.

4. **Preserve the original directory structure**  
   This helps users understand how old folders map to the new system.

5. **Generate a reviewable plan and manifest**  
   The plan goes into `90_Planning/review-queue/`, and the manifest goes into `99_System/logs/`.

### Generate a migration plan only

```bash
python tools/migrate.py --lang EN --source ~/OldVault --target ~/NewVault
```

or:

```bash
tools/migrate-en.sh ~/OldVault ~/NewVault
```

This does not copy files. It only generates:

```text
90_Planning/review-queue/migration-plan-*.md
99_System/logs/migration-manifest-*.csv
```

### Apply the migration

After reviewing the plan:

```bash
python tools/migrate.py --lang EN --source ~/OldVault --target ~/NewVault --apply
```

Files will be copied into:

```text
00_Inbox/migration-imports/import-YYYYMMDD-HHMMSS/
```

### Initialize the target vault during migration

If the target vault has not been initialized yet:

```bash
python tools/migrate.py --lang EN --source ~/OldVault --target ~/NewVault --init-template --apply
```

### After migration

Do not immediately drag every imported file into the knowledge base.

Recommended processing:

| Legacy content type | Next step |
|---|---|
| Raw sources, web clips, PDFs, links | Use `capture` to create source cards |
| Research notes and technical analysis | Use `research` or `integrate` |
| Project materials | Move into `20_Projects/` and normalize with the project template |
| Important judgments and selections | Use `decision-record` |
| Publishable materials | Use `content-create` |
| Useless, duplicated, or outdated notes | Delete or archive |

### Why not auto-classify everything?

Whether a legacy note is a project note, a concept, a claim, a decision, or a raw source often requires semantic understanding and user context. File-name heuristics are easy to get wrong.

So the first migration tool follows a conservative model:

```text
scripts handle safe import and manifests;
agents help interpret and reorganize;
users confirm the final destination.
```
