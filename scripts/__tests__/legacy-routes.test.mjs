import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { legacySections, redirectLegacyPath, writeLegacyRedirects } from '../legacy-routes.mjs'

test('旧栏目地址保留文章路径、查询参数与锚点，支持 Pages 子路径', () => {
  for (const [oldName, newName] of Object.entries(legacySections)) {
    const oldPath = `/FE-prepare-interview/${encodeURIComponent(oldName)}/18nestjs/article.html?from=bookmark#section`
    assert.equal(redirectLegacyPath(oldPath, '/FE-prepare-interview/'), `${encodeURI(`/FE-prepare-interview/${newName}/18nestjs/article.html`)}?from=bookmark#section`)
    assert.equal(redirectLegacyPath(`/${oldName}/index`), encodeURI(`/${newName}/index`))
  }
  assert.equal(redirectLegacyPath('/面试官问/a%20b.html?q=a%20b#anchor'), `${encodeURI('/学习自测/a b.html')}?q=a%20b#anchor`)
  assert.equal(redirectLegacyPath('/学习自测/index'), null)
  assert.equal(redirectLegacyPath('/%malformed'), null)
  assert.equal(redirectLegacyPath('/other/面试官问/index', '/FE-prepare-interview/'), null)
})

test('每个已迁移的 HTML 都生成旧地址入口，目标指向真实的新页面', async () => {
  const output = await mkdtemp(join(tmpdir(), 'learning-redirects-'))
  try {
    for (const current of Object.values(legacySections)) {
      await mkdir(join(output, current, 'nested'), { recursive: true })
      await writeFile(join(output, current, 'nested', 'article.html'), '<h1>文章</h1>')
    }
    assert.equal(await writeLegacyRedirects(output, '/FE-prepare-interview/'), 3)
    for (const [oldName, current] of Object.entries(legacySections)) {
      const html = await readFile(join(output, oldName, 'nested', 'article.html'), 'utf8')
      assert.ok(html.includes(encodeURI(`/FE-prepare-interview/${current}/nested/article.html`)))
      assert.ok(html.includes('location.search + location.hash'))
      assert.ok(html.includes('noindex'))
    }
  } finally { await rm(output, { recursive: true, force: true }) }
})
