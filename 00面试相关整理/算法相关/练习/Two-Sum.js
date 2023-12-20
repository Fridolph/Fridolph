// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:
// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

// 给定一组整数，两个数字的返回索引，这样它们就会加到一个特定的目标上。
// 您可能假设每个输入都有一个解决方案，并且您可能不使用相同的元素两次。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {  
  let i,
    len = nums.length,
    result = {};

  for (i = 0; i < len; i++) {
    if (result[target - nums[i]] !== undefined) {
      return [result[target - nums[i]], i];
    }
    result[nums[i]] = i
  }
};


console.log(twoSum([2, 7, 11, 15], 9))
// twoSum([1,2,3,4,5,6,7,8,9], 10);

var twoSum = function(nums, target) {
  let i = 0,
    len = nums.length,
    result = {};

  for (; i < len; i++) {
    if (result[target - nums[i]] !== undefined) {
      return [result[target - nums[i]]]
    }
    result[nums[i]] = i
  }
}
