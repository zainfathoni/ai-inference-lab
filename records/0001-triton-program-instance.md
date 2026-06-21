# Record 0001 — Triton program instance recall

**Status:** ✅ free-recall milestone cleared (2026-06-21). Recognition quiz 4/4
and cold free-recall both passed — all five concepts explained without notes
(Q1 and Q5 re-recalled clean after first-pass gaps). Remaining open: Experiment
0001 output (run on real hardware).

## Prompt

Without looking at Lesson 0001, explain:

1. What is a Triton program instance?
2. How does it map to CUDA's grid/block/thread picture?
3. In the vector-add kernel, what does `tl.program_id(axis=0)` identify?
4. Why does the kernel need a mask?
5. What does Triton hide from me, and what performance questions remain my responsibility?

## My cold-recall answer

(2026-06-21, no notes)

1. A set of operations toward given blocks
2. It maps to CUDA's block
3. Which block to process
4. To guard the boundaries of the block
5. Thread-level optimizations, such as coalescing.

## Correction

(2026-06-21 review) Concepts 2–4 sound; 1 and 5 thin.

- **Q1 — vague.** Missing the defining fact: a program instance *runs once per
  block and owns a whole tile of data*. That "once per block" is what separates
  it from a CUDA thread (once per element).
- **Q2 — correct.** Program instance = CUDA block.
- **Q3 — correct.** `program_id(axis=0)` = block index ≈ `blockIdx.x`.
- **Q4 — right idea, one detail short.** It specifically guards the *ragged last
  block*: when `n_elements` isn't a multiple of `BLOCK_SIZE`, the final block's
  offsets run past the array end; the mask zeroes those lanes.
- **Q5 — half-answered.** Correct on what Triton *hides* (coalescing, sync,
  vectorization, scheduling) but skipped what stays mine: `BLOCK_SIZE`, launch
  grid, tile indexing, correctness, and benchmarking.

Next pass: re-recall Q1 and Q5 only.

**Re-recall (2026-06-21):** both clean.

- Q1: "an instance of a kernel that runs once per block and processes an entire
  tile of elements at a time." — full definition, the "once per block" clause now
  present.
- Q5: hides thread-level optimization; programmer owns block size, launch grid,
  correctness, and benchmarks. (Could also name tile indexing/algorithm as
  programmer-owned — minor.)

Milestone cleared: execution model explained cold, no notes.

## Quiz log

- **2026-06-21 — multiple-choice, 4/4.** Correctly identified: program instance =
  code running once per *block* (owns a tile); `tl.program_id(axis=0)` ≈
  `blockIdx.x`; `mask` guards the ragged last block; compiler owns
  coalescing/sync/vectorization/scheduling while the programmer keeps
  `BLOCK_SIZE`, grid, tile indexing, correctness, and benchmarking.
  Recognition-level evidence — free recall and Experiment 0001 still pending.

## Link to experiment

- [Experiment 0001 — Triton vector add on a free T4](../experiments/0001-vector-add-on-t4/)
