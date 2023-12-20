https://juejin.im/post/5ac61da66fb9a028c71eae1b

# 前言

前端路由是现代SPA应用必备的技能，每个现代前端框架都有对应的实现：react-router、vue-router。这里不探究上面框架的具体实现，因为不管是哪种无外乎用兼容性更好的hash实现或者是H5 history实现，与框架结合只需要做相应封装

* 基于hash的前端路由实现
* 基于hash的前端路由升级

> 提前声明: 下面的实现没有对传入的参数进行及时判断而规避错误,也没有考虑兼容性问题,仅仅对核心方法进行了实现.

---

## hash路由

hash路由一个明显的标志是带有`#`，我们主要是通过监听url中的hash变化来进行路由跳转. hash的优势是兼容性更好

### 实现基本功能

1. 初始化Class

```js
class Routers {
  constructor() {
    // 以键值对的形式存储路由
    this.routes = {}
    // 当前路由的url
    this.currentUrl = ''
  }
}
```

2. 实现实现路由hash存储与执行

在初始化完毕后我们需要思考两个问题：

* 将路由hash以及对应callback存储
* 触发路由hash变化后，执行对应的callback

```js
class Routers {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
  }
  // 将path路径与对应的callback存储
  route(path, callback) {
    this.routes[path] = callback || function() {}
  }
  // 刷新
  refresh() {
    // 获取当前url中的hash路径
    this.currentUrl = location.hash.slice(1) || '/'
    // 执行当前hash路径的callback函数
    this.routes[this.currentUrl]()
  }
}
```

3. 监听对应事件

那么我们只需要在实例化Class时监听上面的事件即可

```js
class Routes {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }
}
```

### 增加回退功能

我们在需要创建一个数组history来存储过往的hash路由，例如`/blue`并且创建一个指针currentIndex来随着后退和前进功能移动来指向不同的hash路由

```js
class Routers {
  constructor() {
    // 存储hash与callback键值对
    this.routes = {}
    // 当前hash
    this.currentUrl = ''
    // 记录出现过的hash
    this.history = []
    // 作为指针，默认指向this.history的末尾，根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1
    this.refresh = this.refresh.bind(this)
    this.backOff = this.backOff.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    // 将当前路由推入数组存储
    this.history.push(this.currentUrl)
    // 指针向前移动
    this.currentIndex++
    this.routes[this.currentUrl]()
  }

  // 后退功能
  backOff() {
    // 如果指针小于0的话就不存在对应hash路由了，因此锁定指针为0即可
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1)
    // 随着后退，location.hash也应随之变化
    location.hash = `#${this.history[this.currentIndex]}`
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]()
  }
}
```

**实际上执行起来会有一些问题**。原因在于，我们每次在后退都会执行对应的callback，这会触发refresh()执行，因此我们每次后退，history中都会被push新的路由hash，currentIndex也会向前移动，这显然不是我们想要的结果。

**完整实现  Hash Router**

我们必须做一个判断，如果是后退，我们只需要执行回调函数，不需要添加数组和指针

```js
class Routers {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
    this.history = []
    this.currentIndex = this.history.length - 1
    this.refresh = this.refresh.bind(this)
    this.backOff = this.backOff.bind(this)
    // 默认不是后退操作
    this.isBack = false
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'
    if (!this.isBack) {
      // 如果不是后退操作，且当前指针小于数组总长度，直接截取指针之前的部分存储下来
      // 此操作来避免当点击后退按钮后，再进行正常跳转，指针会停留在原地，而数组添加新hash路由避免再次造成指针的不匹配，我们直接截取指针之前的数组
      // 此操作同时与浏览器自带的后退功能的行为保持一致
      if (currentIndex < this.history.length - 1) {
        this.history = this.history.slice(0, this.currentIndex - 1)
      }
      this.history.push(this.currentUrl)
      this.currentIndex++
    }
    this.routes[this.currentUrl]()
    console.log(`指针：${this.currentIndex}, history: ${this.history}`)
    this.isBack = false
  }

  backOff() {
    // 后退操作设置 isBack为true
    this.isBack = true
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1)

    location.hash = `#${this.history[this.currentIndex]}`
    this.routes[this.history[this.currentIndex]]()
  }
}
```
