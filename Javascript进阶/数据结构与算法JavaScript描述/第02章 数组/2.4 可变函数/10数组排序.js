// 数组翻转方法
var nums = [1,2,3,4,5];
nums.reverse();
console.log(nums);

var arr = ['chuo', 'chuo', 'ha', 'ai', 'wo'];
// arr.sort(); // 按字符串排序
// console.log(arr);
arr.reverse();
console.log(arr);

// sort是默认按字符串来排列的
var nums = [3,2,1,100,200,142];
nums.sort();
console.log(nums);

// 调入一个比较函数
function compare(num1, num2) {
  return num1 - num2;
}
function compare2(num1, num2) {
  return num2 - num1;
}
var num2 = [3,1,2,5,100,230,99];
num2.sort();
console.log(num2);
num2.sort(compare);
console.log(num2);
num2.sort(compare2);
console.log(num2);
