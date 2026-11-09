import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { fileURLToPath, URL } from 'node:url'
import { legacyRedirectPlugin, writeLegacyRedirects } from '../../scripts/legacy-routes.mjs'
import head from './config/head.js'
import nav from './config/nav.js'
import sidebar from './config/sidebar/index.js'

const base = process.env.NODE_ENV === 'production' ? '/FE-prepare-interview/' : '/'

const config = withMermaid(defineConfig({
  base,
  outDir: '../dist',
  lang: 'zh-CN',
  title: 'Web 开发学习宝典',
  description: '从前端走向全栈与 AI 应用开发，连接概念原理、编码实践、学习自测与博客复盘。',
  head: head(base),
  cleanUrls: true,
  themeConfig: {
    siteTitle: 'Web 开发学习宝典',
    appearance: true,
    logo: '/me.jpg',
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/Fridolph/FE-prepare-interview' }],
    footer: {
      message: '理解 · 实践 · 自测 · 复盘',
      copyright: 'CC BY-NC-ND 4.0 · <a href="https://fridolph.github.io/fridolph-blog/" target="_blank" rel="noopener noreferrer">Fridolph</a>',
    },
    editLink: {
      pattern: 'https://github.com/Fridolph/FE-prepare-interview/edit/dev/src/:path',
      text: '在 GitHub 上编辑此页面',
    },
    search: { provider: 'local' },
    outline: { level: 'deep', label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short', timeStyle: 'short' } },
    externalLinkIcon: true,
  },
  vite: {
    plugins: [legacyRedirectPlugin(base)],
    resolve: { alias: { '@': fileURLToPath(new URL('../', import.meta.url)) } },
  },
  markdown: {
    math: true,
    lineNumbers: true,
    image: { lazyLoading: true },
    container: { tipLabel: '提示', warningLabel: '警告', dangerLabel: '注意', infoLabel: '信息', detailsLabel: '详细信息' },
  },
  sitemap: { hostname: 'https://fridolph.github.io/FE-prepare-interview/' },
  async buildEnd(siteConfig) {
    const count = await writeLegacyRedirects(siteConfig.outDir, siteConfig.site.base)
    console.log(`生成 ${count} 个旧栏目地址跳转页`)
  },
}))

// 插件默认从项目根目录预构建 Mermaid 的间接依赖；pnpm 的隔离布局下
// 改为预构建 Mermaid 入口，让 Vite 统一处理其 CommonJS 依赖。
config.vite.optimizeDeps.include = ['mermaid']

export default config
