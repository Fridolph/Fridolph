/**
 * 内部迭代器，each函数内部已经定义好了迭代规则，完全接手整个迭代过程，外部只需要一次初始调用
 *
 * 内部迭代器在调用时方便，外界不用关心迭代器内部实现，
 * 跟迭代器的交互也仅是初始调用，但这也刚好是内部迭代器的缺点。
 * 由于内部迭代器的迭代规则已经被提前规定，上面的each函数就无法同时迭代两个数组了
 */

/**
 * 需求：要判断2个数组里元素的值是否相等，如果不改写each函数本身，
 * 我们能够入手的地方只剩下each的回调了，代码如下：
 */
 var each = function(arr, callback) {
   for (var i = 0, l = arr.length; i < l; i++) {
     // 把下标和元素当作参数传给callback函数
     callback.call(arr[i], i, arr[i]);
   }
 }
var compare = function(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    console.log('arr1与arr2不相等');
  }
  each(arr1, function(i, n) {
    if (n !== arr2[i]) {
      console.log('arr1与arr2不相等');
    }
  });
  console.log('arr1和arr2相等');
};

compare([1,2,3], [1,2,4]);