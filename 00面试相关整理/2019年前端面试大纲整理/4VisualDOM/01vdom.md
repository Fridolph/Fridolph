# 什么是 VDOM，为何使用 VDOM

## 什么是 Vdom

* virtual dom，虚拟 DOM
* 用 JS 模拟 DOM 结构
* DOM 变化的对比，放在 JS 层来做
* 目的在于提高重绘性能

```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
</ul>
```

以上结构如果用 JS 来模拟

```js
{
  tag: 'ul',
  attr: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attr: {
        className: 'item'
      },
      children: ['Item 1']
    },
    {
      tag: 'li',
      attr: {
        className: 'item'
      },
      children: ['Item 2']
    }
  ]
}
```

## 设计一个需求场景

1. 将该数据展示成一个表格
2. 随便修改一个信息，表格也跟着修改

```js
;[
  {
    name: '张三',
    age: 20,
    addr: '北京'
  },
  {
    name: '李四',
    age: 24,
    addr: '上海'
  },
  {
    name: '王五',
    age: 23,
    addr: '深圳'
  }
]
```

## 用 jQuery 实现

```html
<button id="btn-change">btn-change</button>
<div id="container"></div>

<script src="./jquery.min.js"></script>
<script>
  // 初始化时渲染
  render(list)
  const list = [
    {
      name: '张三',
      age: 20,
      addr: '北京'
    },
    {
      name: '李四',
      age: 24,
      addr: '上海'
    },
    {
      name: '王五',
      age: 23,
      addr: '深圳'
    }
  ]
  // 渲染函数
  function render(data) {
    let $container = $('#container')
    // 清空现有内容
    $container.html('')
    // 拼接table
    let $table = $('<table>')
    $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'))
    data.forEach(item => {
      $table.append($(`<tr><td>${item.name}</td><td>${item.age}</td><td>${item.addr}</td></tr>`))
    })
    // 渲染到页面
    $container.append($table)
  }
  // 业务逻辑
  $('#btn-change').on('click', () => {
    data[1].age = 30
    data[2].addr = '杭州'
    render(list)
  })
</script>
```

## 遇到的问题

* DOM 操作是“昂贵”的，JS 运行效率高
* 尽量减少 DOM 操作，而不是“推倒重来”
* 项目越复杂，影响就越严重

VDOM 可解决以上问题


## vdom如何应用，核心API

### snabbdom

核心API

h('标签名', {属性}, [子元素]) 

```js
var vnode = h('ul#list, {}, [
  h('li.item', {}, 'Item 1'),
  h('li.item', {}, 'Item 2')
])
// 上面的vnode即下面的结构
{
  tag: 'ul',
  attr: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attr: {
        className: 'item'
      },
      children: ['Item 1']
    },
    {
      tag: 'li',
      attr: {
        className: 'item'
      },
      children: ['Item 2']
    }
  ]
}
```

patch(container, vnode) 第一次
patch(vnode, newVnode) 第二次

```js
var container = document.getElementById('container')
var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
])
patch(container, vnode)
var newVnode = h('div#container.two.classes', {on: {click: anotherFn}}, [
  h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
])
patch(vnode, newVnode)
```