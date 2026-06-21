# Record 0001 — Triton program instance recall

**Status:** recognition quiz passed 4/4 (2026-06-21). Still open for full
milestone evidence: cold free-recall (explain without notes) and Experiment 0001
output.

## Prompt

Without looking at Lesson 0001, explain:

1. What is a Triton program instance?
2. How does it map to CUDA's grid/block/thread picture?
3. In the vector-add kernel, what does `tl.program_id(axis=0)` identify?
4. Why does the kernel need a mask?
5. What does Triton hide from me, and what performance questions remain my responsibility?

## My cold-recall answer

TODO: write this before rereading the lesson.

## Correction

TODO: after review, note what was wrong, missing, or fuzzy.

## Quiz log

- **2026-06-21 — multiple-choice, 4/4.** Correctly identified: program instance =
  code running once per *block* (owns a tile); `tl.program_id(axis=0)` ≈
  `blockIdx.x`; `mask` guards the ragged last block; compiler owns
  coalescing/sync/vectorization/scheduling while the programmer keeps
  `BLOCK_SIZE`, grid, tile indexing, correctness, and benchmarking.
  Recognition-level evidence — free recall and Experiment 0001 still pending.

## Link to experiment

- [Experiment 0001 — Triton vector add on a free T4](../experiments/0001-vector-add-on-t4/)
