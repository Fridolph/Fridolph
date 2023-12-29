import Vue from 'vue'

const ChildComponent = {
  template: `<div>
    child component {{value}}
  </div>`,
  // 通过inject 传入定义好的 context 这样在该组件内的作用域下也能访问了
  // 通过inject 拿的值 是不会有 reactive 响应式变化的
  inject: ['rootContext', 'value'],
  mounted() {
    // console.log('Child 打印 父组件名字', this.$parent.$options.name)
    console.log('拿到根组件的环境', this.rootContext)
  }
}

const ParentComponent = {
  name: 'parent-component',
  components: {
    ChildComponent
  },
  template: `<div>
    <child-component></child-component>
  </div>`
}

new Vue({
  el: '#root',
  components: {
    ParentComponent
  },
  data: {
    value: 12
  },
  provide() {
    return {
      // 提供一个类似于 React context 一样的作用域
      rootContext: this,
      value: this.value
    }
  },
  template: `<div>
    <parent-component>
      <span slot-scope="porps" ref="span">{{value}}</span>
    </parent-component>
    <input type="text" v-model="value" />
  </div>`
})
