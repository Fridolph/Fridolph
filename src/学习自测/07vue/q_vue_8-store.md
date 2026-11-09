# Vue store 状态管理相关

vuex 解决的问题：存储用户全局状态并提供管理状态 API。

但状态管理不一定就是 Vuex。相关整理如下：

## 如何去实现一个简易 Vuex，说说你的思路

::: details

本质上还是问的：vuex 是什么及如何去实现的

vuex 是一个状态管理模式和库，并确保这些状态以可预期的方式变更，其实现思路：

1. 要实现一个 Store 存储全局状态
2. 要提供修改状态所需 API：commit(type, payload), dispatch(type, payload)
3. 实现 Store 时，可以定义 Store 类，构造函数接收选项 options，设置属性 state 对外暴露状态，提供 commit 和 dispatch 修改属性 state。这里需要设置 state 为响应式对象，同时将 Store 定义为一个 Vue 插件
4. commit(type, payload)方法中可以获取用户传入 mutations 并执行它，这样可以按用户提供的方法修改状态。 dispatch(type, payload)类似，但需要注意它可能是异步的，需要返回一个 Promise 给用户以处理异步结果
   :::

> 这里只是回答思路，具体代码实现请跳转： // todo: 手写简易vuex