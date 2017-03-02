/**
 * 现在我们来自己实现一个each函数
 * 第一个参数为被循环的数组
 * 第二个参数为循环中的每一步后将被触发的回调函数
 */

var each = function(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    // 把下标和元素当作参数传给callback函数
    callback.call(arr[i], i, arr[i]);
  }
}

each([1,2,3], function(i, n) {
  console.log([i, n]);
});