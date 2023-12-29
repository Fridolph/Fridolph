import Vue from 'vue'
import App from './app'
import {createRouter} from './router'
import {createStore} from './store'
// import {sync} from 'vuex-router-sync'

export default () => {
  // 创建 store 和 router 实例
  const store = createStore()
  const router = createRouter()
  // 同步路由状态 (route state) 到store
  // sync(store, router)

  // 创建应用实例，将router和store注入
  const app = new Vue({
    // 根实例简单的渲染应用程序组件
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
