# learning-ai-inference

A personal learning workspace for building solid mental models of **how GPUs
execute work for AI inference**, using **Triton** as the lens.

Lessons are self-contained, accessible HTML — readable over `file://`, static
hosting, or Tailscale, with no build step.

## Layout

| Path | What it holds |
| ---- | ------------- |
| `MISSION.md` | Why I'm learning this — grounds every lesson. |
| `lessons/` | Tightly-scoped HTML lessons (`0001-…`, incrementing). |
| `reference/` | Compressed cheat-sheets & glossaries to return to. |
| `assets/` | Shared, reusable components (e.g. `lesson.css`). |
| `RESOURCES.md` | High-trust sources backing the lessons. |
| `NOTES.md` | Working notes & learning preferences. |

## Start here

- [Lesson 1 — Triton deletes a level](lessons/0001-thread-block-grid-in-triton.html)
- [Reference — CUDA ↔ Triton cheat-sheet](reference/cuda-triton-glossary.html)
