import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: `<div ref="hello">Hello {{text}} {{obj.a}}</div>`,
  data: {
    text: 0,
    obj: {}
  }
})

app.$mount('#root')

// let i = 0
setInterval(() => {
  // i++
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  // app.$data.text += 1
  // app.obj.a = i
  // app.$forceUpdate()
  // $set设置值是 响应式的
  // app.$set(app.obj, 'a', i)

  // 通过此可发现， app.$options.data 和 app.data不是同一对象
  // app.$options.data.text += 1

  // 通过此可发现 app.$data 和 构造对象里的 data是同一对象
  // 实例上直接调用的data， 就是代理到app.$data上的数据
  // app.$emit('test', 1, 2, 3, 4)
}, 1000)

/* 实例属性 */
// console.log('app.$data', app.$data)
// console.log(app.$props)
// console.log('app.$el', app.$el)
// console.log('app.$options', app.$options)

// 这样赋值是有效的，不过要等到 data里的数据改变后
// app.$options.render = h => {
//   return h('div', {}, 'new render function')
// }

// console.log('app.$root', app.$root === app) // true
// console.log('app.$chldren', app.$chldren)
// console.log('app.$slots', app.$slots)
// console.log('app.$scopedSlots', app.$scopedSlots)
// console.log('app.$refs', app.$refs)
// console.log('app.$isServer', app.$isServer)

/* 实例方法 */
// const unWatch = app.$watch('text', (newText, oldText) => console.log(newText, ' <- ', oldText))
// 该用法 和redux 的 subscribe 一样
// setTimeout(unWatch, 5000)
// $on $emit 触发在同一对象上才会生效， 且该事件不会冒泡
// app.$on('test', _ => console.log('test emit!'))
// app.$on('test', (a, ...b) => console.log(`${a}, ${b}`))

/**
 * 可以和 React实例里的 this.forceUpdate 进行对比
 * 但不是太推荐，因为强制刷新会带来性能问题
 */
// app.$forceUpdate()
// 有两种解决方法， 一种是 先在对象里 data: { obj: { a: { b: '' } } }
// 定义好可能会生成的对象 及 默认值
// 还有种是 app.$set(app.obj, 'a', i)

// app.$nextTick  Vue的更新是异步的，且在一次更新时，会将里面的事务集中到一起处理，再返回处理好后的结果，进行渲染。 类比React this.setState学习
