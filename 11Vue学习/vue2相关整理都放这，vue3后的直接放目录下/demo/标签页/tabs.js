Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">
          <button class="btn-close" v-if="item.closable" @click="closeTab(item)">x</button>
          {{item.label}}
        </div>
      </div>
      <div class="tabs-content">
        <slot></slot>
      </div>
    </div>
  `,
  props: {
    // 这里的value是为了可以使用v-model
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      navList: [],
      // 因为不能修改value, 所以赋值一份自己维护
      currentValue: this.value      
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue() {
      // 当前选中的tab发生变化时，更新pane的显示状态
      this.updateStatus()
    }
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          // 给当前选中的tab加一个class
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    closeTab(item) {
      console.log(item)
      // console.log(this.navList)      
    },
    handleChange(index) {
      var nav = this.navList[index]
      var name = nav.name
      // 改变当前选中的tab并触发下面的watch
      this.currentValue = name
      // 更新value
      this.$emit('input', name)
      // 触发一个自定义事件，供父级使用
      this.$emit('on-click', name)
    },
    getTabs() {
      // 通过遍历子组件 得到所有的pane组件
      return this.$children.filter(item => {
        return item.$options.name === 'pane'
      })
    },
    updateNav() {      
      this.navList = []
      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index,
          closable: pane.closable || false
        })
        // 如果没有给pane设置name，默认设置它的索引
        if (!pane.name) pane.name = index
        
        // 设置当前选中的tab索引
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus() {
      var tabs = this.getTabs()
      // 显示当前选中的tab对应的pane组件，隐藏没有选中的
      tabs.forEach(tab => {
        return tab.show = tab.name === this.currentValue
      })
    }
  }
})