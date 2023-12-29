import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../app'
// import Bar from '../components/Bar'
// import Baz from '../components/Baz'
// import Foo from '../components/Foo'

Vue.use(VueRouter)

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        comopnent: () => import('../app')
      },
      {
        path: '/foo',
        component: () => import('../components/Foo')
      },
      {
        path: '/bar',
        component: () => import('../components/Bar')
      },
      {
        path: '/baz',
        component: () => import('../components/Baz')
      },
    ]
  })
}
