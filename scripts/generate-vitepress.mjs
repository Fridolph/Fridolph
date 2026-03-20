import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const siteRoot = path.join(root, 'docs-site')
const overviewDir = path.join(siteRoot, '内容导航')
const topicDir = path.join(siteRoot, '专题导航')
const governanceDir = path.join(siteRoot, '站点治理')
const generatedDir = path.join(siteRoot, '.vitepress', 'generated')
const themeDir = path.join(siteRoot, '.vitepress', 'theme')
const componentsDir = path.join(themeDir, 'components')
const publicDir = path.join(siteRoot, 'public')
const collator = new Intl.Collator('zh-Hans-CN', { numeric: true, sensitivity: 'base' })

const siteTitle = 'Fridolph Notes'
const siteDescription = 'Fridolph 的学习资料、知识模块与 Markdown 知识库。'
const productionBase = '/Fridolph/'
const productionSiteUrl = 'https://fridolph.github.io/Fridolph/'
const socialImagePath = '/前端技能图谱.jpg'

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

const currentGovernanceMilestone = 'M15'

const remediationConfigs = [
  { moduleName: '07四艺', title: '07四艺', summary: '已完成缺少一级标题治理试点，验证批量修复脚本与趋势展示链路。', scope: '模块', milestone: 'M7', issueType: 'missingTitle' },
  { moduleName: '04非典型工具、类库等', title: '04非典型工具、类库等', summary: '继续扩面修复工具类与类库学习笔记中的标题缺失问题。', scope: '模块', milestone: 'M8', issueType: 'missingTitle' },
  { moduleName: '10其他', title: '10其他', summary: '继续扩面修复杂项学习笔记与实践总结中的标题缺失问题。', scope: '模块', milestone: 'M8', issueType: 'missingTitle' },
  { moduleName: '12React学习', title: '12React学习', summary: '继续扩面修复 React 学习资料中的标题缺失问题。', scope: '模块', milestone: 'M9', issueType: 'missingTitle' },
  { moduleName: '00面试相关整理', title: '00面试相关整理 / 2024面试准备', summary: '对 2024 面试准备子目录先做标题治理试点，验证热点大模块内按子目录渐进治理。', scope: '子目录', milestone: 'M9', pathPrefix: '00面试相关整理/2024面试准备/', issueType: 'missingTitle' },
  { moduleName: '00面试相关整理', title: '00面试相关整理 / interviewMap的阅读笔记', summary: '继续在热点面试模块中按子目录推进治理，清理 interviewMap 阅读笔记中的标题缺失问题。', scope: '子目录', milestone: 'M10', pathPrefix: '00面试相关整理/interviewMap的阅读笔记/', issueType: 'missingTitle' },
  { moduleName: '05Nodejs', title: '05Nodejs / Node入门2', summary: '把 Node.js 热点模块中的 Node入门2 子目录纳入渐进治理，验证跨模块子目录治理节奏。', scope: '子目录', milestone: 'M10', pathPrefix: '05Nodejs/Node入门2/', issueType: 'missingTitle' },
  { moduleName: '11Vue学习', title: '11Vue学习 / vue2相关文档学习笔记', summary: '针对 Vue 学习热点模块中的核心笔记子目录继续推进标题治理，验证大体量子目录的批量修复节奏。', scope: '子目录', milestone: 'M11', pathPrefix: '11Vue学习/vue2相关文档学习笔记/', issueType: 'missingTitle' },
  { moduleName: '00面试相关整理', title: '00面试相关整理 / 2019模拟面试及相关整理', summary: '继续在面试热点模块内推进第二批子目录治理，补齐模拟面试资料中的标题缺失。', scope: '子目录', milestone: 'M11', pathPrefix: '00面试相关整理/2019模拟面试及相关整理/', issueType: 'missingTitle' },
  { moduleName: '07四艺', title: '07四艺 / 音乐RE0学习', summary: '修复乐理笔记中的历史资源命名错误，并验证资源问题可按子目录作为一轮治理试点。', scope: '子目录', milestone: 'M12', pathPrefix: '07四艺/1琴/音乐RE0学习/', issueType: 'missingAsset' },
  { moduleName: '10其他', title: '10其他 / wuxia/team/飞雪', summary: '修复角色资料页中的首图缺失引用，让资源治理开始覆盖图片型内容页。', scope: '子目录', milestone: 'M12', pathPrefix: '10其他/wuxia/team/飞雪/', issueType: 'missingAsset' },
  { moduleName: '02CSS相关', title: '02CSS相关 / 响应式布局 / 响应设计', summary: '把会被渲染的响应式图片示例改成代码块，避免示例代码继续产生资源问题。', scope: '页面', milestone: 'M13', pathPrefix: '02CSS相关/响应式布局/响应设计.md', issueType: 'missingAsset' },
  { moduleName: '11Vue学习', title: '11Vue学习 / 01编写可复用组件', summary: '把组件插槽中的占位图片示例改成代码片段，让文档示例和真实资源彻底分离。', scope: '页面', milestone: 'M13', pathPrefix: '11Vue学习/vue2相关文档学习笔记/组件/6杂项/01编写可复用组件.md', issueType: 'missingAsset' },
  { moduleName: '03JavaScript', title: '03JavaScript / underscore源码 / 1笔记-核心方法', summary: '收尾历史博客迁移后的缺图页，用文字说明替代不可恢复的图片依赖。', scope: '页面', milestone: 'M13', pathPrefix: '03JavaScript/underscore源码/1笔记-核心方法.md', issueType: 'missingAsset' },
  { moduleName: '00面试相关整理', title: '00面试相关整理 / 02HTTP', summary: '继续推进 HTTP 知识目录中的标题治理，降低热点面试模块的缺少一级标题规模。', scope: '子目录', milestone: 'M14', pathPrefix: '00面试相关整理/02HTTP/', issueType: 'missingTitle' },
  { moduleName: '09构建、运维、后端等', title: '09构建、运维、后端等 / learn-webpack', summary: '继续推进工程化热点子目录标题治理，验证批量修复脚本可继续跨模块复用。', scope: '子目录', milestone: 'M14', pathPrefix: '09构建、运维、后端等/learn-webpack/', issueType: 'missingTitle' },
  { moduleName: '03JavaScript', title: '03JavaScript / JS API', summary: '继续推进 JavaScript 知识卡片目录中的标题治理，降低方法类文档的阅读门槛。', scope: '子目录', milestone: 'M15', pathPrefix: '03JavaScript/JS API/', issueType: 'missingTitle' },
  { moduleName: '09构建、运维、后端等', title: '09构建、运维、后端等 / Java学习', summary: '继续推进课程型 Java 学习目录中的标题治理，验证多层目录结构下的修复节奏。', scope: '子目录', milestone: 'M15', pathPrefix: '09构建、运维、后端等/Java学习/', issueType: 'missingTitle' },
]

const topicConfigs = [
  {
    slug: 'vue-nuxt',
    title: 'Vue / Nuxt 专题',
    description: '聚合 Vue、Nuxt、组件化思维与框架运行时边界相关资料。',
    moduleNames: ['11Vue学习', '06TypeScript'],
  },
  {
    slug: 'interview',
    title: '面试整理专题',
    description: '聚合前端面试、网络、性能与算法相关资料。',
    moduleNames: ['00面试相关整理', '03JavaScript', '02CSS相关'],
  },
  {
    slug: 'engineering',
    title: '构建与工程化专题',
    description: '聚合构建、部署、Node.js、TypeScript 与 VitePress 站点重构资料。',
    moduleNames: ['09构建、运维、后端等', '05Nodejs', '06TypeScript'],
  },
  {
    slug: 'ai-learning',
    title: 'AI 学习专题',
    description: '聚合 AI 提示词、智能体与相关学习资料。',
    moduleNames: ['15AI', '16AI提示词'],
  },
]

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

function escapeYaml(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function normalizeBase(base) {
  if (!base || base === '/') return '/'
  let trimmed = String(base).trim()
  while (trimmed.startsWith('/')) trimmed = trimmed.slice(1)
  while (trimmed.endsWith('/')) trimmed = trimmed.slice(0, -1)
  return trimmed ? `/${trimmed}/` : '/'
}

function normalizeSiteUrl(url) {
  const trimmed = String(url || productionSiteUrl).trim()
  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`
}

function joinSiteUrl(origin, relativePath = '') {
  const normalizedPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
  return new URL(normalizedPath, normalizeSiteUrl(origin)).toString()
}


function hasTrailingSpaceBeforeExtension(name) {
  return /\s+\.[^.]+$/u.test(name)
}

function normalizeAssetTarget(rawTarget) {
  const cleanTarget = String(rawTarget || '').trim().split(/[?#]/, 1)[0]
  if (!cleanTarget) return null
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(cleanTarget)) return null
  if (/\.md$/i.test(cleanTarget)) return null
  return cleanTarget
}

function stripNonContentSegments(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '')
}

function extractLocalAssetTargets(content) {
  const targets = []
  const normalizedContent = stripNonContentSegments(content)
  const markdownPattern = /!?\[[^\]\n]*\]\(([^)\n]+)\)/g

  for (const match of normalizedContent.matchAll(markdownPattern)) {
    const target = normalizeAssetTarget(match[1])
    if (target) targets.push(target)
  }

  for (const match of normalizedContent.matchAll(/<(?:img|source)\b[^>]*\b(?:src|srcset)=["']([^"']+)["']/gi)) {
    const target = normalizeAssetTarget(match[1]?.split(/\s+/)[0])
    if (target) targets.push(target)
  }

  return targets
}

function jsonProp(value) {
  return JSON.stringify(value).replace(/'/g, '&apos;')
}

function formatDate(value) {
  const date = new Date(value)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}


function getRemediationTitle(config) {
  return config.title || (config.pathPrefix ? config.pathPrefix.replace(/\/$/, '') : config.moduleName)
}

function getRemediationHref(config) {
  return config.href || `/内容导航/${config.moduleName}`
}

function getRemediationIssueLabel(config) {
  return config.issueType === 'missingAsset' ? '资源缺失' : '标题缺失'
}

function getRemediationIssueCount(report, config) {
  const issueType = config.issueType || 'missingTitle'
  const list = issueType === 'missingAsset' ? report.missingAssets : report.missingTitlePages

  if (config.pathPrefix) {
    return list.filter((item) => item.path.startsWith(config.pathPrefix)).length
  }

  const stats = report.moduleStats.find((item) => item.moduleName === config.moduleName)
  if (!stats) return 0
  return issueType === 'missingAsset' ? stats.missingAssetCount : stats.missingTitleCount
}

function collectSubdirHotspots(report, limit = 6) {
  const statsMap = new Map()

  for (const item of report.missingTitlePages) {
    const segments = item.path.split('/')
    if (segments.length < 2) continue
    const moduleName = segments[0]
    const subdirName = segments[1].replace(/\.md$/i, '')
    const key = `${moduleName}/${subdirName}`
    const existing = statsMap.get(key) || {
      key,
      moduleName,
      subdirName,
      title: `${moduleName} / ${subdirName}`,
      href: `/内容导航/${moduleName}`,
      missingTitleCount: 0,
      samplePaths: [],
    }
    existing.missingTitleCount += 1
    if (existing.samplePaths.length < 2) existing.samplePaths.push(item.path)
    statsMap.set(key, existing)
  }

  return [...statsMap.values()]
    .filter((item) => !remediationConfigs.some((config) => config.pathPrefix === `${item.key}/`))
    .sort((a, b) => b.missingTitleCount - a.missingTitleCount || compareStrings(a.title, b.title))
    .slice(0, limit)
}


function collectMilestoneCards(report) {
  const milestoneMap = new Map()

  for (const config of remediationConfigs) {
    const key = config.milestone || '未标记'
    const existing = milestoneMap.get(key) || {
      milestone: key,
      scopeCount: 0,
      issueCount: 0,
      titles: [],
    }
    existing.scopeCount += 1
    existing.issueCount += getRemediationIssueCount(report, config)
    if (existing.titles.length < 3) existing.titles.push(getRemediationTitle(config))
    milestoneMap.set(key, existing)
  }

  return [...milestoneMap.values()]
    .sort((a, b) => compareStrings(a.milestone, b.milestone))
    .map((item) => ({
      title: item.milestone,
      meta: `治理范围 ${item.scopeCount}`,
      detail: `当前剩余问题 ${item.issueCount} · ${item.titles.join(' / ')}`,
    }))
}

function collectAssetHotspots(report, limit = 6) {
  const statsMap = new Map()

  for (const item of report.missingAssets) {
    const existing = statsMap.get(item.path) || {
      path: item.path,
      moduleName: item.moduleName,
      href: item.link,
      title: item.title,
      missingAssetCount: 0,
      targets: [],
    }
    existing.missingAssetCount += 1
    if (existing.targets.length < 2) existing.targets.push(item.target)
    statsMap.set(item.path, existing)
  }

  return [...statsMap.values()]
    .filter((item) => !remediationConfigs.some((config) => config.issueType === 'missingAsset' && item.path.startsWith(config.pathPrefix || '')))
    .sort((a, b) => b.missingAssetCount - a.missingAssetCount || compareStrings(a.path, b.path))
    .slice(0, limit)
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function resetDir(dir) {
  await fs.rm(dir, { recursive: true, force: true })
  await fs.mkdir(dir, { recursive: true })
}


async function safeReadJson(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch {
    return null
  }
}

function createDeltaMeta(current, baseline, unit = '') {
  if (typeof baseline !== 'number') return '未配置基线'
  const delta = current - baseline
  if (delta === 0) return `较基线持平${unit}`
  if (delta < 0) return `较基线下降 ${Math.abs(delta)}${unit}`
  return `较基线上升 ${delta}${unit}`
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
  return `---\ntitle: "${escapeYaml(fallbackTitle)}"\ndescription: "该页面为自动生成的占位页，用于保证 VitePress 站点稳定构建。"\nsearch: false\noutline: false\n---\n\n# ${fallbackTitle}\n\n> 原始文件路径：\`${toPosix(relativePath)}\`\n\n该 Markdown 文件当前为空，或在本地文件系统中不可直接读取。为了保证文档站可正常构建，这里先生成占位页，并默认从站内搜索结果中排除。\n\n- 文件状态：${reason}\n- 建议：如需展示真实内容，可在本地补充该文件正文后重新执行 \`npm run docs:sync\`。\n`
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
      result += await pathExists(rootResolved) ? full : `${label}（资源缺失：${cleanTarget}）`
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
        ? await repairLocalAssetLinks(sanitizeMarkdown(textResult.content), path.dirname(absSource))
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

function pickSectionsByName(sections, names) {
  return names
    .map((name) => sections.find((section) => section.name === name))
    .filter(Boolean)
}

async function collectOriginalPages(modules) {
  const pages = []

  async function walk(absDir, relDir = '') {
    const entries = await fs.readdir(absDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith('.') && !entry.name.endsWith('.md')) continue
      if (ignoredNestedDirs.has(entry.name)) continue

      const absPath = path.join(absDir, entry.name)
      const relPath = relDir ? path.join(relDir, entry.name) : entry.name

      if (entry.isDirectory()) {
        await walk(absPath, relPath)
        continue
      }

      if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.md') continue

      const title = await readTitle(absPath, cleanName(entry.name))
      const stat = await fs.stat(absPath)
      const topName = toPosix(relPath).split('/')[0]
      pages.push({
        title,
        link: normalizeLink(relPath),
        moduleName: topName,
        updatedAt: stat.mtimeMs,
        updatedLabel: formatDate(stat.mtimeMs),
      })
    }
  }

  for (const moduleEntry of modules) {
    await walk(path.join(root, moduleEntry.name), moduleEntry.name)
  }

  return pages.sort((a, b) => b.updatedAt - a.updatedAt)
}

function createOverviewContent(section, recentPages) {
  const lines = [
    '---',
    `title: "${escapeYaml(section.name)}"`,
    `description: "${escapeYaml(`${section.name} 模块导航与推荐入口，总计 ${section.pageCount} 篇文档。`) }"`,
    '---',
    '',
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
    `<SiteDataGrid :items='${jsonProp(section.highlightEntries.map((item, index) => ({ title: item.text, href: item.link, meta: `推荐入口 ${index + 1}`, detail: `来自 ${section.name} 模块的优先阅读入口。` })))}' />`,
    '',
  ]

  if (recentPages.length) {
    lines.push('## 最近更新')
    lines.push('')
    lines.push(`<SiteDataGrid :items='${jsonProp(recentPages.map((item) => ({ title: item.title, href: item.link, meta: item.updatedLabel, detail: `最近更新于 ${item.updatedLabel}` })))}' compact />`)
    lines.push('')
  }

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

function createTopicContent(topic) {
  const pathSteps = topic.modules.map((section) => ({
    title: section.name,
    description: `${section.pageCount} 篇文档，优先从模块总览和推荐入口进入。`,
    links: section.highlightEntries.slice(0, 3).map((item) => ({ text: item.text, href: item.link })),
  }))

  const lines = [
    '---',
    `title: "${escapeYaml(topic.title)}"`,
    `description: "${escapeYaml(topic.description)}"`,
    '---',
    '',
    `# ${topic.title}`,
    '',
    topic.description,
    '',
    `- 返回专题导航：[/专题导航/](/专题导航/)`,
    `- 覆盖模块数：${topic.modules.length}`,
    `- 推荐阅读数：${topic.recommended.length}`,
    '',
    '## 覆盖模块',
    '',
    `<SiteDataGrid :items='${jsonProp(topic.modules.map((section) => ({ title: section.name, href: section.link, meta: `${section.pageCount} 篇文档`, detail: `通过模块总览和推荐入口快速进入 ${section.name}。` })))}' />`,
    '',
    '## 推荐阅读',
    '',
    `<SiteDataGrid :items='${jsonProp(topic.recommended.map((item, index) => ({ title: item.text, href: item.link, meta: `推荐阅读 ${index + 1}`, detail: `来自 ${topic.title} 的主题阅读链路。` })))}' compact />`,
    '',
    '## 建议阅读路径',
    '',
    `<SiteReadingPaths :paths='${jsonProp([{ title: topic.title, description: topic.description, steps: pathSteps }])}' />`,
    '',
  ]

  return `${lines.join('\n')}\n`
}


async function collectQualityReport(modules) {
  const missingTitlePages = []
  const emptyPages = []
  const trailingSpaceFiles = []
  const missingAssets = []
  const titleMap = new Map()
  const moduleStatsMap = new Map()
  let markdownCount = 0

  function ensureModuleStats(moduleName) {
    if (!moduleStatsMap.has(moduleName)) {
      moduleStatsMap.set(moduleName, {
        moduleName,
        markdownCount: 0,
        missingTitleCount: 0,
        emptyPageCount: 0,
        trailingSpaceCount: 0,
        missingAssetCount: 0,
        duplicateTitleCount: 0,
      })
    }
    return moduleStatsMap.get(moduleName)
  }

  async function walk(absDir, relDir = '') {
    const entries = await fs.readdir(absDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith('.') && !entry.name.endsWith('.md')) continue
      if (ignoredNestedDirs.has(entry.name)) continue

      const absPath = path.join(absDir, entry.name)
      const relPath = relDir ? path.join(relDir, entry.name) : entry.name

      if (entry.isDirectory()) {
        await walk(absPath, relPath)
        continue
      }

      if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.md') continue
      markdownCount += 1

      const moduleName = toPosix(relPath).split('/')[0]
      const moduleStats = ensureModuleStats(moduleName)
      moduleStats.markdownCount += 1

      if (hasTrailingSpaceBeforeExtension(entry.name)) {
        trailingSpaceFiles.push({
          path: toPosix(relPath),
          link: normalizeLink(relPath),
          moduleName,
        })
        moduleStats.trailingSpaceCount += 1
      }

      const result = await safeReadText(absPath)
      if (!result.ok) {
        emptyPages.push({
          path: toPosix(relPath),
          link: normalizeLink(relPath),
          reason: result.reason,
          moduleName,
        })
        moduleStats.emptyPageCount += 1
        continue
      }

      const lines = result.content.split(/\r?\n/)
      let firstMeaningfulLine = ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        firstMeaningfulLine = trimmed
        break
      }

      const title = await readTitle(absPath, cleanName(entry.name))
      const bucket = titleMap.get(title) || []
      bucket.push({ path: toPosix(relPath), link: normalizeLink(relPath), moduleName })
      titleMap.set(title, bucket)

      if (!firstMeaningfulLine.startsWith('# ')) {
        missingTitlePages.push({
          title,
          path: toPosix(relPath),
          link: normalizeLink(relPath),
          moduleName,
        })
        moduleStats.missingTitleCount += 1
      }

      for (const target of extractLocalAssetTargets(result.content)) {
        const resolved = target.startsWith('/')
          ? path.join(root, target.slice(1))
          : path.resolve(path.dirname(absPath), target)
        if (!(await pathExists(resolved))) {
          missingAssets.push({
            path: toPosix(relPath),
            link: normalizeLink(relPath),
            target,
            moduleName,
          })
          moduleStats.missingAssetCount += 1
        }
      }
    }
  }

  for (const moduleEntry of modules) {
    await walk(path.join(root, moduleEntry.name), moduleEntry.name)
  }

  const duplicateTitles = [...titleMap.entries()]
    .filter(([, items]) => items.length > 1)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([title, items]) => ({ title, count: items.length, items }))

  for (const item of duplicateTitles) {
    const affected = new Set(item.items.map((entry) => entry.moduleName))
    for (const moduleName of affected) {
      ensureModuleStats(moduleName).duplicateTitleCount += 1
    }
  }

  const moduleStats = [...moduleStatsMap.values()]
    .map((item) => ({
      ...item,
      issueScore:
        item.missingTitleCount * 3 +
        item.missingAssetCount * 4 +
        item.emptyPageCount * 5 +
        item.duplicateTitleCount * 2 +
        item.trailingSpaceCount,
    }))
    .sort((a, b) => b.issueScore - a.issueScore || b.markdownCount - a.markdownCount)

  const baseline = await safeReadJson(path.join(root, 'scripts', 'docs-quality-baseline.json'))

  return {
    generatedAt: new Date().toISOString(),
    markdownCount,
    placeholderCount: forcedPlaceholderFiles.size + emptyPages.length,
    missingTitlePages,
    emptyPages,
    trailingSpaceFiles,
    missingAssets,
    duplicateTitles,
    moduleStats,
    topHotspots: moduleStats.slice(0, 8),
    baseline,
  }
}

function createGovernanceContent(report) {
  const baseline = report.baseline || {}
  const stats = [
    { label: 'Markdown 文档', value: String(report.markdownCount), detail: '纳入巡检的原始 Markdown 文件总数。' },
    { label: '占位/空文件', value: String(report.placeholderCount), detail: createDeltaMeta(report.placeholderCount, baseline.placeholderCount, ' 个') },
    { label: '缺少一级标题', value: String(report.missingTitlePages.length), detail: createDeltaMeta(report.missingTitlePages.length, baseline.missingTitleCount, ' 篇') },
    { label: '缺失资源引用', value: String(report.missingAssets.length), detail: createDeltaMeta(report.missingAssets.length, baseline.missingAssetCount, ' 条') },
  ]

  const hotspotCards = report.topHotspots.map((item) => ({
    title: item.moduleName,
    href: `/内容导航/${item.moduleName}`,
    meta: `治理得分 ${item.issueScore}`,
    detail: `标题缺失 ${item.missingTitleCount} / 资源缺失 ${item.missingAssetCount} / 占位空文件 ${item.emptyPageCount}`,
  }))

  const fixedScopeCards = remediationConfigs
    .filter((config) => config.milestone === currentGovernanceMilestone)
    .map((config) => ({
      title: getRemediationTitle(config),
      href: getRemediationHref(config),
      meta: `${config.scope} · 当前${getRemediationIssueLabel(config)} ${getRemediationIssueCount(report, config)}`,
      detail: config.summary,
    }))

  const remediationSummaryCards = remediationConfigs
    .map((config) => ({
      title: getRemediationTitle(config),
      href: getRemediationHref(config),
      meta: `${config.milestone} · ${config.scope}`,
      detail: config.summary,
    }))

  const fullyGovernedModules = new Set(remediationConfigs.filter((config) => config.scope === '模块').map((config) => config.moduleName))

  const nextModuleCards = report.topHotspots
    .filter((item) => !fullyGovernedModules.has(item.moduleName))
    .slice(0, 6)
    .map((item) => ({
      title: item.moduleName,
      href: `/内容导航/${item.moduleName}`,
      meta: `治理得分 ${item.issueScore}`,
      detail: `下一批建议优先处理：标题缺失 ${item.missingTitleCount} / 资源缺失 ${item.missingAssetCount}`,
    }))

  const nextSubdirCards = collectSubdirHotspots(report).map((item) => ({
    title: item.title,
    href: item.href,
    meta: `子目录 · 缺少一级标题 ${item.missingTitleCount}`,
    detail: item.samplePaths.join(' / '),
  }))

  const nextAssetCards = collectAssetHotspots(report).map((item) => ({
    title: item.title,
    href: item.href,
    meta: `页面 · 缺失资源 ${item.missingAssetCount}`,
    detail: item.targets.join(' / '),
  }))

  const milestoneCards = collectMilestoneCards(report)

  const duplicateCards = report.duplicateTitles.slice(0, 8).map((item) => ({
    title: item.title,
    meta: `${item.count} 处重复`,
    detail: item.items.slice(0, 2).map((entry) => entry.path).join(' / '),
  }))

  const missingTitleCards = report.missingTitlePages.slice(0, 8).map((item) => ({
    title: item.title,
    href: item.link,
    meta: `${item.moduleName} · 缺少一级标题`,
    detail: item.path,
  }))

  const missingAssetCards = report.missingAssets.slice(0, 8).map((item) => ({
    title: item.target,
    href: item.link,
    meta: `${item.moduleName} · 资源缺失`,
    detail: item.path,
  }))

  const governancePaths = report.topHotspots.slice(0, 3).map((item) => ({
    title: `${item.moduleName} 治理优先级`,
    description: `当前治理得分 ${item.issueScore}，建议先从标题与资源问题开始治理。`,
    steps: [
      {
        title: '标题治理',
        description: `优先补齐 ${item.missingTitleCount} 篇缺少一级标题的文档。`,
        links: [{ text: '进入模块总览', href: `/内容导航/${item.moduleName}` }],
      },
      {
        title: '资源治理',
        description: `核对 ${item.missingAssetCount} 条资源缺失引用，并补图或删除无效链接。`,
        links: [{ text: '查看站点治理', href: '/站点治理/' }],
      },
    ],
  }))

  const lines = [
    '---',
    'title: 站点治理',
    'description: "汇总站点的 Markdown 质量巡检结果与治理入口。"',
    '---',
    '',
    '# 站点治理',
    '',
    '这一页用于汇总站点当前的 Markdown 质量巡检结果，帮助后续继续治理标题、占位页、资源引用和历史脏数据。',
    '',
    `- 最近生成时间：${formatDate(report.generatedAt)}`,
    `- 原始 Markdown 总量：${report.markdownCount}`,
    '',
    '## 巡检概览',
    '',
    `<SiteStatGrid :items='${jsonProp(stats)}' />`,
    '',
    '## 质量趋势',
    '',
    `<SiteDataGrid :items='${jsonProp([
      { title: '占位/空文件', meta: String(report.placeholderCount), detail: createDeltaMeta(report.placeholderCount, baseline.placeholderCount, ' 个') },
      { title: '缺少一级标题', meta: String(report.missingTitlePages.length), detail: createDeltaMeta(report.missingTitlePages.length, baseline.missingTitleCount, ' 篇') },
      { title: '缺失资源引用', meta: String(report.missingAssets.length), detail: createDeltaMeta(report.missingAssets.length, baseline.missingAssetCount, ' 条') },
      { title: '重复标题', meta: String(report.duplicateTitles.length), detail: createDeltaMeta(report.duplicateTitles.length, baseline.duplicateTitleCount, ' 组') },
    ])}' compact />`,
    '',
    '## 累计治理清单',
    '',
    remediationSummaryCards.length ? `<SiteDataGrid :items='${jsonProp(remediationSummaryCards)}' compact />` : '- 当前还没有累计治理清单。',
    '',
    '## 治理里程碑视图',
    '',
    milestoneCards.length ? `<SiteDataGrid :items='${jsonProp(milestoneCards)}' compact />` : '- 当前还没有治理里程碑视图。',
    '',
    '## 本轮已治理范围',
    '',
    fixedScopeCards.length ? `<SiteDataGrid :items='${jsonProp(fixedScopeCards)}' />` : '- 当前还没有配置本轮已治理范围。',
    '',
    '## 下一批推荐模块',

    '',
    nextModuleCards.length ? `<SiteDataGrid :items='${jsonProp(nextModuleCards)}' compact />` : '- 当前没有下一批推荐模块。',
    '',
    '## 下一批推荐子目录',
    '',
    nextSubdirCards.length ? `<SiteDataGrid :items='${jsonProp(nextSubdirCards)}' compact />` : '- 当前没有下一批推荐子目录。',
    '',
    '## 下一批推荐资源问题页',
    '',
    nextAssetCards.length ? `<SiteDataGrid :items='${jsonProp(nextAssetCards)}' compact />` : '- 当前没有下一批推荐资源问题页。',
    '',
    '## 治理热点模块',
    '',
    hotspotCards.length ? `<SiteDataGrid :items='${jsonProp(hotspotCards)}' />` : '- 当前没有检测到治理热点模块。',
    '',
    '## 建议治理路径',
    '',
    governancePaths.length ? `<SiteReadingPaths :paths='${jsonProp(governancePaths)}' />` : '- 当前没有需要优先治理的模块。',
    '',
    '## 重复标题关注项',
    '',
    duplicateCards.length ? `<SiteDataGrid :items='${jsonProp(duplicateCards)}' compact />` : '- 当前没有检测到重复标题。',
    '',
    '## 缺少一级标题',
    '',
    missingTitleCards.length ? `<SiteDataGrid :items='${jsonProp(missingTitleCards)}' compact />` : '- 当前没有检测到缺少一级标题的文档。',
    '',
    '## 缺失资源引用',
    '',
    missingAssetCards.length ? `<SiteDataGrid :items='${jsonProp(missingAssetCards)}' compact />` : '- 当前没有检测到本地资源缺失。',
    '',
    '## 治理建议',
    '',
    '- 优先处理治理热点模块中缺少一级标题的文档，确保搜索结果和页面标题语义稳定。',
    '- 对重复标题建立命名规范，减少专题和搜索结果中的歧义。',
    '- 对历史资源缺失页面补图或删除无效链接，降低阅读中断。',
  ]

  return `${lines.join('\n')}\n`
}

async function writeThemeFiles() {
  await ensureDir(componentsDir)

  const themeIndex = `import DefaultTheme from 'vitepress/theme'\nimport SiteDataGrid from './components/SiteDataGrid.vue'\nimport SiteReadingPaths from './components/SiteReadingPaths.vue'\nimport SiteStatGrid from './components/SiteStatGrid.vue'\nimport './custom.css'\n\nexport default {\n  ...DefaultTheme,\n  enhanceApp({ app }) {\n    app.component('SiteDataGrid', SiteDataGrid)\n    app.component('SiteReadingPaths', SiteReadingPaths)\n    app.component('SiteStatGrid', SiteStatGrid)\n  },\n}\n`

  const siteDataGrid = `<script setup lang="ts">\ninterface GridItem {\n  title: string\n  href?: string\n  meta?: string\n  detail?: string\n}\n\nwithDefaults(defineProps<{\n  items: GridItem[]\n  compact?: boolean\n}>(), {\n  compact: false,\n})\n</script>\n\n<template>\n  <div class="site-grid" :class="{ 'site-grid--compact': compact }">\n    <article v-for="item in items" :key="item.href || item.title" class="site-card">\n      <p v-if="item.meta" class="site-card__meta">{{ item.meta }}</p>\n      <h3 class="site-card__title">\n        <a v-if="item.href" :href="item.href">{{ item.title }}</a>\n        <span v-else>{{ item.title }}</span>\n      </h3>\n      <p v-if="item.detail" class="site-card__detail">{{ item.detail }}</p>\n    </article>\n  </div>\n</template>\n`

  const siteReadingPaths = `<script setup lang="ts">\ninterface PathLink {\n  text: string\n  href: string\n}\n\ninterface PathStep {\n  title: string\n  description: string\n  links: PathLink[]\n}\n\ninterface ReadingPath {\n  title: string\n  description: string\n  steps: PathStep[]\n}\n\ndefineProps<{\n  paths: ReadingPath[]\n}>()\n</script>\n\n<template>\n  <div class="reading-paths">\n    <article v-for="path in paths" :key="path.title" class="reading-path">\n      <header class="reading-path__header">\n        <p class="reading-path__eyebrow">建议阅读路径</p>\n        <h3>{{ path.title }}</h3>\n        <p>{{ path.description }}</p>\n      </header>\n\n      <ol class="reading-path__steps">\n        <li v-for="step in path.steps" :key="step.title" class="reading-path__step">\n          <div>\n            <h4>{{ step.title }}</h4>\n            <p>{{ step.description }}</p>\n          </div>\n          <div class="reading-path__links">\n            <a v-for="link in step.links" :key="link.href" :href="link.href">{{ link.text }}</a>\n          </div>\n        </li>\n      </ol>\n    </article>\n  </div>\n</template>\n`

  const siteStatGrid = `<script setup lang="ts">\ninterface StatItem {\n  label: string\n  value: string\n  detail: string\n}\n\ndefineProps<{\n  items: StatItem[]\n}>()\n</script>\n\n<template>\n  <div class="site-stats">\n    <article v-for="item in items" :key="item.label" class="site-stat">\n      <p class="site-stat__label">{{ item.label }}</p>\n      <p class="site-stat__value">{{ item.value }}</p>\n      <p class="site-stat__detail">{{ item.detail }}</p>\n    </article>\n  </div>\n</template>\n`

  const css = `:root {\n  --vp-c-brand-1: #1f6feb;\n  --vp-c-brand-2: #388bfd;\n  --vp-c-brand-3: #79c0ff;\n  --vp-home-hero-name-color: transparent;\n  --vp-home-hero-name-background: linear-gradient(120deg, #1f6feb 30%, #0f766e 100%);\n  --vp-home-hero-image-background-image: radial-gradient(circle at top, rgba(31, 111, 235, 0.22), rgba(15, 118, 110, 0.12));\n  --vp-home-hero-image-filter: blur(64px);\n}\n\n.VPDoc.has-aside .content-container,\n.VPDoc .content-container {\n  max-width: 960px;\n}\n\n.VPHome .VPHero .image-src {\n  border-radius: 24px;\n  border: 1px solid var(--vp-c-divider);\n  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.16);\n}\n\n.DocSearch-Button,\n.VPLocalSearchBox .search-bar {\n  border-radius: 999px;\n}\n\n.vp-doc h1,\n.vp-doc h2,\n.vp-doc h3 {\n  scroll-margin-top: 72px;\n}\n\n.vp-doc a {\n  word-break: break-word;\n}\n\n.site-stats,\n.site-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n  margin: 20px 0 28px;\n}\n\n.site-grid--compact {\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n}\n\n.site-stat,\n.site-card,\n.reading-path {\n  border: 1px solid var(--vp-c-divider);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(247, 250, 252, 0.9));\n  border-radius: 20px;\n  padding: 20px;\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n}\n\n.dark .site-stat,\n.dark .site-card,\n.dark .reading-path {\n  background: linear-gradient(180deg, rgba(17, 24, 39, 0.88), rgba(15, 23, 42, 0.88));\n}\n\n.site-stat__label,\n.site-card__meta,\n.reading-path__eyebrow {\n  color: var(--vp-c-text-2);\n  font-size: 12px;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  margin: 0 0 8px;\n}\n\n.site-stat__value {\n  font-size: 32px;\n  line-height: 1.1;\n  font-weight: 700;\n  margin: 0 0 10px;\n}\n\n.site-stat__detail,\n.site-card__detail,\n.reading-path__header p,\n.reading-path__step p {\n  color: var(--vp-c-text-2);\n  margin: 0;\n}\n\n.site-card__title,\n.reading-path h3,\n.reading-path h4 {\n  margin: 0 0 10px;\n}\n\n.site-card__title a,\n.reading-path__links a {\n  color: var(--vp-c-brand-1);\n  text-decoration: none;\n}\n\n.site-card__title a:hover,\n.reading-path__links a:hover {\n  text-decoration: underline;\n}\n\n.reading-paths {\n  display: grid;\n  gap: 18px;\n  margin: 20px 0 28px;\n}\n\n.reading-path__header {\n  margin-bottom: 16px;\n}\n\n.reading-path__steps {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n  gap: 14px;\n}\n\n.reading-path__step {\n  display: grid;\n  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);\n  gap: 16px;\n  border-top: 1px solid var(--vp-c-divider);\n  padding-top: 14px;\n}\n\n.reading-path__links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-content: start;\n}\n\n@media (max-width: 768px) {\n  .reading-path__step {\n    grid-template-columns: 1fr;\n  }\n}\n`

  await fs.writeFile(path.join(themeDir, 'index.ts'), themeIndex)
  await fs.writeFile(path.join(themeDir, 'custom.css'), css)
  await fs.writeFile(path.join(componentsDir, 'SiteDataGrid.vue'), siteDataGrid)
  await fs.writeFile(path.join(componentsDir, 'SiteReadingPaths.vue'), siteReadingPaths)
  await fs.writeFile(path.join(componentsDir, 'SiteStatGrid.vue'), siteStatGrid)
}

async function writePublicFiles() {
  await ensureDir(publicDir)
  for (const asset of ['前端技能图谱.jpg']) {
    try {
      await fs.copyFile(path.join(root, asset), path.join(publicDir, asset))
    } catch {}
  }

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${joinSiteUrl(productionSiteUrl, 'sitemap.xml')}\n`
  await fs.writeFile(path.join(publicDir, 'robots.txt'), robots)
}

async function writeStaticSiteFiles(sections, topics, pageCount, recentPages) {
  const sectionCount = sections.length
  const featuredSections = [...sections].sort((a, b) => b.pageCount - a.pageCount).slice(0, 6)
  const curatedSections = pickSectionsByName(sections, [
    '11Vue学习',
    '00面试相关整理',
    '09构建、运维、后端等',
    '06TypeScript',
    '15AI',
    '12React学习',
  ])

  const topicCards = topics.map((topic) => ({
    title: topic.title,
    href: topic.link,
    meta: `${topic.modules.length} 个模块`,
    detail: topic.description,
  }))

  const moduleCards = featuredSections.map((section) => ({
    title: section.name,
    href: section.link,
    meta: `${section.pageCount} 篇文档`,
    detail: `从 ${section.name} 模块总览与推荐入口快速进入。`,
  }))

  const recentCards = recentPages.slice(0, 9).map((page) => ({
    title: page.title,
    href: page.link,
    meta: `${page.moduleName} · ${page.updatedLabel}`,
    detail: '最近更新的原始 Markdown 文档。',
  }))

  const pathCards = topics.map((topic) => ({
    title: topic.title,
    description: topic.description,
    steps: topic.modules.map((section) => ({
      title: section.name,
      description: `${section.pageCount} 篇文档，优先浏览模块总览页和推荐入口。`,
      links: section.highlightEntries.slice(0, 3).map((item) => ({ text: item.text, href: item.link })),
    })),
  }))

  const stats = [
    { label: '学习模块', value: String(sectionCount), detail: '按顶层目录自动收敛模块导航与入口页。' },
    { label: '主题专题', value: String(topics.length), detail: '围绕高价值方向聚合推荐阅读链路。' },
    { label: 'Markdown 文档', value: String(pageCount), detail: '自动镜像进站点并参与索引与浏览。' },
    { label: '最近更新', value: recentPages[0]?.updatedLabel || '-', detail: '基于原始文件修改时间生成更新视图。' },
  ]

  const config = `import { defineConfig } from 'vitepress'\nimport { nav, sidebar, siteMeta, siteStats } from './generated/navigation.mjs'\n\nconst searchTranslations = {\n  button: {\n    buttonText: '搜索文档',\n    buttonAriaLabel: '搜索文档',\n  },\n  modal: {\n    displayDetails: '显示详细列表',\n    resetButtonTitle: '清空搜索条件',\n    backButtonTitle: '关闭搜索',\n    noResultsText: '没有找到相关内容',\n    footer: {\n      selectText: '选择',\n      selectKeyAriaLabel: '回车',\n      navigateText: '切换',\n      navigateUpKeyAriaLabel: '向上箭头',\n      navigateDownKeyAriaLabel: '向下箭头',\n      closeText: '关闭',\n      closeKeyAriaLabel: 'Esc',\n    },\n  },\n}\n\nfunction normalizeBase(base) {\n  if (!base || base === '/') return '/'\n  let trimmed = String(base).trim()\n  while (trimmed.startsWith('/')) trimmed = trimmed.slice(1)\n  while (trimmed.endsWith('/')) trimmed = trimmed.slice(0, -1)\n  return trimmed ? '/' + trimmed + '/' : '/'\n}\n\nfunction normalizeSiteUrl(url) {\n  const trimmed = String(url || siteMeta.productionSiteUrl).trim()\n  return trimmed.endsWith('/') ? trimmed : trimmed + '/'\n}\n\nfunction joinSiteUrl(origin, relativePath = '') {\n  const normalizedPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath\n  return new URL(normalizedPath, normalizeSiteUrl(origin)).toString()\n}\n\nfunction toCanonicalPath(relativePath) {\n  if (!relativePath || relativePath === 'index.md') return ''\n  let pagePath = relativePath\n  if (pagePath.endsWith('README.md')) pagePath = pagePath.slice(0, -'README.md'.length)\n  else if (pagePath.endsWith('.md')) pagePath = pagePath.slice(0, -'.md'.length)\n  if (pagePath.endsWith('/index')) pagePath = pagePath.slice(0, -'/index'.length) + '/'\n  if (pagePath.startsWith('/')) pagePath = pagePath.slice(1)\n  return pagePath\n}\n\nconst base = normalizeBase(process.env.DOCS_BASE ?? siteMeta.productionBase)\nconst siteUrl = normalizeSiteUrl(process.env.DOCS_SITE_URL ?? siteMeta.productionSiteUrl)\nconst socialImage = joinSiteUrl(siteUrl, siteMeta.socialImagePath)\n\nexport default defineConfig({\n  lang: 'zh-CN',\n  title: siteMeta.title,\n  titleTemplate: ':title | Fridolph Notes',\n  description: siteMeta.description,\n  base,\n  cleanUrls: true,\n  ignoreDeadLinks: true,\n  head: [\n    ['meta', { name: 'theme-color', content: '#1f6feb' }],\n    ['meta', { name: 'author', content: 'Fridolph' }],\n    ['meta', { name: 'keywords', content: 'Fridolph,知识库,VitePress,Vue,Nuxt,Node.js,AI,前端学习' }],\n    ['meta', { property: 'og:site_name', content: siteMeta.title }],\n    ['meta', { property: 'og:image', content: socialImage }],\n    ['meta', { property: 'twitter:image', content: socialImage }],\n    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],\n    ['link', { rel: 'icon', href: base + '前端技能图谱.jpg' }],\n  ],\n  sitemap: {\n    hostname: siteUrl,\n  },\n  vite: {\n    build: {\n      chunkSizeWarningLimit: 5000,\n    },\n  },\n  transformHead({ pageData, title, description }) {\n    const canonicalUrl = joinSiteUrl(siteUrl, toCanonicalPath(pageData.relativePath))\n    const pageTitle = title || siteMeta.title\n    const pageDescription = description || pageData.description || siteMeta.description\n    const pageType = pageData.frontmatter.layout === 'home' ? 'website' : 'article'\n\n    return [\n      ['link', { rel: 'canonical', href: canonicalUrl }],\n      ['meta', { property: 'og:type', content: pageType }],\n      ['meta', { property: 'og:title', content: pageTitle }],\n      ['meta', { property: 'og:description', content: pageDescription }],\n      ['meta', { property: 'og:url', content: canonicalUrl }],\n      ['meta', { name: 'twitter:title', content: pageTitle }],\n      ['meta', { name: 'twitter:description', content: pageDescription }],\n    ]\n  },\n  themeConfig: {\n    logo: siteMeta.socialImagePath,\n    siteTitle: siteMeta.title,\n    nav,\n    sidebar,\n    outline: { level: [2, 3], label: '本页导航' },\n    docFooter: { prev: '上一篇', next: '下一篇' },\n    sidebarMenuLabel: '模块导航',\n    returnToTopLabel: '回到顶部',\n    socialLinks: [{ icon: 'github', link: 'https://github.com/Fridolph/Fridolph' }],\n    search: {\n      provider: 'local',\n      options: {\n        locales: {\n          root: {\n            translations: searchTranslations,\n          },\n        },\n        _render(src, env, md) {\n          if (env.frontmatter?.search === false) return ''\n          return md.render(src, env)\n        },\n      },\n    },\n    footer: {\n      message: \`共 \${siteStats.sectionCount} 个模块，\${siteStats.pageCount} 篇 Markdown 文档。\`,\n      copyright: 'Built with VitePress',\n    },\n  },\n  markdown: {\n    config(md) {\n      md.options.html = true\n    },\n    image: { lazyLoading: true },\n  },\n})\n`

  const home = `---\nlayout: home\ntitle: 首页\ndescription: ${siteDescription}\n\nhero:\n  name: ${siteTitle}\n  text: 个人学习资料与 Markdown 知识库\n  tagline: 使用 VitePress 重构展示的前端、工程化、Vue、Node.js 与 AI 学习笔记站点。\n  image:\n    src: ${socialImagePath}\n    alt: 前端技能图谱\n  actions:\n    - theme: brand\n      text: 开始浏览\n      link: /内容导航/\n    - theme: alt\n      text: 查看专题\n      link: /专题导航/\n\nfeatures:\n  - title: 模块化导航\n    details: 以顶层学习模块为单位自动生成导航、侧边栏与索引页，便于快速定位内容。\n  - title: 专题化阅读\n    details: 按 Vue / Nuxt、面试、工程化、AI 等主题建立阅读入口，降低从目录进入的认知成本。\n  - title: 发布就绪\n    details: 补齐搜索、SEO 元信息、sitemap 与 GitHub Pages 工作流，让站点更接近正式发布状态。\n---\n\n## 站点概览\n\n<SiteStatGrid :items='${jsonProp(stats)}' />\n\n## 快速开始\n\n<SiteDataGrid :items='${jsonProp(moduleCards)}' />\n\n## 重点专题\n\n<SiteDataGrid :items='${jsonProp(topicCards)}' />\n\n## 最近更新\n\n<SiteDataGrid :items='${jsonProp(recentCards)}' compact />\n\n## 建议阅读路径\n\n<SiteReadingPaths :paths='${jsonProp(pathCards)}' />\n\n## 搜索与发布说明\n\n- 全站启用本地搜索，可通过右上角搜索入口快速检索资料。\n- 占位页默认不参与搜索索引，减少空内容污染搜索结果。\n- 构建产物支持 \`sitemap.xml\`、\`robots.txt\` 与 GitHub Pages 自动发布。\n- 首页、模块页和专题页已补齐元信息，便于被搜索引擎与社交分享识别。\n\n## 相关链接\n\n- 博客：<https://fridolph.top>\n- 仓库主页：<https://github.com/Fridolph/Fridolph>\n- 面试资料仓库：<https://github.com/Fridolph/fri-prepare-interview>\n- Demo 练习仓库：<https://github.com/Fridolph/my-program>\n`

  await fs.writeFile(path.join(siteRoot, 'index.md'), home)
  await fs.writeFile(path.join(siteRoot, '.vitepress', 'config.mts'), config)
}

async function main() {
  await resetDir(siteRoot)
  await ensureDir(overviewDir)
  await ensureDir(topicDir)
  await ensureDir(governanceDir)
  await ensureDir(generatedDir)
  await ensureDir(themeDir)
  await writePublicFiles()
  await writeThemeFiles()

  const rootEntries = await fs.readdir(root, { withFileTypes: true })
  const topModules = rootEntries
    .filter((entry) => entry.isDirectory() && !ignoredTopLevel.has(entry.name))
    .sort((a, b) => compareStrings(a.name, b.name))

  for (const moduleEntry of topModules) {
    await copySourceTree(path.join(root, moduleEntry.name), path.join(siteRoot, moduleEntry.name), moduleEntry.name)
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

  const topics = topicConfigs
    .map((config) => {
      const modules = config.moduleNames
        .map((name) => sections.find((section) => section.name === name))
        .filter(Boolean)

      if (!modules.length) return null

      const recommended = []
      const seen = new Set()
      for (const section of modules) {
        for (const item of section.highlightEntries.slice(0, 4)) {
          if (seen.has(item.link)) continue
          seen.add(item.link)
          recommended.push(item)
        }
      }

      return {
        ...config,
        modules,
        recommended: recommended.slice(0, 12),
        link: `/专题导航/${config.slug}`,
      }
    })
    .filter(Boolean)

  const pageCount = sections.reduce((sum, section) => sum + section.pageCount, 0)
  const recentPages = await collectOriginalPages(topModules)
  const qualityReport = await collectQualityReport(topModules)

  await writeStaticSiteFiles(sections, topics, pageCount, recentPages)

  const overviewCards = [...sections]
    .sort((a, b) => b.pageCount - a.pageCount)
    .slice(0, 8)
    .map((section) => ({
      title: section.name,
      href: section.link,
      meta: `${section.pageCount} 篇`,
      detail: `从 ${section.name} 总览页快速进入重点内容。`,
    }))

  const overviewLines = [
    '---',
    'title: 内容导航',
    `description: "按顶层学习模块浏览 ${pageCount} 篇 Markdown 文档。"`,
    '---',
    '',
    '# 内容导航',
    '',
    `当前站点共收录 **${pageCount}** 篇 Markdown 文档，按顶层学习模块进行展示。`,
    '',
    '## 优先浏览的模块',
    '',
    `<SiteDataGrid :items='${jsonProp(overviewCards)}' />`,
    '',
    '## 模块总览',
    '',
  ]

  for (const section of sections) {
    overviewLines.push(`### [${section.name}](${section.link})`)
    overviewLines.push('')
    overviewLines.push(`- 文档数：${section.pageCount}`)
    overviewLines.push(`- 快速进入：[${section.pages[0].text}](${section.pages[0].link})`)
    if (section.highlightEntries.length) {
      overviewLines.push(`- 推荐入口：${section.highlightEntries.slice(0, 3).map((item) => `[${item.text}](${item.link})`).join(' / ')}`)
    }
    overviewLines.push('')
    const sectionRecentPages = recentPages.filter((item) => item.moduleName === section.name).slice(0, 6)
    await fs.writeFile(path.join(overviewDir, `${section.name}.md`), createOverviewContent(section, sectionRecentPages))
  }

  await fs.writeFile(path.join(overviewDir, 'index.md'), `${overviewLines.join('\n')}\n`)

  const topicOverviewLines = [
    '---',
    'title: 专题导航',
    'description: "按高价值主题浏览站点中的核心学习资料。"',
    '---',
    '',
    '# 专题导航',
    '',
    '当前站点按高价值主题整理了一组专题入口，适合从主题而不是目录进入资料库。',
    '',
    '## 专题总览',
    '',
    `<SiteDataGrid :items='${jsonProp(topics.map((topic) => ({ title: topic.title, href: topic.link, meta: `${topic.modules.length} 个模块`, detail: topic.description })))}' />`,
    '',
  ]

  for (const topic of topics) {
    topicOverviewLines.push(`### [${topic.title}](${topic.link})`)
    topicOverviewLines.push('')
    topicOverviewLines.push(`- 覆盖模块：${topic.modules.map((item) => `[${item.name}](${item.link})`).join(' / ')}`)
    topicOverviewLines.push(`- 推荐阅读数：${topic.recommended.length}`)
    topicOverviewLines.push(`- 说明：${topic.description}`)
    topicOverviewLines.push('')
    await fs.writeFile(path.join(topicDir, `${topic.slug}.md`), createTopicContent(topic))
  }

  await fs.writeFile(path.join(topicDir, 'index.md'), `${topicOverviewLines.join('\n')}\n`)

  await fs.writeFile(path.join(governanceDir, 'index.md'), createGovernanceContent(qualityReport))
  await fs.writeFile(path.join(generatedDir, 'quality-report.json'), `${JSON.stringify(qualityReport, null, 2)}\n`)

  const featuredNavSections = [...sections].sort((a, b) => b.pageCount - a.pageCount).slice(0, 8)

  const nav = [
    { text: '首页', link: '/' },
    { text: '内容导航', link: '/内容导航/' },
    { text: '专题导航', link: '/专题导航/' },
    { text: '站点治理', link: '/站点治理/' },
    {
      text: '重点模块',
      items: featuredNavSections.map((section) => ({ text: section.name, link: section.link })),
    },
    {
      text: '重点专题',
      items: topics.map((topic) => ({ text: topic.title, link: topic.link })),
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
    '/专题导航/': [
      {
        text: '全部专题',
        items: topics.map((topic) => ({
          text: topic.title,
          link: topic.link,
        })),
      },
    ],
    '/站点治理/': [
      {
        text: '治理视图',
        items: [
          { text: '站点治理总览', link: '/站点治理/' },
        ],
      },
    ],
  }

  for (const section of sections) {
    sidebar[`/${section.name}/`] = section.sidebarItems
  }

  const generatedModule = `export const siteMeta = ${JSON.stringify({
    title: siteTitle,
    description: siteDescription,
    productionBase,
    productionSiteUrl,
    socialImagePath,
  }, null, 2)}\n\nexport const siteStats = ${JSON.stringify({ sectionCount: sections.length, pageCount }, null, 2)}\n\nexport const nav = ${JSON.stringify(nav, null, 2)}\n\nexport const sidebar = ${JSON.stringify(sidebar, null, 2)}\n\nexport const sections = ${JSON.stringify(sections.map((section) => ({ name: section.name, link: section.link, pageCount: section.pageCount })), null, 2)}\n`

  await fs.writeFile(path.join(generatedDir, 'navigation.mjs'), generatedModule)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
