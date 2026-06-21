import fs from 'node:fs'
import path from 'node:path'

const pages = [
  { source: 'MISSION.md', outDir: 'MISSION', title: 'Mission' },
  { source: 'README.md', outDir: 'README', title: 'README' },
  { source: 'RESOURCES.md', outDir: 'RESOURCES', title: 'Resources' },
  { source: 'NOTES.md', outDir: 'NOTES', title: 'Notes' },
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function inlineMarkdown(value) {
  let text = escapeHtml(value)
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>')
  return text
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
}

function renderTable(lines) {
  const header = splitTableRow(lines[0])
  const body = lines.slice(2).map(splitTableRow)
  const head = '<thead><tr>' + header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('') + '</tr></thead>'
  const rows = body.map((row) => '<tr>' + row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('') + '</tr>').join('\n')
  return `<table>${head}<tbody>${rows}</tbody></table>`
}

function isListItem(line, ordered) {
  return ordered ? /^\s*\d+\.\s+/.test(line) : /^\s*[-*+]\s+/.test(line)
}

function listItemPattern(ordered) {
  return ordered ? /^\s*\d+\.\s+/ : /^\s*[-*+]\s+/
}

function isIndentedContinuation(line) {
  return /^\s{2,}\S/.test(line)
}

function startsBlock(line, nextLine = '') {
  return /^\s*$/.test(line) || /^#{1,6}\s+/.test(line) || /^```/.test(line) ||
    /^>\s?/.test(line) || /^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line) ||
    /^---+$/.test(line.trim()) || (line.includes('|') && isTableSeparator(nextLine))
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const nextLine = lines[i + 1] || ''

    if (/^\s*$/.test(line)) { i += 1; continue }

    if (/^```/.test(line)) {
      const language = line.replace(/^```/, '').trim()
      const code = []
      i += 1
      while (i < lines.length && !/^```/.test(lines[i])) {
        code.push(lines[i])
        i += 1
      }
      i += 1
      blocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`)
      continue
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
      i += 1
      continue
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push('<hr>')
      i += 1
      continue
    }

    if (line.includes('|') && isTableSeparator(nextLine)) {
      const tableLines = [line, nextLine]
      i += 2
      while (i < lines.length && lines[i].includes('|') && !/^\s*$/.test(lines[i])) {
        tableLines.push(lines[i])
        i += 1
      }
      blocks.push(renderTable(tableLines))
      continue
    }

    if (/^>\s?/.test(line)) {
      const quote = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''))
        i += 1
      }
      blocks.push(`<blockquote>${quote.map(inlineMarkdown).join('<br>')}</blockquote>`)
      continue
    }

    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line)
      const itemPattern = listItemPattern(ordered)
      const items = []
      while (i < lines.length && isListItem(lines[i], ordered)) {
        const item = [lines[i].replace(itemPattern, '')]
        i += 1
        while (i < lines.length && isIndentedContinuation(lines[i]) && !isListItem(lines[i], ordered)) {
          item.push(lines[i].trim())
          i += 1
        }
        items.push(item.join(' '))
      }
      const tag = ordered ? 'ol' : 'ul'
      blocks.push(`<${tag}>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${tag}>`)
      continue
    }

    const paragraph = [line]
    i += 1
    while (i < lines.length && !startsBlock(lines[i], lines[i + 1] || '')) {
      paragraph.push(lines[i])
      i += 1
    }
    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`)
  }

  return blocks.join('\n')
}

function pageTemplate({ title, source, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="../">
<title>${escapeHtml(title)} · Zain's AI Inference Lab</title>
<link rel="stylesheet" href="assets/lesson.css">
<link rel="stylesheet" href="assets/markdown-page.css">
</head>
<body>
<!-- Generated from ../${escapeHtml(source)} by scripts/render-markdown.mjs. Do not edit directly. -->
<nav class="topnav"><a href="./">← Zain's AI Inference Lab</a><a class="raw-link" href="${escapeHtml(source)}">raw Markdown</a></nav>
<main class="markdown-page markdown-body">
${body}
</main>
</body>
</html>
`
}

for (const page of pages) {
  const markdown = fs.readFileSync(page.source, 'utf8')
  const body = renderMarkdown(markdown)
  fs.mkdirSync(page.outDir, { recursive: true })
  fs.writeFileSync(path.join(page.outDir, 'index.html'), pageTemplate({ ...page, body }))
  console.log(`rendered ${page.source} -> ${page.outDir}/index.html`)
}
