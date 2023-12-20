Generator是es6中新增语法，和Promise一样，都可以用来异步编程

```js
// 使用*表示这是一个Generator函数
// 内部可以通过yield暂停代码
// 通过调用next恢复执行
function *text() {
  let a = 1 + 2
  yield 2
  yield 3
}
let b = test()
console.log(b.next()) // {value: 2, done: false}
console.log(b.next()) // {value: 3, done: false}
console.log(b.next()) // {value: undefined, done: true}
```

从以上代码可以发现，加上`*`的函数执行后拥有了next函数，也就是说函数执行后返回一个对象。每次调用next函数可以继续执行被暂停的代码。以下是Generator函数的简单实现：

```js
// cb也就是编译过的test函数
function generator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    }
    return {
      next: function() {
        var ret = cb(object)
        if (ret === undefined) return {
          value: undefined,
          done: true
        }
        return {
          value: ret,
          done: false
        }
      }
    }
  })()
}

// 如果使用babel编译后可以发现test函数变成了这样
function test() {
  var a
  return generator(function(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        // 可以发现通过yield将代码分隔成几块
        // 每次执行next函数就执行一块代码
        // 并且表明下次需要执行哪块代码
        case 0:
          a = 1 + 2
          _context.next = 4
          return 2
        case 4:
          _context.next = 6
          return 3
        // 执行完毕
        case 6:
        case "end":
          return _context.stop()
      })
    }
  })
}
```
