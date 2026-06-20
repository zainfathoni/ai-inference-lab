# Teaching notes

## Learner preferences
- Comes to GPUs **through Triton**, not CUDA. Frame the hardware model with
  Triton as the lens, not the other way around.
- New to the CUDA thread/block/grid vocabulary (2026-06-20).
- Mission is **understanding** (reading/reasoning about kernels), not yet
  writing production kernels. Keep theory in service of comprehension.

## Workspace conventions
- Shared styles live in `assets/lesson.css`; every lesson/reference links it.
- Glossary established in `reference/cuda-triton-glossary.html` — adhere to its
  terms in all future lessons (Grid, Block, Thread, Program instance, Tile,
  SPMD, Mask).

## Progress log
- 2026-06-20: Lesson 0001 (thread→block→grid in Triton) shipped. Awaiting quiz
  result before writing the first learning record (record only on demonstrated
  understanding).
