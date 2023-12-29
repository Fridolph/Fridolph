## 批量异步更新策略及nextTick原理

### 为什么要异步更新

通过前面几章我们已了解Vue.js是如何在我们修改`data`中的数据后修改视图了。简单回顾一下，这其实就是一个`setter -> Dep -> Watcher -> patch -> View`的过程。

假设我们有如下这么一种情况：

```html
<template>
  <div>
    <div>{{number}}</div>
    <button @click="handleClick">click</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 0
    }
  },
  methods: {
    handleClick() {
      for (let i = 0; i < 1000; i++) {
        this.number++
      }
    }
  }
}
</script>
```

当我们按下click时，number会被循环增加1000次

那么按照之前的理解，每次number被加1时，都会触发number的setter方法，从而根据上面的流程一直跑下来最后修改真实DOM。那么在这个过程中，DOM会被更新1000次？！

Vue肯定不会以如此低效的方式来处理。在默认情况下，每次触发某个数据的setter方法后，对应的Watcher对象会被push进一个`queue`队列中，在下一个tick时将这个队列queue全部拿出来run（Watcher对象的一个方法，用来触发patch操作）一遍

<img src="https://user-gold-cdn.xitu.io/2018/1/24/161285d6b2d9e6bd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

那么什么是下一个tick呢？

### nextTick

Vue实现了一个`nextTick`函数，传入一个cb回调函数，这个cb会被存储到一个队列中，在下一个tick时触发队列中的所有cb事件。

因为目前浏览器平台并没有实现nextTick方法，Vue在源码中分别用Promise、setTimeout、setImmediate等方式在microtask（微队列或是task）中创建一个事件，目的是在当前调用栈执行完毕以后（不一定立即）才会去执行这个事件。

笔者用 setTimeout 来模拟这个方法，当然，真实的源码中会更加复杂，笔者在小册中只讲原理，有兴趣了解源码中 nextTick 的具体实现的同学可以参考[next-tick](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js#L90)。

---

首先定义一个callbacks数组用来存储nextTick，在下一个tick处理这些回调函数之前，所有的cb都会被存在这个callbacks数组中。`pending`是一个标记位，代表着一个等待的状态。

setTimeout会在task中创建一个事件flushCallbacks，`flushCallbacks`则会在执行时将callbacks中所有的cb依次执行。

```js
let callbacks = []
let pending = false

function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true
    setTimeout(flushCallbacks, 0)
  }
}

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

### 再写Watcher

第一个例子中，当我们将number增加到1000次时，先将对应的Watcher对象给push进一个队列queue中去，等下一个tick时再去执行，这样做是对的。但是这有一个问题？

因为number执行++操作以后对应的Watcher对象都是同一个，我们并不需要在下一个tick时执行1000个同样的Watcher对象去修改界面，而是只需要执行一个Watcher对象，使其将界面上的0变成1000即可。

那么，我们就需要执行一个过滤的操作，同一个Watcher在同一个tick时应该只被执行一次，也就是说队列queue中不该出现重复的Watcher对象。

那么我们给Watcher对象起个名字，用`id`标记每一个Watcher对象，让它们看起来不一样。

实现update方法，在修改数据后由`Dep`来调用，而`run`方法才是真正的触发`patch`更新视图的方法

```js
let uid = 0

class Watcher {
  constructor() {
    this.id = ++uid
  }
  update() {
    console.log('watch' + this.id + ' update')
    queueWatcher(this)
  }
  run() {
    console.log('watch' + this.id + ' updated!')
  }
}
```

### queueWatcher

```js
let has = {}
let queue = []
let waiting = false

function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)

    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

我们使用一个叫做has的map，里面存放`id -> true(false)`的形式，用来判断是否已经存在相同的Wathcer对象（这样比每次都去遍历queue效率上高很多）

如果目前队列queue中还没有Watcher对象，则该对象会被push进队列queue中去。

`waiting`是一个标记位，标记是否已经向`nextTick`传递了`flushSchedulerQueue`方法，在下一个tick时执行`flushSchedulerQueue`方法来flush队列queue，执行它里面的所有Watcher对象的run方法。

### flushSchedulerQueue

```js
function flushSchedulerQueue() {
  let watcher, id

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    id = watcher.id
    has[id] = null
    watcher.run()
  }
}
```

举个例子：

```js
let watch1 = new Watcher()
let watch2 = new Watcher()

watch1.update() 
watch1.update()
watch2.update()
```

我们现在new了两个Watcher对象，因为修改了data数据，所以模拟触发了两次watch1的update以及一次watch2的update，若没有批量异步更新策略，应该执行Watcher对象的run，则打印结果

watch1 update
watch1 updated!
watch1 update
watch1 updated!
watch2 update
watch2 updated!

实际上会执行

watch1 update
watch1 update
watch2 update
watch1 updated!
watch2 updated!

这就是异步更新策略的效果，相同的Watcher对象会在这个过程中被剔除，在下一个tick时去更新视图，从而达到对我们第一个例子的优化。

我们再回头聊一下第一个例子，number会被不停地进行++操作，不断地触发它对应Dep中的Watcher对象的update方法。最终queue中因为对相同id的Watcher对象进行了筛选，从而queue中实际上只会存在一个number对应的Watcher对象。

在下一个tick时（此时number已变成了1000），触发Watcher对象的run方法来更新视图，将视图上的number从0直接变成了1000。

到这里，批量异步更新策略及nextTick原理已经讲完了。

参考自 [《批量异步更新策略及nextTick原理》](https://github.com/answershuto/VueDemo/blob/master/%E3%80%8A%E6%89%B9%E9%87%8F%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E7%AD%96%E7%95%A5%E5%8F%8A%20nextTick%20%E5%8E%9F%E7%90%86%E3%80%8B.js)