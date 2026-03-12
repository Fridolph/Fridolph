import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const siteRoot = path.join(root, 'docs-site')
const overviewDir = path.join(siteRoot, '内容导航')
const generatedDir = path.join(siteRoot, '.vitepress', 'generated')
const themeDir = path.join(siteRoot, '.vitepress', 'theme')
const collator = new Intl.Collator('zh-Hans-CN', { numeric: true, sensitivity: 'base' })

const ignoredTopLevel = new Set([
  '.git',
  '.github',
  '.vitepress',
  '.vscode',
  'node_modules',
  'dist',
  'docs-site',
  'scripts',
])

const ignoredNestedDirs = new Set([
  '.git',
  '.github',
  '.vitepress',
  '.vscode',
  'node_modules',
  'dist',
])

const forcedPlaceholderFiles = new Set([
  '00面试相关整理/2019模拟面试及相关整理/一二面/未整理.md',
  '00面试相关整理/2019模拟面试及相关整理/招聘出题/0417_面试题.md',
  '11Vue学习/vue2相关文档学习笔记/API/03选项-1数据.md',
])

const staticExtensions = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.bmp', '.ico', '.pdf', '.txt', '.json', '.js', '.ts', '.tsx', '.jsx', '.css', '.scss', '.sass', '.less', '.html', '.yml', '.yaml', '.xml', '.sh', '.py', '.java', '.go', '.rs', '.vue', '.zip', '.rar', '.7z', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.csv', '.mov', '.mp4', '.m4a', '.mp3'
])

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function normalizeLink(relativePath) {
  const posixPath = toPosix(relativePath)
  if (posixPath === 'README.md') return '/'
  if (posixPath.endsWith('/README.md')) return `/${posixPath.slice(0, -'README.md'.length)}`
  return `/${posixPath.replace(/\.md$/i, '')}`
}

function cleanName(name) {
  return name.replace(/\.md$/i, '')
}

function compareStrings(a, b) {
  return collator.compare(a, b)
}

function sanitizeEntryName(name) {
  return name.replace(/\s+(\.[^.]+)$/u, '$1').trim()
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function resetDir(dir) {
  await fs.rm(dir, { recursive: true, force: true })
  await fs.mkdir(dir, { recursive: true })
}

async function safeReadText(filePath) {
  try {
    const stat = await fs.stat(filePath)
    if (stat.size === 0) {
      return { ok: false, reason: 'empty', content: '' }
    }
    const content = await fs.readFile(filePath, 'utf8')
    return { ok: true, reason: null, content }
  } catch (error) {
    return { ok: false, reason: error?.message || String(error), content: '' }
  }
}

async function readTitle(filePath, fallback) {
  const result = await safeReadText(filePath)
  if (!result.ok) return fallback
  const lines = result.content.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const match = trimmed.match(/^#\s+(.+)$/)
    if (match) return match[1].trim()
    break
  }
  return fallback
}


function placeholderDoc(relativePath, fallbackTitle, reason) {
  return `# ${fallbackTitle}\n\n> 原始文件路径：\`${toPosix(relativePath)}\`\n\n该 Markdown 文件当前为空，或在本地文件系统中不可直接读取。为了保证文档站可正常构建，这里先生成占位页。\n\n- 文件状态：${reason}\n- 建议：如需展示真实内容，可在本地补充该文件正文后重新执行 \`npm run docs:sync\`。\n`
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function repairLocalAssetLinks(content, currentSourceDir) {
  const pattern = /(!?\[[^\]]*\])\(([^)]+)\)/g
  let result = ''
  let lastIndex = 0

  for (const match of content.matchAll(pattern)) {
    const [full, label, rawTarget] = match
    const index = match.index ?? 0
    result += content.slice(lastIndex, index)
    lastIndex = index + full.length

    const target = rawTarget.trim()
    if (!target || /^(https?:|mailto:|tel:|data:|#)/i.test(target)) {
      result += full
      continue
    }

    const [cleanTarget, suffix = ''] = target.split(/([?#].*)/, 2)
    if (!cleanTarget) {
      result += full
      continue
    }

    if (/\.md$/i.test(cleanTarget)) {
      result += full
      continue
    }

    if (cleanTarget.startsWith('/')) {
      const rootResolved = path.join(siteRoot, cleanTarget.slice(1))
      if (await pathExists(rootResolved)) {
        result += full
      } else {
        result += `${label}（资源缺失：${cleanTarget}）`
      }
      continue
    }

    const resolved = path.resolve(currentSourceDir, cleanTarget)
    if (await pathExists(resolved)) {
      result += full
      continue
    }

    const deduped = cleanTarget.replace(/(\.[a-zA-Z0-9]+)\1$/i, '$1')
    if (deduped !== cleanTarget) {
      const dedupedResolved = path.resolve(currentSourceDir, deduped)
      if (await pathExists(dedupedResolved)) {
        result += `${label}(${deduped}${suffix})`
        continue
      }
    }

    result += `${label}（资源缺失：${cleanTarget}）`
  }

  result += content.slice(lastIndex)
  return result
}

function sanitizeMarkdown(content) {
  return content
    .replace(/</g, '&lt;')
    .replace(/\{\{/g, '&#123;&#123;')
    .replace(/\}\}/g, '&#125;&#125;')
}


async function copySourceTree(sourceDir, targetDir, relativeDir = '') {
  await ensureDir(targetDir)
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })

  for (const entry of entries.sort((a, b) => compareStrings(a.name, b.name))) {
    if (entry.name.startsWith('.') && !entry.name.endsWith('.md')) continue
    if (ignoredNestedDirs.has(entry.name)) continue

    const sourceName = entry.name
    const targetName = sanitizeEntryName(entry.name)
    const absSource = path.join(sourceDir, sourceName)
    const relPath = relativeDir ? path.join(relativeDir, sourceName) : sourceName
    const absTarget = path.join(targetDir, targetName)

    if (entry.isDirectory()) {
      await copySourceTree(absSource, absTarget, relPath)
      continue
    }

    if (!entry.isFile()) continue

    const ext = path.extname(entry.name).toLowerCase()
    if (ext === '.md') {
      const fallbackTitle = cleanName(entry.name)
      const textResult = await safeReadText(absSource)
      const shouldForcePlaceholder = forcedPlaceholderFiles.has(toPosix(relPath))
      const output = textResult.ok && !shouldForcePlaceholder
        ? await repairLocalAssetLinks(
            sanitizeMarkdown(textResult.content),
            path.dirname(absSource),
          )
        : placeholderDoc(relPath, fallbackTitle, shouldForcePlaceholder ? 'sanitized-for-vitepress-build' : textResult.reason)
      await fs.writeFile(absTarget, output)
      continue
    }

    if (staticExtensions.has(ext)) {
      await fs.copyFile(absSource, absTarget)
    }
  }
}

async function buildTree(absDir, relDir = '') {
  const entries = await fs.readdir(absDir, { withFileTypes: true })
  const directories = []
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith('.') && !entry.name.endsWith('.md')) continue
    if (ignoredNestedDirs.has(entry.name)) continue

    const absPath = path.join(absDir, entry.name)
    const relPath = relDir ? path.join(relDir, entry.name) : entry.name

    if (entry.isDirectory()) {
      directories.push({ name: entry.name, absPath, relPath })
      continue
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) continue

    const fallbackTitle = cleanName(entry.name)
    const title = await readTitle(absPath, fallbackTitle)
    files.push({ title, link: normalizeLink(relPath) })
  }

  directories.sort((a, b) => compareStrings(a.name, b.name))
  files.sort((a, b) => compareStrings(a.title, b.title))

  const children = []
  for (const dir of directories) {
    const subtree = await buildTree(dir.absPath, dir.relPath)
    if (!subtree.children.length) continue
    const readmeLink = normalizeLink(path.join(dir.relPath, 'README.md'))
    const readme = subtree.children.find((item) => item.link === readmeLink)
    children.push({
      text: dir.name,
      ...(readme ? { link: readme.link } : {}),
      items: subtree.children,
    })
  }

  for (const file of files) {
    children.push({ text: file.title, link: file.link })
  }

  return { children }
}

function flattenPages(items, output = []) {
  for (const item of items) {
    if (item.link) output.push({ text: item.text, link: item.link })
    if (item.items) flattenPages(item.items, output)
  }
  return output
}

function chunk(items, size) {
  const result = []
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size))
  }
  return result
}

function createOverviewContent(section) {
  const lines = [
    `# ${section.name}`,
    '',
    `当前模块共收录 **${section.pageCount}** 篇 Markdown 文档。`,
    '',
    `- 返回总览：[/内容导航/](/内容导航/)`,
    `- 快速进入：[${section.pages[0].text}](${section.pages[0].link})`,
    `- 重点入口数：${section.highlightEntries.length}`,
    '',
    '## 推荐入口',
    '',
  ]

  for (const item of section.highlightEntries) {
    lines.push(`- [${item.text}](${item.link})`)
  }

  lines.push('')
  lines.push('## 文档列表')
  lines.push('')

  const groups = chunk(section.pages, 40)
  groups.forEach((group, index) => {
    if (groups.length > 1) {
      lines.push(`### 分组 ${index + 1}`)
      lines.push('')
    }
    group.forEach((page) => lines.push(`- [${page.text}](${page.link})`))
    lines.push('')
  })

  return `${lines.join('\n')}\n`
}

function pickSectionsByName(sections, names) {
  return names
    .map((name) => sections.find((section) => section.name === name))
    .filter(Boolean)
}

async function writeStaticSiteFiles(sections, pageCount) {
  const sectionCount = sections.length
  const featuredSections = [...sections]
    .sort((a, b) => b.pageCount - a.pageCount)
    .slice(0, 6)

  const curatedSections = pickSectionsByName(sections, [
    '11Vue学习',
    '00面试相关整理',
    '09构建、运维、后端等',
    '06TypeScript',
    '15AI',
    '12React学习',
  ])

  const moduleCards = featuredSections
    .map((section) => `- [${section.name}](${section.link})：${section.pageCount} 篇文档`)
    .join('\n')

  const curatedEntries = curatedSections
    .map((section) => `- [${section.name}](${section.link})`)
    .join('\n')

  const home = `---
layout: home

hero:
  name: Fridolph Notes
  text: 个人学习资料与 Markdown 知识库
  tagline: 使用 VitePress 重构展示的前端、工程化、Vue、Node.js 与 AI 学习笔记站点。
  image:
    src: /前端技能图谱.jpg
    alt: 前端技能图谱
  actions:
    - theme: brand
      text: 开始浏览
      link: /内容导航/
    - theme: alt
      text: Vue 专题
      link: /内容导航/11Vue学习

features:
  - title: 模块化导航
    details: 以顶层学习模块为单位自动生成导航、侧边栏与索引页，便于快速定位内容。
  - title: 全量 Markdown 展示
    details: 直接接入仓库中的 Markdown 文件，保留原始目录结构并统一为文档站点阅读体验。
  - title: 构建兜底
    details: 对空文件或不可直接读取的 Markdown 自动生成占位页，保证整站可稳定构建。
---

## 站点说明

当前站点共收录 **${sectionCount}** 个学习模块、**${pageCount}** 篇 Markdown 文档。

- 浏览全部模块：[/内容导航/](/内容导航/)
- Vue 专题：[/内容导航/11Vue学习](/内容导航/11Vue学习)
- 面试整理：[/内容导航/00面试相关整理](/内容导航/00面试相关整理)
- 构建与运维：[/内容导航/09构建、运维、后端等](/内容导航/09构建、运维、后端等)

## 重点模块

${moduleCards}

## 推荐专题

${curatedEntries}

## 仓库定位

- 学习过程中的知识沉淀
- 面向长期积累的 Markdown 索引库
- 后续二次整理、写博客与输出方法论的素材仓库

## 相关链接

- 博客：<https://fridolph.top>
- 仓库主页：<https://github.com/Fridolph/Fridolph>
- 面试资料仓库：<https://github.com/Fridolph/fri-prepare-interview>
- Demo 练习仓库：<https://github.com/Fridolph/my-program>
`

  const config = `import { defineConfig } from 'vitepress'
import { nav, sidebar, siteStats } from './generated/navigation.mjs'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Fridolph Notes',
  description: 'Fridolph 的学习资料、知识模块与 Markdown 知识库。',
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/前端技能图谱.jpg',
    nav,
    sidebar,
    outline: { level: [2, 3], label: '本页导航' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '模块导航',
    returnToTopLabel: '回到顶部',
    socialLinks: [{ icon: 'github', link: 'https://github.com/Fridolph/Fridolph' }],
    search: { provider: 'local' },
    footer: {
      message: \`共 \${siteStats.sectionCount} 个模块，\${siteStats.pageCount} 篇 Markdown 文档。\`,
      copyright: 'Built with VitePress',
    },
  },
  markdown: {
    config(md) {
      md.options.html = false
    },
    image: { lazyLoading: true },
  },
})
`

  const themeIndex = `import DefaultTheme from 'vitepress/theme'\nimport './custom.css'\n\nexport default {\n  ...DefaultTheme,\n}\n`

  const css = `:root {
  --vp-c-brand-1: #1f6feb;
  --vp-c-brand-2: #388bfd;
  --vp-c-brand-3: #79c0ff;
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #1f6feb 30%, #0f766e 100%);
  --vp-home-hero-image-background-image: radial-gradient(circle at top, rgba(31, 111, 235, 0.22), rgba(15, 118, 110, 0.12));
  --vp-home-hero-image-filter: blur(64px);
}

.VPDoc.has-aside .content-container,
.VPDoc .content-container {
  max-width: 920px;
}

.VPHome .VPHero .image-src {
  border-radius: 24px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.16);
}

.vp-doc h1,
.vp-doc h2,
.vp-doc h3 {
  scroll-margin-top: 72px;
}

.vp-doc a {
  word-break: break-word;
}
`

  await fs.writeFile(path.join(siteRoot, 'index.md'), home)
  await fs.writeFile(path.join(siteRoot, '.vitepress', 'config.mts'), config)
  await fs.writeFile(path.join(themeDir, 'index.ts'), themeIndex)
  await fs.writeFile(path.join(themeDir, 'custom.css'), css)
}

async function main() {
  await resetDir(siteRoot)
  await ensureDir(overviewDir)
  await ensureDir(generatedDir)
  await ensureDir(themeDir)

  const rootEntries = await fs.readdir(root, { withFileTypes: true })
  const topModules = rootEntries
    .filter((entry) => entry.isDirectory() && !ignoredTopLevel.has(entry.name))
    .sort((a, b) => compareStrings(a.name, b.name))

  for (const moduleEntry of topModules) {
    await copySourceTree(
      path.join(root, moduleEntry.name),
      path.join(siteRoot, moduleEntry.name),
      moduleEntry.name,
    )
  }

  for (const asset of ['前端技能图谱.jpg', 'LICENSE']) {
    try {
      await fs.copyFile(path.join(root, asset), path.join(siteRoot, asset))
    } catch {}
  }

  const sections = []
  for (const moduleEntry of topModules) {
    const tree = await buildTree(path.join(siteRoot, moduleEntry.name), moduleEntry.name)
    const pages = flattenPages(tree.children)
    if (!pages.length) continue
    const highlightEntries = flattenPages(tree.children).slice(0, 8)
    sections.push({
      name: moduleEntry.name,
      link: `/内容导航/${moduleEntry.name}`,
      pageCount: pages.length,
      pages,
      highlightEntries,
      sidebarItems: [
        { text: `${moduleEntry.name} 总览`, link: `/内容导航/${moduleEntry.name}` },
        ...tree.children,
      ],
    })
  }

  const pageCount = sections.reduce((sum, section) => sum + section.pageCount, 0)
  await writeStaticSiteFiles(sections, pageCount)

  const overviewLines = [
    '# 内容导航',
    '',
    `当前站点共收录 **${pageCount}** 篇 Markdown 文档，按顶层学习模块进行展示。`,
    '',
    '## 优先浏览的模块',
    '',
  ]

  for (const section of [...sections].sort((a, b) => b.pageCount - a.pageCount).slice(0, 8)) {
    overviewLines.push(`- [${section.name}](${section.link})：${section.pageCount} 篇`)
  }

  overviewLines.push('')
  overviewLines.push('## 模块总览')
  overviewLines.push('')

  for (const section of sections) {
    overviewLines.push(`### [${section.name}](${section.link})`)
    overviewLines.push('')
    overviewLines.push(`- 文档数：${section.pageCount}`)
    overviewLines.push(`- 快速进入：[${section.pages[0].text}](${section.pages[0].link})`)
    if (section.highlightEntries.length) {
      overviewLines.push(`- 推荐入口：${section.highlightEntries.slice(0, 3).map((item) => `[${item.text}](${item.link})`).join(' / ')}`)
    }
    overviewLines.push('')
    await fs.writeFile(path.join(overviewDir, `${section.name}.md`), createOverviewContent(section))
  }

  await fs.writeFile(path.join(overviewDir, 'index.md'), `${overviewLines.join('\n')}\n`)

  const featuredNavSections = [...sections].sort((a, b) => b.pageCount - a.pageCount).slice(0, 8)

  const nav = [
    { text: '首页', link: '/' },
    { text: '内容导航', link: '/内容导航/' },
    {
      text: '重点专题',
      items: featuredNavSections.map((section) => ({ text: section.name, link: section.link })),
    },
  ]

  const sidebar = {
    '/内容导航/': [
      {
        text: '推荐模块',
        items: featuredNavSections.map((section) => ({
          text: `${section.name} (${section.pageCount})`,
          link: section.link,
        })),
      },
      {
        text: '全部模块',
        items: sections.map((section) => ({
          text: `${section.name} (${section.pageCount})`,
          link: section.link,
        })),
      },
    ],
  }

  for (const section of sections) {
    sidebar[`/${section.name}/`] = section.sidebarItems
  }

  const generatedModule = `export const siteStats = ${JSON.stringify({ sectionCount: sections.length, pageCount }, null, 2)}\n\nexport const nav = ${JSON.stringify(nav, null, 2)}\n\nexport const sidebar = ${JSON.stringify(sidebar, null, 2)}\n\nexport const sections = ${JSON.stringify(sections.map((section) => ({ name: section.name, link: section.link, pageCount: section.pageCount })), null, 2)}\n`
  await fs.writeFile(path.join(generatedDir, 'navigation.mjs'), generatedModule)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
