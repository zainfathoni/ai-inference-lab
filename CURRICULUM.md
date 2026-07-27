# Curriculum

The lesson sequence for this lab, and why it is in this order.

Every lesson is one tightly-scoped idea with one tangible win, an embedded
micro-world you can drive, and an in-page quiz. Lessons teach; they are not
proof of mastery. The proof is in `records/` and `experiments/`.

## The arc

The sequence answers one question in stages: **what makes a fixed pile of
arithmetic go fast on a GPU, and how do I prove I made it faster?**

| # | Lesson | The one win | Type |
| - | ------ | ----------- | ---- |
| 0 | [What inference actually is](lessons/0000-what-inference-actually-is.html) | Training is not your job; inference is a hot path | orientation |
| 1 | [Triton deletes a level](lessons/0001-thread-block-grid-in-triton.html) | You program a block, not a thread | mechanism |
| 2 | [Inference is the half you pay for forever](lessons/0002-inference-is-the-ongoing-half.html) | Serving is a memory-bandwidth amortization game | mechanism |
| 3 | [A tensor is a pointer plus arithmetic](lessons/0003-strides-and-layout.html) | Shape is a lie; strides are the truth | mechanism |
| 4 | [The GPU fetches more than you asked for](lessons/0004-memory-coalescing.html) | Access pattern, not byte count, sets your bandwidth | mechanism |
| 5 | [Quantization: buying bandwidth with precision](lessons/0005-quantization-and-nf4.html) | Block size is the accuracy/​compression dial — Netra Task A | mechanism |
| 6 | [Matmul earns its intensity by tiling](lessons/0006-matmul-and-tiling.html) | Reuse is what makes matmul compute-bound | mechanism |
| 7 | [Softmax, overflow, and the online trick](lessons/0007-softmax-and-stability.html) | Why attention needs a running max | mechanism |
| 8 | [Attention and the KV cache](lessons/0008-attention-and-kv-cache.html) | The cache is what caps your batch size | mechanism |
| 9 | [Benchmarking a kernel honestly](lessons/0009-benchmarking-honestly.html) | Most speedups are measurement bugs | mechanism |

## Why this order

- **0–2 build the frame.** What the job is, how the hardware is addressed, and
  what actually costs money. Lesson 2 is the economic argument the rest serves.
- **3–4 are the memory pair.** Layout decides addresses; addresses decide
  coalescing; coalescing decides the bandwidth you actually get. Every
  memory-bound kernel — which is most of them — is won or lost here.
- **5 is the Netra forcing function.** NF4 dequantization is Task A. It only
  makes sense once you believe the memory-bound argument from Lesson 2 and
  understand blocks from Lesson 1.
- **6–8 are the model.** Matmul, softmax, attention, KV cache — the ops that
  eat the time, in the order they depend on each other. Lesson 8 answers the
  question Lesson 2 deliberately left open: *what stops me raising the batch?*
- **9 closes every loop.** A benchmark you cannot defend is not evidence, and
  every experiment in this lab is supposed to be evidence.

## Reference docs

- [CUDA ↔ Triton cheat-sheet](reference/cuda-triton-glossary.html) — execution-model vocabulary
- [The inference cost model on one page](reference/inference-roofline.html) — roofline formulas and the lever table

## Not covered yet

Deliberately deferred, in the order they are most likely to be needed next:

- Kernel fusion as a bandwidth technique, and what `torch.compile` fuses for you
- Model loading: safetensors, `mmap`, and cold-start cost
- Continuous batching and the throughput/latency tradeoff in a real server
- Paged and quantized KV cache
- QLoRA / FSDP2, once the quantization lesson has an experiment behind it

Ask for any of these and it becomes the next lesson.
