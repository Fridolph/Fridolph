# 工厂模式和抽象工厂模式的区别？

## 核心回答

- **工厂模式**：创建**单个产品**，根据参数决定返回哪个具体产品类的实例
- **抽象工厂模式**：创建**一组相关产品**，是工厂的工厂

```ts
// 普通工厂 — 创建不同类型用户
function createUser(type: 'admin' | 'normal'): User {
  return type === 'admin' ? new AdminUser() : new NormalUser()
}

// 抽象工厂 — 创建一整套 UI 组件（按钮 + 输入框 + 弹窗）
interface UIFactory {
  createButton(): Button
  createInput(): Input
  createDialog(): Dialog
}

class LightUIFactory implements UIFactory {
  createButton() { return new LightButton() }
  createInput() { return new LightInput() }
  createDialog() { return new LightDialog() }
}

class DarkUIFactory implements UIFactory {
  createButton() { return new DarkButton() }
  createInput() { return new DarkInput() }
  createDialog() { return new DarkDialog() }
}

// 切换主题只需换工厂
const factory: UIFactory = isDark ? new DarkUIFactory() : new LightUIFactory()
const btn = factory.createButton() // 自动配套颜色风格
```

**面试关键点**：简单记——"普通工厂造一个，抽象工厂造一家"。

> 来源：[Refactoring Guru — Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
