# 适配器模式能解决什么实际问题？举个前端例子

## 核心回答

适配器模式解决**接口不兼容**的问题，将旧接口/第三方接口转换为期望的新接口。就像出国用的电源转换插头。

```ts
// 场景：两个支付 SDK 的接口完全不同
interface WechatSDK {
  requestPayment(params: { orderId: string; amount: number }): Promise<void>
}
interface AlipaySDK {
  tradePay(config: { out_trade_no: string; total: number }): Promise<void>
}

// 目标统一接口
interface PaymentProcessor {
  pay(order: { id: string; amount: number }): Promise<void>
}

// 微信适配器
class WechatAdapter implements PaymentProcessor {
  constructor(private sdk: WechatSDK) {}
  async pay(order: { id: string; amount: number }) {
    await this.sdk.requestPayment({ orderId: order.id, amount: order.amount })
  }
}

// 支付宝适配器
class AlipayAdapter implements PaymentProcessor {
  constructor(private sdk: AlipaySDK) {}
  async pay(order: { id: string; amount: number }) {
    await this.sdk.tradePay({ out_trade_no: order.id, total: order.amount })
  }
}

// 业务代码 — 不管哪个支付渠道，调用方式统一
function checkout(processor: PaymentProcessor, order: { id: string; amount: number }) {
  processor.pay(order)
}
```

**好处**：
- 不修改第三方 SDK，符合**开闭原则**
- 新增支付渠道只需新适配器，业务代码不动
- 方便替换第三方库（换了支付 SDK，只改写适配器）

> 来源：[Refactoring Guru — Adapter](https://refactoring.guru/design-patterns/adapter)
