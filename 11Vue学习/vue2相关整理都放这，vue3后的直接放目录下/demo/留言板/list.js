Vue.component('list', {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  render: h => {
    var list = []
    console.log(list)
    this.list.forEach((msg, index) => {
      var node = h('div', {
        attrs: {
          class: 'list-item'
        }
      }, [
        h('span', msg.name + ': '),
        h('div', {
          attrs: {
            class: 'list-msg'
          }
        }, [
          h('p', msg.message),
          h('a', {
            attrs: {
              class: 'list-replay'
            },
            on: {
              click() {
                this.handleReply(index)
              }
            }
          }, '回复')
        ])
      ])
      list.push(node);
    });

    if (this.list.length) {
      return h('div', {
        attrs: {
          class: 'list'
        }
      }, list)
    } else {
      return h('div', {
        attrs: {
          class: 'list-nothing'
        }
      }, '留言列表为空')
    }
  },
  methods: {
    handleReply(index) {
      this.$emit('reply', index)
    }
  }
})