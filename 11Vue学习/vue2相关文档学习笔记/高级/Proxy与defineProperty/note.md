https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf

Vue三要素

* 响应式 如何监听数据变化，其中的实现方法就是双向绑定
* 模版引擎 如何解析模版
* 渲染 Vue如何将监听到的数据变化和解析后的HTML进行渲染

可以实现双向绑定的方法有很多，这里重点讲的是**数据代理**的双向绑定。

常见的基于数据劫持的双向绑定有两种实现，一个是目前Vue在用的`Object.defineProperty`，另一个是ES6新增的`Proxy`，这也是未来Vue的选择

双向绑定

* 发布订阅
* 赃检查
* 数据劫持（代理）
  * Object.defineProperty
  * Proxy
  * Object.observe(废弃)
* 数据模型

---

## 基于数据劫持实现的双向绑定的特点

### 什么是数据劫持

数据劫持，通常利用`Object.defineProperty`劫持对象的访问器，在属性值发生变化时获取变化，从而进行进一步操作

```js
// 这是将要劫持的对象
const data = {
  name: ''
}
function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏')
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多，可游戏我只玩贪玩蓝月')
  } else {
    console.log('是兄弟就来砍我吧')
  }
}

// 遍历对象，对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get')
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好，我系${newVal}`)
      say(newVal)
    }
  })
})

data.name = '渣渣辉'
```

### 数据劫持的优势

目前有两大流派，一是React为首的单向数据绑定，二是ng、Vue为主个双向数据绑定

> 其实三大框架都是既可以双向绑定也可以单向绑定,比如React可以手动绑定onChange和value实现双向绑定,也可以调用一些双向绑定库,Vue也加入了props这种单向流的api,不过都并非主流卖点。

单向或者双向的优劣不在我们的讨论范围,我们需要讨论一下对比其他双向绑定的实现方法,数据劫持的优势所在。

1. 无需显式调用。例如Vue运用数据劫持和发布订阅，直接可以通知变化驱动视图，上面的例子也是 当`data.name = '渣渣辉'`后直接触发变更。而Ng脏检查则需要显式调用 `markForCheck`，react需要显式调用setState

2. 可精确得知变化数据。还是上例，我们劫持了属性的setter，当属性值改变，我们可以精确获知变化的内容`newVal`，因此在这部分不需要额外的diff操作，否则我们只知道数据发生了变化而不知道具体哪些数据变化了，这时需要大量diff来找出变化值，这是额外的性能损耗

### 基于数据劫持的双向绑定的实现思路

数据劫持是双向绑定各种方案中比较流行的一种，参考Vue

基于数据劫持的双向绑定离不开`Proxy`与`Object.defineProperty`等方法对 对象/对象属性 的劫持，实现一个完整的双向绑定需要以下几点：

1. 利用Proxy或Object.defineProperty生成的Observer针对 对象/对象属性 进行劫持，在属性发生变化后通知订阅者

2. 解析器Compile解析模版中的`Directive 指令`，收集指令所依赖的方法和数据，等待数据变化然后进行渲染

3. Watcher属于Observer和Compile的桥梁，它将接收到的Observer产生的数据变化，并根据Compile提供的指令进行视图渲染，使得数据变化促使视图变化

![Vue双向绑定](https://user-gold-cdn.xitu.io/2018/4/11/162b38ab2d635662?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 基于Object.defineProperty双向绑定的特点

[关于`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

简易版双向绑定

我们知道，Object.defineProperty的作用就是劫持一个对象的属性，通常我们对属性的getter和setter方法进行劫持，在对象的属性发生变化时进行特定的操作

```js
const obj = {}
Object.defineProperty(obj, 'text', {
  get: function() {
    console.log('get val')
  },
  set: function(newVal) {
    console.log('set val: ' + newVal)
    document.getElementById('input').value = newVal
    document.getElementById('text').innerHTML = newVal
  }
})
const input = document.getElementById('input')
input.addEventListener('keyup', function(e) {
  obj.text = e.target.value
})
```

---

### 升级改造

上面的双向绑定没什么乱用，因为：

1. 我们只监听了一个属性，一个对象不可能只有一个属性，我们需要对对象多个属性进行监听
2. 违反开放封闭原则，我们每次修改都需要进入方法内部，这是坚决杜绝的
3. 代码耦合严重，我们的数据、方法和DOM都是耦合在一起的

如何解决？

Vue的操作就是加入发布订阅模式，结合Object.defineProperty的劫持能力，实现了可用性很高的双向绑定。

首先，我们以发布订阅模式的角度看我们第一部分写的代码，会发现它的监听、发布和订阅都是写在一起的，首先需要进行解耦

我们先实现一个发布订阅中心，即消息管理员Dep，它负责存储订阅者和消息的分发，不管是订阅者还是发布者都需要依赖于它

```js
let uid = 0

// 用于存储订阅者并发布消息
class Dep {
  constructor() {
    // 设置id，用于区分新Watcher和只改变你属性值后新产生的Watcher
    this.id = uid++
    // 存储订阅者的数组
    this.subs = []
  }

  // 触发target上的Watcher中的addDep方法，参数为dep的实例本身
  depend() {
    Dep.target.addDep(this)
  }

  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }

  // 通知所有的订阅者（Watcher）触发订阅者的相应逻辑处理
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// 为Dep类设置一个静态属性，默认为null，工作时指向当前的Watcher
Dep.target = null
```

我们需要实现监听者 Observer，用于监听属性值的变化

```js
// 监听者，监听对象属性值的变化
class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  // 遍历属性值并监听
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }

  // 执行监听的具体方法
  convert(key, val) {
    defineReactive(this.value, key, val)
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  // 给当前属性的值添加监听
  let childObj = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
      // target指向一个Watcher实例，每个Watcher都是一个订阅者
      // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set: newVal => {
      if (val === newVal) return
      val = newVal
      // 对新值进行监听
      childObj = observe(newVal)
      // 通知所有订阅者，数值改变了
      dep.notify()
    }
  })
}

function observe(val) {
  // 当值不存在, 或者不是复杂数据类型时，不再需要继续深入监听
  if (!val || typeof val !== 'object') return
  return new Observer(val)
}
```

接下来，我们需要是实现一个订阅者 Wathcer

```js
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.depIds = {} // hash存储订阅者的id, 避免重复的订阅者
    this.vm = vm // 被订阅的数据一定来自于当前Vue实例
    this.cb = cb // 当数据更新时想要做的事情
    this.expOrFn = expOrFn // 并订阅的数据
    this.val = this.get() // 维护更新之前的数据
  }

  // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员Dep调用
  update() {
    this.run()
  }

  // 如果在DepIds的hash中没有当前的id，可以判断是新Watcher，因此可以添加到dep的数组中存储
  // 此判断是避免同id的Watcher被多次存储
  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }

  run() {
    const val = this.get()
    console.log(val)
    if (val !== this.val){
      this.val = val
      this.cb.call(this.vm, val)
    }
  }

  // 当前订阅者Watcher 读取被订阅数据的最新更新后的值时
  // 通知订阅者管理员收集当前订阅者
  get() {
    Dep.target = this
    const val = this.vm._data[this.expOrFn]
    // 置空，用于下一个Watcher使用
    Dep.target = null
    return val
  }
}
```

那么我们最后完成Vue, 并将上述方法挂载在Vue上

```js
class Vue {
  constructor(options = {}) {
    // 简化了 $options 的处理
    this.$options = options
    // 简化了对data的处理
    let data = (this._data = this.$options.data)
    // 将所有data最外层属性代理到Vue实例上
    Object.keys(data).forEach(key => this._proxy(key))
    // 监听数据
    observe(data)
  }

  // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }

  _proxy(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => this._data[key],
      set: val => {
        this._data[key] = val
      }
    })
  }
}
```

---

## Proxy实现双向绑定的特点

Proxy是ES6的新增特性，它在目标对象之前架设一层“拦截”，外部对象对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

具体特性可参考 http://es6.ruanyifeng.com/#docs/proxy

### Proxy可以直接监听对象而非属性

用Proxy实现简易版双向绑定

```js
const input = document.getElementById('input')
const text = document.getElementById('text')
const obj = {}

const newobj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}`)
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver)
    if (key === 'text') {
      input.value = value
      text.innerHTML = value
    }
    return Reflect.set(target, key, value, receiver)
  }
})

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value
})
```

### Proxy可以直接监听数组的变化

当我们对数组进行操作时，会触发对应的方法名称 和 length的变化，我们可以借此进行操作

```js
const list = document.getElementById('list')
const btn = document.getElementById('btn')

// 渲染列表
const Render = {
  // 初始化
  init: arr => {
    const fragment = document.createFragment()
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement('li')
      li.textContent = arr[i]
      fragment.appendChild(li)
    }
    list.appendChild(fragment)
  },

  // 我们只考虑增加了的情况，仅作示例
  change: val => {
    const li = document.createElement('li')
    li.textContent = val
    list.appendChild(li)
  }
}

// 初始数组
const arr = [1,2,3,4]

// 监听数组
const newArr = new Proxy(arr, {
  get: function(target, key, receiver) {
    console.log(key)
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver)
    if (key !== 'length') {
      Render.change(value)
    }
    return Reflect.set(target, key, value, receiver)
  }
})

// 初始化
window.onload = function() {
  Render.init(arr)
}

// push数字
btn.addEventListener('click', function() {
  newArr.push(6)
})
```

### Proxy的其他优势

1. Proxy有多达13种拦截方法，不限于 apply、ownKeys、deleteProperty、has等等是 defineProperty不具备的。

2. Proxy返回的是一个新对象，我们可以只操作新对象达到目的，而 defineProperty只能遍历对象属性直接修改

3. Proxy作为新标准受到浏览器厂商重点持续的性能优化
