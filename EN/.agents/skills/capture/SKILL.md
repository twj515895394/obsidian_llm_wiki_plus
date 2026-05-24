# Source Capture Skill

## Goal

Use this skill when the user provides external material that may become a reusable source in the vault.

This skill is responsible only for bringing sources into the system. Deep analysis belongs to `research`. Long-term knowledge integration belongs to `integrate`.

## Triggers

Check this skill when the user provides:

- URL or web link
- GitHub repository or code project
- local file path
- network file link
- uploaded file
- PDF, Word, Excel, image, audio, or video
- paper, official documentation, API documentation, product documentation
- video link, podcast, interview, meeting notes
- long pasted text
- explicit request such as “save this source”, “collect this material”, or “keep this for later”

## Source Levels

| Level | Meaning | Default Strategy |
|---|---|---|
| S | Long-term high-value evidence: official docs, papers, core GitHub repos, company docs, architecture docs | Strongly suggest saving a source card and, when possible, a copy or snapshot |
| A | Reusable high-quality material: deep articles, competitor docs, tool docs, tutorials | Suggest saving a source card and key excerpts or summary |
| B | Temporary reference: ordinary articles, social posts, one-off references | Ask whether to save; default to link plus short note |
| C | Low-quality, ad-like, duplicate, or obviously short-lived material | Do not save by default unless the user explicitly asks |

## Workflow

1. Identify the source type and origin.
2. Assign a source level: S / A / B / C.
3. For S/A/B sources, explain the value and ask whether to save it.
4. After user confirmation, create a source card.
5. Route the source to the proper directory:
   - web page: `60_Raw_Sources/sources/web/`
   - GitHub repository: `60_Raw_Sources/sources/github/`
   - documentation: `60_Raw_Sources/sources/docs/`
   - paper: `60_Raw_Sources/sources/papers/`
   - video: `60_Raw_Sources/sources/videos/`
   - local file: `60_Raw_Sources/sources/local-files/`
   - pasted text: `60_Raw_Sources/sources/pasted/`
   - images, PDFs, audio, video files: `60_Raw_Sources/assets/`
   - webpage or repository snapshots: `60_Raw_Sources/snapshots/`
6. Update `60_Raw_Sources/source-index.md`.
7. If the user also wants analysis, suggest continuing with `research`.

## Recommended Questions

For ordinary sources:

```text
This source may be useful later. I suggest saving it into `60_Raw_Sources/` and creating a source record so future notes can trace back to it. Should I save it?
```

For high-value sources:

```text
This looks like an important source for future analysis. I suggest saving it as an S/A-level source, creating a source card, and linking future research notes, wiki pages, and decision records back to it. Should I save it?
```

For low-value sources:

```text
This looks more like a temporary reference. I can answer based on it directly, or create a lightweight source record if you want to keep it. Should I save it?
```

## Template

Use:

```text
99_System/templates/source-card.md
```

Recommended file naming:

```text
YYYY-MM-DD-source-title.md
```

## Quality Check

Before finishing, check:

- Source type is identified.
- Source level is assigned.
- User confirmation was requested when saving is involved.
- A source card is created when confirmed.
- `source-index.md` is updated.
- Raw evidence and AI analysis are not mixed.
