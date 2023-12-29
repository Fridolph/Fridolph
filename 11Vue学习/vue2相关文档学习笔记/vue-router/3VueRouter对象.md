VueRouter的实现是一个类，我们先对它做一个简单分析，它的定义在 src/index.js

```ts
export default class VueRouter {
  static install: () => void
  static version: string

  app: any
  apps: Array<any>
  ready: boolean
  readyCbs: Array<Function>
  options: RotuerOptions
  mode: string
  histroy: HashHistory | HTML5History | abstractHistory
  matcher: Matcher
  fallback: boolean
  beforeHooks: Array<?NavigationGuard>
  resolveHooks: Array<?NavigationGuard>
  afterHooks: Array<?AfterNavigationHook>

  constructor(options: RouterOptions = {}) {
    this.app = null
    this.apps = []
    this.options = options
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this)
    let mode = options.mode || 'hash'
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) mode = 'hash'
    if (!inBrowser) mode = 'abstract'
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }

  match(
    raw: RawLocation,
    current?: Route,
    RedirectedFrom?: Location
  ): Route {
    return this.matcher.match(raw, current, redirectedFrom)
  }

  get currentRoute(): ?Route {
    return this.history && this.history.current
  }

  init(app: any) {
    process.env.NODE_ENV !== 'production' && assert(
      install.installed,
      `not installed. Make sure to call \`Vue.use(VueRouter)\` ` +
      `before creating root instance.`
    )

    this.apps.push(app)

    if (this.app) return

    this.app = app

    const history = this.history

    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(route => {
      this.apps.forEach(app => {
        app._route = route
      })
    })
  }

  beforeEach(fn: Function): Function {
    return registerHook(this.beforeHooks, fn)
  }

  beforeResolve(fn: Function): Function {
    return registerHook(this.resolveHooks, fn)
  }

  afterEach(fn: Function): Function {
    return registerHook(this.afterHooks, fn)
  }

  onReady(cb: Function, errorCb?: Function) {
    this.history.onReady(cb, errorCb)
  }

  onError(errorCb: Function) {
    this.history..onError(errorCb)
  }

  push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.history.push(location, onComplete, onAbort)
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.history.replace(location, onComplete, onAbort)
  }

  go (n: number) {
    this.history.go(n)
  }

  back () {
    this.go(-1)
  }

  forward () {
    this.go(1)
  }

  getMatchedComponents(to?: RawLocation | Route): Array<any> {
    const route: any = to
      ? to.matched
        ? to
        : this.resolve(to).route
      : this.currentRoute
    if (!route) {
      return []
    }
    return [].concat.apply([], route.matched.map(m => {
      return Object.keys(m.components).map(key => {
        return m.components[key]
      })
    }))
  }

  resolve (
    to: RawLocation,
    current?: Route,
    append?: boolean
  ): {
    location: Location,
    route: Route,
    href: string,
    normalizedTo: Location,
    resolved: Route
  } {
    const location = normalizeLocation(
      to,
      current || this.history.current,
      append,
      this
    )
    const route = this.match(location, current)
    const fullPath = route.redirectedFrom || route.fullPath
    const base = this.history.base
    const href = createHref(base, fullPath, this.mode)
    return {
      location,
      route,
      href,
      normalizedTo: location,
      resolved: route
    }
  }

  addRoutes (routes: Array<RouteConfig>) {
    this.matcher.addRoutes(routes)
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }
}
```

VueRouter 定义了一些属性和方法，我们先从它的构造函数看，当我们执行 new VueRouter 的时候做了哪些事情。

构造函数定义了一些属性，

this.app 根Vue实例，
this.apps 保存所有子组件的Vue实例，
this.options 保存传入的路由配置

this.beforeHooks 创建前的钩子
this.resolveHooks 使用后的钩子
this.afterHooks 路由匹配后的钩子

this.matcher 路由匹配器
this.fallback 路由创建失败的回调函数
this.mode 路由创建模式
this.history 路由历史具体实现实例，它是根据this.mode的不同而不同，有History基类，不同history实现都是继承History

实例化 VueRouter 后会返回它的实例router，我们在`new Vue`时会把router作为配置的属性传入。`beforeCreated`混入时有这么一段代码

```js
beforeCreated() {
  if (isDef(this.$options.router)) {
    // ...
    this._router = this.$options.router
    this._router.init(this)
    // ...
  }
}
```

所以每个组件在执行beforeCreated钩子时，都会执行 `router.init`方法

init逻辑：传入Vue实例，然后存储到this.apps中，只有根Vue实例会保存到this.app中，并且会拿到当前的this.history，根据它的不同类型来执行不同逻辑，由于我们平时使用hash路由多一些，所以先看到这部分逻辑。先定义了setupHashListener函数，接着执行history.transitionTo方法，它定义在History基类中，代码在 src/history/base.js

```js
transitionTo(location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const route = this.router.match(location, this.current)
  // ...
}
```

实际上是调用了 this.matcher.match 方法去做匹配，所以接下来我们了解一下matcher的相关实现。

## 小结

我们大致对VueRouter类有了大致了解，知道了其属性和方法，在初始化阶段执行到beforeCreated钩子函数会先执行router.init方法，然后执行history.transitionTo方法做路由过渡，进而引出matcher概念~
