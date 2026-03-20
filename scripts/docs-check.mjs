import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distRoot = path.join(root, 'docs-site', '.vitepress', 'dist')
const generatedRoot = path.join(root, 'docs-site', '.vitepress', 'generated')
const baselinePath = path.join(root, 'scripts', 'docs-quality-baseline.json')

const requiredFiles = [
  path.join(distRoot, 'index.html'),
  path.join(distRoot, 'robots.txt'),
  path.join(distRoot, 'sitemap.xml'),
  path.join(generatedRoot, 'quality-report.json'),
]

const requiredPages = [
  path.join(distRoot, '内容导航', 'index.html'),
  path.join(distRoot, '专题导航', 'index.html'),
  path.join(distRoot, '站点治理', 'index.html'),
  path.join(distRoot, '专题导航', 'vue-nuxt.html'),
]

async function assertExists(filePath) {
  await fs.access(filePath)
}

function summarize(report) {
  return {
    markdownCount: report.markdownCount,
    placeholderCount: report.placeholderCount,
    missingTitleCount: report.missingTitlePages.length,
    missingAssetCount: report.missingAssets.length,
    duplicateTitleCount: report.duplicateTitles.length,
    hotspotModule: report.topHotspots?.[0]?.moduleName || null,
    hotspotScore: report.topHotspots?.[0]?.issueScore || 0,
  }
}

function compareWithBaseline(summary, baseline) {
  const regressions = []
  const trackedKeys = ['placeholderCount', 'missingTitleCount', 'missingAssetCount', 'duplicateTitleCount']

  for (const key of trackedKeys) {
    const current = summary[key]
    const expected = baseline[key]
    if (typeof expected !== 'number') continue
    if (current > expected) {
      regressions.push({ key, baseline: expected, current, delta: current - expected })
    }
  }

  return regressions
}

async function writeStepSummary(summary, baseline, regressions) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY
  if (!summaryPath) return

  const lines = [
    '# Docs quality summary',
    '',
    `- Markdown 文档：${summary.markdownCount}`,
    `- 占位/空文件：${summary.placeholderCount}`,
    `- 缺少一级标题：${summary.missingTitleCount}`,
    `- 缺失资源引用：${summary.missingAssetCount}`,
    `- 重复标题：${summary.duplicateTitleCount}`,
    `- 当前治理热点：${summary.hotspotModule || '无'} (${summary.hotspotScore})`,
  ]

  if (baseline) {
    lines.push('')
    lines.push('## Baseline')
    lines.push('')
    lines.push(`- placeholderCount: ${baseline.placeholderCount}`)
    lines.push(`- missingTitleCount: ${baseline.missingTitleCount}`)
    lines.push(`- missingAssetCount: ${baseline.missingAssetCount}`)
    lines.push(`- duplicateTitleCount: ${baseline.duplicateTitleCount}`)
  }

  if (regressions.length) {
    lines.push('')
    lines.push('## Regressions')
    lines.push('')
    for (const item of regressions) {
      lines.push(`- ${item.key}: baseline ${item.baseline} -> current ${item.current} (+${item.delta})`)
    }
  }

  await fs.appendFile(summaryPath, `${lines.join('\n')}\n`)
}

async function main() {
  for (const filePath of [...requiredFiles, ...requiredPages]) {
    await assertExists(filePath)
  }

  const report = JSON.parse(await fs.readFile(path.join(generatedRoot, 'quality-report.json'), 'utf8'))
  const summary = summarize(report)

  let baseline = null
  try {
    baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8'))
  } catch {}

  const regressions = baseline ? compareWithBaseline(summary, baseline) : []
  await writeStepSummary(summary, baseline, regressions)

  console.log('[docs-check] generated site validation passed')
  console.log(JSON.stringify(summary, null, 2))

  if (baseline) {
    console.log('[docs-check] baseline loaded')
    console.log(JSON.stringify(baseline, null, 2))
  }

  if (regressions.length) {
    console.error('[docs-check] quality regression detected')
    console.error(JSON.stringify(regressions, null, 2))
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error('[docs-check] failed')
  console.error(error)
  process.exitCode = 1
})
