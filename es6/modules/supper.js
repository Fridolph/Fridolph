'use strict';

let fruit = '柠檬';
let dessert = '蛋糕';

function dinner(fruit, dessert) {
  console.log('今天的晚餐是：${fruit} 与 ${dessert}');
}

export {fruit, dessert, dinner as supper};