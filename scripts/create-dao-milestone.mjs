import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const templateDir = path.join(root, 'scripts', 'templates', 'dao-milestone')

function slugifyTopic(topic) {
  return topic.replace(/\s+/g, '').replace(/[\\/]/g, '-')
}

function replaceTemplate(content, variables) {
  return content.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => variables[key] ?? '')
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function readTemplate(name) {
  return fs.readFile(path.join(templateDir, name), 'utf8')
}

async function writeIfMissing(filePath, content) {
  try {
    await fs.access(filePath)
    return { filePath, created: false }
  } catch {
    await fs.writeFile(filePath, content, 'utf8')
    return { filePath, created: true }
  }
}

async function main() {
  const milestone = process.argv[2]
  const topic = process.argv[3]
  const targetDirArg = process.argv[4] || 'docs/dao-milestones'

  if (!milestone || !topic) {
    console.error('Usage: node scripts/create-dao-milestone.mjs <milestone> <topic> [dir]')
    process.exit(1)
  }

  const targetDir = path.join(root, targetDirArg)
  const date = new Date().toISOString().slice(0, 10)
  const safeTopic = slugifyTopic(topic)
  const variables = {
    MILESTONE: milestone,
    TOPIC: topic,
    DATE: date,
  }

  const files = [
    { prefix: '01', template: 'task.md', suffix: `任务拆解-${safeTopic}.md` },
    { prefix: '02', template: 'design.md', suffix: `详细设计-${safeTopic}.md` },
    { prefix: '03', template: 'record.md', suffix: `开发记录-${safeTopic}.md` },
    { prefix: '04', template: 'note.md', suffix: `里程碑开发笔记-${safeTopic}.md` },
  ]

  await ensureDir(targetDir)

  const results = []
  for (const item of files) {
    const content = replaceTemplate(await readTemplate(item.template), variables)
    const filePath = path.join(targetDir, `${item.prefix}-${milestone}${item.suffix}`)
    results.push(await writeIfMissing(filePath, content))
  }

  console.log(JSON.stringify({
    milestone,
    topic,
    targetDir: targetDirArg,
    created: results.filter((item) => item.created).map((item) => path.relative(root, item.filePath)),
    skipped: results.filter((item) => !item.created).map((item) => path.relative(root, item.filePath)),
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
