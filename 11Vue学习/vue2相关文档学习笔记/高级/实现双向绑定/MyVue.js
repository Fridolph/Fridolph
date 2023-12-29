class MyVue {
  constructor(options) {
    this._init(options)
  }

  _init(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$methods = options.methods

    this._binding = {}
    this._observe(this.$data)
    this._compile(this.$el)
  }


  _observe(obj) {
    let _this = this
    Object.keys(obj).forEach(key => {
      if (obj.hasOwnProperty(key)) {
        _this._binding[key] = {
          _directives: []
        }
        console.log(_this._binding[key])
        let value = obj[key]
        if (typeof value === 'object') {
          _this._observe(value)
        }

        let binding = _this._binding[key]
        Object.defineProperty(_this.$data, key, {
          enumerable: true,
          configurable: true,
          get() {
            console.log(`${key} 获取${value}`)
            return value
          },
          set(newVal) {
            console.log(`${key}更新${newVal}`)
            if (value !== newVal) {
              value = newVal
              binding._directives.forEach(item => {
                item.update()
              })
            }
          }
        })
      }
    })
  }

  _compile(root) {
    let _this = this
    let nodes = root.children
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i]
      if (node.children.length) {
        this._compile(node)
      }

      if (node.hasAttribute('v-click')) {
        node.onclick = (function() {
          let attrVal = nodes[i].getAttribute('v-click')
          return _this.$methods[attrVal].bind(_this.$data)
        })()
      }

      if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
        node.addEventListener('input', (function(key) {
          let attrVal = node.getAttribute('v-model')
          _this._binding[attrVal]._directives.push(new M(
            'input',
            node,
            _this,
            attrVal,
            'value'
          ))

          return function() {
            _this.$data[attrVal] = nodes[key].value
          }
        })(i))
      }

      if (node.hasAttribute('v-bind')) {
        let attrVal = node.getAttribute('v-bind')
        _this._binding[attrVal]._directives.push(new Watcher(
          'text',
          node,
          _this,
          attrVal,
          'innerHTML'
        ))
      }
    }
  }
}

class M {
  constructor(name, el, vm, exp, attr) {
    this.name = name    // 指令名
    this.el = el        // 指令对应dom
    this.vm = vm        // 指令所属MyVue实例
    this.exp = exp      // 指令对应值
    this.attr = attr    // 绑定的属性值

    this.update()
  }

  update() {
    this.el[this.attr] = this.vm.$data[this.exp]
  }
}
