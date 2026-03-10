# Nuxt生命周期与副作用时机重构

这次整理的对象主要来自下面这些本地素材：

- `11Vue学习/Nuxt4/核心概念/2Lifecycle.md`
- `11Vue学习/Nuxt4/note/nuxt-lifecycle.md`
- `11Vue学习/Nuxt4/核心概念/水合.md`
- `11Vue学习/组件化思维/SSR数据预取与水合重构.md`
- `11Vue学习/组件化思维/Nuxt中间件与插件注入边界重构.md`

和前面的案例一样，这一轮不直接修改任何独立项目，而是把其中最值得复用的“Nuxt 生命周期与副作用时机”思路整理成一篇案例文档。

这类场景最容易被低估的地方，不是钩子名字记不记得住，而是“同一段逻辑到底应该在哪个阶段执行”。如果这个问题没有先想清楚，项目后面通常会逐渐出现这些症状：

- `setup` 根作用域里混进定时器、订阅和浏览器 API
- 首次 SSR、客户端水合和后续路由跳转的表现彼此不一致
- `server/middleware`、路由中间件、插件和页面重复做同一件事
- 页面为了兼容双端执行时机，被迫写越来越多环境分支
- 清理逻辑没有落点，最终演变成内存泄漏、重复请求或水合错位

## 这类场景真正的复杂度中心

Nuxt 生命周期场景里，真正的复杂度中心不是“背执行顺序”，而是“把副作用放到正确的时机层”。

从当前素材里，可以明确看到至少五条关键边界：

- 服务启动时机和单次请求时机不是一回事
- SSR 渲染时机和客户端挂载时机不是一回事
- 路由验证、中间件准入和页面渲染是三段不同职责
- 数据获取和副作用触发应该分开组织
- 可以重复执行的逻辑和必须只在客户端执行的逻辑必须拆开

如果这些边界不先拆开，项目很快就会出现一些典型问题：

- 页面在服务端就开始访问 `window` 或 `localStorage`
- `onMounted` 里又发一次和 SSR 相同的数据请求
- 计时器、事件监听和订阅直接写在根作用域里
- 插件里既初始化能力，又顺手读路由、发请求、改页面状态
- 一段逻辑在首屏请求能跑，但客户端导航时表现又变了

所以这类重构的重点不是再记更多 API，而是先回答：

- 这段逻辑是启动级、请求级、导航级、渲染级，还是客户端交互级
- 它是数据准备，还是副作用触发
- 它是否需要清理，如果需要，清理点在哪里

## 推荐的重构边界

更适合长期维护的 Nuxt 项目，通常会把执行时机拆成下面几层：

- 启动初始化层：处理 Nitro 插件和应用插件的启动级能力准备
- 请求准备层：处理每个请求都必须执行的服务端上下文准备
- 导航准入层：处理 `validate` 和路由中间件这种路由级判断
- 渲染数据层：处理 `useAsyncData`、`useFetch` 和页面渲染所需数据
- 客户端副作用层：处理 DOM、订阅、计时器、浏览器存储和 SDK 初始化
- 清理恢复层：处理取消订阅、移除监听、释放资源和错误恢复

如果换成更具体的理解，大概可以这样映射：

- `server/plugins/**`：处理服务启动期或 Nitro 渲染钩子能力
- `server/middleware/**`：处理请求上下文、日志、token 解析
- `app/plugins/**`：处理 Nuxt 应用级能力注入
- `definePageMeta({ validate })` / `app/middleware/**`：处理导航校验和准入
- 页面 `setup` + `useAsyncData`：处理首屏渲染需要的数据
- `onMounted` / `onBeforeUnmount`：处理只属于浏览器的副作用与清理

这里最重要的原则是：

- 启动层不要承担页面决策
- 请求层不要承担组件副作用
- 渲染层不要偷做浏览器初始化
- 客户端副作用层不要反向承担 SSR 数据准备

## 不要把副作用直接写进 `setup` 根作用域

很多 Nuxt 页面最早能跑，就是因为大家把逻辑都先塞进 `<script setup>` 顶层。但这恰好也是后面最容易失控的地方。

下面这种写法，在纯客户端页面里可能暂时可用，但一旦进入 SSR / hydration 场景，就很容易出问题：

```ts [11Vue学习/组件化思维/examples/nuxt-lifecycle/bad-side-effect.ts]
const tick = shallowRef(0)
const timer = setInterval(() => {
  tick.value += 1
}, 1000)

window.addEventListener('focus', () => {
  refreshNuxtData('dashboard')
})
```

问题在于：

- 服务端没有 `window`
- SSR 阶段不会调用卸载钩子来帮你清理顶层副作用
- 这段逻辑的生命周期和页面生命周期没有显式绑定

更稳的做法，是把副作用放到客户端挂载后再执行，并把清理逻辑和副作用本身绑在一起：

```ts [11Vue学习/组件化思维/examples/nuxt-lifecycle/client-effect.ts]
const tick = shallowRef(0)

onMounted(() => {
  const timer = window.setInterval(() => {
    tick.value += 1
  }, 1000)

  const handleFocus = () => refreshNuxtData('dashboard')
  window.addEventListener('focus', handleFocus)

  onBeforeUnmount(() => {
    window.clearInterval(timer)
    window.removeEventListener('focus', handleFocus)
  })
})
```

这样这段逻辑就具备了三个明显优点：

- 执行环境明确，只在客户端执行
- 生命周期归属明确，跟着页面挂载与卸载走
- 清理动作显式，不会再散在别处补丁式处理

## 把“数据准备”和“交互副作用”拆成两段

Nuxt 项目里还有一个常见混乱点：一段页面逻辑既要拿首屏数据，又要初始化浏览器交互，于是两件事被写进同一块代码。

这会导致两个后果：

- 首屏数据链路和客户端副作用链路互相污染
- SSR 首次请求和客户端跳转都很难复用同一套页面语义

更稳的方式，是先让渲染数据层只关心首屏需要的内容，再把浏览器侧的交互副作用后置到客户端阶段。

```ts [11Vue学习/组件化思维/examples/nuxt-lifecycle/page-split.ts]
const route = useRoute()

const { data: article, status, error } = await useAsyncData(
  () => `article:${route.params.id}`,
  () => $fetch(`/api/articles/${route.params.id}`),
)

onMounted(() => {
  startArticleReadTracker(route.params.id as string)
})
```

这段拆法背后的关键点是：

- `useAsyncData` 负责 SSR 和首屏可见数据
- `onMounted` 负责“页面已经进入浏览器交互阶段以后”的行为
- 两条链路围绕同一页面目标协同，但不再混写

## `validate`、中间件和页面渲染不要做重复决策

Nuxt 生命周期的另一个常见问题，是页面准入逻辑重复出现。一个动态页面经常会同时在这些地方做判断：

- `definePageMeta({ validate })`
- 路由中间件
- 页面 `setup`
- 组件内部空态兜底

如果这些层都在做“是否允许进入页面”的决策，执行顺序一变，行为就会变得很不稳定。

更清晰的分工通常是：

- `validate` 负责参数格式和基础有效性
- 路由中间件负责准入、登录态、角色判断
- 页面渲染负责当前页面真正要展示的数据和交互

```ts [11Vue学习/组件化思维/examples/nuxt-lifecycle/validate-boundary.ts]
definePageMeta({
  validate: (route) => {
    return /^\d+$/.test(String(route.params.id))
  },
  middleware: ['article-access'],
})
```

这样每一层只回答一个问题：

- 参数是否合法
- 当前用户能不能进
- 页面进入后要渲染什么

比起每层都补一遍条件分支，这种分工更稳定，也更容易调试。

## 插件和页面不要跨越时机边界互相代偿

还有一类问题，常常出现在项目引入 SDK、埋点、客户端缓存和主题系统之后：插件为了让页面“少写点”，开始承担越来越多页面时机判断。

例如：

- 插件启动时直接读取当前路由并触发业务请求
- 插件里直接访问浏览器对象，却没有 `.client` 边界
- 页面把本该在 `onMounted` 做的事情改成依赖插件自动执行

更稳的结构应该是：

- 插件只初始化能力并提供稳定入口
- 页面或 composable 决定何时触发能力
- 真正依赖浏览器环境的行为，在客户端挂载后再执行

```ts [11Vue学习/组件化思维/examples/nuxt-lifecycle/analytics.client.ts]
export default defineNuxtPlugin(() => {
  const tracker = createTracker()

  return {
    provide: {
      tracker,
    },
  }
})
```

```ts [11Vue学习/组件化思维/examples/nuxt-lifecycle/usePageTracker.ts]
export function usePageTracker(pageName: string) {
  const { $tracker } = useNuxtApp()

  onMounted(() => {
    $tracker.pageView(pageName)
  })
}
```

这里最关键的变化不是“多封一层”，而是：

- 插件回到初始化能力的职责
- 页面重新掌握触发时机
- 客户端副作用回到客户端阶段

## 一套更稳的 Nuxt 生命周期重构顺序

如果以后再遇到“Nuxt 项目能跑，但执行时机越来越混乱”的情况，可以先按下面顺序检查：

1. 先画出启动级、请求级、导航级、渲染级、客户端交互级五段时机图
2. 再标出每段逻辑里哪些属于数据准备，哪些属于副作用
3. 把浏览器 API、订阅、计时器、SDK 初始化从 SSR 渲染链路中剥离出去
4. 把 `validate`、中间件和页面渲染的判断职责分开
5. 把插件回收到能力初始化，把触发时机交还给页面或 composable
6. 最后再检查清理逻辑是否已经和副作用本身绑定

如果这 6 步做完，Nuxt 生命周期问题通常会从“为什么这里又执行一次”变成“这段逻辑本来就应该在这一层执行”，整个项目也会稳定很多。

## 这篇案例最后沉淀出的核心方法

这轮最重要的不是把 Nuxt 生命周期顺序背下来，而是沉淀出一条可复用的执行时机重构思路：

- 先区分启动、请求、导航、渲染和客户端交互五类时机
- 再区分数据准备和副作用触发两类责任
- 再让副作用只出现在拥有明确生命周期和清理点的位置
- 最后让页面、插件、中间件和 composable 各自回到自己的时机边界

这样以后面对 SDK 初始化、浏览器订阅、SSR 首屏数据、客户端追踪、动态路由校验这些场景时，就能先按时机拆责任，而不是继续把所有逻辑堆进页面顶层。
