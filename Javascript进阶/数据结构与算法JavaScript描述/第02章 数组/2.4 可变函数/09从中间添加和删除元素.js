/**
 * 使用splice() 为数组添加元素
 * 起始索引
 * 需要删除的元素个数
 * 要添加进数组的元素
 */

var nums = [1,2,3,7,8,9];
var newElements = [4,5,6];
nums.splice(3, 0, newElements);
console.log(nums);

var nums = [1,2,3,7,8,9];
nums.splice(3, 0, 4, 5, 6);
console.log(nums);

var nums = [1,2,3,"a","b","c",4,5];
console.log('原来的'+nums);
nums.splice(3,3);
console.log(nums);