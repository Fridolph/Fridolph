# Nuxt自动导入与隐式依赖边界重构

这次整理的对象主要来自下面这些本地素材：

- `11Vue学习/Nuxt4/核心概念/1Auto-imports.md`
- `11Vue学习/Nuxt4/核心概念/2Lifecycle.md`
- `11Vue学习/组件化思维/Nuxt生命周期与副作用时机重构.md`
- `11Vue学习/组件化思维/Nuxt中间件与插件注入边界重构.md`
- `11Vue学习/组件化思维/Nuxt数据获取与渲染模式重构.md`

和前面的案例一样，这一轮不直接修改任何独立项目，而是把其中最值得复用的“Nuxt 自动导入与隐式依赖边界”思路整理成一篇案例文档。

这类场景最容易被低估的地方，不是自动导入会不会用，而是“项目省掉了 import 以后，依赖关系是不是也一起被藏起来了”。如果这个问题没有先想清楚，项目后面通常会逐渐出现这些症状：

- 页面和组件看起来很轻，但真正依赖了哪些 composable 越来越难追
- `composables/`、`utils/`、`stores/` 一路扩张，公共入口和私有实现混在一起
- 团队成员开始默认“能自动导入的都应该自动导入”
- server-only 能力和 client-only 能力被放进同一套隐式入口
- 文件改名、能力迁移、命名冲突之后，依赖链路越来越难定位

## 这类场景真正的复杂度中心

Nuxt 自动导入场景里，真正的复杂度中心不是“如何少写 import”，而是“如何在省样板代码的同时，仍然保住依赖边界的清晰度”。

从当前素材和已有案例里，可以明确看到至少四条关键边界：

- 框架级自动导入和业务级能力暴露不是一回事
- 公共 composable 入口和 feature 内部私有实现不是一回事
- server-only 工具和双端共享能力不是一回事
- 省 import 的便利性和模块边界的稳定性必须同时考虑

如果这些边界不先拆开，项目很快就会出现一些典型问题：

- 页面顶层直接调用太多隐式依赖，阅读成本越来越高
- 某个 composable 明明是局部实现，却被全项目自动导入并广泛耦合
- `utils/` 变成无边界仓库，业务工具和纯函数工具互相污染
- 改一个命名或目录结构，就会波及很多看不出来的调用点

所以这类重构的重点不是把更多目录加进 `imports.dirs`，而是先回答：

- 哪些能力值得成为稳定的自动导入入口
- 哪些能力应该留在 feature 内部显式导入
- 哪些工具只能在服务端使用，不能被双端隐式消费
- 页面和组件到底应该暴露多少隐式依赖

## 推荐的重构边界

更适合长期维护的 Nuxt 项目，通常会把自动导入和依赖暴露拆成下面几层：

- 框架公共层：保留 Nuxt 默认自动导入能力，例如 `useRoute`、`useAsyncData`、`navigateTo`
- 应用公共入口层：只暴露少量稳定、跨页面可复用的业务 composable
- feature 内部实现层：把局部流程、局部桥接和实现细节留在 feature 内部显式导入
- 纯工具层：放稳定纯函数，不混入运行时状态和副作用
- server 专属层：放 `server/utils` 或服务端专属能力，不让客户端隐式碰到

如果换成更具体的理解，大概可以这样映射：

- `composables/useUserSession.ts`：可以作为全局稳定入口
- `features/checkout/composables/useCheckoutFlow.ts`：应该留在 feature 内部显式导入
- `utils/formatCurrency.ts`：适合作为纯工具
- `server/utils/loadTenant.ts`：只属于服务端请求链路
- `imports.dirs`：只补少量经过筛选的目录，而不是把所有目录都塞进去

这里最重要的原则是：

- 自动导入不要代替模块设计
- 公共入口不要吞掉 feature 边界
- server-only 能力不要混入通用隐式入口
- 页面消费层不要因为省 import 而失去依赖可读性

## 不要把所有 composable 都扔进全局自动导入入口

很多 Nuxt 项目最开始接入自动导入时，很容易把它理解成“以后所有 composable 都放进 `composables/` 就好了”。短期看这样最省事，但长期通常最容易失控。

下面这种结构很常见：

```ts [11Vue学习/组件化思维/examples/nuxt-imports/bad-import-boundary.ts]
// pages/checkout.vue
const cart = useCart()
const coupon = useCouponEditor()
const delivery = useDeliveryScheduler()
const address = useAddressBook()
const payment = usePaymentSubmitter()
const tracker = useCheckoutTracker()
```

表面上页面很干净，但问题在于：

- 这几个能力谁是稳定公共入口，谁是 checkout 专属实现，看不出来
- 这些 composable 是否可以跨页面复用，看不出来
- 哪些逻辑依赖浏览器、哪些依赖服务端上下文，也看不出来

更稳的做法，是让页面只消费少量稳定入口，把局部流程收进 feature 内部：

```ts [11Vue学习/组件化思维/examples/nuxt-imports/checkout-page.ts]
import { useCheckoutPage } from '~/features/checkout/composables/useCheckoutPage'

const checkout = useCheckoutPage()
```

```ts [11Vue学习/组件化思维/examples/nuxt-imports/useCheckoutPage.ts]
import { useCheckoutFlow } from './useCheckoutFlow'
import { useCheckoutTracker } from './useCheckoutTracker'

export function useCheckoutPage() {
  const flow = useCheckoutFlow()
  const tracker = useCheckoutTracker()

  return {
    ...flow,
    tracker,
  }
}
```

这样拆完以后，页面重新只消费一个稳定入口，而 feature 内部依赖仍然保持显式。

## 自动导入适合暴露“稳定入口”，不适合暴露“实现细节”

Nuxt 自动导入真正适合解决的是“高频、稳定、跨文件重复出现的公共入口”。例如：

- 会话状态入口
- 页面级数据入口
- 应用级主题入口
- 常用纯工具或格式化工具

它不适合直接暴露这些内容：

- 只在某个业务流程内部成立的步骤型 composable
- 强依赖当前 feature 目录结构的桥接函数
- 尚未稳定的实验型能力
- 带明显运行时前提的局部实现

更稳的判断标准可以先问三个问题：

1. 这个能力是否已经是稳定公共 API
2. 如果以后迁移目录，它是否仍然应该被全局消费
3. 如果别人只看调用点，是否能快速理解它属于哪一层

如果这三个问题答不清楚，就不应该急着放进自动导入入口。

## `imports.dirs` 应该是筛选机制，不应该是“全收纳”机制

Nuxt 允许你通过 `imports.dirs` 补充自动导入目录。这是很方便的能力，但真正的风险也恰恰在这里。

如果把 `stores`、`services`、`types`、`features/**/composables` 一次性都加进去，结果通常不是“项目更清晰”，而是“隐式依赖入口更多”。

```ts [11Vue学习/组件化思维/examples/nuxt-imports/nuxt-config.ts]
export default defineNuxtConfig({
  imports: {
    dirs: [
      'composables',
      'stores',
      'features/shared/composables',
    ],
  },
})
```

更稳的做法通常是：

- 只为明确稳定的共享目录开启自动导入
- feature 内部目录继续走显式导入
- 让 `imports.dirs` 成为经过设计的公共入口清单，而不是方便堆目录的地方

这样配置本身就会反过来约束项目结构，而不是把结构问题继续放大。

## server-only 和 client-only 能力不要混进同一条隐式依赖链

自动导入还容易带来一个隐蔽问题：调用点太轻，结果环境前提被隐藏了。

例如一个名字看起来普通的 `useTenantContext()`，如果内部实际依赖请求头、cookie 或 `event.context`，那它就不应该被当作没有前提的通用能力来消费。

更稳的做法是：

- 服务端能力放在 `server/utils` 或明确的 server composable 边界里
- 客户端专属能力通过 `.client`、`onMounted` 或浏览器侧 composable 明确环境
- 双端共享能力只暴露真正没有环境前提的部分

```ts [11Vue学习/组件化思维/examples/nuxt-imports/server-boundary.ts]
export async function loadTenantContext(event: H3Event) {
  const host = getRequestHost(event)
  return queryTenantByHost(host)
}
```

```ts [11Vue学习/组件化思维/examples/nuxt-imports/client-boundary.ts]
export function useClipboardBridge() {
  const copied = shallowRef(false)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    copied.value = true
  }

  return { copied, copy }
}
```

这样调用方在看到文件边界时，就能立刻意识到环境前提，而不会把所有能力都误当成“哪里都能直接调”。

## 一套更稳的 Nuxt 自动导入重构顺序

如果以后再遇到“Nuxt 项目 import 很少，但依赖关系越来越看不清”的情况，可以先按下面顺序检查：

1. 先列出当前所有自动导入来源：默认 Nuxt 能力、自定义 `imports.dirs`、团队约定目录
2. 再给每个能力标记它属于框架公共层、应用公共层还是 feature 内部层
3. 把不稳定、局部、实验性 composable 从全局自动导入入口里拿出来
4. 把 server-only 和 client-only 能力分别收回有环境边界的目录
5. 让页面只消费少量稳定入口，把内部实现改回显式导入
6. 最后再检查调用点是否还能一眼看出依赖归属

如果这 6 步做完，Nuxt 自动导入问题通常会从“为什么这里不用 import 也能跑”变成“这就是项目允许自动暴露的稳定入口”，整个依赖图也会清晰很多。

## 这篇案例最后沉淀出的核心方法

这轮最重要的不是把 import 再写回来，而是沉淀出一条可复用的 Nuxt 自动导入重构思路：

- 先区分默认框架能力、应用公共入口和 feature 内部实现三层依赖
- 再让自动导入只服务于稳定入口，而不是吞掉所有实现细节
- 再把 server-only、client-only 和双端共享能力分开组织
- 最后让页面消费层保持轻量，但不失去依赖可读性

这样以后面对大型 Nuxt 项目、多人协作目录、共享 composable 扩张和自动导入配置膨胀这些场景时，就能先按边界拆依赖，而不是继续用“少写 import”掩盖结构问题。
