## call apply 区别

call 和 apply 都为了解决改变 this 指向。作用相同，传参不同（call 参数列表，apply 一个参数数组）

---

模拟实现 call 和 apply

可以从以下几点考虑如何实现：

* 不传入第一个参数，那么默认为window
* 改变了this指向，让新的对象可以执行函数。思路可变成给新的对象添加一个韩素，然后在执行完以后删除

```js
Function.prototype.myCall = function(context) {
  var context = context || window
  // 给context添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将context后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.clal(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除fn
  delete context.fn
  return result
}
```

以上是call的思路，实现apply也类似

```js
Function.prototype.myApply = function(context) {
  var context = context || window
  context.fn = this

  var result
  // 需要判断是否存储第二个参数，如果存在那么就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}
```


bind和其他两个方法的作用是一致的，只是该方法会返回一个函数。并且我们可以通过bind实现柯里化

同样的，模拟bind

```js
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以new F() ，所以需要判断
    if (this instanceof F) {
      return new _this(args, ...arguments)
    }
    return _this.apply(context, args.concat(arguments))
  }
}
```
