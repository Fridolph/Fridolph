## createElement用法

### 基本参数

createElement构成了 Vue Virtual DOM的模板

```js
craeteElement(
  // {String | Object | Function}
  // 一个HTML标签，组件选项，成一个函数
  // 必须 return 上述其中一个
  'div',
  // {Object} 一个对应属性的数据对象，可选,可以在template中使用
  {
    // todo 后面来说
  },
  // {String | Array} 子节点VNodes 可选
  [
    createElement('h1', 'hello world'),
    createElement(MyComponent, {
      props: {
        someProp: 'foo'
      }
    }),
    'bar'
  ]
)
```

第一个参数必选，可以是一个HTML标签，也可以是一个组件或函数；
第二个是可选参数，数据对象，在template中使用；
第三个是子节点，也是可选参数，用法一致。

对于第二个参数“数据对象”，具体选项如下：

```js
{
  // 和v-bind:class 一样的API
  'class': {
    foo: true,
    bar: false
  },
  // 和v-bind:style 一样的API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的HTML特性
  attrs: {
    id: 'foo'
  },
  // 组件props
  props: {
    myProps: 'bar'
  },
  // DOM属性
  domProps: {
    innerHTML: 'baz'
  },
  // 自定义事劲啊监听器 "on" 不支持如v-on:keyup.enter的修饰器
  // 需要手动匹配 keyCode
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件使用 vm.$emit触发的自定义事件
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域slot
  // {name: props => VNode | Array<VNode>}
  scopedSlots: {
    default: props => h('span', props.text)
  },
  // 如果子组件有定义slot的名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```

以往在template里，我们都是在组件的标签上使用v-bind:class v-bind:style v-on:click 这样的指令
在render函数都将其写在了数据对象里:

```html
<div id="app">
  <ele></ele>
</div>
<script>
  Vue.component('ele', {
    template: `
    <div id="element" :class="{'show': show}" @click="handleClick">
      文本内容
    </div>
    `,
    data() {
      return {
        show: true
      }
    },
    methods: {
      handleClick() {
        console.log('clicked!')
      }
    }
  })
  var app = new Vue({
    el: '#app'
  })
</script>
<!-- 使用Render后改写的代码如下 -->
<div id="app">
  <ele></ele>
</div>
<script>
  Vue.component('ele', {
    render: h => {
      h(
        'div',
        {
          // 动态绑定class
          class: {
            'show': this.show
          },
          // 普通html特性
          attrs: {
            id: 'element'
          },
          // 给div绑定click事件
          on: {
            click: this.handleClick
          }
        },
        '文本内容'
      )
    }
  })
  var app = new Vue({
    el: '#app'
  })
</script>
```


对于含有组件的slot复用就要稍微复杂一点了，需要将slot的每个子节点都克隆一份。

```html
<div id="app">
  <ele>
    <div>
      <Child></Child>
    </div>
  </ele>
</div>
<script>
  // 全局注册组件
  Vue.component('Child', {
    render: h => {
      h('p', 'text')
    }
  })

  Vue.component('ele', {
    render: h => {
      function cloneVNode(vnode) {
        // 递归遍历所有子节点，并克隆
        const cloneChildren = vnode.children && vnode.children.map(vnode => {
          return cloneVNode(vnode)
        });
        const cloned = h(
          vnode.tag,
          vnode.data,
          clonedChildren
        );
        cloned.text = vnode.text;
        cloned.isComment = vnode.isComment;
        cloned.componentOptions = vnode.componentOptions;
        cloned.elm = vnode.elm;
        cloned.context = vnode.context;
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        cloned.key = vnode.key;

        return cloned;
      }
      const VNodes = this.$slots.default;
      const clonedVNodes = vNodes.map(vnodes => {
        return cloneVNode(vnode)
      })

      return h('div', [
        vNodes,
        cloneVNodes
      ])
    }
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```

在render函数里创建一个cloneVNode工厂函数，通过递归将slot所有子节点都克隆了一个份，并对VNode的关键属性也进行复制。

## 使用JavaScript代替模版功能

在render函数中，不再需要Vue的内置指令，如v-if v-for，当然，也没法使用。可用原生来模拟：

```html
<div id="app">
  <ele :show="show"></ele>
  <butotn @click="show = !show">切换</butotn>
</div>
<script>
  Vue.component('ele', {
    render: h => {
      if (this.show) {
        return h('p', 'show的值为true')
      } else {
        return h('p', 'show的值为false')
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  })

  var app = new Vue({
    el: '#app'
  })
</script>
<!-- 模拟v-for -->
<script>
  Vue.component('ele', {
    render: h => {
      var nodes = []
      for (var i = 0; i < this.list.length; i++) {
        nodes.push(h('p', this.list[i]))
      }
      return h('div', nodes)
    },
    props: {
      list: {
        type: Array
      }
    }
  })
  new Vue({
    el: '#app',
    data: {
      list: [
        '1',
        '2',
        '3'
      ]
    }
  })
</script>
```

我们再来看一个完整的render v-if用render来写的示例：

```html
<div id="app">
  <ele :list="list"></ele>
  <button @click="handleClick">显示列表</button>
</div>
<script>
  Vue.component('ele', {
    render: h => {
      if (this.list.length) {
        return h('ul', this.list.map(item => {
          return h('li', item)
        }))
      } else {
        return h('p', '列表为空')
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    }
  })

  var app = new Vue({
    el: '#app',
    data: {
      list: []
    },
    methods: {
      handleClick() {
        this.list = [
          '1',
          '2',
          '3'
        ]
      }
    }
  })
</script>
```

我们再来看一个完整的render v-for用render来写的示例：

```html
<div id="app">
  <ele></ele>
</div>
<script>
  Vue.component('ele', {
    render: h => {
      return h('div', [
        h('input', {
          domProps: {
            value: this.value
          },
          on: {
            input: e => {
              this.value = e.target.value
            }
          }
        }),
        h('p', `value: ${this.value}`)
      ])
    },
    data() {
      return {
        value: ''
      }
    }
  })

  var app = new Vue({
    el: '#app'
  })
</script>
```

对于事件修饰符和按键修饰符，基本也需要自己实现：

.stop         event.stopPropagation()
.prevent      event.preventDefault()
.self         if (event.target !== event.currentTarget) return
.enter .13    if (event.keyCode !== 13) return
.ctrl .alt 
.shift .meta  if (!event.ctrlKey) return ...


