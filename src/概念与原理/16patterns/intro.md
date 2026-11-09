# 编程范式与设计模式

> 编程范式提供组织程序的思路，设计模式总结常见问题的解决方案。本版块收录 OOP / FP / FRP / AOP 概览、21 种常见模式，以及 React / Vue 中的应用示例。

## 先理解编程思路

- [从 NestJS 理解 OOP、FP、FRP 与 AOP](./s_pn_24-programming_paradigms) — 对象协作、纯函数、事件流与横切关注点；含口述回顾和边界追问

## 目录

### 创建型模式（4 种）

- :white_check_mark: [单例模式 Singleton](./s_pn_1-singleton) — 全局唯一实例，状态管理/日志/配置
- :white_check_mark: [工厂模式 Factory](./s_pn_2-factory) — 封装对象创建逻辑，屏蔽实现细节
- :white_check_mark: [建造者模式 Builder](./s_pn_3-builder) — 分步构建复杂对象，链式调用
- :white_check_mark: [原型模式 Prototype](./s_pn_4-prototype) — 克隆对象，Object.create / structuredClone

### 结构型模式（5 种）

- :white_check_mark: [适配器模式 Adapter](./s_pn_5-adapter) — 接口转换，统一不同 API 格式
- :white_check_mark: [装饰器模式 Decorator](./s_pn_6-decorator) — 动态添加功能，HOC / 日志 / 缓存
- :white_check_mark: [代理模式 Proxy](./s_pn_7-proxy) — 控制访问，ES6 Proxy / 懒加载 / 缓存
- :white_check_mark: [外观模式 Facade](./s_pn_8-facade) — 封装复杂子系统，提供简洁 API
- :white_check_mark: [组合模式 Composite](./s_pn_9-composite) — 树形结构，递归组件 / DOM 操作

### 行为型模式（7 种）

- :white_check_mark: [观察者模式 Observer](./s_pn_10-observer) — 一对多通知，事件监听 / 响应式
- :white_check_mark: [发布-订阅模式 PubSub](./s_pn_11-pubsub) — 事件通道解耦，跨模块通信
- :white_check_mark: [策略模式 Strategy](./s_pn_12-strategy) — 算法可替换，表单校验 / 支付
- :white_check_mark: [命令模式 Command](./s_pn_13-command) — 请求封装，撤销/重做 / 队列
- :white_check_mark: [状态模式 State](./s_pn_14-state) — 状态驱动行为，订单流转 / 请求状态
- :white_check_mark: [迭代器模式 Iterator](./s_pn_15-iterator) — 遍历集合，Generator / for-of
- :white_check_mark: [责任链模式 Chain of Responsibility](./s_pn_16-chain_of_responsibility) — 请求沿链传递，中间件 / 拦截器

### 扩展模式（5 种）

- :white_check_mark: [享元模式 Flyweight](./s_pn_17-flyweight) — 共享减少内存，对象池 / 虚拟列表
- :white_check_mark: [中介者模式 Mediator](./s_pn_18-mediator) — 星形通信，聊天室 / 组件协调
- :white_check_mark: [模板方法模式 Template Method](./s_pn_19-template_method) — 定义算法骨架，生命周期 / 数据导入
- :white_check_mark: [模块模式 Module](./s_pn_20-module) — 私有封装，ES Module / IIFE
- :white_check_mark: [混合模式 Mixin](./s_pn_21-mixin) — 功能组合，替代多重继承

> 部分内容翻译整理自 [patterns.dev](https://www.patterns.dev) 及 [Refactoring Guru](https://refactoring.guru)，并结合前端实战做了本地化改编。
