# Lab notes

## Current strategy

- Short-term objective: prepare for Netra Runtime-style inference engineering
  puzzles as a concrete benchmark.
- Long-term archetype: **AI runtime engineer**, with Triton/kernel work as proof
  and production inference as the monetization path.
- Month 1 GPU budget: **$25 max**. Use free Kaggle/Colab first; paid GPU only
  for specific blockers or final measurements.
- Weekly time budget: **10–15 hours**.
- Publishing style: lab notebook now, polished portfolio later.
- Baseten/course usage: publish only when connected to an experiment,
  benchmark, implementation, or Netra task.

## Learner preferences
- Comes to GPUs **through Triton**, not CUDA. Frame the hardware model with
  Triton as the lens, not the other way around.
- New to the CUDA thread/block/grid vocabulary (2026-06-20).
- Theory should stay in service of building proof-of-work: runnable code,
  reproducible benchmarks, defensible explanations.

## Workspace conventions
- Shared styles live in `assets/lesson.css`; every lesson/reference links it.
- Glossary established in `reference/cuda-triton-glossary.html` — adhere to its
  terms in all future lessons (Grid, Block, Thread, Program instance, Tile,
  SPMD, Mask).

## Progress log
- 2026-06-20: Lesson 0001 (thread→block→grid in Triton) shipped. Awaiting quiz
  result before writing the first learning record (record only on demonstrated
  understanding).
- 2026-06-20: Reframed the repo from a one-off lesson site into an AI inference
  lab oriented around Netra-style readiness and long-term runtime engineering.
