# 策略模式的实现思路和前端应用？

## 核心回答

策略模式定义一系列算法，封装为独立策略对象，在运行时**动态选择**执行。核心价值是**消除 if-else 臃肿**。

```ts
// ❌ 传统方式 — if-else 地狱
function calcPrice(type: string, price: number) {
  if (type === 'normal') return price
  else if (type === 'vip') return price * 0.8
  else if (type === 'member') return price * 0.9
  // 新增策略要改这里
}

// ✅ 策略模式 — 开闭原则
const discountMap = {
  normal: (p: number) => p,
  vip: (p: number) => p * 0.8,
  member: (p: number) => p * 0.9,
}
function calcPrice(type: string, price: number) {
  return (discountMap[type] ?? discountMap.normal)(price)
  // 新增策略：只需加一行 discountMap.newType = ...
}
```

**好处**：新增策略只需添加新对象，**不修改原有代码**（符合开闭原则）；策略可独立测试和复用。

**前端典型场景**：
- 表单校验规则集（每种校验是一个策略）
- 排序算法选择（价格/时间/评分排序）
- 支付渠道（微信/支付宝/银行卡不同费率计算）

> 来源：[Refactoring Guru — Strategy](https://refactoring.guru/design-patterns/strategy)
