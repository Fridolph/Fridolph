import Vue from 'vue'
import Vuex from 'vuex'
import {fetchItem} from '../api'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem({commit}, id) {
        // store.dispatch 会返回 promise
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(item => {
          commit('setItem', {id, item})
        })
      }
    },
    mutations: {
      setItem(state, {id, item}) {
        Vue.set(state.list, id, item)
      }
    }
  })
}