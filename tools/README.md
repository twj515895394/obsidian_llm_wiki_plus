# Tools

This directory contains lightweight automation scripts for initializing and validating `obsidian_llm_wiki_plus` vaults.

## Initialize a vault

Use the cross-platform Python initializer:

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault
python tools/init.py --lang EN --target ./my-knowledge-vault
```

If the target directory already contains files, add `--force` to merge and overwrite template files:

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault --force
```

## Shell helpers

macOS / Linux:

```bash
tools/init-cn.sh ./my-knowledge-vault
tools/init-en.sh ./my-knowledge-vault
```

Windows PowerShell:

```powershell
./tools/init-cn.ps1 -Target ./my-knowledge-vault
./tools/init-en.ps1 -Target ./my-knowledge-vault
```


## Migrate an existing vault or document directory

Generate a migration plan only. This is the default and copies no files:

```bash
python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault
python tools/migrate.py --lang EN --source ~/OldVault --target ~/NewVault
```

Apply the migration after reviewing the plan:

```bash
python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault --apply
python tools/migrate.py --lang EN --source ~/OldVault --target ~/NewVault --apply
```

If the target vault has not been initialized yet, add `--init-template`:

```bash
python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault --init-template --apply
```

Migration is conservative by design:

- copy only by default; original files are not moved or deleted
- preserve the original folder structure
- import files into the inbox staging area
- generate a review plan and manifest
- leave semantic classification to the user and agents

Shell helpers:

```bash
tools/migrate-cn.sh ~/OldVault ~/NewVault --apply
tools/migrate-en.sh ~/OldVault ~/NewVault --apply
```

Windows PowerShell:

```powershell
./tools/migrate-cn.ps1 -Source ./OldVault -Target ./NewVault -Apply
./tools/migrate-en.ps1 -Source ./OldVault -Target ./NewVault -Apply
```

## Validate structure

Validate the repository structure:

```bash
python tools/validate-structure.py
```

Use strict placeholder checking before release:

```bash
python tools/validate-structure.py --strict-placeholders
```

## Design note

The scripts are intentionally lightweight. They do not install dependencies, modify Obsidian settings, or call any AI API. Their purpose is only to copy the selected template and verify project structure.


## One-command install / merge / migrate

This project also provides a lightweight Node CLI through `package.json` and `bin/olwp.mjs`.

If the package is published to npm:

```bash
npx obsidian_llm_wiki_plus install --lang CN --target ./my-vault
npx obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

If running directly from GitHub via npx:

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

Commands:

```bash
olwp init --lang CN --target ./my-vault
olwp merge --lang CN --target ./existing-vault
olwp migrate --lang CN --source ./old-vault --target ./new-vault --apply
olwp install --lang CN --target ./my-vault
```

`install` is interactive when the target directory is not empty. It asks whether to merge, overwrite template files, migrate another source directory, or cancel.
