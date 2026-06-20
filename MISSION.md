# Mission

**Learner:** Zain Fathoni

## Why this topic

Build solid mental models of **how GPUs execute work for AI inference**, using
**Triton** as the lens. The learner is not (yet) trying to ship hand-tuned
kernels — the goal is *understanding the execution model* well enough to reason
about, and eventually read, the kernels that power modern inference stacks
(vLLM, FlashAttention, fused ops).

## Starting point (2026-06-20)

- New to the CUDA thread / block / grid model — the shared diagram (Netra
  Runtime "Thread → Block → Grid") is roughly first contact with
  `threadIdx` / `blockIdx` / `gridDim`.
- Comes in via Triton, not CUDA, so the natural framing is: *here is the
  three-level hardware model, and here is how Triton deliberately hides one
  level so you program at the block ("program") level.*

## What "success" looks like for now

- Can explain, without notes, what a Triton **program instance** is and how it
  maps onto the CUDA grid/block/thread picture.
- Can point at any line of a simple Triton kernel (vector add) and say which
  part of the execution model it corresponds to.
- Knows which concurrency concerns Triton automates away (and therefore which
  CUDA worries simply don't appear in Triton code).

## Notes on scope

Grounded in AI **inference**: prefer examples and motivations that show up in
real inference kernels (elementwise/fused ops first, matmul/attention later).
Theory is in service of reading and reasoning, not (yet) of writing production
kernels.

_Mission may evolve as skills grow — update this file and add a learning record
when it does._
