重点：

...
jQuery = function(selector, context) {
  return new jQuery.fn.init(selector, context, rootJquery);
}
...

// 一般的面向对象写法
function Person() {}

Person.prototype.init = function() {}
Person.prototype.html = function() {}

var bob = new Person();
bob.init();
bob.html();

// jQuery中的面向对象

function jQuery() {
  return new jQuery.prototype.init()
}

jQuery.prototype.init = function() {}
jQuery.prototype.html = function() {}
jQuery.prototype.init.prototype = jQuery.prototype;  // 283 这里把fn直接改成prototype