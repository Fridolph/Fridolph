// every() 该方法接受一个返回值为布尔类型的函数，对数组中的每个元素使用该函数
// 如果对于所有的元素，该函数均返回true, 则该方法返回true
function isEven(num) {
  return num % 2 == 0;
}

var nums = [2,4,6,8,10,11];
var even = nums.every(isEven);
if(even) {
  console.log("all numbers are even.");
} else {
  console.log("not all numbers are even.");
}
