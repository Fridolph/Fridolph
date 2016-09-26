/*

1.冒泡排序（Bubble Sort）

好的，开始总结第一个排序算法，冒泡排序。我想对于它每个学过C语言的都会了解的吧，这可能是很多人接触的第一个排序算法。
(1)算法描述

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
(2)算法描述和实现

具体算法描述如下：

<1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
<2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
<3>.针对所有的元素重复以上的步骤，除了最后一个；
<4>.重复步骤1~3，直到排序完成。

*/

function bubbleSort(arr) {
  var len = arr.length;

  for (var i=0; i<len; i++) {
    for (var j=0; j<len-1-i; j++) {
      if(arr[j] > arr[j+1]) {  // 相邻元素两两对比
        var temp = arr[j+1]  //元素交换

        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

var arr = [3, 44, 38, 5, 47, 15,36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(arr));

// 改进冒泡排序： 设置一标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。由于pos位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到pos位置即可。

function bubbleSort2(arr) {
  console.time('----------改进后冒泡排序耗时----------');
  var i = arr.length - 1;  // 初始时，最后位置保持不变
  while (i > 0) {
    var pos = 0;  // 每趟开始时，无记录交换
    for (var j=0; j<i; j++) {
      if (arr[j] > arr[j+1]) {
        pos = j;  // 记录交换的位置
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }      
    }
    i = pos;  // 为下一趟排序作准备
  }
  console.timeEnd('----------改进后冒泡排序耗时----------');
  return arr;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort2(arr));

// 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,我们考虑利用在每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者) , 从而使排序趟数几乎减少了一半。

function bubbleSort3(arr3) {
  var low = 0,
      high = arr.length - 1,
      tmp, j;
  console.time('2.改进后冒泡排序耗时：');

  while (low < high) {
    for (j=low; j<high; ++j){ // 正向冒泡，找到最大值
      if (arr[j] > arr[j+1]) {
        tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
    --high;  // 修改high值，前移一位

    for (j=high; j>low; --j) { // 反向冒泡，找到最小值
      if (arr[j] < arr[j-1]) {
        tmp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = tmp;
      }
    }
    ++low;  // 修改low值，后移一位
  }
  console.timeEnd('2.改进后冒泡排序耗时：');
  return arr3;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort3(arr));
//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]