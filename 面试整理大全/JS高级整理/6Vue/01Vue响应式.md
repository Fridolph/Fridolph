# Vue 中如何实现响应式

* 什么是响应式
关键理解Object.defineProperty

* Object.defineProperty的应用
将data属性代理到vm上

---

## 响应式

1. 修改 data 属性后，vue 能立刻监听到
2. data 属性被代理到 vm 上

```html
<div id="root">
  <p>{{name}}</p>
  <p>{{age}}</p>
</div>
<script src="https://cdn.bootcss.com/vue/2.2.1/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      name: 'zhangsan',
      age: 20
    }
  })
</script>
```

## Object.defineProperty

```js
var obj = {}
var name = 'fri'
Object.defineProperty(obj, 'name', {
  get: function() {
    console.log('get')
    return name
  },
  set: function(newVal) {
    console.log('set')
    name = newVal
  }
})
console.log(obj.name) // 可以监听到
obj.name = 'yk' // 可以监听到
```

模拟实现一个简单的响应式

```js
var mv = {}
var data = {name: 'fri', age: 26}
var key, value
for (key in data) {// 命中闭包。新建一个函数，保证key的独立作用域
  (function(key) {
    Object.defineProperty(mv, key, {
      get: function() {
        return data[key]
      },
      set: function(newVal) {
        data[key] = newVal
      }
    })
  })(key)
}
```
