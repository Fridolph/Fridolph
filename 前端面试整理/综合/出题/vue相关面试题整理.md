1. active-class 是哪个组件的属性？嵌套路由怎么定义？

> vue-router 模块的 router-link 组件

2. vue-router 是什么？它有哪些组件？

> vue 用来写路由一个插件。router-link、router-view

3. 怎么定义 vue-router 的动态路由？怎么获取传过来的动态参数？

> 在路由文件中，对 path 属性加上/:param，使用 this.$router 对象的 params.id

4. vue-router 有哪几种导航钩子？

> 三种，一种是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截。第二种：组件内的钩子； 第三种：单独路由独享组件

5. v-model 是什么？怎么使用？ vue 中标签怎么绑定事件？

> 可以实现双向绑定，指令（v-class、v-for、v-if、v-show、v-on）
> vue 的 model 层的 data 属性。绑定事件：<input @click=eventName />

6. axios 是什么？怎么使用？描述使用它实现登录功能的流程？

> 请求后台资源的模块。npm install axios -S 装好，然后发送的是跨域，需在配置文件中 config/index.js 进行设置。后台如果是 Tp5 则定义一个资源路由。js 中使用 import 进来，然后.get 或.post。返回在.then 函数中如果成功，失败则是在.catch 函数中

7. 什么是 RESTful API？怎么使用?

> 是一个 api 的标准，无状态请求。请求的路由地址是固定的，如果是 tp5 则先路由配置中把资源路由配置好。标准有：.post .put .delete

8. mvvm 框架是什么？它和其它框架（jquery）的区别是什么？哪些场景适合？

> 一个 model + view + viewModel 框架，数据模型 model，viewModel 连接两个区别：vue 数据驱动，通过数据来显示视图层而不是节点操作。场景：数据操作比较多的场景，更加便捷

9. 自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？

> 全局定义指令：在 vue 对象的 directive 方法里面有两个参数，一个是指令名称，另外一个是函数。组件内定义指令：directives
> 钩子函数：bind（绑定事件触发）、inserted(节点插入的时候触发)、update（组件内相关更新）钩子函数参数：el、binding

10. Vue 的双向数据绑定原理是什么？

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter
这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化第二步：compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图第三步：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个 update()方法
3、待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。第四步：MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

10. * 说下你对 mvvm 的理解？双向绑定的理解?

M 就是 Model 模型层，存的一个数据对象。
V 就是 View 视图层，所有的 html 节点在这一层。
VM 就是 ViewModel，它通过 data 属性连接 Model 模型层，通过 el 属性连接 View 视图层。

11 请详细说下你对 vue 生命周期的理解？

总共分为 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后。创建前/后： 在 beforeCreated 阶段，vue 实例的挂载元素$el 和数据对象 data 都为 undefined，还未初始化。在 created 阶段，vue 实例的数据对象 data 有了，$el 还没有。载入前/后：在 beforeMount 阶段，vue 实例的$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换。在 mounted 阶段，vue 实例挂载完成，data.message 成功渲染。更新前/后：当 data 变化时，会触发 beforeUpdate 和 updated 方法。销毁前/后：在执行 destroy 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在

12. 请说下封装 vue 组件的过程？

> 首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。然后，使用 Vue.extend 方法创建一个组件，然后使用 Vue.component 方法注册组件。子组件需要数据，可以在 props 中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用 emit 方法。

13. 你是怎么理解 vuex 的？

> vuex 可以理解为一种开发模式或框架，通过状态（数据源）集中管理驱动组件的变化应用级的状态集中放在 store 中；改变状态的方式是提交 mutations，这是个同步的事物； 异步逻辑应该封装在 action 中。

14. 聊聊你对 Vue.js 的 template 编译的理解？

简而言之，就是先转化成 AST 树，再得到的 render 函数返回 VNode（Vue 的虚拟 DOM 节点）

详情步骤：首先，通过 compile 编译器把 template 编译成 AST 语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile 是 createCompiler 的返回值，createCompiler 是用以创建编译器的。另外 compile 还负责合并 option。然后，AST 会经过 generate（将 AST 语法树转化成 render funtion 字符串的过程）得到 render 函数，render 的返回值是 VNode，VNode 是 Vue 的虚拟 DOM 节点，里面有（标签名、子节点、文本等等）

15. 说下你了解的 axios 相关配置属性？

> `url`是用于请求的服务器 URL
> `method`是创建请求时使用的方法,默认是 get
> `baseURL`将自动加在`url`前面，除非`url`是一个绝对 URL。它可以通过设置一个`baseURL`便于为 axios 实例的方法传递相对 URL
> `transformRequest`允许在向服务器发送前，修改请求数据，只能用在'PUT','POST'和'PATCH'这几个请求方法
> `headers`是即将被发送的自定义请求头 `headers:{'X-Requested-With':'XMLHttpRequest'}`,
> `params`是即将与请求一起发送的 URL 参数，必须是一个无格式对象(plainobject)或 URLSearchParams 对象
    params:{
      ID: 12345
    },
> `auth`表示应该使用 HTTP 基础验证，并提供凭据这将设置一个`Authorization`头，覆写掉现有的任意使用`headers`设置的自定义`Authorization`头
    auth:{
      username: 'janedoe',
      password: 's00pers3cret'
    },
> `proxy`定义代理服务器的主机名称和端口
> `auth`表示 HTTP 基础验证应当用于连接代理，并提供凭据这将会设置一个`Proxy-Authorization`头，覆写掉已有的通过使用`header`设置的自定义`Proxy-Authorization`头。
    proxy:{
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    },

