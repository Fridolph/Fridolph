import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
    <p>Name: {{fullname}}</p>
    <p>Name: {{getName()}}</p>
    <p>Number: {{number}}</p>
    <p><input type="text" v-model="number" /></p>
    <p>firstname <input type="text" v-model="firstname" /></p>
    <p>lastname <input type="text" v-model="lastname" /></p>
    <p>fullname <input type="text" v-model="fullname" /></p>
    <p>obj.a <input type="text" v-model="obj.a" /></p>
  </div>`,
  data: {
    firstname: 'Fri',
    lastname: 'yk',
    number: 0,
    obj: {
      a: 'aaaa'
    }
  },
  computed: {
    // 进行缓存，节省性能
    // 想展示的数据 需要计算， 或是用来设置的
    fullname: {
      get() {
        return `${this.firstname} ${this.lastname}`
      },
      set(name) {
        const names = name.split(' ')
        this.firstname = names[0]
        this.lastname = names[1]
      }
    }
  },
  // 注：在computed和watch里尽量不去修改已有值，而是监听、处理、生成新的值
  watch: {
    firstname: {
      handler(newname, oldname) {
        this.fullname = `${this.firstname} ${this.lastname}`
      }
      // immediate: true 声明该属性，立刻执行handler
      // watch更多用于抽象层面，
      // 当我们监听到某个数据的变化，去做某些特定的操作
    },
    obj: {
      handler() {
        console.log('obj.a changed')
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getName() {
      console.log('getname()')
      return `${this.firstname} ${this.lastname}`
    }
  }
})
