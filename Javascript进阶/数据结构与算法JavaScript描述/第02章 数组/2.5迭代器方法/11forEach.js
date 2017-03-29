// forEach() 该方法接受一个函数作为参数, 对数组中的每个元素使用该函数
function square(num) {
  console.log(num, num * num);
} 
var nums = [1,2,3,4,5,6,7,8,9,10];
nums.forEach(square);


