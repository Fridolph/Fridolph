/**
 * 迭代器模式提供了循环访问一个聚合对象中每个元素的方法，
 * 但它没有规定我们以顺序、倒序还是中序来循环遍历聚合对象。
 *
 * 下面实现一个倒序访问的迭代器：
 */

var reverseEach = function(arr, callback) {
  for (var l = arr.length - 1; l >= 0; l--) {
    callback(l, arr[l]);
  }
}

reverseEach([0,1,2], function(i, n) {
  console.log(n);
})