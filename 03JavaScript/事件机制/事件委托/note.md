https://zhuanlan.zhihu.com/p/26536815

基本上都是从这抄的，抄归抄，理一遍敲一遍读一遍增加印象

## 基本概念

事件委托，通俗地讲，就是把一个元素响应事件（click、keydown...）的函数委托到另一个元素；

![](https://pic2.zhimg.com/80/v2-bf3b8dbab027713a2b21b9e8a5b7a6c4_hd.jpg)

事件模型的三个阶段：

* 捕获阶段 在事件冒泡模型中，捕获阶段不会响应任何事件
* 目标阶段 指事件响应到触发事件的最底层元素上
* 冒泡阶段 冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点）

事件代理即利用事件冒泡的机制把里层所需要响应的事件绑定到外层

### 事件委托的优点

1. 减少内存消耗

2. 动态绑定事件

---

### 函数封装

几个关键点：

* 对于父层代理的元素可能有多个，需要一一绑定事件
* 对于绑定的事件类型可能有多个，需要一一绑定事件
* 在处理匹配被代理的元素之中需要考虑到兼容性问题
* 在执行所绑定的函数时徐哟呵传入正确参数及考虑this

```js
/**
 * eventDelegate  把事件代理的功能封装成一个公用函数
 * @param {String} parentSelector 一个选择器字符串用于过滤需要实现代理的父层元素，既事件需要被真正绑定之上
 * @param {String} targetSelector 一个选择器字符串用于过滤触发事件的选择器元素的后代，既我们需要被代理事件的元素
 * @param {events} 一个或多个用空格分隔的事件类型和可选的命名空间，如 click 或 keydown.click
 * @param {Function} func 需要代理事件响应的函数
 */
function eventDelegate(parentSelector, targetSelector, events, func) {
  // 触发执行的函数
  function triFunction(e) {
    // 兼容性处理
    var event = e || window.event
    var target = event.target || event.srcElement
    // 处理matches兼容性
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s)
          var n = matches.length
          while(--n >= 0 && matches.item(n) !== this) {}
          return i > -1
        }
    }

    // 判断是否匹配到我们所需要的元素上
    if (target.matches(targetSelector)) {
      // 执行绑定的函数，注意this
      func.call(target, Array.prototype.slice.call(arguments))
    }
  }

  // 如果有多个事件的话需要全部一一绑定事件
  events.split('.').forEach(function(evt) {
    Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {
      $p.addEventListener(evt, triFunction)
    })
  })
}
```

**优化**

当被代理的元素不是目标元素的时候，既选择器 targetSelector 所指向的元素不是 event.target （事件目标阶段指向的元素）的时候，这时候就需要层层遍历 event.target 的 parentNode 去匹配 targetSelector 了，直到 parentSelector。

完整优化版：

```js
function eventDelegate(parentSelector, targetSelector, events, func) {
  // 触发执行函数
  function triFunction(e) {
    // 兼容性处理
    var event = e || window.event
    // 获取到目标阶段指向的元素
    var target = event.target || event.srcElement
    // 获取到代理事件的函数
    var currentTarget = event.currentTarget
    // 处理matches兼容
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1
        }
    }

    // 遍历外层并且匹配
    while (target !== currentTarget) {
      // 判断是否匹配到我们所需要的元素上
      if (target.maches(targetSelector)) {
        var sTarget = target
        // 执行绑定的函数，注意this
        func.call(sTarget, Array.prototype.slice.call(arguments))
      }
      target = target.parentNode
    }
  }

  // 如果有多个事件的话需要全部一一绑定事件
  events.split('.').forEach(function(evt) {
    // 多个父层元素的话也需要一一绑定
    Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function($p) {
      $p.addEventListener(evt, triFunction)
    })
  })
}
```

使用函数：

    eventDelegate('#list', 'li', 'click', function () { console.log(this); });

点击后可以看到 console 出了 `#list li` 元素对象；

局限性：

* focus、blur之类事件本身没有事件冒泡机制，所以无法委托
* mousemove、mouseout这类事件虽然有事件冒泡，但是只能通过不断计算位置去计算定位，对性能消耗较高，因此也是不适合于事件委托的
