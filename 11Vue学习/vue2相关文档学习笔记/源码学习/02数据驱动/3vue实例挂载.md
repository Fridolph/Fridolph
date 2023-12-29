Vue中通过$mount实例方法挂载vm

$mount方法的实现和平台、构建方式相关。这里分析带compiler版本的$mount实现

src/platform/web/entry-runtime-with-compiler.js

```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function(
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`)
    return this
  }

  const options = this.$options
  // 解析模板 / el并转换为渲染功能
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(`Template element not found or is empty: ${options.template}`, this)
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }
      const {render, staticRenderFns} = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlineForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```

缓存原型上的$mount方法，再重定义该方法（call改变this指向为Vue.prototype）

第一个if块是对el做限制，Vue不能挂载在body、html这类根节点上。

若没有定义render方法，则把el或者template字符串转换成render方法。所有Vue组件的渲染最终都需要render方法， 无论是单文件还是.vue方式上写的el或是template，最终都会转换成render方法， 这是一个在线编译过程（这是调用compileToFunctions）方法实现的。最后，再调用原先原型上的$mount方法挂载。

---

那之前原型的$mount方法在 src/platform/web/runtime/index.js 中定义的，这么拆分设计的理由是为了复用，因为它可以被runtime only版本的Vue直接使用。

```js
// public mount method
Vue.prototype.$mount = function(
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

$mount方法支持传入2参数，第1个是el，表挂载元素（字符串或DOM），字符串在浏览器下调用query方法转换成dom；第2个参数是和服务端渲染相关，在浏览器环境下我们不需要传第二个参数

$mount方法实际上会调用mountComponent方法，这个方法定义在 src/core/instance/lifecycle.js 中：

```js
export function mountComponent(
  vm: Component,
  el?: Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyNode
    if (process.env.NODE_ENV !== 'production') {
      if ((vm.$options.template && vm.$options.template.chatAt(0) !== '#') || vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // 我们在观察者的构造函数中将其设置为 vm._watcher，
  // 因为观察者的初始补丁可能会调用 $forceUpdate（例如，在子组件的挂载挂钩内），这依赖于已定义的vm._watcher
  new Watcher(vm, updateComponent, noop, {
    before() {
      if (vm._isMounted) {
        callHook(vm, `beforeUpdate`)
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false
  // 手动挂载实例，调用挂载在自己身上
  // 在插入的钩子中调用了渲染创建的子组件
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

从上， `mountComponent` 核心就是先调用 vm._render方法先生成虚拟Node, 再实例化一个渲染Watcher, 在它的回调中调用 updateComponent 方法，最终调用vm._update更新dom

Watcher的作用有二：

1. 初始化时执行回调
2. 当vm实例的检测数据变化时执行回调

函数判断根节点时设置 `vm._isMounted = true` 表示实例已挂载，同时执行mounted钩子。这里 vm.$vnode 表示Vue实例的父虚拟Node，所以它为null表示当前是根Vue实例

---

## 总结

mountComponent方法的逻辑很清晰，它会完成整个渲染工作 核心就是 vm._render 和 vm._update
