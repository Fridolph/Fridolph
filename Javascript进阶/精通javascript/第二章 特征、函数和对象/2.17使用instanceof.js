/**
 * 第二种检查对象类型的方法是instanceof
 * 该操作符针对右操作数的构造函数来检查左操作数~
 */

var today = new Date();
var re = /[a-z]+/i;

// typeof并没有给出足够的细节
console.log('typeof today: ' + typeof today);
console.log('typeof re: ' + typeof re);

// 找出变量是否是某种特定的类型
if (today instanceof Date) {
  console.log('today is an instance of a Data.');
}

if (re instanceof RegExp) {
  console.log('re is an instance of a RegExp object.');
}