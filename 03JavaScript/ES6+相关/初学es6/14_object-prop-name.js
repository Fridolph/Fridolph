'use strict';

let food = {};
let drink = 'hot drink';

food.dessert = '蛋糕';
/**
 * food.hot drink = '茶'; 
 * 这样写会有语法错误， 不能有空格
 */

// food.['hot drink'] = '冰红茶';
food.[drink] = '冰红茶';
console.log(food);