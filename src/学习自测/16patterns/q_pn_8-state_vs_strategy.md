# 状态模式和策略模式看起来很像，怎么区分？

## 核心回答

| 维度 | 状态模式 | 策略模式 |
|------|---------|---------|
| **核心目的** | 对象**内部状态**变化时改变行为 | 在不同**算法**间切换 |
| **谁决定切换** | 状态自身或 Context 管理转换 | **外部调用方**选择策略 |
| **关键差异** | 状态之间的**转换有预定义规则** | 策略之间**互不知晓**，无转换 |
| **典型场景** | 订单状态流转、播放器状态 | 排序算法、表单校验规则、支付方式 |

```ts
// 状态模式 — 状态负责自己的转换
class Order {
  private state: State = new PendingState()
  process() { this.state = this.state.next() } // 状态决定下一状态
}

// 策略模式 — 外部选择策略
function calc(price: number, type: string) {
  return strategies[type](price) // 外部决定用哪个策略，策略间无关联
}
```

**面试关键点**：状态模式关注"**什么情况下做什么**"（状态流转），策略模式关注"**怎么做好这件事**"（算法选择）。状态模式的各状态知道彼此存在（有转换关系），策略之间完全独立。

> 来源：[State vs Strategy](https://refactoring.guru/design-patterns/state)
