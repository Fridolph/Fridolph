var number = {};
var arr = [];
console.log(arr.length); // 0

var arr1 = [1,2,3,4,5];
console.log(arr1.length); // 5

var arr = new Array();
console.log(arr.length); // 0

var arr2 = new Array(1,2,3,4,5);
console.log(arr2.length); // 5

var arr3 = new Array(10); // 若只传一个参数
console.log(arr3.length); // 10

console.log('------------------');
console.log(Array.isArray(number)); // false
console.log(Array.isArray(arr));    // true