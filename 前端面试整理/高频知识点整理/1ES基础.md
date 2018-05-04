# 知识点梳理

* 变量类型
  * JS 的数据类型分类和判断
  * 值类型和引用类型
* 原型与原型链（继承）
  * 原型和原型链定义
  * 继承写法
* 作用域和闭包
  * 执行上下文
  * this
  * 闭包是什么
* 异步
  * 同步 vs 异步
  * 异步和单线程
  * 前端异步的场景
* ES6/7 新标准的考查
  * 箭头函数
  * Module
  * Class
  * Set 和 Map
  * Promise...

## 变量类型

6种基本类型：

* Number
* String
* Boolean
* undefined
* null
* Symbol

判断基本类型 typeof

判断实例关系 instanceof constructor的指向

## 原型和原型链

> 如何理解JS的原型

* 所有的引用类型（数组、对象、函数）都具有对象特征，即可自由扩展属性 null除外
* 所有的引用类型都有一个`__proto__`属性，属性值是对象
* 所有的函数，都有一个`prototype`属性，为原型对象
* 所有的引用类型，`__proto__`属性值指向它构造函数的prototype属性(即该对象构造函数的原型对象)

> 如何理解JS的原型链

当视图得到一个对象的某个属性时，若对象本身没有这个属性，那么就会去它的`__proto__`，即构造函数的原型对象中找。

> 原型链中的this

所有从原型或更高级原型中得到、执行的方法，其中this在执行时，就指向了当前这个触发事件执行的对象

## 作用域和闭包

### 执行上下文

**变量提升**

**this在这几个场景时**

* 作为构造函数执行 - 构造函数中 指向实例对象
* 作为对象属性执行 - a.fn() 指向运行时的对象
* 作为普通函数执行 - fn() 严格模式 ? undefined : window
* 用于call、apply、bind - 根据情况绑定指向绑定的对象中
* 箭头函数 - 定义时就决定了 不能被call、apply、bind改变

### 作用域

* ES6之前没有块级作用域

* ES6之前只有 全局作用域和函数作用域

全局里的变量、函数都能访问到，但容易造成污染和覆盖；函数作用域有一定隔离效果，闭包的应用

### 作用域链

自由变量 - 该作用域内找不到向上级作用域寻找，直到根 window / global

这种一层层的关系就是作用域链

### 闭包

* [ ] 闭包就是能够读取其他函数内部变量的函数
* [x] 是一个拥有许多变量和绑定了这些变量环境的表达式

应用场景：

* 函数作为返回值
* 函数作为参数传递

## 异步

同步 - 阻塞
异步 - 非阻塞

```js
var a = true;
setTimeout(function(){
    a = false;
}, 100)
while(a){
    console.log('while执行了')
}
```

跑起来是个死循环，你以为定时器会触发？ 并不会，while循环成立那就一直执行了。同步的阻塞了后面的一切，也就不存在定时器的事了。

应用场景：

* ajax 网络异步请求

```js
console.log('start')
$.get('/xxx.com', data => {
  console.log(data)
})
console.log('end')  // start end 再data的
```

* img 打点统计

```js
console.log('start')
var img = document.createElement('img')
img.onload = () => {
  console.log('loaded')
  img.onload = null
}
img.src = '/xxx.png'
console.log('end')
```

## ES6/7 标准考察

* 箭头函数
* Module
* Class
* Set / Map
* Promise
