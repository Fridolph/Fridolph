# Vuex状态中心与Pinia迁移重构

这次整理的对象主要来自 `11Vue学习/vue2相关整理都放这，vue3后的直接放目录下/vue-todo/client/store`，并结合 `11Vue学习/vue2相关文档学习笔记/vuex` 里的原理笔记，一起沉淀成一篇更适合现代 Vue 3 / Nuxt 项目的状态管理案例文档。

和前面的页面型、组件型、SSR 型案例相比，这一篇更聚焦“状态中心”本身：

- 哪些状态值得进入全局 store
- Vuex 风格的状态中心为什么容易变重
- 业务 action、异步请求和 UI 副作用应该如何拆开
- 如果迁移到 Pinia，结构应该怎么重画

这类问题一旦不先理清，项目里就很容易出现“store 能用，但越来越像一个全局杂物间”的情况。

这次主要参考了下面这些本地文件：

- `11Vue学习/vue2相关整理都放这，vue3后的直接放目录下/vue-todo/client/store/store.js`
- `11Vue学习/vue2相关整理都放这，vue3后的直接放目录下/vue-todo/client/store/state/state.js`
- `11Vue学习/vue2相关整理都放这，vue3后的直接放目录下/vue-todo/client/store/mutations/mutations.js`
- `11Vue学习/vue2相关整理都放这，vue3后的直接放目录下/vue-todo/client/store/actions/actions.js`
- `11Vue学习/vue2相关文档学习笔记/vuex/1介绍.md`
- `11Vue学习/vue2相关文档学习笔记/vuex/3Store实例化.md`

同时也参考了 Pinia 官方文档中的核心概念、Nuxt 集成与从 Vuex 迁移的说明：

- <https://pinia.vuejs.org/core-concepts/>
- <https://pinia.vuejs.org/cookbook/migration-vuex.html>
- <https://pinia.vuejs.org/ssr/nuxt.html>

## 原实现的价值和问题都很典型

`vue-todo` 的 store 结构非常适合做状态管理重构练习，因为它已经具备了比较完整的 Vuex 分层：

- `state` 存核心状态
- `getters` 做派生结果
- `mutations` 做同步状态变更
- `actions` 做异步请求和副作用调度

这套结构在 Vue 2 时代非常标准，也确实能把很多共享状态收口起来。

但从重构角度看，它也暴露了几个非常典型的问题：

- 业务动作、请求调用、通知提示和 loading 状态都堆在 `actions` 中
- `state` 里既有业务核心状态，也有演示性质状态，例如 `count / firstName / lastName`
- 全局 store 边界偏宽，导致“什么都能往里放”
- 页面与 store 的关系还是偏“直接消费大仓库”，不是围绕具体业务域组织

这也是很多 Vuex 项目后期的共性问题：分层形式是对的，但边界仍然可能越来越模糊。

## 先判断哪些状态真的值得进入全局 store

状态管理重构里最重要的一步，不是先迁移语法，而是先判断状态归属。

可以先用下面这条规则判断：

- 只属于单个组件、单次交互现场的状态，不进全局 store
- 多个页面或多个组件共享、且会持续被读取和更新的状态，进入全局 store
- 明显只用于展示推导的结果，不要重复保存，交给 getter 或 `computed`

把这条规则套到 `vue-todo` 上会很清楚：

### 应该保留为全局状态的

- `todos`
- `user`
- `loading`（如果确实存在全局 loading 语义）

### 更适合移出全局状态的

- `count`
- `firstName`
- `lastName`

这些状态更像 Vuex 演示用字段，不属于待办功能的真实核心域。如果继续保留在主 store 中，只会稀释状态中心的边界。

## 更合理的重构方向不是“继续做一个大 store”

原始 `store.js` 是单一 store 文件入口，再把 `state / getters / mutations / actions` 按目录拆开。这种结构在 Vuex 时代常见，但继续扩展时，很容易出现两个问题：

- 文件是拆开了，但业务域没拆开
- 所有 action 和 mutation 仍然聚到一个全局空间里

所以更稳的重构方向，不是继续维护一个大 store，而是按业务域拆状态中心。

如果沿着现代 Vue 3 / Pinia 的思路重构，更适合把它拆成下面几类 store：

- `useTodoStore()`：只处理待办列表和待办动作
- `useSessionStore()`：只处理登录态和用户信息
- `useUiStore()`：只处理全局 UI 级状态，例如全局 loading 或通知开关

这样以后每个 store 的职责都会更稳定，页面组件也会围绕具体业务域消费状态，而不是从大仓库里挑字段。

## 先把状态域模型收敛下来

在进入 Pinia 迁移前，先把领域对象收敛清楚会更稳。

```ts [11Vue学习/组件化思维/examples/types/state.ts]
export interface TodoItem {
  id: string
  content: string
  completed: boolean
}

export interface SessionUser {
  id: string
  username: string
}

export interface TodoState {
  todos: TodoItem[]
  pending: boolean
}

export interface SessionState {
  user: SessionUser | null
  pending: boolean
}
```

这一步和前面所有案例一样，先讲清楚“系统到底在管理什么”，再谈状态 API 长什么样。

## 如果继续用 Vuex，也应该先做业务域收口

即使暂时不迁移 Pinia，当前的 Vuex 结构也应该先按业务域拆。否则迁移只是语法搬家，不会真正降低复杂度。

更合理的 Vuex 方向通常是把 `todos` 和 `session` 拆成 namespaced module。

```ts [11Vue学习/组件化思维/examples/vuex/modules/todos.ts]
export default {
  namespaced: true,
  state: () => ({
    todos: [],
    pending: false
  }),
  getters: {
    activeTodos(state: any) {
      return state.todos.filter((todo: any) => !todo.completed)
    }
  },
  mutations: {
    setPending(state: any, value: boolean) {
      state.pending = value
    },
    setTodos(state: any, todos: any[]) {
      state.todos = todos
    }
  },
  actions: {
    async fetchTodos({ commit }: any) {
      commit('setPending', true)
      try {
        const todos = await todoModel.getAllTodos()
        commit('setTodos', todos)
      } finally {
        commit('setPending', false)
      }
    }
  }
}
```

这样做的意义不是“更像规范”，而是为了在迁移 Pinia 之前，先把状态中心从“全局杂糅”收口到“领域模块”。

## Pinia 的真正价值不只是更简洁

很多人会把 Pinia 理解成“Vuex 的简化版”，但真正更重要的点是：Pinia 更容易把 store 写成“一个明确业务域 + 一组显式动作”的结构。

在 Pinia 里，最适合的 store 通常长这样：

```ts [11Vue学习/组件化思维/examples/pinia/useTodoStore.ts]
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<any[]>([])
  const pending = ref(false)

  const activeTodos = computed(() => {
    return todos.value.filter(todo => !todo.completed)
  })

  async function fetchTodos() {
    pending.value = true
    try {
      todos.value = await todoModel.getAllTodos()
    } finally {
      pending.value = false
    }
  }

  async function addTodo(content: string) {
    const created = await todoModel.createTodo({ content, completed: false })
    todos.value = [created, ...todos.value]
  }

  return {
    todos,
    pending,
    activeTodos,
    fetchTodos,
    addTodo
  }
})
```

和旧式 Vuex 相比，这种结构的好处非常明确：

- 状态、派生状态和动作按业务域收在一起
- 不再强依赖 mutation 字符串
- 组合式 API 风格更贴近现代 Vue / Nuxt 项目
- 更容易配合类型系统和 composable 思维一起工作

## action 里不要把所有副作用都混在一起

原始 `actions.js` 里有一个很典型的问题：业务请求、全局 loading、通知提示、认证错误处理、事件总线触发都堆在同一层。

这种写法短期没问题，但越往后会越难拆。更稳的思路是把副作用分层：

- 业务数据更新，留在 store action
- 页面级反馈，留在页面或业务 composable
- 全局通知，交给通知服务或 UI store
- 认证跳转，交给 session 相关逻辑

例如，可以把错误和通知从 todo store 中拆出去：

```ts [11Vue学习/组件化思维/examples/pinia/useTodoStore.ts]
async function addTodo(content: string) {
  const created = await todoModel.createTodo({ content, completed: false })
  todos.value = [created, ...todos.value]
  return created
}
```

然后页面层决定是否提示：

```ts [11Vue学习/组件化思维/examples/pinia/useTodoPage.ts]
export function useTodoPage() {
  const todoStore = useTodoStore()
  const uiStore = useUiStore()

  async function createTodo(content: string) {
    await todoStore.addTodo(content)
    uiStore.notify('你又多了一件事要做')
  }

  return {
    createTodo
  }
}
```

这样 store 会更专注于状态和动作本身，而不会变成一个全局副作用集散地。

## getter 与 `computed` 的边界也要说清楚

在 Vuex 时代，很多派生逻辑会优先放到 getter 里；在 Pinia 时代，这层可以继续保留，但要更明确地区分：

- 属于 store 公共派生结果的，放到 getter 或 setup store 内的 `computed`
- 只属于某个页面视图组合的，放到页面 composable 或页面本地 `computed`

例如：

- `activeTodos` 这种属于 todo 业务域本身的结果，适合留在 store
- `visibleTodos` 这种依赖页面筛选条件的结果，更适合留在页面 composable

这条边界一旦明确，store 就不会继续膨胀成“全项目所有派生逻辑都往里放”的位置。

## Nuxt 场景下更适合 Pinia 的原因

在 `M5-2` 中已经整理了 Nuxt 页面数据获取和渲染边界。在 Nuxt 场景里，Pinia 的优势会更明显，因为它更容易做到：

- store 按业务域拆分
- 结合组合式 API 使用
- 和 Nuxt 插件 / composable 一起组织页面数据流
- 在 SSR 与 hydration 场景中保持更稳定的状态入口

更典型的 Nuxt 写法通常会像这样：

```ts [11Vue学习/组件化思维/examples/nuxt/stores/session.ts]
export const useSessionStore = defineStore('session', () => {
  const user = ref<any | null>(null)

  function setUser(value: any | null) {
    user.value = value
  }

  return {
    user,
    setUser
  }
})
```

然后页面和 composable 再围绕这个 store 工作，而不是在每个页面里各自维护一套登录态逻辑。

## 从 Vuex 迁移到 Pinia 时，更适合按“领域模块”迁移

如果项目已经比较大，不建议一口气整体重写。更稳的做法通常是按业务域渐进迁移：

- 先挑边界最清晰的模块迁移
- 先迁移只依赖自身状态的模块
- 先让页面消费层适配新 store
- 再逐步收掉旧 Vuex 模块

对于当前这个 `vue-todo` 示例，比较自然的顺序通常是：

- 先迁移 `todo` 域
- 再迁移 `session` 域
- 最后再判断是否还需要单独的 UI store

这会比“先把所有 mutation 全部翻译掉”更稳定。

## 这类状态管理项目最常见的几个误区

结合本地示例和 Pinia 官方迁移思路，这类项目最常见的误区通常有这些：

- 以为“用了 store”就等于状态边界清晰
- 以为“迁移到 Pinia”就自然完成了架构升级
- 把页面副作用和 store action 混在一起
- 把所有派生逻辑都塞进 store
- 不先按业务域拆状态中心，就直接开始迁移 API

这些问题的共同点是：都把状态管理当成语法问题，而没有把它当成边界设计问题。

## 这次重构真正沉淀下来的模式

这篇状态管理案例最值得沉淀的，不是“Vuex 怎么写”或者“Pinia 怎么写”，而是下面这几条更稳定的原则：

- 先判断哪些状态真的值得进入全局 store
- 先按业务域收口状态中心，再决定用 Vuex 还是 Pinia
- 先把副作用从 store action 中拆层，再谈迁移
- 先把 getter / `computed` 的边界说清楚，再决定派生逻辑放哪里
- 迁移 Pinia 时优先按领域模块渐进推进

这次真正沉淀下来的经验有六个：

- 全局状态必须有明确归属边界
- store 不应该沦为全局杂物间
- 状态中心最好按业务域拆分
- store action 应该尽量聚焦业务动作本身
- Pinia 更适合现代 Vue / Nuxt 的组合式组织方式
- 迁移时应优先做边界收口，再做语法搬迁

以后再整理状态管理场景时，可以优先检查这几个问题：

- 哪些状态其实不应该进全局 store
- 当前 store 是否已经按业务域划分
- action 里是否混入了太多 UI 副作用
- store getter 和页面 `computed` 是否职责混乱
- 迁移 Pinia 时是否已经有渐进顺序

只要这些问题还有几项答不清楚，这个状态管理方案通常就还值得继续重构。
