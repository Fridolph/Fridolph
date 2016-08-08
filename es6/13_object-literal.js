'use strict';

let dessert = '蛋糕',
    drink = '茶';

let food = {
  dessert: dessert,
  drink: drink
}

console.log(food); 
// { dessert: '蛋糕', drink: '茶' }



let food2 = {
  dessert,
  drink,
  breakfast () {
    //
  }
}

console.log(food2); 
// 同样可以得到相同的结果
// { dessert: '蛋糕', drink: '茶', breakfast: [Function: breakfast] }