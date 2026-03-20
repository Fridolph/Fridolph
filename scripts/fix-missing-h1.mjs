import { promises as fs } from 'node:fs'
import path from 'node:path'

const targetDir = process.argv[2]

if (!targetDir) {
  console.error('Usage: node scripts/fix-missing-h1.mjs <dir>')
  process.exit(1)
}

function deriveTitle(filePath) {
  const base = path.basename(filePath, path.extname(filePath))
  if (/^(index|readme)$/i.test(base)) {
    return path.basename(path.dirname(filePath))
  }
  return base
}

async function walk(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(fullPath, results)
      continue
    }
    if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
      results.push(fullPath)
    }
  }
  return results
}

function hasLeadingH1(content) {
  const lines = content.split(/\r?\n/)
  let start = 0
  if (lines[0]?.trim() === '---') {
    start = 1
    while (start < lines.length && lines[start].trim() !== '---') start += 1
    start += 1
  }
  for (let index = start; index < lines.length; index += 1) {
    const trimmed = lines[index].trim()
    if (!trimmed) continue
    return trimmed.startsWith('# ')
  }
  return false
}

async function main() {
  const absDir = path.resolve(process.cwd(), targetDir)
  const files = await walk(absDir)
  let changed = 0

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    if (hasLeadingH1(content)) continue

    const title = deriveTitle(file)
    const lines = content.split(/\r?\n/)
    let output = ''

    if (lines[0]?.trim() === '---') {
      let end = 1
      while (end < lines.length && lines[end].trim() !== '---') end += 1
      const frontmatter = lines.slice(0, end + 1).join('\n')
      const rest = lines.slice(end + 1).join('\n').replace(/^\n+/, '')
      output = `${frontmatter}\n\n# ${title}\n\n${rest}`
    } else {
      output = `# ${title}\n\n${content.replace(/^\n+/, '')}`
    }

    await fs.writeFile(file, output)
    changed += 1
    console.log(`[fix-missing-h1] updated ${path.relative(process.cwd(), file)}`)
  }

  console.log(`[fix-missing-h1] done, changed ${changed} files`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
