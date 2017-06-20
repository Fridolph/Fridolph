/**
 * 生成n个随机数组，每个数组的随机范围为 [rangeL,rangeR] 
 */
const randomArray = function randomArray(n, rangeL, rangeR) {
  var arr = [];

  // 增加判断，增强代码健壮性
  if (typeof n === 'number' && rangeL <= rangeR) {
    for (var i = 0; i<n;i++) {
      arr[i] = Math.round(Math.random() * (rangeR - rangeL + 1) + rangeL);
    }

    return arr;
  } else {
    return '请传入正确的参数'
  }  
}

module.exports = randomArray;

