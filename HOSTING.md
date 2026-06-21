# Hosting

How this `/teach` workspace is published. Hosting is **workspace-owned** (per the
local `/teach` contract): this file is the source of truth for where lessons go
live and how to verify them. This repo does **not** use Tailscale — earlier
tailnet serving was removed; do not reintroduce `serve-lessons.sh` here.

## Method

- **Platform:** GitHub Pages, served directly from the repository.
- **Source:** branch `main`, path `/` (repo root). Legacy build, but Jekyll is
  disabled by the `.nojekyll` file, so files are served verbatim — no build on
  GitHub's side.
- **Custom domain:** `ai.zainf.dev`, pinned by the `CNAME` file at the repo root.
  HTTPS certificate is provisioned and approved by GitHub Pages.
- **Deploy:** push to `main`. GitHub Pages republishes automatically (typically
  live within ~1 minute). No GitHub Actions workflow is involved.

> The workspace root **is** the repo root (`~/Code/GitHub/zainfathoni/ai-inference-lab`).
> There is no `teach/` subdirectory and no `teach` symlink — `MISSION.md`,
> `RESOURCES.md`, `lessons/`, `reference/`, `assets/`, etc. all live at the root.

## Base URL

| Environment | Base URL |
| ----------- | -------- |
| Production | `https://ai.zainf.dev/` |
| GitHub Pages fallback | `https://zainfathoni.github.io/ai-inference-lab/` (redirects to the custom domain) |

## Path mapping

GitHub Pages serves the repo root at the domain root, so the on-disk path is the
URL path.

### Hand-authored HTML (edit the file directly — not generated)

| On disk | Live URL |
| ------- | -------- |
| `index.html` | `https://ai.zainf.dev/` |
| `lessons/0000-what-inference-actually-is.html` | `https://ai.zainf.dev/lessons/0000-what-inference-actually-is.html` |
| `lessons/0001-thread-block-grid-in-triton.html` | `https://ai.zainf.dev/lessons/0001-thread-block-grid-in-triton.html` |
| `reference/cuda-triton-glossary.html` | `https://ai.zainf.dev/reference/cuda-triton-glossary.html` |
| `assets/lesson.css` | `https://ai.zainf.dev/assets/lesson.css` |
| `assets/<file>` | `https://ai.zainf.dev/assets/<file>` |

### Generated from Markdown (edit the `.md`, never the `index.html`)

`node scripts/render-markdown.mjs` renders a **fixed list** of Markdown files to
extensionless directory URLs. The raw `.md` is also reachable.

| Source `.md` | Generated file | Live URL |
| ------------ | -------------- | -------- |
| `MISSION.md` | `MISSION/index.html` | `https://ai.zainf.dev/MISSION/` |
| `README.md` | `README/index.html` | `https://ai.zainf.dev/README/` |
| `RESOURCES.md` | `RESOURCES/index.html` | `https://ai.zainf.dev/RESOURCES/` |
| `NOTES.md` | `NOTES/index.html` | `https://ai.zainf.dev/NOTES/` |
| `experiments/0001-vector-add-on-t4/README.md` | `experiments/0001-vector-add-on-t4/index.html` | `https://ai.zainf.dev/experiments/0001-vector-add-on-t4/` |
| `records/0001-triton-program-instance.md` | `records/0001-triton-program-instance/index.html` | `https://ai.zainf.dev/records/0001-triton-program-instance/` |

## Build / serve / publish commands

```bash
# 1. Build: regenerate the Markdown HTML pages (dependency-free, no network)
node scripts/render-markdown.mjs

# 2. (once per clone) enable the pre-commit hook so the build runs automatically
git config core.hooksPath scripts/hooks
#    The hook (scripts/hooks/pre-commit) runs the renderer and `git add`s the
#    six generated index.html files before each commit.

# 3. Local preview (optional) — serve the workspace root statically
python3 -m http.server 8000   # then open http://127.0.0.1:8000/

# 4. Publish: commit and push to main; GitHub Pages republishes automatically
git push origin main
```

## Verification

```bash
# Homepage (expect: HTTP/2 200, server: GitHub.com)
curl -I https://ai.zainf.dev/

# A known lesson
curl -I https://ai.zainf.dev/lessons/0001-thread-block-grid-in-triton.html

# Reference + shared asset
curl -I https://ai.zainf.dev/reference/cuda-triton-glossary.html
curl -I https://ai.zainf.dev/assets/lesson.css

# A generated Markdown page
curl -I https://ai.zainf.dev/MISSION/
```

Last verified live (all `HTTP/2 200`): homepage, Lesson 1, glossary,
`assets/lesson.css`, and `MISSION/` — 2026-06-21.

## Caveats

- **Generated files are build output.** Never hand-edit `MISSION/index.html`,
  `README/index.html`, `RESOURCES/index.html`, `NOTES/index.html`,
  `experiments/0001-vector-add-on-t4/index.html`, or
  `records/0001-triton-program-instance/index.html`. Edit the source `.md` and
  rebuild. Each generated file carries a "do not edit directly" comment.
- **Lessons, reference docs, and the homepage are hand-authored HTML** — they do
  **not** pass through the renderer. Edit them directly.
- **New Markdown pages need two edits.** The page list is hardcoded in
  `scripts/render-markdown.mjs` (the `pages` array) *and* in the `git add` list
  in `scripts/hooks/pre-commit`. Add a new page to both, or it won't render or
  stage.
- **New lessons are not auto-linked.** A new `lessons/*.html` (e.g. Lesson 0)
  must be linked manually from `index.html` (and `README.md`) to be discoverable.
- **Keep `.nojekyll` and `CNAME`.** Removing `.nojekyll` re-enables Jekyll
  (which can drop files like those beginning with `_`); removing `CNAME` drops
  the custom domain.
- **HTTPS is not enforced** at the Pages level (`https_enforced: false`), though
  the certificate is valid. Always share `https://` links explicitly.
- **Deployment lag:** a push is usually live within ~1 minute; allow for it
  before verifying with `curl`.
- **Renderer is a minimal custom Markdown parser** (no external dependencies,
  no visitor-side JS). It supports headings, paragraphs, lists, tables, code
  blocks, blockquotes, `hr`, and inline `code`/links/bold/italic — but not the
  full CommonMark surface. Check rendered output for exotic Markdown.
