谈谈对MVVM的理解

## MVC

MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。

**优点**

1. 耦合性低
2. 重用性高
3. 声明周期成本低
4. 可维护性高
5. 有利软件工程化管理

**缺点**

1. 不适合小型，中等规模的应用程序
2. 增加系统结构和实现的复杂性
3. 视图与控制器间的过于紧密的连接
4. 视图对模型数据的低效率访问

## MVP

全称：Model-View-Presenter；MVP 是从经典的模式MVC演变而来，它们的基本思想有相通的地方：Controller/Presenter负责逻辑的处理，Model提供数据，View负责显示。

MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会直接从Model中读取数据而不是通过 Controller。

在MVC里，View是可以直接访问Model的。在MVC模型里，Model不依赖于View，但是View是依赖于Model的。但不建议在 View 中依赖 Model，而是要求尽可能把所有业务逻辑都放在 Controller 中处理，而 View 只和 Controller 交互。

**优点**

1. 模型与视图完全分离，我们可以修改视图而不影响模型
2. 可以更高效地使用模型，因为所有的交互都发生在一个地方——Presenter内部
3. 我们可以将一个Presenter用于多个视图，而不需要改变Presenter的逻辑。这个特性非常的有用，因为视图的变化总是比模型的变化频繁。
4. 如果我们把逻辑放在Presenter中，那么我们就可以脱离用户接口来测试这些逻辑（单元测试）

## MVVM

MVVM是Model-View-ViewModel的简写。MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。

View (通过DOM Listeners) -> Model (本质是一个JS对象)
Model (通过Data Bindings) -> View (DOM)

**优点**

1. 低耦合
2. 可重用性高
3. 独立开发
4. 可测试

---
