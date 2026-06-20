# Resources

High-trust sources for grounding lessons. Triton is young and fast-moving, so
prefer the official docs and the OpenAI announcement over blog posts.

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
