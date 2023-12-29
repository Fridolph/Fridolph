// 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 但是稍后我们将在此执行服务器端路由匹配(server-side route matching)和数据预取逻辑(data pre-fetching logic)。

import {createApp} from './app'

// 实现服务端的路由逻辑
export default context => {
  // 因为有可能会是异步路由钩子组件或函数，我们将返回一个Promise
  // 以便服务能够等待所有的内容在渲染前就已经准备就绪
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()
    // 设置服务端router的位置
    router.push(context.url)
    // 等到router将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行reject函数，并返回404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用 asyncData()
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在有所预取钩子 resolve后，
        // 我们是store现在已经填充入渲染应用程序所需的状态
        // 当我们将状态附加到上下文，
        // 并且 template 选项用于renderer时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__` 并注入到HTML
        context.state = store.state
        // Promise应该resolve应用程序实例，以便它可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}