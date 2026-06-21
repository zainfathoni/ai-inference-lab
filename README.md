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
| `lessons/` | Tightly-scoped HTML lessons and experiment writeups (`0001-…`, incrementing). |
| `reference/` | Compressed cheat-sheets, glossaries, and reusable mental models. |
| `assets/` | Shared, reusable components (e.g. `lesson.css`). |
| `RESOURCES.md` | High-trust sources and how they fit the plan. |
| `NOTES.md` | Working notes, decisions, and learning preferences. |

## Start here

- [Mission — AI inference lab](MISSION.md)
- [Lesson 1 — Triton deletes a level](lessons/0001-thread-block-grid-in-triton.html)
- [Reference — CUDA ↔ Triton cheat-sheet](reference/cuda-triton-glossary.html)
