// indexOf()方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回-1。
// var a = [2, 9, 9]; 
// a.indexOf(2); // 0 
// a.indexOf(7); // -1

// if (a.indexOf(7) === -1) {
//   // element doesn't exist in array
// }

// 找出制定元素出现的所有位置
function findElemInArr(arr, elem) {
  var result = [];
  var index = arr.indexOf(elem);

  while (index !== -1) {
    result.push(index);
    index = arr.indexOf(elem, index + 1);
  }

  console.log(result);
  return result;
}

findElemInArr(['你好吗', '21', '11037', 'Nice'], '21');

// 判断一个元素是否在数组里，不在则更新数组
function updateVegetablesCollection(arr, elem) {
  if (arr.indexOf(elem) === -1) {
    arr.push(elem);
    console.log(`不在数组里，新数组为：${arr}`);
  } else {
    console.log(`在数组里`);
  }
}

updateVegetablesCollection([1,2,3], 4)