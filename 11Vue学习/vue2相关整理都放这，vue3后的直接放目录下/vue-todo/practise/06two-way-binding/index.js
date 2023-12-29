import Vue from 'vue'

const component = {
  props: ['value'],
  template: `<div>
    <input type="text" @input="handleInput" :value="value" />
  </div>`,
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp1: component
  },
  data() {
    return {
      value: '123'
    }
  },
  template: `<div>
    <comp1 :value="value" @input="value = arguments[0]"></comp1>
    <comp1 v-model="value"></comp1>
  </div>`
})
