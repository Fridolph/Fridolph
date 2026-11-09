# this 指向

分析 this 的指向，首先要确定当前执行代码的环境。

## 全局环境中的 this 指向

全局环境中，this 指向全局对象（视宿主环境而定）

- 浏览器 -> `window`
- Node -> `global`

## 函数中的 this 指向

函数中 this 的指向取决于函数的调用形式，在一些情况下也受到严格模式的影响。一般地默认为非严格模式。

### 1. 作为普通函数调用

this 指向`全局对象` （严格模式下，this 的值是 undefined）

### 2. 作为方法调用

this 指向所属对象

### 3. 作为`构造函数`调用

this 指向`实例化的对象`

### 4. 通过 call, apply, bind 调用

- 如果指定了第一个`参数thisArg`，this 的值就是 thisArg 的值（如果是原始值，会包装为对象）
- 如果不传 thisArg，要判断严格模式，严格模式下 this 是 undefined，非严格模式下 this 指向全局对象。

### 5. 箭头函数

箭头函数和普通函数的重要区别：

1. 没有自己的 this、super、arguments 和 new.target 绑定
2. 不能使用 new 来调用
3. 没有原型对象
4. 不可以改变 this 的绑定
5. 形参名称不能重复

**箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值。** 如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则 this 的值则被设置为全局对象

其实就是相当于箭头函数外的 this 是缓存的该箭头函数上层的普通函数的 this。如果没有普通函数，则是全局对象（浏览器中则是 window）。

也就是说`无法通过call、apply、bind绑定箭头函数的this`(它自身没有 this)。而 call、apply、bind 可以绑定缓存箭头函数上层的普通函数的 this。

## 自测

[学习自测 - 函数 Function](../../学习自测/02js/q_js_2-function.md)

## 参考资料

- 彻底搞懂闭包，柯里化，手写代码，金九银十不再丢分！ <https://juejin.cn/post/6864378349512065038>

- 学习自测：JS 的 this 指向 <https://juejin.cn/post/6844903746984476686>
