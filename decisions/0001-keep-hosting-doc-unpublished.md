# Decision 0001 — Keep `HOSTING.md` unpublished

**Status:** accepted (2026-06-21)

## Context

`scripts/render-markdown.mjs` renders a fixed allow-list of Markdown files to
HTML pages on the site (`MISSION.md`, `README.md`, `RESOURCES.md`, `NOTES.md`,
the Experiment 0001 README, and the Record 0001 file). `HOSTING.md` is not in
that list, so no `HOSTING/index.html` is generated. The question came up of
whether that was an oversight and whether `HOSTING.md` should also be rendered.

## Decision

`HOSTING.md` stays out of the renderer's `pages` array — it is **not** published
as a site page. It remains a raw repository document, readable on GitHub.

This decision record itself is likewise left unpublished, for the same reason.

## Rationale

- **Audience.** The renderer publishes audience-facing content for visitors
  learning about AI inference. `HOSTING.md` is an operator runbook — build /
  serve / publish commands, `curl` verification steps, and caveats like "don't
  hand-edit generated files" and "keep `.nojekyll` and `CNAME`." That serves the
  repo maintainer, not a site visitor.
- **Discoverability.** A rendered page earns its place by being linked from the
  site. Nothing points to a `HOSTING/` page, and nothing should.
- **Maintenance cost.** Every published Markdown page requires a two-place edit
  (the `pages` array in `scripts/render-markdown.mjs` and the `git add` list in
  `scripts/hooks/pre-commit`). Publishing `HOSTING.md` would add that surface for
  a page with no audience.
- **Self-consistency.** `HOSTING.md` frames itself as the workspace-owned source
  of truth for what gets published. Keeping it out of the published set is
  consistent with that framing.

## Consequences

- `HOSTING.md` (and this record) are read as raw Markdown on GitHub, not as
  pages on `ai.zainf.dev`.
- If this is ever revisited, publishing `HOSTING.md` takes exactly the two edits
  noted above, per its own "New Markdown pages need two edits" caveat.
- Sets the convention that operator/meta docs are not auto-published, while
  learner- and visitor-facing docs are.
