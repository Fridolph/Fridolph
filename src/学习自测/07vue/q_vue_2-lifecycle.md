# Vue 生命周期

[Vue 生命周期详解](../../概念与原理/07vue/s_vue_2-lifecycle.md)

## 请说下 Vue 的生命周期

::: details

### Vue2

| 生命周期钩子      | 相关说明                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| **beforeCreate**  | 在`实例初始化之后`，数据观测 (data observer) 和 event/watcher 事件配置之前被调用                  |
| **created**       | 在`实例创建完成之后`被调用。此时，组件已经完成了数据观测、属性和方法的运算，但是尚未挂载到 DOM 上 |
| **beforeMount**   | 在组件`挂载到 DOM 之前`被调用                                                                     |
| **mounted**       | 在组件`挂载到 DOM 后`被调用。此时，组件已经被渲染 到页面上。                                      |
| **beforeUpdate**  | 在`组件更新之前`，即有新的虚拟 DOM 被重新渲染之前调用。                                           |
| **updated**       | 在`组件更新完毕之后`被调用。此时，组件已经使用新的虚拟 DOM 重新渲染页面。                         |
| **beforeDestroy** | 在`实例销毁之前`调用。此时，实例仍然可用。                                                        |
| **destroyed**     | 在`实例销毁之后`调用。此时，所有的事件监听器和子组件都已被移除。                                  |

### Vue3

| 生命周期钩子      | 相关说明                                                                           |
| ----------------- | ---------------------------------------------------------------------------------- |
| `setup`           | 在**组件创建之前**调用，用于设置组件的逻辑。这个函数接收两个参数：props 和 context |
| `onBeforeMount`   | 在组件**挂载到 DOM 之前**调用                                                      |
| `onMounted`       | 在**组件挂载到 DOM 后**调用。                                                      |
| `onBeforeUpdate`  | 在**组件更新之前**，即有新的虚拟 DOM 被重新渲染之前调用                            |
| `onUpdated`       | 在**组件更新完毕之后**调用                                                         |
| `onBeforeUnmount` | 在**组件卸载之前**调用                                                             |
| `onUnmounted`     | 在**组件卸载之后**调用                                                             |
| `onActivated`     | 被 keep-alive 缓存的组件`激活`时调用。                                             |
| `onDeactivated`   | 被 keep-alive 缓存的组件`停用`时调用。                                             |
| `onErrorCaptured` | 当捕获一个来自`子孙组件的错误时`被调用。                                           |

:::

## 对生命周期的理解

::: details

- 定义：**生命周期就是一个 vue 实例从创建到销毁的过程**
- 作用：让我们可以在生命周期的`特定阶段`进行相关业务代码的编写
- 阶段：它可以总共分为 8 个阶段：
  - 创建前/后 beforeCreate / created (Vue3 setup)
  - 载入前/后 beforeMount / mounted
  - 更新前/后 beforeUpdate / updated
  - 销毁前/后 beforeDestroy / destroyed

:::

## 第一次页面加载会触发哪几个钩子

::: details
会触发 4 个钩子，分别是：

- beforeCreate
- created
- beforeMount
- mounted
  :::

## DOM 渲染在哪个生命周期完成

::: details
DOM 渲染是在 mounted 阶段完成，此阶段真实的 DOM 挂载完毕，数据完成双向绑定，可以访问到 DOM 节点。
:::

## 多组件（父子组件）中生命周期的调用顺序说一下

::: details

- 组件的调用顺序都是先父后子
- 渲染完成的顺序是先子后父
- 组件的销毁操作是先父后子
- 销毁完成的顺序是先子后父

- 加载渲染过程：父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount- >子 mounted->父 mounted
- 子组件更新过程：父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
- 父组件更新过程：父 beforeUpdate -> 父 updated
- 销毁过程：父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed
:::

## 参考

- [详解 Vue 的生命周期](https://juejin.cn/post/7032881219524100132)
