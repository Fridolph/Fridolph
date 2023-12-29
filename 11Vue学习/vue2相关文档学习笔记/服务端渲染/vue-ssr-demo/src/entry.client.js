import createApp from './main'

// 客户端特定引导逻辑
const { app, router, store } = createApp()

// 这里假定app.vue 模版中根元素具有 id="app"
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData
  // 在初始路由 resolve 后执行，以便我们不会二次预取已有数据
  // 使用 router.beforeResolve() 以便确保所有异步组件都 resolve
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((v, i) => {
      return diffed || (diffed = (prevMatched[i] !== v))
    })
    if (!activated.length) {
      return next()
    }
    // 这里如果有 loading 就触发
    Promise.all(activated.map(v => {
      if (v.asyncData) {
        return v.asyncData({store, route: to})
      }
    }))
  })
  app.$mount('#app')
})
