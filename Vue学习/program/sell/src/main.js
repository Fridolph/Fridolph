// 载入依赖
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// 组件
import App from './App'
import goods from 'components/goods/goods'
import seller from 'components/seller/seller'
import ratings from 'components/ratings/ratings'
// 加载样式
import 'common/stylus/index.styl'
// 注册第三方组件
Vue.use(VueRouter)
Vue.use(VueResource)

/* eslint-disable no-new */

// 路由需要一个根组件
let app = Vue.extend(App)
// 创建路由实例
let router = new VueRouter({
  // 传入配置
  linkActiveClass: 'active'
})
// 定义路由
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})
// 路由器会创建一个App实例，并且挂在到选择符的匹配上
// 启动路由
router.start(app, '#app')
// 设置默认的路由跳转页
router.go('/goods')
