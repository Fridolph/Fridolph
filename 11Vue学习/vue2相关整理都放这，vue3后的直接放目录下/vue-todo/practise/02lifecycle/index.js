import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: `<div>
    <h2>Vue Life Cycle</h2>
    <h3>{{text}}</h3>
  </div>`,
  data: {
    text: '声明周期'
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate - 有数据更新才执行')
  },
  updated() {
    console.log('updated - 有数据更新才执行')
  },
  activated() {
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  },
  render() {
    // throw new TypeError('render error')
    // console.log('render function invoked')
    // return h('div', {}, err.stack)
  },
  renderError(h, err) {
    // return h('div', {}, err.stack)
  },
  errorCaptured() {
    // 会向上冒泡，可以在生产环境使用
  }
})

setTimeout(() => {
  // app.$data.text = '声明周期啊'
  app.$destroy()
}, 2000)
