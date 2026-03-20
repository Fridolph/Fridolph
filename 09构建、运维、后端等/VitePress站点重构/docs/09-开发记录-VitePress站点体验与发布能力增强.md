# 开发记录：VitePress 站点体验与发布能力增强

## 背景

M0 到 M2 完成后，站点已经能把仓库中的 Markdown 内容稳定转成 VitePress 站点，但距离“正式可发布”还差几个关键环节：

- 搜索结果里会混入自动生成的占位页
- 页面级元信息不完整
- GitHub Pages workflow 仍然在上传整个仓库
- 缺少 `robots.txt` 与 `sitemap` 这类基础发布产物

因此 M3 的重点不是再加新的浏览入口，而是把站点体验和发布链路补完整。

## 本轮改动

### 1. 生成脚本补齐站点元信息能力

围绕 `scripts/generate-vitepress.mjs` 做了这一轮增强：

- 为首页、内容导航页、专题导航页、模块页和专题页补齐 `title` / `description`
- 为占位页增加 `search: false` 和 `outline: false`
- 统一站点生产 `base` 与 `siteUrl`
- 生成 `public/robots.txt`
- 将站点共享资源写入 `docs-site/public`

### 2. VitePress 配置增强

自动生成的 `.vitepress/config.mts` 新增了下面这些能力：

- `titleTemplate`
- 本地搜索中文化文案
- `sitemap.hostname`
- Open Graph / Twitter Card 元信息
- canonical URL 动态生成
- favicon 与分享图配置

### 3. 发布 workflow 修正

把 `.github/workflows/static.yml` 从“上传整个仓库”改成“构建后上传 `docs-site/.vitepress/dist`”，发布链路开始与 VitePress 站点结构对齐。

## 关键实现点

### 占位页不进搜索

这一步的收益很高，因为此前占位页会被本地搜索索引，检索结果里容易出现“文件为空、建议补内容”这一类噪声页面。

这轮通过 frontmatter 方式直接把占位页排除出搜索索引，保留兜底能力的同时降低干扰。

### base 与 siteUrl 分离

本地开发和 GitHub Pages 部署的路径诉求不同：

- 本地开发更适合 `/`
- GitHub Pages 仓库页面通常需要 `/仓库名/`

这轮把 `DOCS_BASE` 与 `DOCS_SITE_URL` 抽成可覆盖配置，站点生成逻辑与发布环境开始解耦。

### 继续坚持“生成优先”

这一轮没有改成手工维护 VitePress 页面，而是继续把能力收敛在生成脚本里。这样新增 Markdown 内容时，M1 到 M3 的增强能力仍然可以自动继承。

## 自测结果

本轮完成后执行了以下自测：

- `npm run docs:sync`
- `npm run build`
- `npm run preview`
- 访问首页、内容导航页、专题导航页、专题详情页
- 检查 `sitemap.xml` 与 `robots.txt` 是否生成
- 检查 workflow 是否改为上传 VitePress 构建产物

结果：通过。

## 本轮价值

M3 完成后，这个站点从“能跑的知识库原型”进一步提升成了“具备正式发布基础能力的知识站点”：

- 更容易搜索
- 更容易分享
- 更容易被索引
- 更容易持续部署

这也为后续继续做发布优化、主题增强和内容精修打下了更稳的基础。
