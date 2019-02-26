> 什么是MVVM？与MVC又有什么区别

不管是React还是Vue，它们都不是MVVM框架，至少有借鉴MVVM的思路。

- View 用户所看到的视图
- Model 本地数据或数据库中的数据

接口从数据库中读取数据，经过处理变为用户看到的视图。同时我们也可从视图上读取用户的输入，将输入通过接口写入数据中。

如何将数据展示到视图上，又如何将用户输入写入到数据中，出现多种架构设计。传统MVC架构通常使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，通过控制器去更新模型，并通知视图更新。

![MVC](https://user-gold-cdn.xitu.io/2018/12/20/167cad938817eb7e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

MVC缺点是控制器承担责任太大，随着项目复杂度增加代码臃肿变得难以维护。

在MVVM架构中，引入了ViewModel的概念。

![MVVM](https://user-gold-cdn.xitu.io/2018/12/21/167ced454926a458?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- ViewModel 数据业务处理的一层抽象。以Vue为例，ViewModel就是组件实例。View就是模版，Model 在引入Vuex的情况下完全可以和组件分离

同时MVVM还引入了一个隐式的Binder层，实现了View和ViewModel的绑定

![MVVM Binder](https://user-gold-cdn.xitu.io/2018/12/21/167cf01bd8430243?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

对于MVVM来说，最重要的并不是通过双向绑定或者其他方式将View和ViewModel绑定起来，而是**通过ViewModel将视图中的状态 和 用户的行为分离出一个抽象**，这才是MVVM的精髓