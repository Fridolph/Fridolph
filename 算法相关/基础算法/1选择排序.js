function selectSort(arr) {
  var temp, 
      minIndex,
      len = arr.length;

  for (var i = 0; i < len-1; i++) {
    // 寻找 (i - len] 区间里的最小值
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  
  return arr
}

console.log(selectSort([3,2,1]));;