import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { join, relative, dirname } from 'node:path'

export const legacySections = {
  直击概念: '概念与原理',
  编写代码: '编码与实践',
  面试官问: '学习自测',
}

const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/')

export function redirectLegacyPath(requestUrl, base = '/') {
  const url = new URL(requestUrl, 'http://localhost')
  let pathname
  try { pathname = decodeURIComponent(url.pathname) } catch { return null }
  if (!pathname.startsWith(base)) return null
  const localPath = pathname.slice(base.length)
  const [section, ...rest] = localPath.split('/')
  if (!legacySections[section]) return null
  return `${encodePath(`${base}${legacySections[section]}/${rest.join('/')}`)}${url.search}${url.hash}`
}

async function htmlFiles(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await htmlFiles(path))
    else if (entry.name.endsWith('.html')) files.push(path)
  }
  return files
}

export async function writeLegacyRedirects(outDir, base) {
  let count = 0
  for (const [legacy, current] of Object.entries(legacySections)) {
    for (const file of await htmlFiles(join(outDir, current))) {
      const suffix = relative(join(outDir, current), file).split('\\').join('/')
      const target = encodePath(`${base}${current}/${suffix}`)
      const destination = join(outDir, legacy, suffix)
      await mkdir(dirname(destination), { recursive: true })
      await writeFile(destination, `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0;url=${target}"><title>内容已迁移</title></head><body><a href="${target}">前往新页面</a><script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script></body></html>`)
      count++
    }
  }
  return count
}

export function legacyRedirectPlugin(base) {
  return {
    name: 'legacy-section-redirects',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const target = redirectLegacyPath(request.url ?? '/', base)
        if (!target) return next()
        response.writeHead(302, { Location: target })
        response.end()
      })
    },
  }
}
