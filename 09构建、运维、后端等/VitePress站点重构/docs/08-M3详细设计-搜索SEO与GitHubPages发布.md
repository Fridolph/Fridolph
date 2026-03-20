# M3 详细设计：搜索、SEO 与 GitHub Pages 发布增强

这份详细设计文档用于描述 M3 这一轮改造的核心设计决策、改动边界和验证方式。

## 设计目标

在不破坏现有“自动镜像 Markdown -> 生成 VitePress 站点”主流程的前提下，补齐站点体验与发布能力。

本轮设计强调三点：

- 继续以生成脚本为中心收敛逻辑
- 尽量不手工维护站点页面文件
- 保证本地开发和 GitHub Pages 发布都能跑通

## 一、搜索体验设计

### 1.1 搜索策略

继续沿用 VitePress 内置本地搜索能力，不额外引入第三方搜索服务。

原因：

- 当前仓库以静态资料展示为主，本地搜索已经足够覆盖需求
- 不引入外部服务可以保持站点构建链路简单
- 有利于先把搜索质量问题解决，再决定是否进入更复杂的搜索方案

### 1.2 索引治理策略

对自动生成的占位页增加以下 frontmatter：

- `search: false`
- `description`
- `outline: false`

这样可以避免空文件或无法读取文件生成的说明页进入搜索结果，减少无效命中。

### 1.3 搜索交互文案

在 VitePress `themeConfig.search.options.locales.root.translations` 中统一补齐中文文案，包括：

- 搜索按钮文本
- 重置按钮说明
- 关闭弹窗说明
- 没有搜索结果提示
- 键盘操作提示

## 二、SEO 与社交分享设计

### 2.1 页面级元信息

对以下自动生成页面补齐 frontmatter：

- 首页
- `内容导航/index.md`
- `专题导航/index.md`
- 模块总览页
- 专题详情页
- 自动占位页

每类页面至少保证：

- `title`
- `description`

### 2.2 站点级元信息

在 `.vitepress/config.mts` 中增加：

- `titleTemplate`
- `head` 中的 `theme-color`
- `author`
- `keywords`
- `og:site_name`
- `og:image`
- `twitter:card`
- favicon

### 2.3 Canonical 与社交卡片

通过 `transformHead` 为页面动态补齐：

- canonical URL
- `og:title`
- `og:description`
- `og:url`
- `og:type`
- `twitter:title`
- `twitter:description`

这里使用统一的站点生产地址和页面相对路径来生成最终 URL，避免各页面自行维护。

## 三、构建与静态产物设计

### 3.1 生产地址与 base 策略

由于仓库通过 GitHub Pages 仓库页面部署，生产环境默认采用：

- `productionBase = /Fridolph/`
- `productionSiteUrl = https://fridolph.github.io/Fridolph/`

同时保留通过环境变量覆盖的能力：

- `DOCS_BASE`
- `DOCS_SITE_URL`

这样可以兼顾：

- 本地开发时使用 `/`
- 生产构建时使用仓库路径
- 后续如果切到自定义域名，也能最小代价调整

### 3.2 sitemap 与 robots

设计方案：

- 使用 VitePress 原生 `sitemap.hostname`
- 在生成脚本中自动写入 `public/robots.txt`
- `robots.txt` 内写入 `Sitemap` 地址

这样构建完成后会自然产出：

- `sitemap.xml`
- `robots.txt`

### 3.3 公共资源策略

将站点共享资源写入 `docs-site/public`，让：

- Hero 图
- favicon
- 社交分享图
- robots 文件

都通过统一公共目录输出，减少路径偏差。

## 四、发布工作流设计

### 4.1 当前问题

现有 workflow 直接上传整个仓库到 GitHub Pages，这与 VitePress 站点构建模式不匹配。

问题包括：

- 没有安装依赖
- 没有执行 VitePress 构建
- 上传产物不是最终静态站点

### 4.2 目标工作流

改造成标准的 VitePress Pages 流程：

1. checkout 仓库
2. setup Node
3. `npm ci`
4. `npm run docs:build`
5. 上传 `docs-site/.vitepress/dist`
6. 执行 Pages 部署

### 4.3 保持的约束

- 继续复用 `.github/workflows/static.yml`
- 继续保持 `master` 推送触发部署
- 允许手工 `workflow_dispatch`

## 五、自测设计

本轮至少执行下面几类验证：

### 5.1 构建验证

- `npm run docs:sync`
- `npm run build`

### 5.2 预览验证

- `npm run preview`
- 访问首页
- 访问 `内容导航`
- 访问 `专题导航`
- 访问一个专题详情页

### 5.3 产物验证

确认构建结果中存在：

- `docs-site/.vitepress/dist/index.html`
- `docs-site/.vitepress/dist/sitemap.xml`
- `docs-site/.vitepress/dist/robots.txt`

### 5.4 工作流验证

检查 workflow 文件内容是否已经切到 VitePress 构建产物上传模式。

## 六、变更边界

本轮不处理：

- 第三方全文搜索服务接入
- 评论系统
- 自定义主题组件大改
- 自定义域名配置
- 自动化截图和视觉回归体系

M3 的目标是把当前站点推进到“更像正式发布站点”的状态，而不是一次把所有发布周边能力做满。
