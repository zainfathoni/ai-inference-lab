# Resources

High-trust sources for grounding the AI inference lab. Triton is young and
fast-moving, so prefer official docs, primary source material, reproducible
benchmarks, and real codebases over generic roadmaps.

## How to use these resources

- Use Netra-style tasks as the short-term benchmark.
- Use Triton/CUDA material for hands-on kernel skill.
- Use Baseten's inference material as the high-level map.
- Use real runtimes like `sam3.c`, llama.cpp, vLLM, and SGLang as architecture
  studies, but scope each study to one subsystem at a time.
- Avoid roadmap-driven wandering unless it directly supports an experiment.

## Current target

- **[Netra Runtime — AI Engineer Interview Puzzles](https://hackmd.io/@netraruntime/r1M7l9r0Wx)**
  - Practical benchmark for Triton kernels, quantization/dequantization,
    QLoRA/FSDP2, `torch.compile`, upstream PRs, and performance explanations.
  - Use as a forcing function, not necessarily as the final employer target.

## Primary / canonical

- **[Introducing Triton: Open-source GPU programming for neural networks](https://openai.com/index/triton/)** — OpenAI (2021)
  - Trust: ★★★★★ (the source of record). The phrase that grounds Lesson 0001:
    Triton uses an SPMD model "in which programs – rather than threads – are
    blocked." Kernels are "launched concurrently with different `program_id`'s
    on a grid of so-called instances." ~10-min read.
- **[Triton documentation — Introduction](https://triton-lang.org/main/programming-guide/chapter-1/introduction.html)** — triton-lang.org
  - Trust: ★★★★★ (official). Lists exactly what the compiler automates:
    "automatic coalescing, thread swizzling, pre-fetching, automatic
    vectorization, tensor core-aware instruction selection, shared memory
    allocation/synchronization, asynchronous copy scheduling."
- **[Triton tutorial — Vector Addition](https://triton-lang.org/main/getting-started/tutorials/01-vector-add.html)** — triton-lang.org
  - Trust: ★★★★★ (official). The canonical first kernel. Source of the
    annotated `add_kernel` in Lesson 0001.

## Inference engineering map

- **[Inference Engineering](https://www.baseten.co/inference-engineering/)** — Baseten
  - Use as a stack map: models, hardware, software, optimization techniques,
    modalities, and production. Do not publish standalone chapter summaries;
    connect reading to experiments.
- **[inferenceengineering.tech](https://inferenceengineering.tech/)**
  - Interactive companion/course. Useful for reinforcement, but lower priority
    than implementing and benchmarking.

## GPU fundamentals

- **[Programming Massively Parallel Processors](https://www.cse.iitd.ac.in/~rijurekha/col851/necessary_reading/cudabook.pdf)**
  - Deep CUDA/GPU fundamentals: execution model, memory hierarchy, tiling,
    synchronization, performance reasoning, and parallel patterns.
  - How it comes into play: use it as the *why underneath Triton*. Triton hides
    thread-level CUDA details, but Netra-style kernel work still requires the
    mental model: coalesced memory access, occupancy, cache behavior, shared
    memory, arithmetic intensity, and why a kernel is memory-bound or
    compute-bound.
  - Read selectively after experiments raise questions. Example: run Triton
    vector add, then read about memory bandwidth/coalescing; attempt matmul,
    then read tiling/shared-memory chapters; work on dequantization, then read
    memory hierarchy and data movement. Avoid reading cover-to-cover before
    coding.

## Runtime codebases to study

- **[NetraRuntime/sam3.c](https://github.com/NetraRuntime/sam3.c)**
  - A pure-C SAM3 inference runtime with custom tensor ops, CPU/Metal backends,
    mmap weight loading, quantization support, feature caching, CLI/bindings,
    and benchmarks. Study as an example of model-specific runtime engineering.

## Background on the CUDA model (the diagram)

- **[Thread block (CUDA programming) — Wikipedia](https://en.wikipedia.org/wiki/Thread_block_(CUDA_programming))**
  - Trust: ★★★☆☆ (good enough for the vocabulary in the diagram:
    `threadIdx`, `blockIdx`, `blockDim`, `gridDim`).

## Secondary (orientation, read with care)

- **[Triton Is Not CUDA in Python — It's a Tiling DSL](https://medium.com/@varuntej07/triton-is-not-cuda-in-python-its-a-tiling-dsl-c65c15ce3c46)** — Medium
  - Trust: ★★★☆☆. Useful framing ("one program processes a whole tile, not
    one value"), but verify any claim against the official docs above.

## Communities (for wisdom — testing understanding with practitioners)

- **GPU MODE** (formerly CUDA MODE) Discord + YouTube lectures — active
  practitioner community for Triton/CUDA kernel work.
- **[Triton GitHub Discussions](https://github.com/triton-lang/triton/discussions)** — questions answered by maintainers.
- r/CUDA and r/LocalLLaMA for inference-focused discussion.
