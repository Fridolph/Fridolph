class MyVue {
  constructor(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$methods = options.methods

    this._binding = {}           // 依赖收集
    this._observe(this.$data)    // 观察data数据添加到Watcher中
    this._compile(this.$el)      // 编译为抽象语法树AST 这里要简单得多
  }

  _observe(obj) {    
    for (let key in obj) {
      if(obj.hasOwnProperty(key)) {
        this._binding[key] = {
          _directives: []
        }
        console.log('this._binding[key]', this._binding[key])
        let value = obj[key]
        if (typeof value === 'object') {
          this._observe(value)
        }

        let binding = this._binding[key]
        Object.defineProperty(this.$data, key, {
          enumerable: true,
          configurable: true,
          get() {
            console.log(`${key}获取${value}`)
            return value
          },
          set(newVal) {
            console.log(`${key}设置${newVal}`)
            if (value !== newVal) {
              value = newVal
              binding._directives.forEach(item => item.update())
            }
          }
        })
      }
    }
  }

  _compile(root) {
    // root为根节点，传入的el
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
          let attrVal = nodes[i].getAttribute('v-model')
          _this._binding[attrVal]._directives.push(new Watcher(
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
        let attrVal = nodes[i].getAttribute('v-bind')
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


class Watcher {
  constructor(name, el, vm, exp, attr) {
    this.name = name    // 指令名
    this.el = el        // 指令对应dom
    this.vm = vm        // 指令所属实例
    this.exp = exp      // 指令对应值
    this.attr = attr    // 绑定属性值

    this.update()
  }

  update() {
    this.el[this.attr] = this.vm.$data[this.exp]
  }
}