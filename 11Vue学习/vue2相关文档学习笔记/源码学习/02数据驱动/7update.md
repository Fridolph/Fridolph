Vue 的 _update 是实例的一个私有方法，它被调用的时机有2个，一个是首次渲染，一个是数据更新时。

_update方法的作用是把 VNode 渲染成真实的DOM，它的定义在 src/core/instance/lifecycle.js

```js
Vue.prototype._update = function(vnode: Vnode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const prevActiveInstance = activeInstance
  activeInstance = vm
  vm._vnode = vnode
  // Vue.ptototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  activeInstance = prevActiveInstance
  // udpate __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC , update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
  // update hook is called by the scheduler to ensure that children are
  // updated in a parent's updated hook.
}
```

_update 的核心就是调用 vm.__patch__ 方法，这个方法实际上在不同的平台，比如web和weex上的定义就是不一样的，因此在web平台中它的定义在 src/platforms/web/runtime/index.js 中：

```js
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

可以看到，甚至在web平台上，是否是服务端渲染也会对该方法产生影响。 因为在服务端渲染中，没有真实的浏览器DOM环境，所以不需要把VNode最终转换成DOM，因此是一个空函数，而在浏览器端渲染中，它指向了patch方法，它的定义在 src/platforms/web/runtime/patch.js 中：

```js
import * as nodeOps from 'web/runtime/node-ops'
import {createPatchFunction} from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
```

该方法的定义是调用 createPatchFunction 方法的返回值，这里传入了一个对象，包含 nodeOps 参数和 modules 参数。其中，nodeOpts 封装了一系列DOM操作方法，modules定义了一些模块的钩子函数的实现，先来看一下 createPatchFunction 的实现， 它定义在 src/core/vdom/patch.js 中：

```js
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export function createPatchFunction(backend) {
  let i,j
  const cbs = {}
  const {modules, nodeOps} = backend

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else {
      const isRealElement = isDef(oldVnode, nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered countent
          // and if we can perform a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttributes(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production')  {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              )
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode)
        }
        // replacing existing element
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )
        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) {
            for (let i = 0; i < cbs.destroy.length; i++) {
              cbs.destroy[i](ancestor)
            }
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; i++) {
                cbs.create[i](emptyNode, ancestor)
              }
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            ancestor = ancestor.parent
          }
        }
        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isIntialPatch)
    return vnode.elm
  }
}
```

createPatchFunction 内部定义了一系列辅助方法，最终返回一个patch方法，这个方法就赋值给了 vm._update 函数里调用的 vm.__patch__

在介绍patch方法实现之前，我们可以思考一下为何vue.js源码绕了这么一大圈，把相关代码分散到各个目录。因为前面介绍过，patch是平台相关的，在web和weex环境下，它们把虚拟dom映射到平台DOM的方法是不同的，并且对DOM包括的属性模块创建和更新也不尽相同。因此每个平台都有各自的nodeOps和modules，它们的代码需要托管在 src/platforms 这个大目录下

而不同平台的patch的主要逻辑部分是相同的，所以这部分公共的部分托管在 core这个大目录下。差异化部分只需要通过参数来区别，这里用到了一个函数柯里化的技巧，通过 createPatchFunction 把差异参数提前固化，这样就不用每次调用patch时都传递 nodeOps 和 modules 了。这种编程技巧也值得学习。

在这里，nodeOps 表示对平台DOM的一些操作方法， modules表示平台的一些模块，它们会在整个patch过程的不同阶段执行相应的钩子函数。这些代码的具体实现会在后面的章节介绍。

回到patch方法本身，它接受4个参数：

* oldVnode表示旧的vnode节点，它也可以不存在或是一个DOM对象；
* vnode表示执行 _render 返回后的Vnode节点；
* hydrating表示是否服务端渲染；
* removeOnly 是给transition-group 用的

`patch` 逻辑看上去相对复杂，因为它有着非常多的分支逻辑，为方便理解，这里仅针对我们之前的例子分析它的执行逻辑。

先回顾一下我们的例子

```js
var app = new Vue({
  el: '#app',
  render(createElement) {
    return createElement('div', {
      attrs: {
        id: 'app'
      }
    }, this.message)
  },
  data: {
    message: 'hello vue!'
  }
})
```

然后我们在 vm._update 方法里是这么调用patch方法的：

```js
vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false)
```

结合我们的例子，我们的场景是首次渲染，所以在执行 patch 函数时，传入的 vm.$el 对应的是 例子中的id为 app的DOM对象，这个也就是我们在index.html模版中写的 `<div id="app">` vm.$el 的赋值是在之前 mountComponent 函数做的，vnode对应的是调用render函数的返回值，hydrating 是在非服务端渲染情况下为false, removeOnly为false。确定这些传参后，我们回到patch函数的执行过程， 看几个关键步骤：

```js
const isRealElement = isDef(oldVnode.nodeType)
if (!isRealElement && sameVnode(oldVnode, vnode)) {
  // patch existing root node
  patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
} else {
  if (isRealElement) {
    // mounting to a real element
    // check if this is server-rendered content and if we can perform
    // a successful hydration.
    if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
      oldVnode.removeAttribute(SSR_ATTR)
      hydrating = true
    }
    if (isTrue(hydrating)) {
      if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
        invokeInsertHook(vnode, insertedVnodeQueue, true)
        return oldVnode
      } else if (process.env.NODE_ENV !== 'production') {
        warn(
          'The client-side rendered virtual DOM tree is not matching ' +
          'server-rendered content. This is likely caused by incorrect ' +
          'HTML markup, for example nesting block-level elements inside ' +
          '<p>, or missing <tbody>. Bailing hydration and performing ' +
          'full client-side render.'
        )
      }
    }
    // either not server-rendered, or hydration failed.
    // create an empty node and replace it
    oldVnode = emptyNodeAt(oldVnode)
  }

  // replacing existing element
  const oldElm = oldVnode.elm
  const parentElm = nodeOps.parentNode(oldElm)

  // create new node
  createElm(
    vnode,
    insertedVnodeQueue,
    // extremely rare edge case: do not insert if old element is in a
    // leaving transition. Only happens when combining transition +
    // keep-alive + HOCs. (#4590)
    oldElm._leaveCb ? null : parentElm,
    nodeOps.nextSibling(oldElm)
  )
}
```

由于我们传入的oldVnode 实际上是一个DOM container ，所以 isRealElement 为true，接下来又通过 emptyNodeAt 方法把 oldVnode 转换成 Vnode 对象。然后又调用 createElm 方法，这个方法在这里非常重要，我们来看下它的实现：

```js
function createElm(
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    vnode = ownerArray[index] = cloneVnode(vnode)
  }

  vnode.isRootInsert = !nested
  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }

  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    if (process.env.NODE_ENV !== 'production') {
      if (data && data.pre) {
        creatingElmInVPre++
      }
      if (isUnknownElement(vnode, creatingElmInVPre)) {
        warn(
          'Unknown custom element: <' + tag + '> - did you ' +
          'register the component correctly? For recursive components, ' +
          'make sure to provide the "name" option.',
          vnode.context
        )
      }
    }
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)

    if (__WEEX__) {
      //
    } else {
      createChildren(vnode, children, insertedVnodeQueue)
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue)
      }
      insert(parentElm, vnode.elm, refElm)
    }
    if (process.env.NODE_ENV !== 'production' && data && data.pre) {
      creatingElmInVPre--
    }
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}
```

createElm 的作用是通过虚拟节点创建真实DOM并插入到它的父节点中。我们来看一下关键的逻辑。createComponent方法目的是尝试创建子节点，这个逻辑在之后组件的章节会详细介绍，在当前这个case下它的返回值为false，接下来判断vnode是否包含tag，如果包含，先简单地对tag的合法性在非生产环境做校验，看是否是一个合法的标签；然后再去调用平台的DOM操作去创建一个占位符元素。

```js
vnode.elm = vnode.ns
  ? nodeOps.createElementNS(vnode.ns, tag)
  : nodeOps.createElement(tag, vnode)
```

接下来，调用 createChildren方法去创建子元素：

```js
createChildren(vnode, children, insertedVnodeQueue)

function createChildren(vnode, children, insertedVnodeQueue) {
  if (Array.isArray(children)) {
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(children)
    }
    for (let i = 0; i < children.length; ++i) {
      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
    }
  } else if (isPrimitive(vnode.text)) {
    nodeOps.append
  }
}
```

createChildren 的逻辑很简单，实际上是比那里子虚拟节点，递归调用createElm，这是一种常用的深度优先的遍历算法，这里要注意的一点是在遍历过程中会把vnode.elm 作为父容器的DOM节点占位符传入。

接着再调用 invokeCreateHooks 方法执行所有的 create 的钩子并把 vnode push到 instertedVnodeQueue 中：

```js
if (isDef(data)) {
  invokeCreateHooks(vnode, insertedVnodeQueue)
}

function invokeCreateHooks (vnode, insertedVnodeQueue) {
  for (let i = 0; i < cbs.create.length; ++i) {
    cbs.create[i](emptyNode, vnode)
  }
  i = vnode.data.hook // Reuse variable
  if (isDef(i)) {
    if (isDef(i.create)) i.create(emptyNode, vnode)
    if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
  }
}
```

最后调用 insert 方法把dom插入到父节点中，因为是递归调用，子元素会优先调用insert，所以整个vnode树节点的插入顺序是先子后父。再来看一下 insert 方法，它的定义在 src/core/vdom/patch.js 上：

```js
insert(parentElm, vnode.elm, refElm)

function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}
```

insert 的逻辑简单一些，调用一些 nodeOps 把子节点插入到父节点中，这些辅助方法定义在 src/platforms/web/runtime/node-ops.js 中：

```js
export function insertBefore(parentNode: Node, newNode: Node, refrenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}

export function appendChild(node: Node, child: Node) {
  node.appendChild(child)
}
```

其实就是调用原生DOM的api进行DOM从左，看到这里就明白，原来Vue是这样动态创建DOM的。

在createElm 过程中，如果vnode节点不包含tag，则它有可能是一个注释或者文本节点，可以直接插入到元素中。在我们的例子中，最内层就是一个文本vnode，它的text值取的就是之前的this.message的值 hello vue!

再回到patch方法，首次渲染我们调用了createElm方法，这里传入的 parentElm 是 oldVnode.elm 的父元素，在我们的例子是id为`#app` 的div的父元素，也就是body实际上，整个过程就是递归创建了一个完整的dom树并插入到body上。

最后我们根据之前的 createElm 生成了 vnode 插入顺序队列，执行相关的 insert 钩子函数

## 总结

那么至此我们从主线上把模版和数据如何渲染成最终的DOM的过程解析完毕了。我们可以直接通过下图更直观地看到从初始化Vue到最终渲染的整个过程。

![](https://ustbhuangyi.github.io/vue-analysis/assets/new-vue.png)

我们这里只是分析了最简单和最基础的场景，在实际项目中，我们是把页面拆成很多组件的，Vue 另一个核心思想就是组件化。那么下一章我们就来分析 Vue 的组件化过程。
