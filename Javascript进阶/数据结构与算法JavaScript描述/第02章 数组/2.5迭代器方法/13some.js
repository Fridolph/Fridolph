// some() 方法也接受一个返回值为布尔类型的函数，只要有一个元素使得该函数返回true, 该方法就返回true
function isEven(num) {
  return num % 2 == 0;
}
// var nums = [1,2,3,4,5,6];
// var someEven = nums.some(isEven);

// if(someEven) {
//   console.log("some numbers are even.");
// } else {
//   console.log("no numbers are even.");
// }
var nums = [1,3,5,7,9];
someEven = nums.some(isEven);
if(someEven) {
  console.log(nums + "\nsome numbers are even.");
} else {
  console.log(nums + "\nno numbers are even.");
}