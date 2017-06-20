const randomArray = require('../randomArr');

/**
 * 算法 - 选择排序
 * @param {any} arr 
 * @return 排序好后的数组
 */
function selectSort(arr) {
  var len = arr.length,
    minIndex,
    temp, i, j;

  for (i = 0; i < len; i++) {
    // 寻找 [i, n) 区间里的最小值
    minIndex = i;

    for (j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;    
  }

  return arr;
}

let arr = randomArray(10,0,100);
console.log('原数组为: ', arr);

console.log('排序后为: ', selectSort(arr));

