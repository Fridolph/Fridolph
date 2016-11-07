/**
 * 两种检查类型的方法: 
 * 1、检查对象类型 使用typeof 操作符
 */

var num = '50';
var arr = 'apples, oranges, pears';
console.log('num的类型是：' + typeof num);
console.log('arr的类型是：' + typeof arr);

// 检查是否是字符串形式的数字
if (typeof num === 'string') {
  num = parseInt(num);
}

// 检查数组是否是字符串
if (typeof arr === 'string') {
  arr = arr.split(",");
}

console.log('num的类型是：' + typeof num);
console.log('arr的类型是：' + typeof arr);
console.log(arr);

/**
 * typeof的优势在于，无需知道被测试变量的实际类型，　但对于Object、Array类型的变量，或者User这种自定义的对象, typeof只会返回'O'
 */