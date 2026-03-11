# Nuxt组合式能力分层与页面编排边界重构

这次整理的对象主要来自下面这些本地素材：

- `11Vue学习/组件化思维/Nuxt自动导入与隐式依赖边界重构.md`
- `11Vue学习/组件化思维/Nuxt数据获取与渲染模式重构.md`
- `11Vue学习/组件化思维/Nuxt生命周期与副作用时机重构.md`
- `11Vue学习/组件化思维/NuxtServerRoutes与BFF接口边界重构.md`
- `11Vue学习/组件化思维/说说应用发布与互动链路重构.md`
- `11Vue学习/Nuxt4/核心概念/1Auto-imports.md`
- `11Vue学习/Nuxt4/核心概念/2Lifecycle.md`

和前面的案例一样，这一轮不直接修改任何独立项目，而是把其中最值得复用的“Nuxt 组合式能力分层与页面编排边界”思路整理成一篇案例文档。

这类场景最容易被低估的地方，不是 composable 会不会抽，而是“页面顶层、页面业务 composable、领域 store、服务端接口和局部交互状态到底应该在哪一层汇合”。如果这个问题没有先想清楚，项目后面通常会逐渐出现这些症状：

- 页面文件虽然已经不长，但 `setup()` 里堆满十几个 `useXxx()`，实际编排复杂度仍然很高
- 一个页面同时直接调用 `useRoute`、`useAsyncData`、`useFetch`、`useHead`、埋点和多个业务 composable，职责越写越缠
- composable 名字越来越多，但有的是页面入口，有的是局部步骤，有的是副作用桥接，分层不清楚
- store、composable 和页面各自都在发请求、改 loading、做错误提示，状态归属越来越模糊
- 页面迁移、布局复用或 A/B 变体出现后，原来的页面编排无法稳定复用

## 这类场景真正的复杂度中心

Nuxt 页面编排场景里，真正的复杂度中心不是“要不要抽 composable”，而是“页面顶层到底应该消费几个稳定入口，以及这些入口分别属于哪一层”。

从当前素材和已有案例里，可以明确看到至少四条关键边界：

- 页面入口层和 feature 内部步骤层不是一回事
- 页面级业务编排和全局 store 归属不是一回事
- 数据获取入口和局部副作用桥接不是一回事
- 可自动导入的稳定能力和只在某个页面成立的临时流程不是一回事

如果这些边界不先拆开，项目很快就会出现一些典型问题：

- 页面改一个筛选逻辑，要同时改页面、store 和三个 composable
- 一个 composable 既取数、又写 SEO、又绑路由 query、又开弹窗，复用边界越来越差
- 局部交互步骤被误放成全局公共能力，反过来污染别的页面
- 页面表面上看很轻，真正的业务链路却散在多个 `useXxx()` 之间很难追

所以这类重构的重点不是把更多逻辑抽进 `composables/`，而是先回答：

- 页面真正应该直接消费哪些稳定入口
- 哪些能力属于页面业务编排层，哪些只属于 feature 内部实现
- store 应该托管哪些跨页面状态，哪些状态应该留在页面 composable
- 页面级取数、SEO、埋点、路由同步和局部交互该怎样拆层协同

## 推荐的重构边界

更适合长期维护的 Nuxt 项目，通常会把页面编排拆成下面几层：

- 页面入口层：位于 `pages/**`，只负责接入少量稳定入口并声明页面结构
- 页面业务 composable 层：位于 `features/**/composables/useXxxPage.ts`，负责把页面级数据、动作和派生状态收口
- feature 步骤 composable 层：负责表单步骤、筛选器、弹窗、追踪器等局部流程
- store / 领域状态层：只保留跨页面共享、跨布局复用或长期存在的领域状态
- 服务端契约层：通过 `server/api/**` 或服务调用输出页面级稳定数据契约

如果换成更具体的理解，大概可以这样映射：

- `pages/orders/index.vue`：只消费 `useOrderListPage()` 这样的稳定入口
- `features/orders/composables/useOrderListPage.ts`：负责编排列表数据、筛选条件、分页动作和页面派生状态
- `features/orders/composables/useOrderFilters.ts`：负责筛选条件与 query 同步
- `stores/session.ts`：只托管登录态、租户和用户身份
- `server/api/orders.ts`：输出订单列表页真正需要的接口契约

这里最重要的原则是：

- 页面不要直接拼十几个底层 composable
- 页面业务 composable 不要退化成新的万能容器
- store 不要回收所有页面级状态
- feature 内部步骤不要冒充全局公共入口

## 不要让页面直接装配太多底层能力

很多 Nuxt 项目在 Composition API 和自动导入配合下，最容易出现一种“看上去很现代，实际上编排越来越散”的写法。

下面这种页面顶层代码很常见：

```ts [11Vue学习/组件化思维/examples/nuxt-page-composables/bad-page.ts]
const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const filters = useOrderFilters()
const sort = useOrderSort()
const pagination = useOrderPagination()
const tracker = useOrderTracker()
const dialogs = useOrderDialogs()
const seo = useOrderSeo()

const { data, status, error, refresh } = await useAsyncData(
  () => `orders:${route.fullPath}`,
  () => $fetch('/api/orders', { query: filters.toQuery() }),
)

watch(() => route.query, filters.syncFromRoute)
watch(filters.query, () => router.replace({ query: filters.query.value }))
watch(data, () => tracker.trackListExpose())
useHead(seo.build(data))
```

表面上页面没有写很多业务细节，但问题在于：

- 页面直接依赖了太多底层能力
- 数据、路由、SEO、埋点和弹窗编排都散在页面顶层
- 页面复用或改版时，很难判断哪些逻辑应该整体迁走

更稳的做法，是让页面只消费一个页面级入口：

```ts [11Vue学习/组件化思维/examples/nuxt-page-composables/order-list-page.vue]
const orderPage = await useOrderListPage()
```

```ts [11Vue学习/组件化思维/examples/nuxt-page-composables/useOrderListPage.ts]
import { useOrderDialogs } from './useOrderDialogs'
import { useOrderFilters } from './useOrderFilters'
import { useOrderSeo } from './useOrderSeo'
import { useOrderTracker } from './useOrderTracker'

export async function useOrderListPage() {
  const filters = useOrderFilters()
  const dialogs = useOrderDialogs()
  const tracker = useOrderTracker()

  const { data, status, error, refresh } = await useAsyncData(
    () => filters.cacheKey.value,
    () => $fetch('/api/orders', { query: filters.requestQuery.value }),
  )

  useOrderSeo(data)
  tracker.bindListExpose(data)

  return {
    filters,
    dialogs,
    orders: computed(() => data.value?.items ?? []),
    summary: computed(() => data.value?.summary ?? null),
    status,
    error,
    refresh,
  }
}
```

这样拆完以后，页面重新只承担“接一个入口并渲染”的职责，而真正的页面编排被收进了可维护的中间层。

## 页面业务 composable 适合做编排，不适合吞掉全部领域状态

很多项目在意识到“页面不能太重”以后，下一步很容易走向另一个极端：把所有东西都塞进一个 `useXxxPage()`，结果只是把巨型页面换成巨型 composable。

```ts [11Vue学习/组件化思维/examples/nuxt-page-composables/too-heavy-page-composable.ts]
export function useCheckoutPage() {
  const session = useSessionStore()
  const cart = useCartStore()
  const address = ref(null)
  const payment = ref('alipay')
  const coupon = ref('')
  const loading = ref(false)
  const error = ref('')

  async function submit() {
    loading.value = true
    try {
      await $fetch('/api/checkout/submit', {
        method: 'POST',
        body: {
          uid: session.userId,
          items: cart.items,
          address: address.value,
          payment: payment.value,
          coupon: coupon.value,
        },
      })
      navigateTo('/checkout/result')
    } finally {
      loading.value = false
    }
  }

  return { address, payment, coupon, loading, error, submit }
}
```

这里的问题不是文件位置，而是它把：

- 全局会话状态
- 购物车领域状态
- 提交流程状态
- 页面跳转动作
- 接口提交流程

全部揉进了一层。

更稳的做法，是让页面业务 composable 只负责页面编排，把领域状态和局部步骤拆出来：

- `useSessionStore()` 继续托管会话
- `useCartStore()` 继续托管购物车领域状态
- `useCheckoutSubmit()` 负责提交动作与反馈
- `useCheckoutPage()` 只负责编排这些稳定入口

这样以后页面改版、流程调整或弹窗化复用时，真正需要移动的通常只有页面编排层，而不是整个领域状态。

## store 只接跨页面状态，不要回收所有页面局部状态

Nuxt 页面编排里另一个常见问题，是只要遇到多个组件共享状态，就立刻把状态扔进 Pinia。短期看很统一，长期往往会让 store 重新变成大总线。

更适合长期维护的划分是：

- 跨页面共享、会持续存在的状态，交给 store
- 当前页面专属、随着页面进入和离开而创建销毁的状态，交给页面 composable
- 某个局部步骤内部的临时状态，交给 feature 内部步骤 composable

例如：

- 用户身份、租户、主题偏好，适合放 store
- 当前页面筛选条件、批量选择状态、列表 loading，适合放页面 composable
- 某个弹窗里的临时输入、校验、提交中状态，适合放步骤 composable

这个区分很重要。因为一旦把页面局部状态都升到 store：

- 页面离开后状态是否清理会变得模糊
- 同名页面实例或多布局并存时会互相污染
- 页面编排层会被 store 反向主导，职责越来越不清楚

## 页面级数据、SEO 和副作用要围绕同一份页面契约组织

Nuxt 页面编排不是只处理“取数成功就渲染”这么简单。真实项目里，页面通常还要同时处理：

- 页面标题和 SEO
- 埋点或曝光统计
- query 同步
- 容错、重试和空态
- 客户端专属副作用

更稳的做法，不是把这些动作都写回页面，而是让它们围绕同一份页面契约协同。

```ts [11Vue学习/组件化思维/examples/nuxt-page-composables/useArticlePage.ts]
export async function useArticlePage() {
  const route = useRoute()

  const { data, error, status } = await useAsyncData(
    () => `article:${route.params.slug}`,
    () => $fetch(`/api/article-pages/${route.params.slug}`),
  )

  useArticleSeo(data)
  useArticleTracker(data)

  return {
    article: computed(() => data.value?.article ?? null),
    recommend: computed(() => data.value?.recommend ?? []),
    status,
    error,
  }
}
```

这里真正的关键点是：

- 页面契约先由服务端接口稳定输出
- 页面业务 composable 围绕这份契约组织副作用和派生状态
- 页面本身只消费已经收口后的结果

这样做的收益是，SEO、埋点、路由同步和数据展示不再各自抢一份状态源，而是都围绕同一份页面语义展开。

## 页面入口层应该越来越薄，但不能薄到没有语义

页面最终当然应该尽量薄，但“薄”不等于只剩模板和一堆自动导入的调用。真正更有价值的薄，是保留页面语义，同时把复杂度压回稳定的编排层。

更理想的页面顶层通常像这样：

```vue [11Vue学习/组件化思维/examples/nuxt-page-composables/orders-page.vue]
<script setup lang="ts">
const orderPage = await useOrderListPage()
</script>

<template>
  <OrderToolbar
    :filters="orderPage.filters.form"
    :summary="orderPage.summary"
    @change="orderPage.filters.update"
  />
  <OrderTable
    :items="orderPage.orders"
    :loading="orderPage.status === 'pending'"
    @retry="orderPage.refresh"
  />
</template>
```

这种写法依然保留了“这就是订单列表页”的语义，但没有让页面直接理解底层编排细节。

## 这篇案例最后沉淀出的核心方法

这轮最重要的不是又新增几个 `useXxx()`，而是沉淀出一条可复用的 Nuxt 页面编排重构思路：

- 先区分页面入口层、页面业务 composable 层、feature 步骤层和 store 层
- 再让页面只消费少量稳定入口，不直接拼太多底层能力
- 再把页面级数据、副作用、SEO 和路由同步围绕同一份页面契约组织
- 最后让 store 只接跨页面状态，页面局部状态回到页面编排层

这样以后面对后台列表页、内容详情页、活动页、账户中心或多步骤表单页时，就能先按“编排边界”拆层，而不是继续在页面、store 和 composable 之间来回堆逻辑。

