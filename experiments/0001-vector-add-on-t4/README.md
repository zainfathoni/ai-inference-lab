# Experiment 0001 — Triton vector add on a free T4

**Status:** prepared, not yet run on T4.

## Purpose

Close the first real lab loop after Lesson 0001:

1. Run a simple Triton kernel on an NVIDIA GPU.
2. Check correctness against PyTorch.
3. Capture a small benchmark against `torch` addition.
4. Record what broke or surprised me.

This is not meant to prove performance skill yet. It proves the workflow:
local notes → free GPU run → captured output → learning record.

## Target environment

- Colab or Kaggle notebook
- NVIDIA T4 preferred, but any CUDA GPU is acceptable for the first loop
- Python 3
- PyTorch with CUDA
- Triton

## How to run

In Colab/Kaggle, upload or paste `vector_add_benchmark.py`, then run:

```bash
python vector_add_benchmark.py
```

If Triton is missing:

```bash
pip install triton
python vector_add_benchmark.py
```

## What to capture after running

Paste the terminal/notebook output below.

```text
TODO: paste actual output here after T4 run.
```

## Notes after run

- TODO: What GPU did I get?
- TODO: Did Triton import cleanly?
- TODO: Did correctness pass?
- TODO: Was Triton faster or slower than `torch` for this tiny benchmark?
- TODO: What did I misunderstand from Lesson 0001?

## Link to learning record

- [Record 0001 — Triton program instance recall](../../records/0001-triton-program-instance/)
