/*使用pop()可以删除数组末尾的元素*/
// var nums = [1,2,3,4,5];
// nums.pop();
// console.log(nums);

/*如果没有可变函数，从数组中删除第一个元素需要将后续元素各自向前移动一个位置，和在数组开头添加一个元素一样低效：*/
// var nums = [9,1,3,6,8,2,4];
// console.log(nums);
// for(var i=0; i<nums.length; i++) {
//   nums[i] = nums[i + 1];
// }
// console.log(nums);

/*shift()方法可以删除数组的第一个元素*/
// var nums = [9,1,3,6,8,2,4];
// console.log(nums);
// nums.shift();
// console.log(nums);

/* pop() shift() 都将删掉的元素作为方法的返回值返回，因此可以使用一个变量来保存删除的元素 */
var nums = [9,1,3,6,8,2,4];
var first = nums.shift();
// console.log(nums);
nums.push(first);
console.log(nums); 