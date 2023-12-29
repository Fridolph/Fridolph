vue-router相关配置和注意点

```js
new Router({
  routes,
  mode: 'history',
  base: '/base/',  // 通过vue-router跳转的路径默认带上该配置
  linkActiveClass: 'active-link', // 匹配上的link 会带上 class，子路由也包括
  linkExactActiveClass: 'exact-active-link', // 完全匹配的link 带上class，完全匹配，唯一
  scrollBehavior(to, from, savedPosition) {
    // 路由跳转时的位置策略 假设从 /login -> /app
    // to 就是 /app
    // from 就是 /login
    // savedPosition 会记录 当前页面点击的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  parseQuery(query) {
    // 接受字符串， 转为obj
  },
  stringifyQuery(obj) {
    // 接受obj 转为字符串
  },
  fallback: true, // 浏览器不支持history路由，自动转为hash路由
})
```


多个 <router-view></router-view>

写 router时

components: {
  default: CompA,
  other: Other
}

使用于三栏布局，中间固定，切换路由，改左右等等 ~


### 路由钩子

钩子一定要传和执行 next() 类比 express的next()中间件机制

```js
beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
})

beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

beforeEnter((to, from, next) => {
  console.log('app route before enter')
  next()
})

afterEach((to, from) => {
  console.log('after each invoked')
})

beforeRouteLeave(to, from, next) {
  // 表单，用户点错离开，可以弹框。
}
```

### 异步路由

```js
// import TodoList from '../views/todo/todo'
// import Login from '../views/login'

export default [
  {
    path: '/',
    redirect: '/todolist'
  },
  {
    path: '/todolist',
    name: 'app',
    component: () => import('../views/todo/todo'),
    meta: {
      title: 'Todo List App',
      description: '一个小而全的 Vue todo 应用'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]
```

直接这样写会报错，可以 npm i babel-plugin-syntax-dynamic-import -D

配置 .babelrc

```json
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-vue-jsx",
    "syntax-dynamic-import"
  ]
}
```
