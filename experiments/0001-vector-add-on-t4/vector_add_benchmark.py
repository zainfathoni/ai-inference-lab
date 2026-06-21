import os
import platform
import statistics

import torch
import triton
import triton.language as tl


@triton.jit
def add_kernel(x_ptr, y_ptr, out_ptr, n_elements, BLOCK_SIZE: tl.constexpr):
    program_id = tl.program_id(axis=0)
    block_start = program_id * BLOCK_SIZE
    offsets = block_start + tl.arange(0, BLOCK_SIZE)
    mask = offsets < n_elements

    x = tl.load(x_ptr + offsets, mask=mask)
    y = tl.load(y_ptr + offsets, mask=mask)
    result = x + y
    tl.store(out_ptr + offsets, result, mask=mask)


def triton_add(x, y, block_size=1024):
    output = torch.empty_like(x)
    n_elements = output.numel()
    grid = lambda meta: (triton.cdiv(n_elements, meta["BLOCK_SIZE"]),)
    add_kernel[grid](x, y, output, n_elements, BLOCK_SIZE=block_size)
    return output


def time_cuda(fn, warmup=20, repeat=100):
    for _ in range(warmup):
        fn()
    torch.cuda.synchronize()

    times_ms = []
    for _ in range(repeat):
        start = torch.cuda.Event(enable_timing=True)
        end = torch.cuda.Event(enable_timing=True)
        start.record()
        fn()
        end.record()
        torch.cuda.synchronize()
        times_ms.append(start.elapsed_time(end))

    return {
        "median_ms": statistics.median(times_ms),
        "min_ms": min(times_ms),
        "max_ms": max(times_ms),
    }


def main():
    print("Experiment 0001 — Triton vector add")
    print(f"python={platform.python_version()}")
    print(f"platform={platform.platform()}")
    print(f"torch={torch.__version__}")
    print(f"triton={triton.__version__}")
    print(f"CUDA_VISIBLE_DEVICES={os.environ.get('CUDA_VISIBLE_DEVICES', '<unset>')}")

    if not torch.cuda.is_available():
        raise SystemExit("CUDA is not available. Run this in Colab/Kaggle with a GPU enabled.")

    device = torch.device("cuda")
    print(f"gpu={torch.cuda.get_device_name(device)}")
    print(f"capability={torch.cuda.get_device_capability(device)}")

    n_elements = 16 * 1024 * 1024
    torch.manual_seed(0)
    x = torch.rand(n_elements, device=device, dtype=torch.float32)
    y = torch.rand(n_elements, device=device, dtype=torch.float32)

    expected = x + y
    actual = triton_add(x, y)
    max_abs_diff = (expected - actual).abs().max().item()
    print(f"n_elements={n_elements}")
    print(f"max_abs_diff={max_abs_diff}")
    print(f"correct={torch.allclose(expected, actual)}")

    torch_stats = time_cuda(lambda: x + y)
    triton_stats = time_cuda(lambda: triton_add(x, y))
    speedup_triton_vs_torch = torch_stats["median_ms"] / triton_stats["median_ms"]

    print("torch_add_ms=", torch_stats)
    print("triton_add_ms=", triton_stats)
    print(f"speedup_triton_vs_torch={speedup_triton_vs_torch:.3f}")
    print("note=This benchmark is a workflow sanity check, not a serious performance claim.")


if __name__ == "__main__":
    main()
