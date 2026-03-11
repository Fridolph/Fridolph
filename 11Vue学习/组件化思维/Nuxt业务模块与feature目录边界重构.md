# Nuxt业务模块与feature目录边界重构

这次整理的对象主要来自下面这些本地素材：

- `11Vue学习/组件化思维/Nuxt自动导入与隐式依赖边界重构.md`
- `11Vue学习/组件化思维/Nuxt组合式能力分层与页面编排边界重构.md`
- `11Vue学习/组件化思维/NuxtServerRoutes与BFF接口边界重构.md`
- `11Vue学习/组件化思维/Vuex状态中心与Pinia迁移重构.md`
- `11Vue学习/组件化思维/认证请求与路由权限链路重构.md`
- `11Vue学习/组件化思维/说说应用发布与互动链路重构.md`
- `11Vue学习/Nuxt4/核心概念/1Auto-imports.md`

和前面的案例一样，这一轮不直接修改任何独立项目，而是把其中最值得复用的“Nuxt 业务模块与 feature 目录边界”思路整理成一篇案例文档。

这类场景最容易被低估的地方，不是目录会不会分，而是“页面、composable、store、接口、组件和服务到底应该围绕哪个业务模块聚合”。如果这个问题没有先想清楚，项目后面通常会逐渐出现这些症状：

- `components/`、`composables/`、`stores/`、`server/api/` 都在涨，但同一业务能力散在很多目录里很难整体定位
- 一个页面改动需要同时跳很多公共目录，才能找到数据获取、动作提交、弹窗和校验逻辑
- feature 明明只服务某一块业务，却被提前扔进全局公共层，边界越来越松
- store、BFF 接口和页面 composable 各自按技术类型分组，业务主线反而被切碎
- 新人能找到页面，但很难顺着一个业务流程快速走完整条链路

## 这类场景真正的复杂度中心

Nuxt 模块组织场景里，真正的复杂度中心不是“目录怎么命名”，而是“业务主线有没有成为第一组织单位”。

从当前素材和已有案例里，可以明确看到至少四条关键边界：

- 技术类型目录和业务模块目录不是一回事
- 应用公共层和 feature 私有实现层不是一回事
- 领域状态、页面编排和服务端契约应该围绕同一业务聚拢
- 可复用能力沉淀和过早公共化不是一回事

如果这些边界不先拆开，项目很快就会出现一些典型问题：

- checkout 相关代码散在 `pages/`、`composables/`、`stores/`、`server/api/` 和 `components/` 各处
- 某个 feature 改动会牵扯很多“全局公共文件”，实际却只有一个业务场景在用
- 公共 composable 越来越多，但真正稳定的公共入口很少
- 页面级逻辑虽然抽出来了，但业务链路仍然没有形成可追踪模块

所以这类重构的重点不是给目录换名字，而是先回答：

- 哪些能力应该围绕 feature 聚合
- 哪些能力才值得进入应用公共层
- 页面、store、BFF 接口和组件如何围绕同一业务主线组织
- 如何让一个业务需求能沿着目录结构被快速追踪

## 推荐的重构边界

更适合长期维护的 Nuxt 项目，通常会把代码组织拆成下面几层：

- 应用公共层：只放真正跨业务复用的能力，例如会话、主题、请求基础设施和通用 UI
- feature 业务模块层：围绕订单、结算、内容发布、账户中心等业务主线组织页面编排、局部组件、composable 和服务调用
- 页面入口层：保留在 `pages/**`，只负责把路由映射到对应 feature 入口
- 服务端接口层：保留在 `server/api/**`，但内部按业务模块协同服务组装层
- 纯工具和协议层：只保留稳定纯函数、类型契约和通用适配器

如果换成更具体的理解，大概可以这样映射：

- `pages/orders/index.vue`：只接 `features/orders` 的页面入口
- `features/orders/composables/useOrderListPage.ts`：负责订单列表页编排
- `features/orders/components/OrderFilters.vue`：负责订单业务里的局部组件
- `features/orders/server/order-query.ts`：负责订单模块的服务组装逻辑
- `composables/useUserSession.ts`：只保留真正跨业务稳定的公共入口

这里最重要的原则是：

- 业务主线优先于技术分类
- 公共层只接稳定复用能力
- feature 内部细节不要过早暴露到全局
- 页面入口只负责接模块，不负责保存模块实现细节

## 不要让同一条业务链路散落在全局技术目录里

很多 Nuxt 项目在体量变大以后，最容易出现的不是单个文件过长，而是同一条业务链路被按技术类型切碎。

下面这种组织方式很常见：

```text [11Vue学习/组件化思维/examples/nuxt-features/bad-structure.txt]
pages/orders/index.vue
components/OrderFilters.vue
components/OrderTable.vue
composables/useOrderFilters.ts
composables/useOrderActions.ts
stores/order.ts
server/api/orders.ts
server/services/order.ts
utils/order-format.ts
```

问题在于：

- 想理解订单功能，必须在多个全局目录来回跳转
- 哪些属于订单模块私有能力，哪些属于应用公共能力，看不出来
- 同一个业务后续扩展成详情页、批量操作、导出和弹窗后，目录会越来越碎

更稳的做法，是让业务主线本身成为聚合中心：

```text [11Vue学习/组件化思维/examples/nuxt-features/good-structure.txt]
pages/orders/index.vue
features/orders/components/OrderFilters.vue
features/orders/components/OrderTable.vue
features/orders/composables/useOrderListPage.ts
features/orders/composables/useOrderFilters.ts
features/orders/stores/order-list.ts
server/api/orders.ts
server/services/orders/list-orders.ts
server/services/orders/export-orders.ts
```

这样拆完以后，订单相关的大部分实现会自然聚集在同一个 feature 下，阅读成本会明显下降。

## feature 目录适合聚合业务实现，不适合重新造一层全局大杂烩

很多团队意识到要按 feature 组织后，下一步又容易走向另一个极端：虽然加了 `features/`，但所有公共和私有内容都继续往里面堆，最后 `features/` 变成另一个总目录。

更稳的判断标准是：

- 只在某个业务模块内部成立的能力，留在 feature 内部
- 明确跨业务复用且协议稳定的能力，再提升到公共层
- 提升到公共层之前，先经过至少一轮真实复用验证

例如：

- `features/checkout/composables/useCheckoutSubmit.ts` 应该先留在 checkout 内部
- `features/orders/components/OrderBatchBar.vue` 不应该因为“以后也许能复用”就提前升到全局 `components/`
- `composables/usePaginationQuery.ts` 如果已被多个业务稳定复用，才适合升到公共层

这个顺序很重要。因为一旦过早公共化：

- 命名会逐渐抽象到看不出业务含义
- 一个业务模块的小改动会开始影响别的模块
- 公共层会堆满只服务单一场景的伪复用能力

## 页面编排、store 和服务端接口应该围绕同一业务模块对齐

Nuxt 项目里还有一个很常见的问题：页面编排已经开始按业务拆了，但 store 还是全局按技术分，服务端接口也还是按基础设施分，结果一条业务链路还是断开的。

更稳的做法，是让同一个业务模块至少在下面几层保持对齐：

- 页面入口通过 feature 页面 composable 进入模块
- 页面局部状态和步骤能力留在 feature 内部
- 跨页面领域状态放到明确的领域 store，但仍然围绕业务命名
- 服务端接口与服务组装层围绕同一业务语义组织

```ts [11Vue学习/组件化思维/examples/nuxt-features/order-module.ts]
export function useOrderListModule() {
  const page = useOrderListPage()
  const store = useOrderListStore()

  return {
    page,
    selection: store.selection,
    refresh: page.refresh,
  }
}
```

这里关键的不是再包一层，而是让页面编排、领域状态和服务端契约都围绕“订单列表”这条主线对齐。

## 页面入口应该变成模块入口，不要继续承担业务定位工作

当 feature 目录真正稳定下来以后，`pages/**` 最理想的状态通常不是“什么都不做”，而是变成一个非常薄的模块入口。

```vue [11Vue学习/组件化思维/examples/nuxt-features/orders-page.vue]
<script setup lang="ts">
const orderListPage = await useOrderListPage()
</script>

<template>
  <OrderListScreen v-bind="orderListPage" />
</template>
```

这时页面层真正承担的是：

- 路由到模块入口的映射
- 页面语义声明
- 极少量页面壳层配置

而不是继续承担：

- 业务实现定位
- 目录跳转协调
- 技术层次之间的人工串联

## 这篇案例最后沉淀出的核心方法

这轮最重要的不是又新建一个 `features/` 目录，而是沉淀出一条可复用的 Nuxt 模块组织重构思路：

- 先让业务主线成为第一组织单位，而不是继续只按技术类型分目录
- 再把应用公共层和 feature 私有实现层明确拆开
- 再让页面编排、领域状态和服务端契约围绕同一业务模块对齐
- 最后让页面入口退回成模块入口，目录结构本身就能帮助追踪业务链路

这样以后面对后台业务系统、内容平台、交易链路、账户中心或多业务协同项目时，就能先按“业务模块边界”组织代码，而不是继续把实现散落在一排全局技术目录里。

