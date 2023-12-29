import Vue from 'vue'

// const component = {
//   template: `<div :style="style"><slot></slot></div>`,
//   data() {
//     return {
//       style: {
//         width: '200px',
//         height: '200px',
//         border: '1px solid #aaa'
//       }
//     }
//   }
// }

const component = {
  template: `<div :style="style">
    <slot :value="value" aaa="hello aaa"></slot>
  </div>`,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp1: component
  },
  data: {
    value: '123'
  },
  template: `<div>
    <Comp1>
      <span slot-scope="compProps">this is {{compProps.value}}.</span>
    </Comp1>
  </div>`
})
