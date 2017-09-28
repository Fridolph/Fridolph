// 比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。
// 换言之，返回两个数组的差异。
// Array.slice()
// Array.filter()
// Array.indexOf()
// Array.concat()

// function diff(arr1, arr2) {
//   var array1 = arr1.filter((item, index, array) => {
//     return arr2.indexOf(item) < 0;
//   });

//   var array2 = arr2.filter((item, index, array) => {
//     return arr1.indexOf(item) < 0;
//   });

//   console.log(array1.concat(array2));
//   return array1.concat(array2);
// }

diff([1, 2, 2, 3, 3, 5, 8], [1, 2, 3, 4, 5, 0, 2]);

function diff(a, b) {
  var arr1 = a.filter(item => {
    return b.indexOf(item) < 0;
  });

  var arr2 = b.filter(item => {
    return a.indexOf(item) < 0;
  })

  console.log(arr1.concat(arr2));
  return arr1.concat(arr2);
}