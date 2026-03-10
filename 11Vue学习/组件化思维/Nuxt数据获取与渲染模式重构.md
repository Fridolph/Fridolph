# Nuxt数据获取与渲染模式重构

这次整理的对象来自 `11Vue学习/Nuxt4` 目录中的渲染模式、生命周期、自动导入和水合相关笔记。和前面的案例一样，我们不直接改某个独立项目源码，而是把这组 Nuxt 概念，整理成一篇更适合落地重构的案例文档。

这一类场景和普通 Vue 页面最大的不同，在于它不仅要处理组件和状态，还要同时处理：

- 页面数据应该在服务端还是客户端拿
- 哪些代码会在 SSR 和 hydration 期间重复执行
- 哪些内容适合通用渲染，哪些内容适合客户端渲染
- 页面数据流是否会在首次请求和后续导航之间失衡

如果这些边界没先理清，Nuxt 项目很容易出现“功能能跑，但数据获取方式越来越乱”的问题。

这次主要参考了下面这些本地文档：

- `11Vue学习/Nuxt4/核心概念/4Rendering-modes.md`
- `11Vue学习/Nuxt4/核心概念/2Lifecycle.md`
- `11Vue学习/Nuxt4/核心概念/1Auto-imports.md`
- `11Vue学习/Nuxt4/核心概念/水合.md`

## 这类 Nuxt 场景真正的复杂度中心

Nuxt 项目的复杂度往往不在单个组件里，而在“数据准备”和“渲染边界”之间。

同一个页面里，经常会同时出现下面几类代码：

- 页面级数据获取
- 组件内交互状态
- 首屏 SSR 输出
- 浏览器接管后的 hydration
- 后续路由切换时的再次请求

这些环节一旦没有统一约束，就容易出现几种典型问题：

- 服务端和客户端都发同一份请求
- 页面组件里混入大量 `import.meta.client` / `import.meta.server`
- 某些状态本该只属于浏览器，却被放进 SSR 首屏逻辑里
- 页面一部分走 SSR，一部分走 CSR，但边界没说清楚

所以这类重构的核心，不是先拆组件，而是先把“渲染模式 + 数据获取策略 + 水合边界”统一下来。

## 推荐的重构边界

在 Nuxt 项目里，这类场景更适合按下面几层来组织：

- 页面层：声明页面需要的数据，以及页面使用的渲染策略
- composable 层：封装可复用的数据获取逻辑和状态逻辑
- 组件层：只消费已经准备好的数据和显式事件
- 运行时边界层：明确哪些逻辑只能在客户端或服务端执行

如果换成更具体的文件职责，大致可以是这样：

- `app/pages/*.vue`：页面入口，只负责页面数据依赖与页面装配
- `app/composables/useXxx.ts`：可复用数据获取与业务逻辑
- `app/components/**/*.vue`：展示组件与局部交互组件
- `server/api/*`：服务端接口或服务端数据整形
- `plugins/*.client.ts`：只能在浏览器运行的逻辑

这套边界的目标很明确：

- 页面负责声明依赖，不负责重复发明数据流
- composable 负责复用能力，不负责页面结构
- 组件负责展示，不负责首屏策略
- 运行时边界通过目录和 API 明确表达，而不是散落在模板里

## 先判断当前页面属于哪种渲染对象

Nuxt 页面并不是都应该一股脑走 SSR。真正更稳的方式，是先判断页面属于哪一种渲染对象。

### 1. 内容优先页

例如：博客、文档页、营销页、内容详情页。

这类页面通常更适合：

- 通用渲染优先
- 首屏数据在服务端完成
- hydration 后只保留交互增强

### 2. 交互优先页

例如：内部工作台、重交互表单、强依赖浏览器 API 的界面。

这类页面通常更适合：

- 客户端渲染或客户端增强优先
- 数据获取更偏浏览器端时机
- 浏览器状态与交互体验优先于首屏 HTML 完整性

### 3. 混合页

例如：既要有可索引的首屏内容，又有复杂局部交互。

这类页面最适合：

- 页面主体内容走 SSR
- 高交互局部走客户端组件或客户端延迟逻辑
- 数据依赖按“首屏必须 / 交互后才需要”拆开

这一步非常关键。只有先判断对象，后面的数据获取方式才不会越写越乱。

## 页面级数据获取应该优先围绕 SSR 友好 API 组织

Nuxt 已经为 SSR 与 hydration 场景提供了比较清晰的数据获取方式。对于页面级首屏数据，最核心的原则是：

- 优先使用 SSR 友好的数据获取 API
- 确保服务端已拿到的数据在客户端接管时可以复用
- 不要把首屏数据请求塞进只会在浏览器运行的生命周期里

更适合沉淀的页面层写法可以是这样：

```vue [11Vue学习/组件化思维/examples/nuxt/pages/article/[id].vue]
<script setup lang="ts">
const route = useRoute()

const { data: article, pending, error } = await useAsyncData(
  () => `article:${route.params.id}`,
  () => $fetch(`/api/articles/${route.params.id}`)
)
</script>

<template>
  <article v-if="article">
    <h1>{{ article.title }}</h1>
    <p>{{ article.content }}</p>
  </article>
</template>
```

这种写法的关键不在语法，而在边界：页面只声明“这页需要哪份数据”，并把数据获取放进 Nuxt 的 SSR 友好能力里，而不是自己手搓一套首屏与客户端接管逻辑。

## 交互型局部状态不要误塞进服务端数据流

Nuxt 项目里一个高频问题是：把所有状态都当成页面级状态处理。实际上，很多状态并不属于服务端首屏数据。

例如：

- 弹窗开关
- 当前 hover 项
- 下拉面板是否展开
- 某个编辑器的临时输入内容
- 浏览器本地缓存恢复值

这些状态更适合继续留在客户端组件内部，或者抽成普通 composable，而不是混进 `useAsyncData()` / 页面首屏请求逻辑。

```ts [11Vue学习/组件化思维/examples/nuxt/composables/useArticleFilters.ts]
export function useArticleFilters() {
  const keyword = ref('')
  const sort = ref<'latest' | 'popular'>('latest')
  const panelOpen = ref(false)

  const query = computed(() => ({
    keyword: keyword.value,
    sort: sort.value
  }))

  return {
    keyword,
    sort,
    panelOpen,
    query
  }
}
```

这类状态和 SSR 首屏数据最大的区别是：它们属于交互现场，不属于首屏 HTML 的数据准备协议。

## composable 应该成为页面数据流和组件之间的缓冲层

在前面的客户端案例里，`useTodos`、`useCart`、`useSession` 都承担了“状态中心”的角色。到了 Nuxt 场景，这条原则仍然成立，只是 composable 还要多承担一层职责：把页面数据获取和展示消费解耦。

更适合的思路是：

- 页面负责声明需要哪份远程数据
- composable 负责把远程数据转成页面和组件真正需要的结构
- 展示组件不直接碰页面级请求 API

```ts [11Vue学习/组件化思维/examples/nuxt/composables/useArticlePage.ts]
export function useArticlePage(article: Ref<any>) {
  const title = computed(() => article.value?.title ?? '')
  const content = computed(() => article.value?.content ?? '')
  const tags = computed(() => article.value?.tags ?? [])

  return {
    title,
    content,
    tags
  }
}
```

这样组件层永远消费的是稳定的页面视图模型，而不是直接和页面请求结果硬耦合。

## 水合边界一定要先明确，再写客户端逻辑

Nuxt 场景里最常见的问题之一，就是服务端和客户端执行边界不清，最后出现 hydration mismatch 或重复请求。

更稳的写法通常遵循下面几个原则：

- 首屏必须一致的数据，优先在 SSR 友好 API 中完成
- 依赖浏览器环境的副作用，放进 `onMounted()` 或 `.client` 插件
- 依赖 `window`、`localStorage`、DOM 尺寸等能力的逻辑，不要直接写在 SSR 会执行的路径上

```vue [11Vue学习/组件化思维/examples/nuxt/components/ReadingProgress.client.vue]
<script setup lang="ts">
const progress = ref(0)

onMounted(() => {
  const update = () => {
    const top = window.scrollY
    const height = document.body.scrollHeight - window.innerHeight
    progress.value = height > 0 ? top / height : 0
  }

  window.addEventListener('scroll', update)
  update()
})
</script>

<template>
  <div class="reading-progress" :style="{ transform: `scaleX(${progress})` }" />
</template>
```

这类逻辑如果不先划清边界，很容易在 SSR 阶段就出现浏览器 API 不可用的问题。

## 渲染模式选择应该和页面价值绑定，而不是跟风统一

Nuxt 提供 SSR、CSR、混合渲染等多种能力，但真正好的重构，不是全站统一某一个模式，而是按页面价值选择。

更适合做决策的判断维度是：

- 这页是否需要被搜索引擎快速索引
- 这页的首屏内容是否必须立刻可见
- 这页是否高度依赖浏览器 API
- 这页的数据是否强依赖用户现场操作

可以把它简化成一张判断表：

- 内容优先、首屏优先、SEO 优先：更偏 SSR
- 高交互、强浏览器依赖、SEO 不敏感：更偏 CSR
- 内容和交互都重要：更偏混合策略

重构时要做的不是背概念，而是把每个页面归位。

## 自动导入和目录结构应该服务于边界清晰，而不是只图省代码

Nuxt 的 `app/composables/` 自动导入很方便，但它真正的价值不是少写 import，而是帮助你把“页面逻辑”和“可复用逻辑”分开。

如果一个项目所有数据逻辑都还写在 `pages/*.vue` 里，那么即便 Nuxt 提供了自动导入，也没有真正发挥价值。更合理的方式是：

- 页面里只保留页面入口和页面级数据声明
- 把可复用逻辑抽到 `app/composables/`
- 通过自动导入降低拆分成本

这会让 Nuxt 的目录约定真正成为结构优势，而不是只是开发体验优化。

## 这类 Nuxt 项目最容易踩的几个坑

结合本地笔记和官方文档思路，这类场景最常见的坑主要有这些：

- 在会 SSR 执行的路径里直接访问浏览器 API
- 把首屏数据请求放进 `onMounted()`，导致首屏空壳和重复请求
- 页面级数据和局部交互状态没有分层
- 页面一部分走 SSR，一部分走客户端逻辑，但边界全靠经验记忆
- 把自动导入当成写法优化，而不是结构优化工具

这些问题的共同点是：都不是某一行代码的错误，而是边界设计没先说清楚。

## 这次重构真正沉淀下来的模式

这篇 Nuxt 案例最值得沉淀的，不是某个 API 用法，而是三条更稳定的原则：

- 先判断页面属于哪种渲染对象，再决定数据获取方式
- 先划清 SSR / hydration / client-only 的边界，再写交互逻辑
- 先把页面数据流和局部交互状态分层，再拆 composable 与组件

这次真正沉淀下来的经验有六个：

- 页面首屏数据应优先走 SSR 友好 API
- 交互型局部状态不应误塞进服务端数据流
- composable 应该成为页面数据流与展示组件之间的缓冲层
- hydration 边界必须显式控制
- 渲染模式选择应该与页面价值绑定
- 目录结构与自动导入要服务于职责分层

以后再整理 Nuxt 页面时，可以优先检查这几个问题：

- 页面首屏数据是否已经能在服务端稳定准备
- 是否存在客户端重复请求
- 浏览器专属逻辑是否已经和 SSR 路径分离
- 页面状态是否已经分成“远程数据”和“本地交互”两层
- composable 是否真正承担了页面逻辑收口职责

只要这些问题还有几项答不清楚，这个 Nuxt 页面通常就还值得继续重构。
