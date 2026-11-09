# Vue 生产场景实战

> 以下问题模拟真实 Vue 项目中的生产环境场景，考察综合解决问题的能力。

## 1. 列表页 10000+ 条数据 + 实时搜索 + 筛选，全程不卡顿？

**场景**：后台管理系统的数据列表页面，接口返回上万条数据。用户输入搜索关键词时期望实时过滤，同时支持多条件筛选。

::: details

**不能做的事**：一次性把 10000 个 `<tr>`/`<div>` 渲染到 DOM。

**方案组合**：

**1. 虚拟列表 — 仅渲染可视区**

```vue
<script setup>
import { FixedSizeList } from 'vue3-virtual-list' // 或 @tanstack/vue-virtual

// 只渲染 ~30 个 DOM 节点，其余用空白占位
</script>
```

**2. 搜索防抖 + 筛选用 computed**

```js
const keyword = ref('')
const filters = ref({ status: '', category: '' })

// 防抖搜索词（300ms 后才更新 debouncedKeyword）
const debouncedKeyword = refDebounced(keyword, 300)

const filteredList = computed(() => {
  return rawList.value
    .filter(item => !debouncedKeyword.value || item.name.includes(debouncedKeyword.value))
    .filter(item => !filters.value.status || item.status === filters.value.status)
    .filter(item => !filters.value.category || item.category === filters.value.category)
})
```

**3. Web Worker 处理大数据过滤**

当过滤逻辑极重（模糊匹配 + 拼音搜索等），可移至 Worker 线程避免阻塞 UI。

**4. shallowRef 优化不可变数据的响应式**

```js
// 数据从服务端拿到后不修改内部属性，用 shallowRef 跳过深度响应式
const rawList = shallowRef([])

// 更新时整体替换
rawList.value = await fetchList()
```

**关键**：虚拟列表减少 DOM 节点 + 防抖减少计算次数 + shallowRef 减少响应式开销。
:::

## 2. reactive 数据更新后视图没变？排查响应式丢失

**场景**：组装好数据后赋值给 reactive 对象，预期视图更新但毫无反应。console.log 数据是对的但页面是旧的。

::: details

**常见根因**：

**1. 直接替换了整个对象（响应式引用断裂）**

```js
// 错误：重新赋值断了响应式连接
let state = reactive({ user: { name: 'John' } })
state.user = { name: 'Jane' }  // 这个 OK，user 是 reactive 属性

// 但如果是
state = reactive({ user: { name: 'Jane' } })  // 错误！state 指向了新对象，视图用的还是旧的
```

**2. 解构导致丢失响应式**

```js
const state = reactive({ count: 0, name: 'Vue' })

// 错误：解构后是普通值
const { count, name } = state  // count 和 name 失去了响应式
count++  // 视图不更新

// 正确：用 toRefs 保持响应式
const { count, name } = toRefs(state)
count.value++  // 视图更新
```

**3. 给 reactive 对象新增属性（Vue 3 中 Proxy 已解决此问题，但仍需注意）**

```js
const state = reactive({ name: 'Vue' })
state.age = 3  // Vue 3 Proxy 下 OK，会自动追踪
// 但在某些边缘场景（如 Map/Set 的嵌套）仍需注意
```

**排查方法**：

1. 用 `isReactive()` / `isRef()` 检查变量是否响应式
2. 在 `watch` 中打印变化确认触发
3. 检查 DevTools Vue 插件中的组件状态对比
:::

## 3. keep-alive 包裹的页面越来越多导致内存泄漏？

**场景**：多个 Tab 页面用 `<keep-alive :include="cachedViews">` 缓存。用户长时间使用后，页面越来越卡甚至崩溃。

::: details

**根因**：keep-alive 缓存的组件实例不会被销毁，其内部的 ECharts、WebSocket、定时器、大数组持续占用内存。

**设计策略**：

**1. 限制缓存数量**

```vue
<keep-alive :max="5">
  <component :is="currentView" />
</keep-alive>
```

**2. 按需缓存（白名单 + 动态控制）**

```js
const cachedViews = ref(['Dashboard'])  // 初始只缓存 Dashboard

// 路由切换时动态增删
function onRouteChange(to) {
  if (to.meta.keepAlive) {
    if (!cachedViews.value.includes(to.name)) {
      if (cachedViews.value.length >= 5) {
        cachedViews.value.shift()  // 移除最早的
      }
      cachedViews.value.push(to.name)
    }
  }
}
```

**3. 页面离开时清理重资源**

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

let chart = null

onActivated(() => {
  // 重新激活时重建（如 ECharts 实例）
  chart = echarts.init(chartRef.value)
})

onDeactivated(() => {
  // 离开时销毁，防止内存泄漏
  chart?.dispose()
  clearInterval(timer)
})
</script>
```

**4. 配合 `onBeforeRouteLeave` 判断是否还需缓存**

某些页面离开后不需要再回来（如一次性表单），不使用 keep-alive。
:::

## 4. Pinia Store 设计不合理导致频繁重渲染？

**场景**：Store 中有 20+ 个字段，某页面只用到其中 3 个，但 Store 中任意字段变化都会触发该页面重渲染。

::: details

**优化前的常见问题**：

```js
// store 中
const useAppStore = defineStore('app', () => {
  const user = ref({})
  const theme = ref('light')
  const notifications = ref([])
  const sidebarOpen = ref(true)
  // ... 15+ more fields

  return { user, theme, notifications, sidebarOpen, /* ... */ }
})

// 组件中 — 解构会丢失响应式，不解构每次都拿整个 store
const store = useAppStore()
// store 中任何 ref 变化 → 本组件都重渲染（即使只用到 store.user）
```

**优化方案**：

**1. 拆分 Store**（推荐）

```js
// utilsStore.js — 只放 UI 状态
const useUIStore = defineStore('ui', () => {
  const theme = ref('light')
  const sidebarOpen = ref(true)
  return { theme, sidebarOpen }
})

// userStore.js — 用户数据
const useUserStore = defineStore('user', () => {
  const user = ref(null)
  return { user, login, logout }
})

// notificationStore.js — 频繁更新的通知
const useNotificationStore = defineStore('notification', () => {
  const list = ref([])
  return { list, add, remove }
})
```

**2. storeToRefs + 只解构需要的**

```js
const { user } = storeToRefs(useUserStore())  // 只有 user 变化才重渲染
```

**3. 高频数据用 shallowRef**

```js
const notifications = shallowRef([])  // 数组替换才触发更新，适合分页增量场景
```
:::

## 5. 大型表单 30+ 字段输入卡顿如何优化？

**场景**：复杂表单有 30+ 输入项，每个输入后有明显延迟，DevTools 显示每次输入触发大量组件更新。

::: details

**排查与修复**：

**1. 用 shallowRef 替代 ref/reactive**

```js
// 表单数据不需要深度响应式——只需最终提交时的值
const formData = shallowRef({
  name: '',
  email: '',
  company: '',
  // ... 30+ fields
})

// 更新时整体替换
function updateField(key, value) {
  formData.value = { ...formData.value, [key]: value }
}
```

**2. 拆分表单为独立子组件 + v-model**

```vue
<!-- 父组件：不关心每个字段的变化 -->
<BasicInfo v-model="formData.basic" />
<DetailInfo v-model="formData.detail" />
<ContactInfo v-model="formData.contact" />

<!-- 子组件内部管理输入，只在失焦或提交时 emit -->
```

**3. 使用 `v-memo` 跳过不变部分的渲染**

```vue
<div v-for="field in fields" :key="field.id" v-memo="[formData[field.id]]">
  <FormField v-model="formData[field.id]" />
</div>
```

**4. 计算属性缓存选项列表**

```js
const cityOptions = computed(() => provinces.value.find(p => p.id === formData.value.provinceId)?.cities ?? [])
```

**关键**：表单不需要深度响应式 → `shallowRef`，计算密集用 `computed`，大表单拆子组件。
:::

## 6. 多角色权限路由 + 按钮级权限如何设计？

**场景**：系统有 admin/editor/viewer 三种角色。admin 能看到所有页面和按钮，editor 能看到部分，viewer 只能看对应内容。

::: details

**路由层权限（动态路由）**：

```js
// router/index.js
const staticRoutes = [
  { path: '/login', component: () => import('@/pages/Login.vue') },
  { path: '/403', component: () => import('@/pages/403.vue') },
]

const asyncRoutes = [
  {
    path: '/dashboard',
    meta: { roles: ['admin', 'editor'] },
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/user-management',
    meta: { roles: ['admin'] },
    component: () => import('@/pages/UserManagement.vue'),
  },
]

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const { user, roles } = useUserStore()

  if (!user && to.path !== '/login') {
    return next('/login')
  }

  if (to.meta.roles && !to.meta.roles.some(r => roles.includes(r))) {
    return next('/403')
  }

  // 动态添加有权限的路由
  asyncRoutes.filter(r => r.meta.roles?.some(r => roles.includes(r)) || !r.meta.roles)
    .forEach(r => router.addRoute(r))

  next()
})
```

**按钮级权限（自定义指令）**：

```js
// directives/permission.js
export const permission = {
  mounted(el, binding) {
    const { roles } = useUserStore()
    const requiredRoles = binding.value

    if (requiredRoles && !requiredRoles.some(r => roles.includes(r))) {
      el.parentNode?.removeChild(el)  // 直接移除 DOM
      // 或用 el.style.display = 'none' 隐藏
    }
  },
}

// 使用
<button v-permission="['admin']">删除用户</button>
<button v-permission="['admin', 'editor']">编辑</button>
```

**组件级**：封装 `<Authorized :roles="['admin']"><DeleteButton /></Authorized>`。
:::

## 7. Nuxt 水合错误如何排查：Text content does not match？

**场景**：Nuxt 项目部署后偶尔白屏、控制台报 Hydration mismatch。

::: details

**常见原因和修复**：

**1. 服务端/客户端渲染不一致**

```vue
<script setup>
// 错误：Date 在服务端和客户端不同
const now = new Date().toLocaleString()

// 修复：用 onMounted 或 ClientOnly
const now = ref('')
onMounted(() => { now.value = new Date().toLocaleString() })
</script>

<template>
  <!-- 或直接用 ClientOnly 包裹 -->
  <ClientOnly>
    {{ now }}
    <template #fallback>加载中...</template>
  </ClientOnly>
</template>
```

**2. 随机值导致不一致**

```js
// 错误
const id = Math.random()  // 服务端和客户端不一样
const id = useId()  // 正确：Nuxt 提供的稳定 ID
```

**3. v-if 依赖浏览器特性**

```vue
<!-- 错误 -->
<div v-if="localStorage.getItem('token')">...</div>

<!-- 修复：初始统一为 false，mounted 后再设 -->
<script setup>
const hasToken = ref(false)
onMounted(() => { hasToken.value = !!localStorage.getItem('token') })
</script>
```

**4. 检查第三方组件是否支持 SSR**

有些组件库没有做 SSR 适配，需要 `ClientOnly` 包裹或动态导入 `ssr: false`。
:::

## 8. 封装第三方组件库的 v-model 和插槽透传？

**场景**：项目统一使用 `MyInput` 封装第三方组件，需要透传 v-model 和所有插槽。

::: details

```vue
<!-- MyInput.vue -->
<script setup>
// 透传 v-model（v-model:modelValue）
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  error: String,
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="my-input">
    <label>{{ label }}</label>
    <input
      v-model="inputValue"
      v-bind="$attrs"
      class="my-input__field"
      :class="{ 'is-error': error }"
    />
    <span v-if="error" class="my-input__error">{{ error }}</span>
  </div>
</template>
```

**插槽透传**：

```vue
<!-- ParentComponent.vue -->
<MyInput label="用户名">
  <template #prefix>
    <IconUser />
  </template>
  <template #suffix>
    <button @click="clear">✕</button>
  </template>
</MyInput>

<!-- MyInput.vue — 透传所有插槽 -->
<template>
  <div class="my-input">
    <slot name="prefix" />
    <input v-model="inputValue" v-bind="$attrs" />
    <slot name="suffix" />
  </div>
</template>

<script setup>
// 动态透传非具名插槽
defineOptions({ inheritAttrs: false })
</script>
```

**关键**：`v-bind="$attrs"` 透传属性，`inheritAttrs: false` 防止根元素继承不需要的属性。
:::

## 9. 异步组件 + Suspense + 错误边界的最佳实践？

**场景**：页面有几个重组件，想按需异步加载，并且加载时有骨架屏，加载失败有降级 UI。

::: details

```vue
<!-- Parent.vue -->
<template>
  <Suspense @pending="onPending" @resolve="onResolve" @fallback="onFallback">
    <template #default>
      <DashboardContent />
    </template>
    <template #fallback>
      <DashboardSkeleton />
    </template>
  </Suspense>
</template>

<script setup>
// DashboardContent.vue 使用 async setup
const { data: stats } = await useFetch('/api/dashboard/stats')
const { data: charts } = await useFetch('/api/dashboard/charts')
</script>
```

**错误边界**：

```vue
<!-- ErrorBoundary.vue -->
<script setup>
import { onErrorCaptured, ref } from 'vue'

const error = ref(null)

onErrorCaptured((err, instance, info) => {
  error.value = err
  reportError(err, info)  // 上报监控
  return false  // 阻止继续传播
})
</script>

<template>
  <div v-if="error" class="error-boundary">
    <p>组件加载失败</p>
    <button @click="error = null">重试</button>
  </div>
  <slot v-else />
</template>
```

**生产注意**：Suspense 目前仍是实验性特性（Vue 3.4+ 趋于稳定），不适合用于关键路径。作为替代方案，可用 `defineAsyncComponent`：

```js
const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: SkeletonComponent,
  delay: 200,
  errorComponent: ErrorComponent,
  timeout: 3000,
})
```
:::

## 10. 微前端场景下 Vue 子应用如何通信与隔离？

**场景**：主应用（qiankun/micro-app）+ 3 个 Vue 子应用。子应用间需要共享登录态，避免 CSS/JS 冲突。

::: details

**通信方案**：

```js
// 1. 主应用下发（通过 props）
// main-app 加载 micro-app 时
microApp.start({
  name: 'app-a',
  entry: '//localhost:7001',
  props: {
    auth: { token, user },
    sharedData: reactive({}),
  },
})

// 子应用接收
export async function mount(props) {
  const auth = props.auth
  const globalState = props.sharedData
  // 挂载 Vue 实例
}

// 2. CustomEvent 跨应用通信
window.dispatchEvent(new CustomEvent('auth:update', {
  detail: { token: 'xxx' },
}))

// 子应用监听
window.addEventListener('auth:update', (e) => {
  authStore.setToken(e.detail.token)
})

// 3. 全局状态 store（慎用，仅少量共享数据）
window.__GLOBAL_STATE__ = reactive({ user: null, theme: 'light' })
```

**CSS 隔离**：

```js
// vite.config.js
export default {
  css: {
    modules: { generateScopedName: '[name]__[local]___[hash:base64:5]' },
    preprocessorOptions: {
      scss: { additionalData: `$app-prefix: 'app-a';` },
    },
  },
}
```

或使用 qiankun 的 `experimentalStyleIsolation` 或 `shadowDOM` 模式。

**JS 隔离**：确保子应用不污染全局变量，避免多个子应用挂载不同版本的 Vue 到同一个 `window.Vue`。
:::

> 参考：Vue 3 官方文档，VueUse 文档，qiankun 文档，个人实践经验
