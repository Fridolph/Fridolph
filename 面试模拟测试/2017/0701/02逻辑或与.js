var foo = 'hello'
;(function(foo) {
  console.log(foo);
  var foo = foo || 'world'
  console.log(foo);
})(foo)

console.log(foo);
// hello
// hello
// hello

var a = 1 || 2
console.log(a);
// A || B 验证A的真假，为真结果是A 为假结果是 B
var b = 1 && 0
console.log(b);
// A && B 先验证A的真假， 为真结果为B 为假结果是 A

// 逻辑与的优先级 高于 逻辑或
console.log(0 || 1 && 2 || 0 || 3 && 2 || 1);
