// 有两个方法可以为数组添加元素 push() unshift()
// push()会将一个元素添加到数组的末尾

var nums = [1,2,3,4,5];
console.log(nums);
nums.push(6);
console.log(nums);

// 也可以用length
var nums = [1,2,3,4,5];
console.log(nums);
nums[nums.length] = 6;
console.log(nums);

// 从开头添加
var nums = [22,33,44,55];
console.log(nums);
var newnum = 11;
nums.unshift(newnum)
console.log(nums);
nums = [33,44,55];