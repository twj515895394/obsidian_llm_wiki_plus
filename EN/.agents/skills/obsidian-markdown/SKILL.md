# Obsidian Markdown Skill

## Goal

Use this skill to create and edit Obsidian-friendly Markdown files with consistent frontmatter, wikilinks, callouts, embeds, tags, internal links, and attachment references.

This skill does not handle business workflows. It only defines Markdown and Obsidian syntax standards.

## Triggers

Use this skill when the user asks to:

- create or edit Obsidian notes
- use wikilinks, backlinks, embeds, or callouts
- add frontmatter / properties
- clean up Markdown formatting
- reference images, PDFs, audio, video, or other attachments
- create Obsidian templates
- work with Obsidian Markdown, wikilinks, callouts, properties, or embeds

## Basic Standards

### Frontmatter

Use YAML frontmatter when metadata is needed:

```markdown
---
type: note
status: active
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
sources: []
related: []
---
```

Use the relevant template for each note type:

```text
99_System/templates/source-card.md
99_System/templates/research-note.md
99_System/templates/wiki-page.md
99_System/templates/decision-record.md
99_System/templates/project-note.md
99_System/templates/daily-note.md
99_System/templates/content-brief.md
```

### Wikilinks

Prefer Obsidian wikilinks for internal links:

```markdown
[[Page Name]]
[[Page Name|Display Text]]
[[Page Name#Heading]]
[[Page Name#^block-id]]
```

Use standard Markdown links for external URLs:

```markdown
[Title](https://example.com)
```

### Embeds

```markdown
![[image.png]]
![[document.pdf]]
![[Page Name]]
![[Page Name#Heading]]
```

Images may specify width:

```markdown
![[image.png|600]]
```

### Callouts

```markdown
> [!note]
> General note

> [!tip]
> Practical tip

> [!warning]
> Risk or caution

> [!question]
> Open question

> [!summary]
> Summary
```

Foldable callout:

```markdown
> [!faq]- Expand details
> Hidden content goes here
```

## Project Link Rules

- Research notes should link to source cards under `60_Raw_Sources/sources/`.
- Wiki pages should link to relevant research notes under `30_Research/`.
- Decision records should link to `60_Raw_Sources/` and `30_Research/`.
- Content drafts should link to `40_Knowledge_Base/`, `35_QA_Library/`, or `80_Decision_Center/`.

## Tag Rules

Tags are for lightweight filtering. They should not replace directories or frontmatter.

Recommended format:

```yaml
tags:
  - ai
  - agent
  - status/active
```

Avoid over-creating tags.

## Attachment Rules

- Formal raw attachments should go into `60_Raw_Sources/assets/`.
- Content creation assets may go into `70_Content_Creation/asset-library/`.
- Temporary images or draft assets should not be mixed into wiki directories.

## Boundaries

- Do not use plain URLs when a useful wikilink is available.
- Do not use complex HTML unless necessary.
- Do not dump large unstructured text blocks into wiki pages.
- Do not let frontmatter drift across files of the same type.
- Do not treat AI summaries as original sources.

## Quality Check

Before finishing, check:

- Frontmatter is complete when needed.
- Internal links use wikilinks.
- Sources remain traceable.
- Callouts have clear meaning.
- Attachment paths are appropriate.
- The note is readable and maintainable in Obsidian.