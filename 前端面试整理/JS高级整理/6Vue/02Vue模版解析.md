* 模版是什么
* render 函数
* render 函数有与 vdom

---

## 模版

* 本质：字符串
* 有逻辑，如 v-if、v-for 等
* 与 html 格式很像，但有很大区别
* 最终还要转换为 HTML 展示

模版最终必须转换成 JS 代码，因为：

* 有逻辑，必须用 JS 来实现
* 转换为 HTML 渲染页面，必须用 JS 来实现

因此，模版最终转换成一个 JS 函数(render)

---

## render 函数

**with 用法**

```js
var obj = {
  name: 'fri',
  age: 26,
  say: () => 'welcome'
}
function fn1() {
  console.log(`${obj.name}, ${obj.age}, ${obj.say()}`)
}
fn1() // fri, 26, welcome
// 使用with
var obj = {
  name: 'fri',
  age: 26,
  say: () => 'welcome'
}
function fn2() {
  with (obj) {
    console.log(`${name}, ${age}, ${say()}`)
  }
}
fn2() // fri, 26, welcome
```

在 Vue 中，一段模版对应这么一段：

```html
<div id="app"><p>{{name}}</p></div>
```

```js
with (this) { // 这里的this 为 new Vue({}) 的实例对象
  return _c {
    'div',
    {
      attrs: {'id': 'app'}
    },
    [
      _c('p', [_v(_s(name))])
    ]
  }
}
```

**render 函数**

* 模版中所有信息都包含在了 render 函数中
* this 即 vm
* price 即 this.price，即 vm.price，即 data 中的 price
* `_c`即 `this._c`，即`vm._c`

问题:

* 从哪里可以看到 render 函数
* render 函数是什么样子的
* v-if、v-for、v-on 都是怎么处理的

根据 todo-list demo 的 render 函数：

* v-model 是怎么实现的 即有 getter，又有 setter
* v-on:click 是怎么实现的 渲染时绑定 click 事件，与我们定义的事件名对应
* v-for 是怎么实现的

### render 函数和 vdom

* updateComponent 中实现了 vdom 和 patch
* 页面首次渲染执行updateComponent
* data中每次修改属性，执行updateComponent