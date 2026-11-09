# 适配器模式 Adapter Pattern

## 概念

适配器模式将一个接口转换成客户端期望的另一个接口，使原本接口不兼容的类可以一起工作。它就像现实中的电源转换插头——不改变原有设备，只做接口转换。

## 核心思想

提供一个包装层，将旧接口/第三方接口的方法调用"翻译"为目标接口的调用。

```mermaid
flowchart LR
    A[Client] -->|期望接口| B[Adapter]
    B -->|转换调用| C[Adaptee 被适配者]
    C -->|原始接口| D[第三方/旧系统]
```

## 代码实现

### API 响应归一化

```ts
// 场景：两个不同的第三方 API 返回格式不一致

interface NormalizedUser {
  id: string
  name: string
  avatar: string
  email: string
}

// 平台A 返回格式
const apiA = {
  fetchUser(): Promise<{ user_id: number; full_name: string; profile_pic: string }> { /*...*/ }
}

// 平台B 返回格式
const apiB = {
  queryUser(): Promise<{ id: string; nick: string; avatar_url: string; mail: string | null }> { /*...*/ }
}

// 适配器 — 统一输出 NormalizedUser
class UserAdapterA {
  constructor(private api: typeof apiA) {}

  async getUser(): Promise<NormalizedUser> {
    const raw = await this.api.fetchUser()
    return {
      id: String(raw.user_id),
      name: raw.full_name,
      avatar: raw.profile_pic,
      email: '', // 平台A 不提供邮箱
    }
  }
}

class UserAdapterB {
  constructor(private api: typeof apiB) {}

  async getUser(): Promise<NormalizedUser> {
    const raw = await this.api.queryUser()
    return {
      id: raw.id,
      name: raw.nick,
      avatar: raw.avatar_url,
      email: raw.mail ?? '',
    }
  }
}

// 统一调用
async function displayUser(adapter: { getUser(): Promise<NormalizedUser> }) {
  const user = await adapter.getUser()
  console.log(user.name)
}
```

### 前端常用：接口适配

```ts
// 将旧的回调式 API 包装为 Promise
function promisify<T>(fn: (...args: [...unknown[], (err: Error | null, result: T) => void]) => void) {
  return (...args: unknown[]): Promise<T> =>
    new Promise((resolve, reject) => {
      fn(...args, (err: Error | null, result: T) => {
        err ? reject(err) : resolve(result)
      })
    })
}
```

## 前端应用场景

| 场景 | 说明 |
|------|------|
| API 数据归一化 | 不同后端返回同一业务对象的字段名/结构不同 |
| 第三方库替换 | 更换图表库/UI库时，用适配器包裹避免业务代码全改 |
| 旧接口兼容 | 将旧的回调式 API 包装为 Promise/async |
| 多端数据适配 | H5/小程序/App 同一套逻辑适配不同平台的 API |

## 优缺点

**优点**
- 不修改原有代码，符合开闭原则
- 将接口转换逻辑集中在一处，便于维护
- 可以让两个不兼容的接口协同工作

**缺点**
- 过多适配器会增加系统复杂度
- 适配层可能成为性能瓶颈
- 过度使用意味着前期设计有缺陷

> 来源：[Refactoring Guru — Adapter](https://refactoring.guru/design-patterns/adapter)
