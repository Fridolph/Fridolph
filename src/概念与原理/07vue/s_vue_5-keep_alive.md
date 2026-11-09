# keep-alive

最近参加面试，学习自测到了关于 `keep-alive` 的问题。当时我大概回答了一下生命周期和使用方法，但是面试官显然不太满意，后来我们又讨论了一些其他的场景，感觉很受益，趁着热乎了，就记录下来，顺便搜了下相关文章，把这些内容整理一下，温故而知新。

> 参考大多是 vue2 的文章，vue3 的 keep-alive 的 API 和用法差不多，多了个 scrollBehavior，先占坑，后续有其他补充再完善。

## 什么是 keep-alive

`<keep-alive>` 是 Vue 的内置组件，可以使被包裹的组件`保留状态`，或者`避免重新渲染`，从而`实现组件缓存`。它可以保留组件的状态在内存中，**避免重复渲染 DOM**。

::: tip

当我们使用 `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。这和使用 `<transition>` 有些类似，`<keep-alive>` 是一个内置的抽象组件：它自身`不会渲染 DOM 元素`，也**不会出现在父组件**中。

:::

## keep-alive 的生命周期执行

关于 keep-alive 的生命周期执行，页面第一次进入时，钩子的触发顺序是：

- created
- mounted
- activated

当页面退出时，会触发 deactivated 钩子。而当再次进入（前进或者后退）时，只会触发 activated 钩子。

关于 keep-alive 的一些最佳实践：

- 将只执行一次的事件挂载方法都放到 `mounted` 中
- 将组件每次进入时需要执行的方法放在 `activated` 中

## 基本用法

```html
<!--被 keep-alive 包裹的组件会被缓存-->
<keep-alive>
  <component />
</keep-alive>
```

被 `keep-alive` 包裹的组件不会重新初始化，这意味着它们**不会重新触发生命周期函数**。

但有时我们希望缓存的组件能够再次进行渲染，Vue 为我们解决了这个问题。被包裹在 keep-alive 中创建的组件，会多出两个生命周期的钩子: `activated` 与 `deactivated`

- `activated` 当 keep-alive 包裹的组件`再次渲染`时触发
- `deactivated` 当 keep-alive 包裹的组件被`销毁`时触发

### 参数

keep-alive 可以接收 3 个属性做为参数，用于匹配相应的组件进行缓存：

- `exclude` **要排除的组件**（以为字符串，数组，以及正则表达式，任何匹配的组件都不会被缓存）

- `include` **要缓存的组件**（可以是字符串、数组或正则表达式，任何匹配的组件都不会被缓存）

- `max` **缓存组件的最大值**（类型为字符或数字，可以控制缓存组件的个数）

::: tip

- 当使用正则表达式或数组时，务必使用 v-bind
- exclude、include 同时存在时，exclude 优先级更高

:::

```html
<!-- 将（只）缓存组件name为a或者b的组件, 结合动态组件使用 -->
<keep-alive include="a,b">
  <component></component>
</keep-alive>

<!-- 组件name为c的组件不缓存(可以保留它的状态或避免重新渲染) -->
<keep-alive exclude="c">
  <component></component>
</keep-alive>

<!-- 使用正则表达式，需使用v-bind -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 动态判断 -->
<keep-alive :include="includedComponents">
  <router-view></router-view>
</keep-alive>

<!-- 如果同时使用include,exclude,那么exclude优先于include， 下面的例子只缓存a组件 -->
<keep-alive
  include="a,b"
  exclude="b">
  <component></component>
</keep-alive>

<!-- 如果缓存的组件超过了max设定的值5，那么将删除第一个缓存的组件 -->
<keep-alive
  exclude="c"
  max="5">
  <component></component>
</keep-alive>
```

## keep-alive 组件的渲染

使用 keep-alive 时，并不会生成真正的 DOM 节点，（当时问了这个细节，答出来了，但后续就没扯对 … 于是就有了这篇）

那是如何实现的呢：

```js
// src/core/instance/lifecycle.js
export function initLifecycle(vm: Component) {
  const options = vm.$options
  // 找到第一个非abstract的父组件实例
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  // ...
}
```

大致可以回答上面的问题了：

- 前提：在 Vue 初始化生命周期时，建立组件实例的父子关系会根据 `abstract` 属性来决定是否忽略某个组件。

- 在 keep-alive 中，设置了 `abstract: true`，这意味着 Vue 会在构建的组件树中`跳过`该 keep-alive `组件实例`。

- 因此，最终`渲染成的 DOM 树`中自然也`不会包含 keep-alive 相关的节点`；

- 构建的组件树中就不会包裹 keep-alive 组件；
- 那么由组件树渲染成的 DOM 树自然也不会有 keep-alive 相关的节点了。

### 被包裹组件如何使用缓存

在 `patch 阶段`，会执行 `createComponent` 函数：

```js
// src/core/vdom/patch.js
function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef((i = i.hook)) && isDef((i = i.init))) {
      i(vnode, false /* hydrating */)
    }

    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      // 将缓存的DOM（vnode.elm）插入父元素中
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}
```

在首次加载被包裹组件时，根据 keep-alive.js 中的 render 函数可知，`vnode.componentInstance` 的值是 `undefined`，而 keepAlive 的值是 true。由于 keep-alive 组件作为父组件，它的 render 函数会先于被包裹组件执行，这样只会执行到 i(vnode, false `/* hydrating */`)，后面的逻辑就不再执行。

当`再次访问`被包裹组件时，vnode.componentInstance 的值就是被缓存的组件实例，于是会执行 insert(parentElm, vnode.elm, refElm) 逻辑，这样就直接把上一次的 DOM 插入到了父元素中。

## keep-alive 与对应的钩子函数

一般情况下，组件每次加载都会完整执行整个生命周期，即生命周期中对应的钩子函数都会被触发。那么为什么被 keep-alive 包裹的组件不会呢？这是因为被缓存的组件实例会被设置为 `keepAlive = true`。在`组件初始化阶段`：

```js
// src/core/vdom/create-component.js
const componentVNodeHooks = {
  init(vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive 组件, 作为一次 patch
      const mountedNode: any = vnode
      // 解决流程上的问题
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = (vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      ))
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
  // ...
}
```

可以看到，当 `vnode.componentInstance` 和 `keepAlive` 同时为 `true` 时，**将不再执行 $mount 过程**，因此在 mounted 钩子`之前`的所有钩子函数（beforeCreate、created、mounted）都`不会执行`。

### 可重复的 activated

在 patch 阶段的最后，会执行 invokeInsertHook 函数，这个函数会调用组件实例（VNode）自身的 insert 钩子：

```js
// src/core/vdom/patch.js
function invokeInsertHook(vnode, queue, initial) {
  if (isTrue(initial) && isDef(vnode.parent)) {
    vnode.parent.data.pendingInsert = queue
  } else {
    for (let i = 0; i < queue.length; ++i) {
      // 调用 VNode 自身的 insert 钩子函数
      queue[i].data.hook.insert(queue[i])
    }
  }
}
```

再看 `insert` 钩子：

```js
// src/core/vdom/create-component.js
const componentVNodeHooks = {
  // init()
  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  // ...
}
```

在 insert 钩子中，调用了 `activateChildComponent` 函数来递归地执行所有子组件的 `activated` 钩子函数：

```js
// src/core/instance/lifecycle.js
export function activateChildComponent(vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = false
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false
    for (let i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i])
    }
    callHook(vm, 'activated')
  }
}
```

相反地，deactivated 钩子函数也是类似的原理，在组件实例（VNode）的 `destroy` 钩子函数中调用 `deactivateChildComponent` 函数。

## 结合 vue-router 使用

例：所有路径下的视图组件都会被缓存

```vue
<keep-alive>
  <router-view></router-view>
</keep-alive>
```

## 在 router-view 中缓存特定组件

### 使用 include 属性（exclude 的使用方式类似）

::: tip

1. 要先设置组件的 name 属性
2. 使用时要知道组件的 name 值
3. 所以，在项目较为复杂时可能不是最佳选择

:::

```html
<keep-alive include="a">
  <router-view>
    <!-- 只有路径匹配到的 include 为 a 组件会被缓存 -->
  </router-view>
</keep-alive>
```

### 使用 v-if 做区分，使用 meta 属性

```html
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"> </router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"> </router-view>
```

配合动画更搭：

```html
<transition
  enter-active-class="animated zoomInLeft"
  leave-active-class="animated zoomOutRight">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"> </router-view>
  </keep-alive>
</transition>
<transition
  enter-active-class="animated zoomInLeft"
  leave-active-class="animated zoomOutRight">
  <router-view v-if="!$route.meta.keepAlive"> </router-view>
</transition>
```

这样做的话更加简单明了：

- 不需要例举出需要被缓存组件名称
- 但是要在 route 的 meta 里面添加 {keepAlive:true} 字段
- 延伸，权限控制路由等相关的内容可以使用 meta 属性来实现

### 使用 meta 属性

```html
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

需要在 router 中设置 router 的元信息 meta：

```js
//...router.js
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        keepAlive: false, // 不需要缓存
      },
    },
    {
      path: '/page1',
      name: 'Page1',
      component: Page1,
      meta: {
        keepAlive: true, // 需要被缓存
      },
    },
  ],
})
```

但是，当路由是由后台控制时，就会存在一些隐患：

- 1. `位置公用的问题`

  当前列表页跳转到详情页面的时候，使用路由回到列表也时候，会出现位置公用的情况（如果使用浏览器的回退方式，不会出现位置公用的情况）

- 2. 假如有 A、B、C 三个页面

  我现在只想要 A->B 时，A 缓存；然后 B->A 时，展示缓存的页面，C->A、A->B->C->A 等都不要缓存

### 用 scrollBehavior 解决位置公用

在页面跳转前将滚动高度缓存起来，并在每次返回时将滚动高度重新赋值。

如果需要在多个页面中使用缓存，路由提供了一个解决方案：`scrollBehavior` 方法。

```js
const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 此方法默认是检测 document.body 的，如果你是自定义的滚动盒子 是没办法控制你的滚动高度，都是 0
    console.log(savedPosition);
    // 如果返回一个 falsy(不是false) ，或者是一个空对象，那么不会发生滚动,说白了就是这个方法没用，并不会在页面顶部
    // falsy文档 https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        // 这里并不准确，可能我页面滚动的盒子不是body,vue应该有设置的地方
        from.meta.scrollTop = document.documentElement.scrollTop;
      }
      return {x: 0, y: to.meta.scrollTop || 0}
    }
  },
});

export default router

scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(savedPosition)
      }, 20)
    })
  } else {
    if (from.meta.keepAlive) {
      from.meta.scrollTop = document.documentElement.scrollTop;
    }
    return {x: 0, y: to.meta.scrollTop || 0}
  }
}
```

Vue Router 中的 scrollBehavior 方法，它支持`异步滚动支持`的功能。这个功能允许你在**切换路由时保存滚动位置**，并在返回时恢复滚动位置。

在代码中，scrollBehavior 方法会接收 to 和 from 路由对象以及 savedPosition 作为参数。如果 savedPosition 存在，则会将其返回，否则会通过获取 to 和 from 路由对象的元信息中的滚动高度来决定滚动位置。

另外，在新版本中，支持通过`返回一个 Promise` 来`异步滚动`，这对于页面中存在异步请求的情况非常有用，可以确保在异步请求完成后仍能正确`恢复滚动位置`。

此外，对于自定义滚动容器，可以在 `scrollBehavior` 方法中根据实际情况自行处理滚动高度的记录和恢复。

### 通过 keepAlive: true 和 beforeRouteLeave 钩子实现定制

> 写到这里发现其实面试官应该就是想问这个 - - 遂一同记录下来

假设这里有 3 个路由： A、B、C。

需求：

- 默认显示 A
- B 跳到 A，A 不刷新
- C 跳到 A，A 刷新

实现思路：

1. 在 A 路由里面设置 meta 属性

```js
// router.js
{
  path: '/',
  name: 'A',
  component: A,
  meta: {
    keepAlive: true // 需要被缓存
  }
}
```

2. 在 B 组件里面设置 `beforeRouteLeave`

```js
// B 组件
export default {
  data() {
    return {}
  },
  methods: {},
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    // 让 A 缓存，即不刷新
    to.meta.keepAlive = true
    next()
  },
}
```

3. 在 C 组件里面设置 `beforeRouteLeave`

```js
// C 组件
export default {
  data() {
    return {}
  },
  methods: {},
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    // 让 A 不缓存，即刷新
    to.meta.keepAlive = false
    next()
  },
}
```

这样便能实现 B 回到 A，A 不刷新；而 C 回到 A 则刷新。

## 实现返回不刷新、其他菜单进入刷新

原文的方式一就是上述 meta 设置 keepAlive 实现。但是当 A->C->A->B->A 发现列表页 A 不会再缓存了，每次都是新的页面，作者通过在 `router.afterEach((to,from)=>{})` 钩子中写了进一步的判断实现了相关逻辑，就不再赘述了。

关于方式二和三，可以参考文章 [这大概是最全乎的 keep-alive 踩坑指南](https://juejin.cn/post/6844904178926485511)

值得学习，这里就搬过来了。

### 方式二

1. 使用 v-if 配合 $route.meta.keepAlive
2. 使用 beforeRouteLeave 钩子，判断是否要进行局部刷新
3. actived 钩子里进行对应的局部刷新逻辑：数据获取，位置设置等

这里一定要使用 v-if，好处是你可以使用 $nextTick 体验更好，另一方面是在使用 v-show 之后，他就相当于隐藏了该页面，但是如果里面有一些不会 diff 的 dom,就会展示出来，模拟刷新的体验就不太好。例如使用 input：

```html
<template>
  <div v-if="isRouterAlive">
    <div>{{ddd}}</div>
    <input
      v-model="ddd"
      type="text" />
    <table-list
      ref="table"
      :multiple="true"
      :otherTableParams="otherTableParams"
      :tableColumn="column" />
  </div>
</template>
<script>
  export default {
    activated() {
      if (this.$route.meta.isRefresh) {
        // 如果不是跳转到详情页
        // 这里是模拟局部刷新的功能，建议直接在顶层添加局部刷新，可以避免重置data
        const resetData = this.$options.data() // 获取原来data的数据
        delete resetData.column // 我在这里操作的原因是因为，我通过上面获取的数据里面，用到函数返回的形式，展示为undefined  {cb: this.jumpEdit} 展示为 {cb: this.undefined},具体原因未知

        Object.assign(this.$data, resetData) // 重置data
        this.isRouterAlive = false // 通过v-if不展示当前页面
        this.$nextTick(function () {
          window.scroll(0, 0) // 页面置顶，不要再下面的定时器里面使用，有顿挫感
          this.isRouterAlive = true // 通过v-if展示当前页面
        })
        setTimeout(() => {
          this.queryList() // 异步获取数据，跟我的项目组件有关，你们可以直接在上面获取就OK
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      // 判断如果不是进详情页，展示为true 是页面重新加载的意思
      from.meta.isRefresh = to.name !== 'table-detail'
      next() // 不添加路由不会跳转
    },
  }
</script>
```

现在的代码有两个问题：

1. 从详情页到列表页，数据不会更新，如果在详情页修改了某个数据，然后再到列表页就会滞后；
2. 从详情页跳转到别的列表页然后在跳转到缓存的列表页，然后他还是会缓存之前的数据，不会更新当前页面

继续优化如下：

```js
activated() {
 if (this.$route.meta.isRefresh) {
    const data = this.$options.data()
    delete data.column

    Object.assign(this.$data, data)
    this.isRouterAlive = false
    this.$nextTick(function () {
      window.scroll(0, 0)
      this.isRouterAlive = true
    })
    setTimeout(() => {
      this.queryList()
    })
  } else if (this.$route.meta.isRefresh === false) {
    // this.$route.meta.isRefresh 在路由里面我并没有设置，默认是undefined，当他为false的时候，说明他从别的页面进来了，这个时候让他请求下数据
    this.queryList()
  }
}

beforeRouteEnter(to, from, next) {
 // 这个路由守卫函数式最先执行的
 to.meta.isRefresh = from.name && from.name !== 'table-detail';
  next()
},
// 下面代码注释即可
// beforeRouteLeave(to, from, next) {
//   from.meta.isRefresh = to.name !== 'table-detail';
//   next()
// }
```

### 方式三

用 keep-alive 提供的 `include` 和 `exclude` ,然后配合 `vuex` 实现`动态控制`。

**路由入口页面**

```html
<keep-alive
  :include="includes"
  :exclude=""
  :max="3">
  <router-view></router-view>
</keep-alive>

<script>
  // 获取vuex的数据
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      // 在computed中动态监控
      ...mapGetters(['includes']),
    },
    methods: {
      changeStore() {
        // 改变vue的数据，在这用不到
        this.$store.commit('change', 'tableLists')
      },
    },
  }
</script>
```

**Vuex**

```js
const keepalive = {
  state: {
    includes: ['tableLists'],
  },
  mutations: {
    change(state, payload) {
      state.includes = payload
    },
  },
  getters: {
    includes(state) {
      return state.includes
    },
  },
}

export default keepalive
```

Views 部分伪代码

```js
activated() {
  this.queryList()
},
beforeRouteEnter(to, from, next) {
  // 这个时候还有没this,所以这里用this的话是不能操作vuex,我是在main.js里面赋值给了window
  window._store.commit('change', ['tableLists']);
  next()
  // 也可以这么用
  // next((el) => {
  //  el.$store.commit('change', ['tableLists']);
  // })
},
beforeRouteLeave(to, from, next) {
  if (to.name !== 'table-detail') {
    // 如果不是跳转到详情页面，就穿个空数组，这里不能用 '' 默认是所有的都缓存
    this.$store.commit('change', []);
  }
  next()
}
```

**路由页面**

因为 includes 没有在路由里面定义 keepAlive，所以上面的 scrollBehavior 这个方法当使用合成事件跳转的时候，需要做额外的处理

```js
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(savedPosition)
      }, 20)
    })
  } else {
    // 这里是需要缓存的页面的route的name，不是vue类的name
    const ary = ['Invest', 'Store'];

    if (ary.includes(from.name)) {
      /* 最近一次回顾的时候 发现了一个问题
       * 如果是列表页跳转到详情页，这个时候时候其实已经到了详情页面，
       * 如果当当前详情页的页面的高度没有列表页面跳转进来时滚动的高度高的时候
       * 这个时候就会获取不真正的页面高度，然后合成事件回退的时候就会滚动不到跳转前的位置
       * 解决的办法就是在每个页面离开前，获取到页面的高度，存到的meta上
       * 这样既能解决这个问题，也能结局把不是body滚动的情况获取不到滚动高度的问题。
       */
      from.meta.scrollTop = document.documentElement.scrollTop;
    }
    return {x: 0, y: to.meta.scrollTop || 0}
  }
}
```

上面的代码比较琐碎，需要添加到每一个页面，所以在实际项目中大家可添加一个 keepalive 的 mixins ,方便大家管理。

## 总结

1. 为了方便使用 keep-alive 的 include 和 exclude 属性，建议在项目中为组件都设置 `name` 属性。

2. 当使用 keep-alive 组件时，会首先匹配被包裹组件的 name 字段，如果 name 不可用，则匹配当前组件 components 配置中的注册名称。
3. keep-alive 包裹组件时并不会生成真正的 DOM 节点；

4. 由于函数式组件没有缓存实例，因此 keep-alive 在函数式组件中不会正常工作。

5. 当 include 和 exclude 中同时存在匹配条件时，以 `exclude` 的`优先级最高`（基于当前 vue 2.4.2 版本）。例如，如果被包裹的组件同时匹配了 exclude 条件，则该组件将不会被缓存。

6. 如果一个组件被包裹在 keep-alive 中，但符合了 exclude 条件，则 activated 和 deactivated 钩子不会被调用。
7. 注意，如果将 `include` 设置为`空字符串` ' '，则会导致每个页面`都被缓存`，需要`谨慎使用`。

## 参考

- [说说你对 Vue 的 keep-alive 的理解](https://juejin.cn/post/7204854015464161336)——bb_xiaxia1998
- [彻底揭秘 keep-alive 原理](https://juejin.cn/post/6844903837770203144)——Lostvita
- [这大概是最全乎的 keep-alive 踩坑指南](https://juejin.cn/post/6844904178926485511)——A1J30
- [vue-router scroll-behavior](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)——vue-router 官方文档