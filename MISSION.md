# Mission

**Learner:** Zain Fathoni

## Why this topic

Build public proof-of-work toward **AI inference runtime engineering**: the part
of AI systems where model architecture, kernels, memory layout, runtimes,
serving constraints, and production cost meet.

The short-term forcing function is Netra Runtime-style inference engineering
puzzles. They are useful even if Netra is not the final employer because they
make progress measurable: kernels must be correct, benchmarks must beat real
baselines, and implementation choices must be defensible.

The long-term career direction is **AI runtime engineer**: understand how models
move from PyTorch code to fast, observable, deployable inference systems. Kernel
work is the proof mechanism; production inference is the monetization path.

## Starting point (2026-06-20)

- New to the CUDA thread / block / grid model — the shared diagram (Netra
  Runtime "Thread → Block → Grid") is roughly first contact with
  `threadIdx` / `blockIdx` / `gridDim`.
- Comes in via Triton, not CUDA, so the natural framing is: *here is the
  three-level hardware model, and here is how Triton deliberately hides one
  level so you program at the block ("program") level.*
- Current hardware is Apple Silicon, not a local NVIDIA workstation. The lab
  workflow is local development and correctness on Mac, free Kaggle/Colab GPU
  validation first, and paid GPU bursts only when there is a specific benchmark
  or blocker worth the spend.

## How the lab works

This lab has two jobs:

1. Teach me hard AI inference concepts using small `/teach`-style lessons,
   references, quizzes, and corrections.
2. Convert the important parts of that learning into evidence: learning records,
   experiments, benchmarks, and eventually portfolio artifacts.

The sequence is usually:

1. A **lesson** explains one concept.
2. A **learning record** captures my recall, mistakes, and corrections.
3. An **experiment** runs code or measures behavior when the concept is
   practical.
4. A **portfolio artifact** may later curate the best evidence.

Lessons are valid teaching artifacts. They are not, by themselves, proof of
mastery. The proof comes from recall, correction, execution, and measurement.

## What "success" looks like for now

- Month 1: ship the lab framing, run the first Triton-on-T4 experiment, and
  publish the hardware-constrained workflow.
- 8–12 weeks: produce a credible Netra-style submission attempt, especially
  around Triton, quantization/dequantization, and benchmark methodology.
- Long term: build a portfolio that shows recent systems depth across kernels,
  model execution/runtime internals, and production inference tradeoffs.

The first technical milestone remains foundational:

- Can explain, without notes, what a Triton **program instance** is and how it
  maps onto the CUDA grid/block/thread picture.
- Can point at any line of a simple Triton kernel and say which part of the
  execution model it corresponds to.
- Knows which concurrency concerns Triton automates away and which performance
  questions remain the programmer's responsibility.

## Notes on scope

Grounded in AI **inference**: prefer examples and motivations that show up in
real inference kernels and runtimes. Start with elementwise/fused ops and
Triton fundamentals; move toward quantization, dequantization, matmul,
attention, KV cache, model loading, and serving tradeoffs.

Baseten's _Inference Engineering_ book/course is used as a map, not as the main
output. Public Baseten notes should connect reading to a lesson, learning
record, experiment, benchmark, implementation, or Netra task — no standalone
book reports.

_Mission may evolve as skills grow — update this file and add a learning record
when it does._
