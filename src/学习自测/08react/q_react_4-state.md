# React 状态管理实战

> 以下问题考察生产环境中状态管理的选型与设计能力。

## 1. 项目状态混乱：部分 useState，部分 Context，部分 Redux，如何评估和重构？

**场景**：接手一个老项目，发现 useState 到处传 props、Context 被滥用、还有部分 Redux。页面间状态流向不清，修改一个功能要改多处。

::: details

**评估框架**：

| 问题 | 判断方法 |
|------|---------|
| 状态属于谁？ | 仅单组件用→useState；跨组件共享→Context/状态库 |
| 从哪来？ | 服务端来的→React Query；客户端产生的→状态库 |
| 变化频率？ | 高频且与多组件相关→Zustand；低频→Context |
| 需要中间件吗？ | 需要日志/持久化/时间旅行→Redux；简单场景→Zustand |

**重构策略**（渐进式，不推倒重来）：

1. 先把所有 `useState + props` 传递的低全局状态迁移到 Zustand
2. 把 Context 中高频更新的数据拆分出来
3. 把服务端数据从 Redux 迁移到 React Query
4. 保留 Redux 只用于全局认证状态和需要中间件的场景

**核心原则**：服务端状态用 React Query，客户端状态用 Zustand，低频全局用 Context。
:::

## 2. Redux / Zustand / Jotai 真实对比与选型决策

**场景**：新项目需要选状态管理方案，团队成员有不同意见。

::: details

| 维度 | Redux Toolkit | Zustand | Jotai |
|------|-------------|---------|-------|
| 学习成本 | 中高 | 低 | 低 |
| 样板代码 | 较多 | 几乎为零 | 几乎为零 |
| 选择式订阅 | useSelector | 构造函数选择器 | 原子级自动 |
| 中间件 | ✅ DevTools/持久化/中间件生态 | ✅ 有持久化/日志 | ✅ 有限 |
| 性能 | 好（需手动优化） | 好（自动） | 优（原子级） |
| 适用规模 | 大型/多人协作 | 中小型/独立开发 | 需要细粒度响应式 |
| TypeScript | 完善 | 完善 | 完善 |

**决策建议**：
- 新项目 3 人以下 → **Zustand**（最快开发速度）
- 新项目 5 人以上且有复杂状态流 → **Redux Toolkit**（约束 = 可维护性）
- 项目中大量原子状态之间有派生依赖 → **Jotai**
- 不论选哪个，服务端数据一律用 **React Query**
:::

## 3. 跨页面共享用户认证状态如何设计？

**场景**：登录态、用户角色、权限信息需要在所有页面/组件中访问。如何设计前端状态 + 服务端状态的协作？

::: details

```
┌─────────────────────────────────────────────────┐
│                  全局认证 Store                    │
│  { user, token, isAuthenticated, roles }         │
│  由 Zustand/Redux 管理，登录时写入，登出时清空     │
└──────────────┬──────────────────────────────────┘
               │
    ┌──────────┴──────────┐
    │    React Query       │  服务端数据缓存
    │  useQuery(['me'])   │  用 token 请求 /api/me
    └─────────────────────┘
```

```javascript
// zustand auth store
const useAuthStore = create(set => ({
  token: localStorage.getItem('token'),
  user: null,
  login: (token, user) => {
    localStorage.setItem('token', token)
    set({ token, user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null, isAuthenticated: false })
  },
}))

// React Query: 服务端验证 token 有效性
useQuery({
  queryKey: ['me'],
  queryFn: () => fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } }),
  enabled: !!token,
  onSuccess: (user) => useAuthStore.setState({ user }),
  onError: () => useAuthStore.getState().logout(),
})
```

**两状态协作**：客户端 store 存 token（立刻响应 UI），React Query 异步验证并同步最新用户信息。
:::

## 4. React Query 和 Redux 的分工？

**场景**：项目同时使用了 React Query 和 Redux。新成员困惑："数据都往哪放？"

::: details

**简单规则**：

```
服务端数据 → React Query（有 staleTime、cache、自动重取）
客户端状态 → Redux / Zustand（UI 状态、表单草稿、本地偏好）
```

| 例子 | 放哪 |
|------|------|
| 用户列表数据 | React Query |
| 用户列表的筛选条件 | Redux / Zustand / URL params |
| 当前用户信息 | React Query |
| 当前选中行 ID | useState |
| 表单草稿 | Zustand |
| 弹窗开启/关闭 | useState |

**为什么不能全放 Redux**：Redux 不会自动 dedup 相同请求、不会自动重取过期数据、需要手写 loading/error 状态——这些 React Query 全做了。

**反之亦然**：React Query 不适合"当前选中的 tab"这类纯 UI 状态。
:::

## 5. 设计支持撤销/重做的编辑器状态管理

**场景**：在线表单编辑器需要支持多次撤销(Ctrl+Z)和重做(Ctrl+Y)。

::: details

**设计思路**：维护状态历史栈 + 指针。

```javascript
const useUndoable = (initialState) => {
  const [history, setHistory] = useState([initialState])
  const [index, setIndex] = useState(0)

  const state = history[index]
  const canUndo = index > 0
  const canRedo = index < history.length - 1

  const setState = (newState) => {
    // 新操作：丢弃 index 之后的未来状态，压入新状态
    const newHistory = history.slice(0, index + 1)
    setHistory([...newHistory, typeof newState === 'function'
      ? newState(history[index])
      : newState])
    setIndex(newHistory.length) // 注意这里是 slice 后的长度
  }

  const undo = () => canUndo && setIndex(i => i - 1)
  const redo = () => canRedo && setIndex(i => i + 1)

  return { state, setState, undo, redo, canUndo, canRedo }
}
```

**内存优化**：限制历史步数（如 50 步），超出时删除最早的记录。

**生产级方案**：使用 `immer` 配合上述模式，避免深拷贝性能问题。
:::

> 参考：Zustand 文档，Redux Toolkit 文档，TanStack Query 文档，个人实践经验
