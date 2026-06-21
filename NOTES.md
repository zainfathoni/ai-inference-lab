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
- Artifact model: lessons teach; records test understanding; experiments test
  code/performance; portfolio pages are curated later.
- Baseten/course usage: publish only when connected to a lesson, learning
  record, experiment, benchmark, implementation, or Netra task.

## Learner preferences
- Comes to GPUs **through Triton**, not CUDA. Frame the hardware model with
  Triton as the lens, not the other way around.
- New to the CUDA thread/block/grid vocabulary (2026-06-20).
- **Background = fullstack developer; last formal AI was ~12 years ago in
  college (classical AI / ML-theory era).** Frame all lessons as a *systems
  engineer learning GPU/inference*, NOT as an ML student. His instincts (memory,
  pointers, concurrency, performance) are assets and should be the on-ramp. Do
  NOT assume ML-theory fluency; pull in any needed ML concept (tensor, matmul,
  softmax, attention, quantization) just-in-time, lesson by lesson. When he
  worries he's "stepping too far," reassure: inference runtime work is systems
  work, not the training/ML-math world he's rusty on (2026-06-21).
- Theory should stay in service of building proof-of-work: runnable code,
  reproducible benchmarks, defensible explanations. But `/teach` artifacts are
  still first-class: AI-generated lessons are useful as long as the cycle later
  closes through recall, correction, or execution.

## Workspace conventions
- Shared styles live in `assets/lesson.css`; every lesson/reference links it.
- Glossary established in `reference/cuda-triton-glossary.html` — adhere to its
  terms in all future lessons (Grid, Block, Thread, Program instance, Tile,
  SPMD, Mask).
- Use `lessons/` for teaching artifacts, `records/` for learner-authored recall
  and corrections, `experiments/` for runnable work and measurements, and
  `portfolio/` later for curated proof-of-work.

## Progress log
- 2026-06-20: Lesson 0001 (thread→block→grid in Triton) shipped. Awaiting quiz
  result before writing the first learning record (record only on demonstrated
  understanding).
- 2026-06-20: Reframed the repo from a one-off lesson site into an AI inference
  lab oriented around Netra-style readiness and long-term runtime engineering.
- 2026-06-21: Clarified that the lab has both a teaching track and an evidence
  track. Portfolio value matters, but not at the expense of AI-assisted learning.
- 2026-06-21: Shipped Lesson 0000 (what inference actually is, for a fullstack
  dev) as a prequel to 0001. Built to rebuild the webinar frame Zain is missing
  — he only got the book reference + the one CUDA-execution-model screenshot
  from last night's webinar, not the slides. Draws the training-vs-inference
  line and maps fullstack instincts → inference. Next: Lesson 1.
