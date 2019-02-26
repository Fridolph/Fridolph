## MVVM

MVVM由以下三部分内容组成：

* View 界面
* Model 数据模型
* ViewModel 作为桥梁负责沟通 View 和 Model

在jquery时期，如果需要刷新UI，需要先取到对应的DOM再更新UI，这样数据和业务逻辑就和页面有强耦合

在MVVM中，UI是通过数据驱动的，数据一旦改变就会相应地刷新对应UI，UI如果改变，也会改变对应的数据。这种方式就可以在业务处理中只关心数据的流转，而无需直接和页面打交道。ViewModel只关心数据和业务的处理，不关心View如何处理数据，在这种情况下，View和Model都可以独立出来，任何一方改变了也不一定需要改变另一方，并且可以将一些可复用的逻辑放在一个ViewModel中，让多个View复用这个ViewModel。

MVVM中，最核心的也就是数据双向绑定，例如Angular的脏数据检查，Vue中的数据劫持。

### 脏数据检测

当触发了指定事件后会进入脏数据检测，这时会调用 $digest 循环遍历所有的数据观察者，判断当前值是否和先前的值有区别，如果检测到变化的话，会调用 $watch 函数，然后再次调用 $digest 循环直到发现没有变化，循环至少为2次，至多为10次。

脏数据检测虽然存在低效的问题，但是不关心数据是通过什么方式改变的，都可以完成任务。但是这在Vue中的双向绑定是存在问题的。并且脏数据检测可以实现批量检测出更新的值，再去统一更新UI，大大减少了操作DOM的次数。所以低效也是相对的。

### 数据劫持

Vue内部使用了`Object.defineProperty` 来实现双向绑定，通过该方法可以监听到setter和getter

```js
var data = { name: 'fri' }
observe(data)
let name = data.name // -> get value
data.name = 'yk' // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') return
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveSetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}
```

以上代码简单实现了如何监听数据的set和get事件，但是仅仅如此还不够，还需要在适当的时候给属性添加发布订阅：

```html
<div id="name">{{name}}</div>
```

在解析如上代码模版时，遇到`{{name}}`就会给属性name添加发布订阅

```js
// 通过Dep解耦
class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    // sub是Watcher实例
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 全局属性，通过该属性配置Watcher
Dep.target = null

function update(value) {
  document.querySelector('#name').innerText = value
}

class Watcher {
  constructor(obj, key, cb) {
    // 将Dep.target指向自己，然后触发属性的getter添加监听
    // 最后将Dep.target清空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }

  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用update方法更新dom
    this.cb(this.value)
  }
}

var data = { name: 'fri' }
observe(data)
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update dom innerText
data.name = 'xxx'
```

接下来对`defineReactive`函数进行构造

```js
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) dp.addSub(Dep.target)
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 Watcher 的 update 方法
      dp.notify()
    }
  })
}
```

以上实现了一个简易的双向绑定，核心思路就是手动触发一次属性的getter来实现发布订阅的添加

---


## Proxy 与 Object.defineProperty 对比

Object.defineProperty 虽然已经能够实现双向绑定了，但有缺点：

1. 只能对属性进行数据劫持，所以需要深度遍历整个对象
2. 对于数组不能监听到数据的变化

```js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
// hack以下几个函数
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function(method) {
  // 获得原生函数
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    // 调用原生函数
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // 触发更新
    ob.dep.notify()
  })
})
```
