var foo = "test";

if (true) {
  var foo = "new test";
}

console.log(foo);  // new test

// function test() {
//   var foo = "old test";
// }

// // 在调用函数时, 变量foo存在于函数作用域中
// test();

// console.log( foo === 'new test');

/**
 * 变量位于全局作用域中。
 * 值赋给了处于test()函数作用域中的变量foo. 
 */

function test() {
  foo = 'fridolph';
}

test();
console.log(foo);