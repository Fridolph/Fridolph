这个说的Proxy 是es6中新增功能，可以用来自定义对象中的操作

```js
let p = new Proxy(target, handler)
// target 代表需要添加代理的对象
// handler 用来自定义对象中的操作
```

可以很方便地使用Proxy来实现一个数据绑定和监听

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },

    set(target, property, value, receiver) {
      setBind(value)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}
```
