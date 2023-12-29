import Vue from 'vue'

const Child = {
  // template: `<div>
  //   <p>child component</p>
  //   <slot></slot>
  // </div>`
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #ccc'
      }
    }
  },
  render(createElement) {
    return createElement(
      'div',
      {
        style: this.style,
        on: {
          click: () => this.$emit('click')
        }
      },
      this.$slots.default,
      this.prop1
    )
  }
}

new Vue({
  el: '#root',
  components: {
    Child
  },
  data: {
    text: 'hello vue',
    value: 6666
  },
  // template: `<div>
  //   {{text}}
  // </div>`,
  render(createElement) {
    return createElement(
      'Child',
      {
        ref: 'comp',
        props: {
          prop1: this.value
        },
        on: {
          click: this.handleClick
        }
      },
      [
        createElement(
          'span',
          {
            ref: 'span'
          },
          this.text
        )
      ]
    )
  }
})
