## 初始化模块

由于使用单一状态树，应用所有状态会集中到一个比较大对象，当应用变复杂时，store对象可能很臃肿。为解决该问题，Vuex允许我们将store拆成多个module，每个module可拥有自己的state、mutation、action、getter，甚至是嵌套子模块

从数据结构上看，模块的设计就是一个树形结构，store本身可以理解为一个root module，它下面的modules就是子模块，Vuex需要完成这棵树的构建，其构建入口就是

    this._modules = new ModuleCollection(options)

`ModuleCollection`定义在`vuex/src/module/module-collection.js`

```js
export default class ModuleCollection {
  constructor(rowRootModule) {
    // register root module(Vuex.store options)
    this.register([], rawRootModule, false)
  }

  get(path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  getNamespace(path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    })
  }

  update(rawRootModule) {
    update([], this.root, rawRootModule)
  }

  register(path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }
    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }
    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  unregister(path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    if (!parent.getChild(key).runtime) return

    parent.removeChild(key)
  }
}
```

`ModuleCollection`实例化过程就是执行了register方法，register接收3个参数，其中path表示路径，因为我们整体目标是要构建一棵模块树，path是在构建树的过程中维护路径；
`rawModule`表示定义模块的原始配置；
`runtime`表示是否是一个运行时创建的模块

register方法首先通过`const newModule = new Module(rawModule, runtime)`创建了一个Module的实例，Module是用来描述单个模块的类，它的定义在`vuex/src/module/module.js`

```js
export default class Module {
  constructor(rawModule, runtime) {
    this.runtime = runtime
    this._children = Object.create(null)
    this._rawModule = rawModule
    const rawState = rawModule.state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  get namespaced() {
    return !!this._rawModule.namespaced
  }

  addChild(key, module) {
    this._children[key] = module
  }

  removeChild(key) {
    delete this._children[key]
  }

  getChild(key) {
    return this._children[key]
  }

  update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
```

来看一下 Module 的构造函数，对于每个模块而言，this._rawModule 表示模块的配置，this._children 表示它的所有子模块，this.state 表示这个模块定义的 state。

回到 register，那么在实例化一个 Module 后，判断当前的 path 的长度如果为 0，则说明它是一个根模块，所以把 newModule 赋值给了 this.root，否则就需要建立父子关系了：
