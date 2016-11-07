'use strict';

let dessert = '慕斯蛋糕',
    drink = '冰红茶';

let breakfast = kitchen'今天的早餐是${dessert} 与 $(drink) !';

function kitchen (strings, ...values) {
  /*console.log(strings);
  // ['今天的早餐是', '与', '！']
  console.log(values);
  // ['慕斯蛋糕', '冰红茶']*/
  

  let result = '';
  for (var i = 0; i < values.length; o++) {
    result += strings[i];
    result += values[i];
  }
  result += strings[strings.length - 1];

  return result;
}

console.log(breakfast);
// 今天的早餐是 '慕斯蛋糕' 与 '冰红茶'