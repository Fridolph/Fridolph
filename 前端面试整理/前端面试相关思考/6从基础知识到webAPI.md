回顾之前的JS基础知识

* 变量类型和计算
* 原型和原型链
* 闭包和作用域
* 异步和单线程
* 其他（如日期、Math、各种常用API）

常说的JavaScript包含：

* JS基础知识(ECMA262标准)
* JS-Web-API(W3C标准)

## DOM知识点

### DOM本质 

浏览器把拿到的html代码，结构化为一个浏览器能识别并且js可操作的模型

### DOM节点操作

* 获取DOM节点
* prototype
* Attribute

### DOM结构操作

getElementById
getElementsByTagName
getElementsByClassName
querySelector
querySelectorAll

### DOM结构操作

* 新增节点
element.appendChild(elem)

* 获取父元素
element.parentElement

* 获取子元素
element.childNodes

* 删除节点
element.removeChild(childElement)

### 知识习题

* DOM是哪种基本的数据结构？ 
树

* DOM操作的常用API有哪些？  
参考上面知识点

* DOM节点的attr和property有何区别
property 是一个JS对象上属性的修改
Attribute 是对html标签属性的修改


## BOM操作

Browser object model

* 如何检测浏览器的类型？ 通过navigator.userAgent来判断

* 拆解URL的各部分？

### 知识点

* navigator

```js
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
```

* screen
```js
console.log(window.screen.width)
console.log(window.screen.height)
```

* location
```js
console.log(location.href)
console.log(location.protocol)
console.log(location.pathname)
console.log(location.search)
console.log(location.hash)
```

* history
```js
history.back()
history.forward()
```

