* jQuery 1.5 变化
* 使用 jQuery.Deferred
* 初步引入 Promise 概念

---

jQuery 1.5 之前

```js
var ajax = $.ajax({
  // ... 省略
})
console.log(ajax)
// 返回一个XHR对象
```

jQuery 1.5 之后

```js
var ajax = $.ajax('data.json')
ajax
  .done(function() {
    console.log('success 1')
  })
  .fail(function() {
    console.log('fail')
  })
  .done(function() {
    console.log('success 2')
  })
console.log(ajax)
// 返回一个deferred对象
```

当然还有另一种 .then 的写法

```js
var ajax = $.ajax('data.json')
ajax
  .then(
    function() {
      console.log('success 1')
    },
    function() {
      console.log('error 1')
    }
  )
  .then(
    function() {
      console.log('success 2')
    },
    function() {
      console.log('error 2')
    }
  )
console.log(ajax)
// 返回一个deferred对象
```

无法改变 JS 异步和单线程的本质只能从写法上杜绝 callback 形式它是一种语法糖形式，但是解耦了代码很好地体现了，（对扩展）开放（对修改）封闭原则

### 使用 jQuery Deferred

```js
// 给出一段常见的异步操作代码
var wait = function() {
  var task = function() {
    console.log('执行完成')
  }
  setTimeout(task, 2000)
}
wait()
// 新增需求：要在执行完成之后进行某些复杂的操作，代码可能很多，而且分好几个步骤
```

使用 jQuery Deferred：

```js
function waitHandle() {
  var dtd = $.Deferred() // 1. 创建一个deferred对象
  var wait = function(dtd) {
    // 2. 要求传入一个deferred对象
    var task = function() {
      console.log('执行完成')
      dtd.resolve() // 3. 表示异步任务完成
      // dtd.reject() 表示异步任务出错
    }
    setTimeout(task, 2000)
    return dtd // 4. 要求返回deferred对象
  }
  // 注意这里要有返回值，
  return wait(dtd)
}
```

总结 - dtd 的 API 可分成两类，用意不同第一类：dtd.resolve dtd.reject
第二类：dtd.then dtd.done dtd.fail
这两类应该分开

### 使用 dtd.promise()

```js
function waitHandle() {
  var dtd = $.Deferred()
  var wait = function(dtd) {
    var task = function() {
      console.log('执行完成')
      dtd.resolve()
    }
    setTimeout(task, 2000)
    return dtd.promise()
    // 注意，这里的promise。而不是直接返回 deferred 对象
  }
  return wait(dtd)
}
var w = waitHandle() // 经过上面的改动，w接收的是一个promise对象
$.when(w)
  .then(function() {
    console.log('ok 1')
  })
  .then(function() {
    console.log('ok 2')
  })
// w.reject() 执行这句会直接报错
```
