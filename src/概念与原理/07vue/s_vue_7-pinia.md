# pinia

## 核心概念

Pinia 的特性：

pinia 也具有 state、getters、actions，但是移除了 modules、mutations ；

pinia 的 actions 里面可以支持同步也可以支持异步；

pinia 采用模块式管理，每个 store 都是独立的，互相不影响；

Pinia 与 Vuex 相比主要功能优点在于：

兼容支持 Vue 2.x 与 3.x 项目；
更友好的 Typescript 语法支持；
比 Vuex 体积更小，构建压缩后只有 1KB 左右的大小；
支持服务端渲染；

## 重点源码解析

### createPinia

```ts
// vuejs:pinia/packages/pinia/src/createPinia.ts
export function createPinia(): Pinia {
  const scope = effectScope(true)
  const state = scope.run<Ref<Record<string, StateTree>>>(() => ref<Record<string, StateTree>>({}))!
  // ··· ···
}
```

在 creatPinia 函数的最开始地方我们能看到，通过 effectScope 声明了一个 ref 的响应式数据，并赋值给了 state 变量，这里的将其简单理解为声明了一个 ref 并赋值给 state；

effectScope：这是一个 Vue 3.x 高阶的响应式的 api，能够对这个 effect 里面的响应式副作用（计算属性、监听器）统一进行操作处理，例如调用 stop 停止监听拦截等

<https://cn.vuejs.org/api/reactivity-advanced#effectscope>

```ts
// vuejs:pinia/packages/pinia/src/createPinia.ts

export function createPinia(): Pinia {
  // ··· ···

  // 定义 pinia 插件相关的变量
  let _p: Pinia['_p'] = []
  let toBeInstalled: PiniaPlugin[] = [] // markRaw：标记该 pinia 不会被响应式转换和监听

  const pinia: Pinia = markRaw({
    install(app: App) {
      // install: vue.use实际执行逻辑
      setActivePinia(pinia) // 设置当前使用数据仓库为根 pinia 对象
      if (!isVue2) {
        // 如果是 vue 2.x，全局注册已经在 PiniaVuePlugin 完成，所以这段逻辑将跳过
        pinia._a = app // 设置 vue 项目的 app 实例
        app.provide(piniaSymbol, pinia) // 通过 provide 来注入 pinia 实例
        app.config.globalProperties.$pinia = pinia // 在 vue 项目当中设置全局属性 $pinia

        toBeInstalled.forEach(plugin => _p.push(plugin)) // 处理安装未执行的 pinia 插件
        toBeInstalled = [] // 清空未安装的插件列表
      }
    },

    use(plugin) {
      // pinia 使用插件时候调用执行，将 pinia 插件都先塞到一个 _p 的数组当中，后续再进行初始化执行
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin)
      } else {
        _p.push(plugin)
      }
      return this
    },

    _p, // pinia 的插件
    _a: null, // Vue 项目的 app 实例，在 install 执行时设置
    _e: scope, // pinia 的 effect 作用域对象，每个store都是单独的scope
    _s: new Map<string, StoreGeneric>(), // 以 Map 的数据结构形式存储 pinia 数据仓库 store，类似 state
    state, // pinia 数据仓库 state 合集
  })
  return pinia
}
```

接着继续分析下面的逻辑能看到方法内通过 markRaw 创建了一个包含 install、use、响应式数据 state 属性的 pinia 对象；并且最终将 pinia 对象作为 createPinia 函数的返回值。

这个 pinia 对象经过 markRaw 的包装会被 Vue 标记为不会转化为响应式；能够节约内存的使用，提高运行效率。

### defineStore

数据仓库的初始化

defineStore 该方法在上面 “基础使用” 的章节当中我们能够看到是用来创建 Pinia 数据仓库模块。接下来这个章节我们便要来对该方法进行原理性的解剖分析。

defineStore 有传入三种的形式的参数的调用方式：（利用 TypeScript 函数重载来实现传递不同参数进行数据仓库的初始化处理）

- id：定义 store 的唯一 id，单独传参或者通过 options.id 进行声明
- options：具体配置信息，是对象可以传 state，getters，action，id 属性例如上面例子中的第一、二种声明方式；如果第二个参数传入的是 Function，则自主声明变量方法，例如例子中的第三种声明方式；
- storeSetup：仅限第三种 store 的声明方式，传入一个函数，函数的返回值作为数据仓库的 state 与 actions

```ts
// vuejs:pinia/packages/pinia/src/store.ts

export function defineStore(idOrOptions: any, setup?: any, setupOptions?: any): StoreDefinition {
  let id: string
  let options:
    | DefineStoreOptions<string, StateTree, _GettersTree<StateTree>, _ActionsTree>
    | DefineSetupStoreOptions<string, StateTree, _GettersTree<StateTree>, _ActionsTree>

  // 判断第二个参数是否是函数
  const isSetupStore = typeof setup === 'function'

  // 兼容处理三种不同参数重载的情况，从三种形式参数当中抽取出 id 与 options 参数；
  //   id 后续会作为当前该 store 的模块标识 id
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }

  // 声明 useStore 函数并且作为 defineStore 函数的返回值
  function useStore(pinia?: Pinia | null, hot?: StoreGeneric): StoreGeneric {
    // ··· ···
  }

  useStore.$id = id

  return useStore
}
```

通过对 defineStore 的源码大致逻辑流程分析可以得知，defineStore 里面含有一个 useStore 方法，并且 defineStore 函数的返回值为该 useStore 函数。因此 useStore 才是 Pinia store 数据仓库的核心创建逻辑，接下我们重点分析其函数逻辑。

### useStore

```ts
// vuejs:pinia/packages/pinia/src/store.ts

export function defineStore(idOrOptions: any, setup?: any, setupOptions?: any): StoreDefinition {
  // ··· ···

  function useStore(pinia?: Pinia | null, hot?: StoreGeneric): StoreGeneric {
    // 通过 getCurrentInstance 获取当前 Vue 的组件实例
    const currentInstance = getCurrentInstance()

    pinia =
      (__TEST__ && activePinia && activePinia._testing ? null : pinia) ||
      (currentInstance && inject(piniaSymbol, null))

    // 设置当前 Pinia 活跃的 state 实例
    if (pinia) setActivePinia(pinia)

    // 开发模式下并且当前没有 pinia 仓库数据 state 实例情况下抛出异常
    if (__DEV__ && !activePinia) {
      throw new Error(
        `[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n` +
          `\tconst pinia = createPinia()\n` +
          `\tapp.use(pinia)\n` +
          `This will fail in production.`
      )
    }

    // 设置当前 pinia 变量值为当前活跃的 pinia state 实例
    pinia = activePinia!

    // 单例模式的应用：如果 pinia 中已经有对应 id 模块的 store 实例则直接获取该 store 实例返回，否则执行创建 store 逻辑
    if (!pinia._s.has(id)) {
      // 根据 defineStore 时候传入第二个参数类型区分调用创建 pinia store 数据仓库方法
      // 若第二个参数传递的是函数则执行 createSetupStore，否则执行 createOptionsStore
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia)
      } else {
        createOptionsStore(id, options as any, pinia)
      }
    }

    const store: StoreGeneric = pinia._s.get(id)!

    // StoreGeneric cannot be casted towards Store
    return store as any
  }

  useStore.$id = id

  return useStore
}
```

useStore 的逻辑不难，就是获取当前 id 的 pinia store 实例，这里使用单例模式进行优化：

如果 pinia 中已经有对应 id 模块的 store 实例则直接获取该 store 实例返回；

前面在 createStore 方法章节当中解析了当前 pinia 对象的 \_s 属性是 Map 的数据结构对 Pinia 所有模块 store 的存储，因此此处使用 Map 的 get(key)方法获取当前 id 对应的模块 store 实例；

否则根据前面 defineStore 调用时候传递的参数进行区分调用 createOptionsStore 与 createSetupStore 两个方法。

## 流程总结

- 通过 createPinia 创建 pinia 示例，并且在 app.use 时执行 pinia 内部的 install 方法
  - 其中 install 方法当中会使用 Vue.js 的 provide 将当前 pinia 示例注入到每一个 Vue 组件实例中
- 当业务中使用 useXxx 时其实就是调用 defineStore 方法。该方法会有在真正调用时才会初始化创建对应模块的数据仓库，其内部处理逻辑如下：
  - 创建一个 store 对象，将 options 的各个属性 state、getters 利用 Vue.js 响应式 Composizion API 进行处理和转换
  - 使之成为响应式数据后，挂载在这个 store 对象上
  - 通过 Object.assign 方法对这个 store 对象进行 API 扩展（如 reset、$patch 等）
  - 将 pinia 的插件在这个模块化的 store 上初始化加载
  - 返回这个 store 对象作为 defineStore 方法的返回值
- 至此 pinia 这个全局状态管理工具的引入和模块化数据仓库 store 的初始化流程就完成了

## 参考

[Pinia 原理解读 - 初始化流程与数据仓库的实现](https://juejin.cn/post/7210175991837736997)
