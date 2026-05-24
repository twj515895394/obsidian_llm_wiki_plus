# ingest.md

## Purpose

This document defines how external material enters the vault.

The goal is to keep raw sources traceable while preventing the vault from becoming a random archive.

## Ingest Triggers

Check the ingest flow when the user provides:

- URL
- GitHub repository
- local file path
- network file link
- uploaded file
- PDF / Word / Excel
- image / audio / video
- web article
- paper
- API documentation
- product documentation
- long pasted text

## Source Levels

| Level | Examples | Strategy |
|---|---|---|
| S | official docs, papers, key repositories, company docs, architecture docs | save source card, save copy/snapshot when possible |
| A | deep articles, tutorials, competitor docs, product docs | save source card, summary, key excerpts |
| B | ordinary articles, social posts, one-off references | ask user; default lightweight record |
| C | ads, duplicates, weak sources, short-lived pages | do not save unless explicitly requested |

## Ingest Workflow

1. Identify the source type.
2. Assign source level.
3. Ask whether to save when appropriate.
4. Create a source card using `99_System/templates/source-card.md`.
5. Save or reference the original material in `60_Raw_Sources/`.
6. Update `60_Raw_Sources/source-index.md`.
7. Link future research, wiki pages, decisions, and content back to the source card.

## Default Locations

| Source Type | Location |
|---|---|
| Web page | `60_Raw_Sources/sources/web/` |
| GitHub repository | `60_Raw_Sources/sources/github/` |
| Documentation | `60_Raw_Sources/sources/docs/` |
| Paper | `60_Raw_Sources/sources/papers/` |
| Video | `60_Raw_Sources/sources/videos/` |
| Local file | `60_Raw_Sources/sources/local-files/` |
| Pasted text | `60_Raw_Sources/sources/pasted/` |
| Asset file | `60_Raw_Sources/assets/` |
| Snapshot | `60_Raw_Sources/snapshots/` |
| Imported bundle | `60_Raw_Sources/imports/` |

## Important Boundary

Raw sources are evidence. AI-generated analysis should not replace raw sources.

Use:

```text
60_Raw_Sources/ = evidence
30_Research/ = analysis
40_Knowledge_Base/ = reusable knowledge
80_Decision_Center/ = decisions
70_Content_Creation/ = output
```
