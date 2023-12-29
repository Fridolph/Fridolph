## 安装

`import Vuex from 'vuex'` 实际上引用一个对象

```js
// vuex/src/index.js
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  craeteNamespacedHelpers
}
```

和vue-router等其他插件一样，vuex也存在着一个静态install方法

```js
// vuex/src/store.js
export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.')
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

install 的逻辑：把传入的`_Vue`赋值给Vue并执行了`applyMixin(Vue)`方法

```js
// vuex/src/mixin.js
export default function(Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // ... 1.x的兼容省略了
  }

  function vuexInit() {
    const options = this.$options
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

`applyMixin`就是这个 export default function，它在全局混入一个beforeCreated钩子，把`options.store`保存在所有组件的 this.$store 中，这个options.store就是我们在实例化Store对象的实例，这也是为什么我们在组件中可以通过 this.$store 访问到这个实例

## Store实例化

我们在 `import Vuex` 后，会实例化其中的Store对象，返回store实例并传入`new Vue`的options中，也就是上面提到的options.store

Store对象的构造函数接受一个对象参数，包含actions, getters, state, mutations, mudules等vuex的核心概念

```js
// vuex/src/store.js
export class Store {
  constructor(options = {}) {
    // Vue和NODE_ENV判断 部分省略...
    const {
      plugins = [],
      strict = false
    } = options
    // store internal state
    this._committing = false
    this._actions = Object.create(null)
    this._actionSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()
    // bind commit and dispatch to self
    const store = this
    const {dispatch, commit} = this

    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options)
    }
    // strict mode
    this.strict = strict

    const state = this._modules.root.state

    // init root modules
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVm(this, state)

    // apply plugins
    plugins.forEach(plugin => plugin(this))

    if (Vue.config.devtools) {
      devtoolPlugin(this)
    }
  }
}
```

我们可以把Store的实例化过程拆分成三个部分：

1. 初始化模块
2. 安装模块
3. 初始化 store._vm
