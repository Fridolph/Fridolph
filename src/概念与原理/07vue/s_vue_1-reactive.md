# Vue 响应式原理

> 你看 Vue 源码干嘛？你使用 Vue 又不需要它的源码，你只需要会用就行了 —— 尤大 （说得很有道理，但不卷找不到工作）

<Image src="/07vue/reactive.jpg" alt="Vue 响应式原理" />

## 什么是响应式

响应式是 Vue 的`核心特性`之一，`数据驱动视图`，我们修改数据视图随之响应更新，就很优雅。

## Vue(2) 是如何实现响应式的

Vue2.x 是借助 `Object.defineProperty()` 实现的，而 Vue3.x 是借助 `Proxy` 实现的，下面我们先来看一下 2.x 的实现。

```js
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  // 拦截 get，当我们访问 data.key 时会被这个方法拦截到
  get: function getter() {
    // 在这里搜集依赖
    return obj[key]
  },
  // 拦截 set，当我们为 data.key 赋值时会被这个方法拦截到
  set: function setter(newVal) {
    // 当数据变更时，通知依赖项变更 UI
    // ...
  },
})
```

解释下上述代码：我们通过 `Object.defineProperty` 为对象 obj 添加属性，可以设置对象属性的 getter 和 setter 函数。之后我们每次通过点语法获取属性都会执行这里的 `getter` 函数，在这个函数中我们会把调用此属性的依赖收集到一个集合中； 而在我们给属性赋值(修改属性)时，会触发这里定义的 setter 函数，在次函数中会去通知集合中的依赖更新，做到数据变更驱动视图更新。

### 简易的 vue2 响应式

[实现简易 Vue2 响应式](../../编码与实践/07vue/c_vue_1-reactive/c_vue_1-reactive.md)

### Dep 的作用

Dep 用作依赖收集，当数据发生变化时，通知依赖更新。

用两个例子来看看依赖收集器的作用吧。

- 例子 1，减少无意义的渲染

```js
const vm = new Vue({
  data() {
    return {
      text: 'hello world',
      text2: 'hey',
    }
  },
})
```

当 vm.text2 的值发生变化时，会再次调用 render，而 template 中却没有使用 text2，所以这里处理 render 是不是过于小题大做

上面的简易实现里，在 Vue 的 render 函数中，我们调用了本次渲染相关的值。所以，与渲染无关的值，并不会触发 get，也就不会在依赖收集器中添加到监听(addSub 方法不会触发)，即使调用 set 赋值，notify 中的 subs 也是空的

```js
const vue = new Vue({
  data() {
    return {
      text: 'hello world',
      text2: 'hey',
    }
  },
})
vue.mount() // in get
vue._data.text = '456' // in watcher update /n in get
vue._data.text2 = '123' // nothing
```

- 例子 2，多个 Vue 实例引用同一个 data 时，通知谁？是不是应该俩都通知

```js
let commonData = {
  text: 'hello world',
}

const vm1 = new Vue({
  data() {
    return commonData
  },
})

const vm2 = new Vue({
  data() {
    return commonData
  },
})

vm1.mount() // in get
vm2.mount() // in get
commonData.text = 'hey' // 输出了两次 in watcher update /n in get
```

### 总结

- Vue 将 data 初始化为一个 `Observer` 并对对象中的每个值进行遍历，重写了其中的 `get`、`set`方法，data 中的每个属性，都有一个`独立的依赖收集器`。
- 在 `get` 中，向依赖收集器添加了`监听`
- 在 `mount` 时，实例了一个 `Watcher`，将收集器的目标 `Target` `指向`了当前 `Watcher`
- 在 data 值发生`变更`时，`触发 set`，触发了依赖收集器中的所有监听的更新 `notify` ，来触发 Watcher.update

## Vue3 是如何实现响应式的

在 Vue3 中使用 Proxy 对象来代替 Vue 2 中基于 Object.defineProperty，消除了 Vue 2 中基于 Object.defineProperty 所存在的一些局限，比如：`无法监听数组索引`，`length` 属性等等
在 **Proxy 中默认监听动态添加属性和属性的删除操作**

```js
let newObj = new Proxy(obj, {
  // 拦截 get，当我们访问newObj.key时会被这个方法拦截到
  get: function (target, propKey, receiver) {
    console.log(`getter ${propKey}`)
    return Reflect.get(target, propKey, receiver)
  },
  // 拦截 set，当我们为newObj.key赋值时会被这个方法拦截到
  set: function (target, propKey, value, receiver) {
    console.log(`setter ${propKey}`)
    return Reflect.set(target, propKey, value, receiver)
  },
})
```

## Proxy

Proxy 配合 Reflect 使用，Reflect 是 ES6 出现的新特性，代码运行期间用来设置或获取对象成员（操作对象成员），Reflect 没有出现前使用 Object 的一些方法比如 Object.getPrototypeOf, Reflect 也有对应的方法 Reflect.getPrototypeOf,两者都是一样的，不过 Reflect 更有语义。

### Proxy 基本使用

```js
const target = {
  name: '小浪',
  age: 22,
}

const handler = {
  get(target, key, receiver) {
    console.log(`获取对象属性${key}值`)
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log(`设置对象属性${key}值`)
    return Reflect.set(target, key, value, receiver)
  },
  deleteProperty(target, key) {
    console.log(`删除对象属性${key}值`)
    return Reflect.deleteProperty(target, key)
  },
}

const proxy = new Proxy(target, handler)
console.log(proxy.age)
proxy.age = 21
console.log(delete proxy.age)
```

- target：参数表示所要拦截的目标对象

- handler：参数也是一个对象，用来定制拦截行为

::: warning

- this 关键字表示的是代理的 handler 对象，所以不能使用 this 而是要用 receiver 传递，receiver 代表当前 proxy 对象 或者 继承 proxy 的对象，它保证传递正确的 this 给 getter，setter
- set 和 deleteProperty 也需要返回（添加 return ），返回的是一个布尔值，设置/删除成功返回 true，反之返回 false
  :::

### Vue3 简易实现

了解了上面的 Proxy 和 Reflect，我们来看一下 reactive 的实现，reactive，返回 proxy 对象，这个 reactive 可以深层次递归，如果发现子元素存在引用类型，递归处理。

```js
// 判断是否为对象 ，注意 null 也是对象
const isObject = val => val !== null && typeof val === 'object'
// 判断key是否存在
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export function reactive(target) {
  // 首先先判断是否为对象
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      console.log(`获取对象属性${key}值`)
      // ... 这里还需要收集依赖，先空着

      const result = Reflect.get(target, key, receiver)
      // 递归判断的关键, 如果发现子元素存在引用类型，递归处理。
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },

    set(target, key, value, receiver) {
      console.log(`设置对象属性${key}值`)

      // 首先先获取旧值
      const oldValue = Reflect.get(target, key, reactive)

      // set 是需要返回 布尔值的
      let result = true
      // 判断新值和旧值是否一样来决定是否更新setter
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 更新操作 等下再补
      }
      return result
    },

    deleteProperty(target, key) {
      console.log(`删除对象属性${key}值`)

      // 先判断是否有key
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)

      if (hadKey && result) {
        // 更新操作 等下再补
      }

      return result
    },
  }
  return new Proxy(target, handler)
}
```

### 收集依赖 / 触发更新

上面我们还有 get 中收集依赖没有完成，收集依赖涉及道 track , effect 还有依赖地图，下面我给出一张图先介绍一下 effect 和 track 是如何收集依赖的

<Image src="/07vue/reactive-dep.jpg" alt="收集依赖" />

响应式顺序：

1. effect
2. track
3. trigger
4. effect

在组件渲染过程中，一个 effect 会会触发 get，从而对值进行 track，当值发生改变，就会进行 trigge，执行 effect 来完成一个响应，那么先来实现 effect

#### effect

```js
// activeEffect 表示当前正在走的 effect
let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback()
  activeEffect = null
}
```

#### track

```js
// targetMap 表里每个key都是一个普通对象 对应他们的 depsMap
let targetMap = new WeakMap()

export function track(target, key) {
  // 如果当前没有effect就不执行追踪
  if (!activeEffect) return
  // 获取当前对象的依赖图
  let depsMap = targetMap.get(target)
  // 不存在就新建
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 根据key 从 依赖图 里获取到到 effect 集合
  let dep = depsMap.get(key)
  // 不存在就新建
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  // 如果当前effectc 不存在，才注册到 dep里
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}
```

最后添加到 hander 里的 get 中

```js
get(target, key, receiver) {
  // ...
  // 收集依赖
  track(target, key)
	// ...
}
```

#### trigger

通过上面的图，我们知道在 set 中使用 trigger 函数来触发更新，我们来实现一下吧

```js
// trigger 响应式触发
export function trigger(target, key) {
  // 拿到 依赖图
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // 没有被追踪，直接 return
    return
  }
  // 拿到了 视图渲染effect 就可以进行排队更新 effect 了
  const dep = depsMap.get(key)

  // 遍历 dep 集合执行里面 effect 副作用方法
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}
```

最后添加到 hander 的 set 和 deleteProperty 中

```js
set(target, key, value, receiver) {
  // ...
  if (oldValue !== value) {
    result = Reflect.set(target, key, value, receiver)
    trigger(target, key)
  }
	// ...
},

deleteProperty(target, key) {
  // ...
  if (hadKey && result) {
    // 更新操作
    trigger(target, key)
  }
	// ...
}
```

### Vue3 响应式简易实现

[Vue3 响应式简易实现](../../编码与实践/07vue/c_vue_1-reactive/c_vue_1-reactive.md)

## 参考

- [不要再搞混 Vue 的响应式原理和双向数据绑定了](https://juejin.cn/post/7117424554107994120?searchId=20240228122150EB9E011643A86353904A)——一拳不是超人
- [当学习自测你 Vue 响应式原理，你可以这么回答他](https://juejin.cn/post/6844903597986037768?searchId=20240228122150EB9E011643A86353904A)——JserWang
- [手写简单 vue3 响应式原理](https://juejin.cn/post/7134281691295645732?searchId=20240228122150EB9E011643A86353904A)——小浪努力学前端
