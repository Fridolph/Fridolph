# 闭包

## 定义

- 闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。 —— MDN

- 闭包是即便外部函数已经不存在，也可以获取作用域链上变量的函数。 —— FreeCodeCamp

::: warning 注意

没有所谓的标准答案，能涉及到核心本质的都是好理解、好概括。
:::

闭包可以从内部函数访问外部函数的作用域。在 JS 中，`闭包会随着函数的创建而被同时创建`。

## 闭包的应用

闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。

### 用闭包模拟私有方法

下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。这个方式也称为`模块模式（module pattern）`：

```js
var Counter = (function () {
  var privateCounter = 0
  function changeBy(val) {
    privateCounter += val
  }
  return {
    increment: function () {
      changeBy(1)
    },
    decrement: function () {
      changeBy(-1)
    },
    value: function () {
      return privateCounter
    },
  }
})()
```

### 一个常见错误：在循环中创建闭包

数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的 input 的 ID。通过循环这三项定义，依次为相应 input 添加了一个 onfocus 事件处理函数，以便显示帮助信息。

运行这段代码后，你会发现它没有达到想要的效果。无论焦点在哪个 input 上，显示的都是关于年龄的信息。

::: code-group

```js
function showHelp(help) {
  document.getElementById('help').innerHTML = help
}

function setupHelp() {
  var helpText = [
    { id: 'email', help: 'Your e-mail address' },
    { id: 'name', help: 'Your full name' },
    { id: 'age', help: 'Your age (you must be over 16)' },
  ]

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i] // [!code error]
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help)
    }
  }
}
setupHelp()
```

```html
<p id="help">Helpful notes will appear here</p>
<p>
  E-mail:
  <input
    type="text"
    id="email"
    name="email" />
</p>
<p>
  Name:
  <input
    type="text"
    id="name"
    name="name" />
</p>
<p>
  Age:
  <input
    type="text"
    id="age"
    name="age" />
</p>
```

:::

原因是赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量 item。这是因为变量 item 使用 var 进行声明，由于变量提升，所以具有函数作用域。当 onfocus 的回调执行时，item.help 的值被决定。由于循环在事件触发之前早已执行完毕，变量对象 item（被三个闭包所共享）已经指向了 helpText 的最后一项。

## for 经典坑的几种解决方案

### 1. 使用更多的闭包

特别是使用前面所述的函数工厂

```js
// 其他省略
function makeHelpCallback(help) {
  // [!code ++]
  return function () {
    // [!code ++]
    showHelp(help) // [!code ++]
  } // [!code ++]
} // [!code ++]

function setupHelp() {
  // ...
  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i]
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help)
    } // [!code --]
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help) // [!code ++]
  }
}
```

### 2. 使用匿名闭包

```js
for (var i = 0; i < helpText.length; i++) {
  ;(function () {
    // [!code ++]
    var item = helpText[i]
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help)
    }
  })() // [!code ++]
  // 马上把当前循环项的 item 与事件回调相关联起来
}
```

### 3. 引入的 let 或 const 关键词

```js
for (var i = 0; i < helpText.length; i++) { // [!code --]
for (let i = 0; i < helpText.length; i++) { // [!code ++]
  const item = helpText[i]
  document.getElementById(item.id).onfocus = () => {
    showHelp(item.help)
  }
}
```

因此每个闭包都绑定了块作用域的变量，这意味着不再需要额外的闭包

### 性能考量

如果不是某些特定任务需要使用闭包，在其他函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。

## 参考资料

- 闭包 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures>