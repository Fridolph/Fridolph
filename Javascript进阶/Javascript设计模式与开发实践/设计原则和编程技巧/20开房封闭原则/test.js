/**
 * 编写一个javscript函数 fn，该函数有一个参数 n（数字类型），其返回值是一个数组，
 * 该数组内是 n 个随机且不重复的整数，且整数取值范围是 [2, 32]。
 */

var fn = function(n) {
  // 最终生成的数组
  var arr = [];

  for (var i = 0; i < n; i++) {
    // 获取随机数
    var randomNum = getRandom(2, 32);
    // 检查是否重复
    if (n < 30) {
      if (contains(arr, randomNum)) {
        i--;
      } else {
        arr.push(randomNum);
      }
    } else {
      return console.log('您输入的范围有误');
    }
  }

  return arr;
}

function getRandom(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

function contains(arr, val) {
  if (arr.indexOf(val) !== -1) {
    return true;
  }
  return false;
}