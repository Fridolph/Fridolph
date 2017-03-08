/**
 * 现在要扩展window.onload 在不修改原代码的基础上扩展，代码如下：
 */
Function.prototype.after = function(afterfn) {
  var __self = this;
  return function() {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}

window.onload = ( window.onload || function() {} ).after(function() {
  console.log( document.getElementsByTagName("*").length );
});

/**
 * 通过动态装饰函数的方式，我们不用理会从前window.onload函数的内部实现
 */