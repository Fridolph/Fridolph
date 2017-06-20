/**
 * 生成n个随机数组，每个数组的随机范围为 [rangeL,rangeR] 
 */
function randomArray(n, rangeL, rangeR) {
  var arr = [];

  for (var i = 0; i<n;i++) {
    arr[i] = Math.round(Math.random() * (rangeR - rangeL + 1) + rangeL);
  }

  return arr;
}

const arr1 = randomArray(10,0,9);

console.log(arr1);