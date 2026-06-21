# Zain's AI Inference Lab

Zain Fathoni's public lab notebook for learning **AI inference runtime
engineering** in public.

The short-term benchmark is readiness for Netra Runtime-style inference puzzles:
Triton kernels, quantization/dequantization, `torch.compile`, QLoRA/FSDP2, and
benchmark-driven explanations. The longer-term direction is AI runtime
engineering: understanding how models move from PyTorch code to fast,
observable, deployable inference systems.

The site is intentionally simple: self-contained HTML, readable over `file://`,
GitHub Pages, or a custom domain, with no build step.

## Layout

| Path | What it holds |
| ---- | ------------- |
| `MISSION.md` | The learning and career strategy behind the lab. |
| `lessons/` | AI-assisted teaching artifacts: one concept at a time, with examples and quizzes. |
| `records/` | Learner-authored recall, corrections, and learning records. Create as cycles close. |
| `experiments/` | Runnable notebooks/scripts, benchmark outputs, environment notes, and failure logs. Create as runs happen. |
| `portfolio/` | Later: selected polished proof-of-work artifacts promoted from records/experiments. |
| `reference/` | Compressed cheat-sheets, glossaries, and reusable mental models. |
| `assets/` | Shared, reusable components (e.g. `lesson.css`). |
| `scripts/render-markdown.mjs` | Generates readable HTML pages from top-level Markdown files. |
| `RESOURCES.md` | High-trust sources and how they fit the plan. |
| `NOTES.md` | Working notes, decisions, and learning preferences. |

## Artifact types

This repo is a learning lab first and a portfolio second. Different artifacts do
different jobs:

- **Lessons** teach one concept using the `/teach` style: clear mental model,
  examples, references, and active-recall prompts. A lesson is not a claim of
  mastery by itself.
- **Learning records** are written after recall or practice. They capture what I
  could explain without notes, what was wrong or fuzzy, and what changed after
  correction.
- **Experiments** test code, environments, or performance claims. They should
  include enough output, timing, notebook/script links, and failure notes to be
  reproducible.
- **Portfolio artifacts** are curated later from the strongest records and
  experiments. They are not the main output during early learning.

The rule is: every learning cycle should eventually close with either a tested
understanding record or an executed experiment. Teaching material is allowed —
that is how I learn with AI — but it should not be mistaken for proof-of-work.

## Markdown pages

Markdown files remain the source of truth for `/teach`-friendly artifacts. For
comfortable reading on the site, generated HTML versions live at extensionless
directory URLs:

| Raw Markdown | Rendered page |
| ------------ | ------------- |
| `MISSION.md` | `MISSION/` |
| `README.md` | `README/` |
| `RESOURCES.md` | `RESOURCES/` |
| `NOTES.md` | `NOTES/` |

Regenerate rendered pages after editing top-level Markdown:

```bash
node scripts/render-markdown.mjs
```

To make that automatic before every local commit, enable the committed Git hook
once per clone:

```bash
git config core.hooksPath scripts/hooks
```

The hook regenerates the Markdown HTML pages and stages the generated files.
This keeps the site synced without using GitHub Actions quota.

The renderer is intentionally local and dependency-free: no CDN, no visitor-side
Markdown library, and no runtime JavaScript for Markdown rendering. Generated
HTML files include a comment warning not to edit them directly.

## Start here

- [Mission — AI inference lab](MISSION/) ([raw Markdown](MISSION.md))
- [Lesson 1 — Triton deletes a level](lessons/0001-thread-block-grid-in-triton.html)
- [Reference — CUDA ↔ Triton cheat-sheet](reference/cuda-triton-glossary.html)
