# JavaScript 变量

## 基础

JavaScript 是区分大小写的，并使用 Unicode 字符集。

### 变量声明方式

JavaScript 有三种声明方式：

- `var` 声明一个变量，可选初始化一个值。

- `let` 声明一个块作用域的局部变量，可选初始化一个值。

- `const` 声明一个块作用域的只读常量。

### 变量赋值

你可以用以下三种方式声明变量：

- 使用关键词 var 。例如 var x = 42。这个语法可以用来声明局部变量和全局变量。
- 直接赋值。例如 x = 42。在函数外使用这种形式赋值，会产生一个全局变量。在严格模式下会产生错误。因此你不应该使用这种方式来声明变量。
- 使用关键词 let 。例如 let y = 13。这个语法可以用来声明块作用域的局部变量。參考下方变量的作用域 (Variable scope)。

> 可以使用解构赋值将对象字面量的属性绑定到变量，如 let { bar } = foo

### 变量求值

- 用 var 或 let 语句声明的变量，`如果没有赋初始值，则其值为 undefined`。
- 如果`访问一个未声明的变量`会导致抛出 ReferenceError 异常

- `可以使用 undefined 来判断一个变量是否已赋值`，其中：

1. undefined 值在布尔类型环境中会被当作 false
2. 数值类型环境中 undefined 值会被转换为 NaN
3. 当你对一个 null 变量求值时，空值 null 在数值类型环境中会被当作 0 来对待，而布尔类型环境中会被当作 false

### 变量的作用域

在函数之外声明的变量，叫做全局变量，因为它可被当前文档中的任何其他代码所访问。在函数内部声明的变量，叫做局部变量，因为它只能在当前函数的内部访问。

**ECMAScript 6 之前的 JavaScript 没有语句块作用域**；相反，语句块中声明的变量将成为语句块所在函数（或全局作用域）的局部变量。

### 变量提升

如果有 var 来声明变量，你可以先使用变量稍后再声明变量而不会引发异常。这一概念称为变量提升。

由于存在变量提升，一个函数中所有的 var 语句应尽可能地放在接近函数顶部的地方。这个习惯将大大提升代码的清晰度。

在 ECMAScript 6 中，let 和 const 同样会被提升变量到代码块的顶部但是不会被赋予初始值。在变量声明之前引用这个变量，将抛出引用错误（`ReferenceError`）。这个变量将从代码块一开始的时候就处在一个“暂时性死区”，直到这个变量被声明为止。

#### 函数提升

对于函数来说，只有函数声明会被提升到顶部，而函数表达式不会被提升。

#### 全局变量

全局变量是全局对象的属性。浏览器环境`Window`，Node 环境：`Global`

#### 常量

你可以用关键字 const 创建一个只读的常量。`常量不可以通过重新赋值改变其值`，也不可以在代码运行时重新声明。它必须被初始化为某个值。

常量的作用域规则与 let 块级作用域变量相同。若省略 const 关键字，则该标识符将被视为变量。

## 变量类型

最新的 ECMAScript 标准定义了 8 种数据类型：

### 七种基本数据类型

- `布尔值（Boolean）`有 2 个值分别是：true 和 false。
- `null`，一个表明 null 值的特殊关键字。JavaScript 是大小写敏感的，因此 null 与 Null、NULL 完全不同。
- `undefined`，和 null 一样是一个特殊的关键字，undefined 表示变量未赋值时的属性。
- `数字（Number）`，整数或浮点数，例如： 42 或者 3.14159。
- `任意精度的整数（BigInt）`，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
- `字符串（String）`，字符串是一串表示文本值的字符序列，例如："Howdy"。
- `Symbol`（在 ECMAScript 6 中新添加的类型）。一种实例是唯一且不可改变的数据类型。

### 引用类型 - 对象（Object）

::: warning
function 是一种特殊的引用类型，但不用于存储数据
:::

### 类型转换

JavaScript 是一种动态类型语言 (dynamically typed language)。这意味着你在声明变量时可以不必指定数据类型，而数据类型会在代码执行时会根据需要自动转换。

更多省略了，感兴趣可看参考资料

### 类型，相等性判断

JavaScript 提供三种不同的值比较运算：

- `Object.is()`

同值相等决定了两个值在所有上下文中是否在功能上相同。

- `===`——严格相等（三个等号）

严格相等比较两个值是否相等。两个被比较的值在比较前都不进行隐式转换。

- `==`——宽松相等（两个等号）

使用 == 执行宽松相等的行为如下

::: details 1. 如果操作数具有相同的类型，则按以下方式进行比较

- Object：仅当两个操作数引用相同的对象时，才返回 true。
- String：仅当两个操作数具有相同的字符并且顺序相同，才返回 true。
- Number：仅当两个操作数具有相同的值时，才返回 true。+0 和 -0 被视为相同的值。如果任一操作数为 NaN，则返回 false；因此 NaN 永远不等于 NaN。
- Boolean：仅当操作数都是 true 或 false 时，才返回 true。
- BigInt：仅当两个操作数具有相同的值时，才返回 true。
- Symbol：仅当两个操作数引用相同的 symbol 时，才返回 true。
  :::

2. 如果操作数之一为 null 或 undefined，则另一个操作数必须为 null 或 undefined 才返回 true。否则返回 false

3. 如果操作数之一是对象，而另一个是原始值，则将对象转换为原始值

::: details 4. 在下面的步骤中，两个操作数都被转换为原始值（String、Number、Boolean、Symbol 和 BigInt 之一）。剩余的转换将分情况完成

- 如果它们是相同类型的，则使用步骤 1 进行比较。
- 如果操作数中有一个是 Symbol，但另一个不是，则返回 false。
- 如果操作数之一是 Boolean，而另一个不是，则将 Boolean 转换为 Number：true 转换为 1，false 转换为 0。然后再次对两个操作数进行宽松比较。
- Number 转 String：将 String 转换为 Number。转换失败会得到 NaN，这将确保相等性为 false。
- Number 转 BigInt：按照其数值进行比较。如果 Number 是 ±Infinity 或 NaN，返回 false。
- String 转 BigInt: 使用与 BigInt() 构造函数相同的算法将字符串转换为 BigInt。如果转换失败，则返回 false。
  :::

## 类型显示/隐式转换

在 JavaScript 中，类型转换是将一个数据类型的值转换为另一个数据类型的过程。类型转换可以分为显式（强制）类型转换和隐式（自动）类型转换。

- 显式类型转换是通过特定的方法或操作符来强制将一个数据类型转换为另一个数据类型。

- 隐式类型转换是在运行时自动发生的类型转换，不需要明确的代码进行转换。JavaScript 会根据上下文自动进行类型转换，以便进行操作或比较。

具体看推荐这篇文章

- JS 中显式隐式类型转换,你真的弄懂了吗 <https://juejin.cn/post/7304265842953420837>

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
    name="email"
  />
</p>
<p>
  Name:
  <input
    type="text"
    id="name"
    name="name"
  />
</p>
<p>
  Age:
  <input
    type="text"
    id="age"
    name="age"
  />
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

## 参考资料

- 闭包 <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures>
- MDN <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%A3%B0%E6%98%8E>
- JS 比较表 <https://dorey.github.io/JavaScript-Equality-Table/>
