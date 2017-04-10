任何库与框架设计的第一个要点就是解决命名空间与变量污染的问题。
jQuery就是利用了JavaScript函数作用域的特性，采用立即调用表达式包裹了自身的方法来解决这个问题。

jQuery的立即调用函数表达式的写法有三种：

## 写法一
<script>
(function(window, factory) {
  factory(window)
}(this, function() {
  // jQuery的调用
}))
</script>

嵌套两个函数，且把另一个函数作为参数传递到另一个函数中并执行

## 写法二

<script>
var factory = function() {
  return function() {
    // 执行方法
  }
}

var jQuery = factory();
</script>

这个factory有点变成了简单的工厂方法模式，需要自己调用，不像是一个单例的jQuery类，所以我们需要改成“自执行”，而不是另外调用

## 写法三 推荐

<script>
(function(window, undefined) {
  var jQuery = function() {
    // ...
  }
  window.jQuery = window.$ = jQuery;
})(window);
</script>

自动初始化，让其构建一次，具体优势为：

1. window和undefinded都是为了减少变量查找所经过的scope作用域。当window通过传递给闭包内部后，在闭包内使用它时，可以把它当成一个局部变量，显然比原先在window scope下查找要快
2. undefined同理，其实这个undefined不是类型中的undefined, 而是一个普通变量名，只是没传值，所以它就是undefined


jQuery为什么要创建这样的一个外层包裹，其原理又是如何？

这里要区分2个概念一个是匿名函数，一个是自执行。
顾名思义，匿名函数，就是没有函数名的函数，也就是不存在外部引用。

function(){
  //代码逻辑
}

var jQuery = function(){
  //代码逻辑
}

主流的库一般都有对 AMD 和 CommonJS 的支持代码，看看jQuery的代码:

<script>
if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = global.document ? 
    factory(global, true) : 
    function(w) {
      if (!w.document) {
        throw new Error('jQuery requires a window with a document');
      }
      return factory(w);
    };
} else {
  factory(global);
}
</script>

## 总结
全局变量是魔鬼, 匿名函数可以有效的保证在页面上写入JavaScript，而不会造成全局变量的污染，
通过小括号，让其加载的时候立即初始化，这样就形成了一个单例模式的效果从而只会执行一次。