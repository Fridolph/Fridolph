// 用for循环将1-100赋给数组
var nums = [];
for(var i=0; i<100; i++) {
  nums[i] = i + 1;
}

console.log(nums); // 显示数组的成员，1-100

// 使用[]读取数组中的元素
var numbers = [1,2,3,4,5];
var sum = numbers[0] + numbers[1] + numbers[2] + numbers[3] + numbers[4];
console.log(sum); // 15

// 若依次读取数组, 用for会更好
var numbers2 = [1,3,6,12,21,54,178];
var sum2 = 0;
for(var i=0; i<numbers2.length; i++) {
  sum2 += numbers2[i];
}
console.log(sum2);