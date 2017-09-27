// 语法 arr.reduce(callback, [initialValue])
// accumulator

// function sumAll(arr) {
//   return arr.reduce((acc, val) => {
//     return acc + val;
//   });
// }
// console.log(sumAll([1, 4, 5]));

// 将数组所有项相加
// var sum = [1, 2, 3, 4].reduce((a, b) => {
//   return a + b;
// }, 0);

// console.log(`sum: ${sum}`);

// 函数扁平化
// var flattened = [
//   [0, 1],
//   [2, 3],
//   [4, 5]
// ].reduce((a, b) => {
//   return a.concat(b);
// });
// console.log(`flattened: ${flattened}`);

// 计算数组中各个值出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice', 'Tiff', 'Alice'];
var counterNames = names.reduce((allNames, name) => {
  // if (name in allNames) {
  //   allNames[name]++;
  // } else {
  //   allNames[name] = 1;
  // }
  console.log(allNames, name);
  
  // return allNames;
}, {});
// console.log('counterNames: ', counterNames);