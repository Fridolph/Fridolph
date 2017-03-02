/**
 * 迭代器可以像普通for循环中的break一样，提供一种跳出循环的方法
 */

var each = function(arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback(i, arr[i]) === false) {  // callback的执行结果返回false，提前终止迭代
      break;
    }
  }
};

each([1,2,3,4,5], function(i, n) {
  if (n > 3) {  // n大于3时终止循环
    return false;
  }
  console.log(n);
})