/**
 * 编写一个javscript函数 fn，该函数有一个参数 n（数字类型），其返回值是一个数组，
 * 该数组内是 n 个随机且不重复的整数，且整数取值范围是 [2, 32]。
 */

var fn = function(n) {
  var arr = [];

  for (var i=0; i<n; i++) {
    var randomNum = getRandom(2, 32);    
    if (contains(arr, randomNum)) {
      i--;
    } else {
      arr.push(randomNum);
    }
  }

  return arr;
}

function getRandom(min, max) {
  var range = max - min;
  var random = Math.random();
  var num = min + Math.round(random * range);

  return num;
}

function contains(arr, val) {  
  if (arr.indexOf(val) !== -1) {
    return true;
  }
  
  return false;
}
