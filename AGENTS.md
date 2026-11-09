# AGENTS.md

> 🤖 AI Agent 项目指引 —— 用于 Claude Code、Cursor、OpenCode 等 AI 编码助手

## 项目简介

**Web 开发学习宝典** 从前端知识库演进而来，基于 [VitePress](https://vitepress.dev) 构建。面向前端、后端与 AI 应用开发，连接概念原理、编码实践、学习自测与博客复盘。仓库与 Pages 地址继续使用 `FE-prepare-interview`。

首页与侧边栏按前端开发、后端开发、AI 应用开发、通用基础、性能优化分组；内容按学习方式存储。面试复习只是学习自测的一种使用场景。

- 🌐 在线预览：[GitHub Pages](https://fridolph.github.io/FE-prepare-interview)
- 📝 掘金介绍：[使用 VitePress 打造个人专属的前端知识体系](https://juejin.cn/post/7346888998487310390)

## 技术栈

| 类别 | 技术 |
|------|------|
| 文档框架 | VitePress 1.6.4（稳定版） |
| 前端框架 | Vue 3.5 + Composition API |
| 样式方案 | 原生 CSS + PostCSS |
| 代码高亮 | VitePress 内置 Shiki |
| 包管理器 | pnpm 12.14.0 |
| Node.js | 24.x（见 `.nvmrc`） |

## 常用命令

```bash
# 安装依赖（必须使用 pnpm）
pnpm install --frozen-lockfile

# 本地开发
pnpm dev

# lint、站点组件类型检查与迁移测试
pnpm check

# 构建生产版本（含死链检查）
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
FE-prepare-interview/
├── src/                          # VitePress 源文件
│   ├── .vitepress/
│   │   ├── config.js             # VitePress 主配置
│   │   ├── config/
│   │   │   ├── nav.js            # 顶部导航
│   │   │   ├── head.js           # HTML head 标签
│   │   │   ├── emoji.js          # 自定义 emoji
│   │   │   └── sidebar/          # 侧边栏配置
│   │   │       ├── index.js      # 侧边栏路由聚合
│   │   │       ├── usePath.js    # 路径映射工具（typeMap）
│   │   │       ├── 概念与原理.js
│   │   │       ├── 学习自测.js
│   │   │       └── 编码与实践.js
│   │   └── theme/                # 自定义主题
│   ├── 概念与原理/                  # 概念讲解版块（s_ 前缀文件）
│   ├── 学习自测/                  # 问题与参考回答（q_ 前缀文件）
│   ├── 编码与实践/                  # 手写代码版块（c_ 前缀文件）
│   ├── 学习路线/                # 全栈学习路线、实践记录模板
│   ├── 性能优化/                # 跨领域性能专题入口
│   ├── 学习资源/                # 博客、项目与历史资料
│   ├── 网友面经/                  # 历史交流归档
│   ├── 相关准备/                  # 简历/工具推荐
│   ├── 参与贡献/                  # 贡献指南
│   └── templates/                # Vue 组件模版
├── AGENTS.md                     # 本文件
├── README.md
├── package.json
└── pnpm-lock.yaml
```

## 内容三大核心版块

| 版块 | 文件前缀 | 用途 |
|------|----------|------|
| 概念与原理 | `s_` | 概念解析、原理讲解，帮助理解"是什么" |
| 学习自测 | `q_` | 学习问题、参考回答与关键点梳理 |
| 编码与实践 | `c_` | 手写代码、源码分析、场景实现 |

## 文件命名规范

### 目录编号映射（typeMap）

所有内容目录采用 `XXname` 格式编号，定义在 `src/.vitepress/config/sidebar/usePath.js` 的 `typeMap` 中：

| 编号 | 目录 | 说明 |
|------|------|------|
| 00other | 其他 | 杂项 |
| 01htmlcss | HTML & CSS | |
| 02js | JavaScript | 含 ES6/Promise |
| 03algo | 算法 & 数据结构 | |
| 04http | HTTP | |
| 05node | Node.js | |
| 06opt | 性能优化 | |
| 07vue | Vue.js | 含 VueUse |
| 08react | React | |
| 09build | 前端工程化 | Webpack/Vite |
| 10safe | Web 安全 | |
| 11ts | TypeScript | |
| 12broswer | 浏览器原理 | |
| 13solution | 解决方案 | |
| 14app | 移动端 / 小程序 | |
| 15radash | Radash 源码 | |
| 16patterns | 编程模式 | |
| 17ai | AI / 大模型 | 2024 新增 |
| 18nestjs | NestJS | |
| 19database | 数据库 / PostgreSQL | |
| 20deploy | 开发与部署 | Linux / Git / Nginx / Node 进程 / Docker |

### 文件命名格式

- **概念与原理**: `s_{type}_{index}-{fileName}.md`
  - 例：`s_js_1-base.md`
- **学习自测**: `q_{type}_{index}-{fileName}.md`
  - 例：`q_js_1-base.md`
- **编码与实践**: `c_{type}_{index}-{fileName}/c_{type}_{index}-{fileName}.md`
  - 例：`c_js_2-deepcopy/c_js_2-deepcopy.md`

### 新增内容板块步骤

1. 在 `usePath.js` 的 `typeMap` 中注册新目录映射
2. 创建目录 `src/{版块}/{编号目录}/`
3. 创建 `intro.md` 作为板块首页
4. 在对应 sidebar 文件中添加菜单项
5. 运行 `pnpm dev` 验证

## AI Agent 常见任务指南

### 添加新文章

**场景**: 在现有板块下新增一篇文章。

**步骤**:
1. 确定文章的 `type`（如 `js`、`ai`、`nestjs`）和所属版块（概念与原理/学习自测/编码与实践）
2. 查看该版块目录下已有文章的最大 index，分配新的 index
3. 按命名规范创建 `.md` 文件
4. 在对应的 sidebar 配置文件中添加菜单项（对应的 `useConceptItem` / `useSelfTestItem` / `usePracticeItem` 格式）
5. 运行 `pnpm dev` 验证链接是否正常
6. 如需要，更新该目录下的 `intro.md` 目录列表

**示例** — 给 AI 模块新增一篇 "Diffusion Models" 文章：
```
type = ai, index = 30 (已有的最大 index 是 29)
文件: src/概念与原理/17ai/s_ai_30-diffusion_models.md
sidebar: 在 概念与原理.js 的 AI 区域添加 useConceptItem('扩散模型', 'ai', 30, 'diffusion_models')
intro.md: 在 概念与原理/17ai/intro.md 目录列表中添加条目
```

### 添加新板块（新 type）

**场景**: 需要新增一个完整的技术领域。

**步骤**:
1. 在 `usePath.js` 的 `typeMap` 中添加新映射（如 `rust: '21rust'`；先检查现有编号）
2. 只在已有实际内容的版块创建对应目录和 `intro.md`，不批量创建空目录
3. 在对应 sidebar 配置文件添加菜单项，并在 `groupSidebar.js` 中归入学习领域
4. 在 `src/.vitepress/data/learning.ts` 中添加对应领域的首页入口
5. 运行 `pnpm dev` 验证

### 修改侧边栏配置

**相关文件**:
- `src/.vitepress/config/sidebar/usePath.js` — typeMap 和工具函数
- `src/.vitepress/config/sidebar/概念与原理.js` — 概念与原理侧边栏
- `src/.vitepress/config/sidebar/学习自测.js` — 学习自测侧边栏
- `src/.vitepress/config/sidebar/编码与实践.js` — 编码与实践侧边栏

**工具函数**:
- `useConceptItem(title, type, index, fileName)` — 生成概念与原理菜单项
- `useSelfTestItem(title, type, index, fileName)` — 生成学习自测菜单项
- `usePracticeItem(title, type, index, fileName)` — 生成编码与实践菜单项
- `useConceptIntro(type)` / `useSelfTestIntro(type)` / `usePracticeIntro(type)` — 生成 intro 链接

### 修改首页

首页配置在 `src/index.md`，使用 VitePress 的 home layout：
- `hero` — 标题、描述、快捷按钮
- `src/.vitepress/data/learning.ts` — 五个领域的技术入口数据与图标；原有 SVG 位于 `src/public/icons/skills/`，引用时使用 `withBase` 兼容 Pages 子路径
- `theme/components/LearningDomains.vue` — 分类入口组件
- 学习路线连接 [AI-Journey-land](https://github.com/Fridolph/AI-Journey-land)、[博客](https://fridolph.github.io/fridolph-blog/) 与 [AI Journey Fighting](https://fridolph.github.io/AI-Journey-Fighting/)，保持独立维护
- 实践记录需包含代码位置、运行步骤与观察结果；未验证的内容明确标记为计划

### 内容格式规范

- 外部引用需在文末标注来源（格式：`> 来源：[标题](url)`）
- 代码块使用标准 Markdown fence，支持语法高亮
- 支持在 `.md` 中嵌入 Vue 组件（`<script setup>` 方式）
- 图片资源放入 `src/public/` 目录，引用路径 `![alt](/image.png)`
- AI 模块文章模板参考 `src/概念与原理/17ai/` 下的现有文章

## 开发约定

### Git 规范
- 提交信息格式：`<type>: <description>`
- 常用 type：`feat` `fix` `docs` `style` `refactor` `build`
- 分支策略：`dev` 分支开发，`main` 分支发布

### 内容编写
- 所有内容使用 Markdown 格式（`.md`）
- 支持在 `.md` 中嵌入 Vue 组件（VitePress 特性）
- 代码块使用标准 Markdown fence，支持语法高亮
- 图片资源放入 `src/public/` 目录
- 外部引用需在文末注明来源（遵循 CC 协议）

### 样式约定
- 全局样式在 `src/.vitepress/theme/theme.css` 中定义
- 局部样式使用 scoped CSS；项目未配置 Tailwind
- 组件放在 `src/templates/` 目录下

## 注意事项

- **必须使用 pnpm** 管理依赖，项目配置了 `pnpm-lock.yaml`
- 使用兼容的稳定依赖组合；不要强制覆盖 VitePress 管理的 Vite/Shiki 版本。兼容性记录见 `docs/重构与依赖兼容性.md`
- 已迁移的三个栏目通过 `scripts/legacy-routes.mjs` 提供旧 URL 跳转；新文章与站内链接必须使用新路径
- 修改导航、主题或依赖后执行 `pnpm check`、`pnpm build`，并验证桌面与移动端关键路径
- 本地搜索对中文支持稍弱，已尝试申请 Algolia
- 项目内容基于 CC 协议，引用他人内容需标注来源
- **AI 生成内容**：所有 AI 生成的内容均需经过人工审核校对，确保准确性
- **版本兼容**：修改配置或依赖时，务必运行 `pnpm build` 验证是否通过
- **文件命名**：严格遵循文件命名格式，否则侧边栏链接会 404
