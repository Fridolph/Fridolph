function foo() {
  console.log('Called foo!');
}

// 函数赋值
var bar = function() {
  console.log('Called bar!');
}

// 函数表达式
(function() {
  console.log("This function was invoked immediately!");
})()

// 另一种语法
( (function() {
  console.log("This function was ALSO invoked immediately!");
})() )