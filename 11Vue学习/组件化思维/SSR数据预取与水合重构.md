# SSR数据预取与水合重构

这次整理的对象来自 `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo`。和前面的案例一样，我们不直接修改这个独立 demo，而是把其中最值得长期复用的 SSR 思路整理成一份文档化重构方案。

这个示例虽然体量不大，但它已经覆盖了服务端渲染场景里最关键的链路：路由匹配、组件级 `asyncData`、服务端预取、状态注入、客户端接管，以及后续导航时的再预取。

这类场景最容易出现的问题，不是“功能没写出来”，而是数据流不闭合。只要服务端和客户端的数据准备顺序稍微混乱，页面就容易出现二次请求、首屏空白、状态不一致，甚至水合失败。

这次主要参考了下面这些文件：

- `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo/src/entry.server.js`
- `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo/src/entry.client.js`
- `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo/src/main.js`
- `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo/src/router/index.js`
- `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo/src/store/index.js`
- `11Vue学习/vue2相关文档学习笔记/服务端渲染/vue-ssr-demo/src/components/item.vue`

## 原实现最值得保留的思路

这个示例最有价值的地方，不是某个组件细节，而是它已经把 SSR 场景里最重要的设计思路说出来了：

- 每次请求都重新创建应用实例
- 服务端先做路由匹配，再执行组件级数据预取
- 把预取后的状态注入到首屏 HTML
- 客户端只为“新激活的路由组件”补做后续预取

这条链路本身就是 SSR 项目的核心骨架。只要这条骨架稳定，后面的页面和组件才有机会在服务端与客户端之间保持一致。

## 当前最大的问题是同构数据流还没有完全收口

虽然整体方向是对的，但从示例代码看，仍然有几个非常典型的问题：

- `router`、`store`、`asyncData` 的职责边界还没有被统一抽象
- 服务端与客户端的预取流程虽然类似，但还没有形成同一套协议
- store 和 router 示例里存在一些实现细节错误，说明“数据流协议”还不够稳定
- 组件级 `asyncData` 与页面级装配关系还比较松散

这些问题背后其实指向同一件事：SSR 场景最需要重构的，不是模板，而是“同构数据准备协议”。

## 推荐的重构边界

如果按 Vue 3 / Nuxt 风格去抽象，这类 SSR 示例更适合拆成下面几层：

- `entry-server`：负责请求级应用创建、路由匹配和服务端预取
- `entry-client`：负责客户端接管和增量预取
- `createApp()`：负责创建 app / router / store 的工厂
- 页面或路由组件：只声明数据依赖，不直接管理全局预取流程
- `useSSRData` / `usePageQuery` 一类 composable：封装页面级数据获取能力
- store 或状态层：只负责持久化可序列化状态

这套边界的核心目标是：

- 让服务端和客户端共享同一套数据依赖声明
- 让页面组件知道“要什么数据”，但不知道“在哪一端执行”
- 让状态注入和水合流程保持稳定

## 先把 SSR 场景的模型定义清楚

服务端渲染项目里，至少有三类模型需要先明确：

- 路由级数据依赖
- 可序列化的初始状态
- 服务端 / 客户端共享的数据获取结果

```ts [11Vue学习/组件化思维/examples/types/ssr.ts]
export interface SSRContextState<State> {
  state: State
}

export interface RouteDataContext<State, Route> {
  store: State
  route: Route
}

export interface AsyncDataComponent<State, Route> {
  asyncData?: (context: RouteDataContext<State, Route>) => Promise<void>
}
```

这一步的关键不是类型本身，而是先把“页面的数据依赖接口”稳定下来。只有接口清晰，服务端预取和客户端补预取才能真正共享一套协议。

## `createApp()` 应该始终是请求级工厂

原示例已经体现了这个方向：`main.js` 中每次都重新创建 `store` 和 `router`，再返回 `app`。这在 SSR 中不是细节，而是硬要求。

因为服务端处理的是并发请求，如果把状态单例放在模块顶层，不同请求之间就可能互相污染。

```ts [11Vue学习/组件化思维/examples/ssr/createApp.ts]
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = createSSRApp(App)
  app.use(router)
  app.use(store)

  return {
    app,
    router,
    store
  }
}
```

这里真正需要记住的是：在 SSR 场景下，`createApp()` 不是普通的启动函数，而是请求隔离的根入口。

## 服务端预取应该围绕“已匹配组件”统一执行

原始 `entry.server.js` 的核心思路是正确的：先 `router.push(context.url)`，等 `router.onReady()` 后拿到 `matchedComponents`，再逐个调用组件的 `asyncData()`。

这个模式非常值得保留，因为它把“预取哪些数据”交给了路由匹配结果，而不是某个固定页面清单。

更适合沉淀成的形式可以是这样：

```ts [11Vue学习/组件化思维/examples/ssr/serverPrefetch.ts]
export async function runServerPrefetch(router: any, store: any, url: string) {
  router.push(url)

  await new Promise((resolve, reject) => {
    router.onReady(resolve, reject)
  })

  const matchedComponents = router.getMatchedComponents()

  if (!matchedComponents.length) {
    throw Object.assign(new Error('Not Found'), { code: 404 })
  }

  await Promise.all(
    matchedComponents.map((component: any) => {
      if (typeof component.asyncData === 'function') {
        return component.asyncData({
          store,
          route: router.currentRoute
        })
      }

      return Promise.resolve()
    })
  )
}
```

这层函数一旦独立出来，服务端入口就不再是一整段流程脚本，而会变成一个可复用、可测试的请求预取能力。

## 客户端补预取只应该面向新增激活组件

原示例在 `entry.client.js` 里用 `router.beforeResolve()` 比较 `to` 和 `from` 的匹配组件，只对新增激活的组件执行 `asyncData()`。这个思路非常关键，因为它避免了客户端对首屏已有数据进行重复预取。

这类逻辑最适合被看成“客户端增量数据准备器”。

```ts [11Vue学习/组件化思维/examples/ssr/clientPrefetch.ts]
export async function runClientPrefetch(router: any, store: any) {
  router.beforeResolve(async (to: any, from: any, next: any) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((component: unknown, index: number) => {
      return diffed || (diffed = prevMatched[index] !== component)
    })

    if (!activated.length) {
      return next()
    }

    try {
      await Promise.all(
        activated.map((component: any) => {
          if (typeof component.asyncData === 'function') {
            return component.asyncData({ store, route: to })
          }
          return Promise.resolve()
        })
      )
      next()
    } catch (error) {
      next(error)
    }
  })
}
```

这个抽象的价值在于，服务端和客户端的数据流终于都围绕“路由匹配组件 + asyncData 协议”展开，而不是各自写一套临时逻辑。

## 水合边界应该被明确控制

SSR 场景里最容易被忽略的问题之一，是“服务端首屏状态”与“客户端接管状态”之间的边界。

原示例已经提到：服务端把 `store.state` 挂到 `context.state`，随后由 renderer 注入到 HTML，客户端再读取 `window.__INITIAL_STATE__`。这条链路如果不稳定，就会出现：

- 服务端渲染的是 A 数据
- 客户端接管时又发起请求变成 B 数据
- DOM 和状态不一致，导致水合抖动或警告

更适合的做法，是明确把“服务端输出状态”和“客户端恢复状态”当成同一个协议：

```ts [11Vue学习/组件化思维/examples/ssr/hydration.ts]
export function hydrateStore(store: any) {
  if (typeof window !== 'undefined' && (window as any).__INITIAL_STATE__) {
    store.replaceState((window as any).__INITIAL_STATE__)
  }
}
```

真正的重点不是 API 本身，而是要明确：

- 哪些状态允许被序列化
- 哪些状态只属于客户端运行时
- 客户端接管前是否已经完成初始状态恢复

## 页面组件应该只声明数据依赖

原始 `item.vue` 已经很接近这个目标了：组件通过 `asyncData()` 声明“需要 `fetchItem`”，再通过 `computed` 从 store 中读取结果。

这是 SSR 页面组件非常典型、也非常值得保留的模式：页面只声明依赖，不直接关心自己是在服务器还是客户端执行。

```vue [11Vue学习/组件化思维/examples/ssr/ItemPage.vue]
<script setup lang="ts">
const props = defineProps<{
  itemId: string
}>()

const store = useItemStore()

await store.fetchItem(props.itemId)

const item = computed(() => store.items[props.itemId])
</script>

<template>
  <div>{{ item?.title }}</div>
</template>
```

如果放到更现代的 Nuxt 场景里，这一层通常会进一步演化成 `useAsyncData()`、`useFetch()` 或 route-level data composable，但核心原则不变：页面声明数据依赖，运行时负责在正确时机执行。

## 原示例里也暴露了几个非常典型的 SSR 易错点

这个示例除了思路可取，也很适合拿来提醒一些高频错误：

- router 里把 `component` 写成了 `comopnent`
- `main.js` 与 `entry.server.js` / `entry.client.js` 的导出使用不一致
- store 里声明的是 `items`，mutation 却写到了 `state.list`
- `fetchItem` API 和组件 `route.params.id` 的依赖关系还没有真正对齐

这些细节问题之所以重要，不是因为它们会导致 demo 报错，而是因为它们刚好说明：SSR 项目对数据流一致性要求非常高。只要协议层没收口，小错误就很容易打穿整条链路。

## 这次重构真正沉淀下来的模式

这个 SSR 示例最值得沉淀的，不是“怎么让 Vue 跑在服务端”，而是“怎么让服务端与客户端共享同一套数据准备协议”。

这次真正沉淀下来的经验有六个：

- `createApp()` 必须是请求级工厂
- 服务端预取必须围绕已匹配路由组件执行
- 客户端补预取只面向新增激活组件
- 初始状态注入和恢复必须被视为同一套协议
- 页面组件应该只声明数据依赖，不承担运行时分支逻辑
- SSR 项目要先稳定数据流协议，再修模板细节

以后再整理 SSR、Nuxt 或 hydration 场景时，可以优先检查这几个问题：

- 服务端和客户端是不是共享同一套数据依赖声明
- 初始状态是不是已经在客户端接管前恢复
- 是否存在首屏重复请求
- 页面组件是否知道太多服务端 / 客户端执行细节
- 请求级状态是否真正隔离

只要这些问题里还有两三个答不清楚，这个 SSR 项目通常就还值得继续重构。
