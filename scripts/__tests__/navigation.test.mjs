import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sidebar from '../../src/.vitepress/config/sidebar/index.js'
import nav from '../../src/.vitepress/config/nav.js'
import { learningDomains } from '../../src/.vitepress/data/learning.ts'

function linksOf(items) {
  return items.flatMap(item => [item.link, ...linksOf(item.items ?? [])]).filter(Boolean)
}

test('栏目迁移后，顶部导航、侧栏与首页入口均指向现存文档', () => {
  const links = [...linksOf(nav), ...Object.values(sidebar).flatMap(linksOf), ...learningDomains.flatMap(domain => domain.topics.map(topic => topic.link))]
  for (const link of links.filter(link => link.startsWith('/'))) {
    const path = decodeURI(link.split(/[?#]/)[0]).replace(/\.md$/, '').replace(/\/$/, '/index')
    // macOS 默认文件系统忽略大小写，逐段核对实际名称以保持与 Linux CI 一致。
    let directory = fileURLToPath(new URL('../../src/', import.meta.url))
    for (const segment of `${path}.md`.split('/').filter(Boolean)) {
      assert.ok(readdirSync(directory).includes(segment), `导航路径不存在或大小写不匹配：${link}（${segment}）`)
      directory = join(directory, segment)
    }
    assert.doesNotMatch(path, /^\/(直击概念|编写代码|面试官问)\//)
  }
})
