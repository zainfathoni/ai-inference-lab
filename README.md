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

## Start here

- [Mission — AI inference lab](MISSION.md)
- [Lesson 1 — Triton deletes a level](lessons/0001-thread-block-grid-in-triton.html)
- [Reference — CUDA ↔ Triton cheat-sheet](reference/cuda-triton-glossary.html)
