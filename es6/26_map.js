'use strict';

let food = new Map();
let fruit = {}, cook = function () {}, dessert = '甜点';

food.set(fruit, '柠檬');
food.set(food, '烹饪');
food.set(dessert, '哈根达斯');

console.log(food);
// Map {Object {} => "柠檬", function function => "烹饪", "甜点" => "哈根达斯" }
// 
console.log(food.size); // 3
console.log(food.get(fruit)); // 柠檬
console.log(food.get(cook)); // 烹饪

food.delete(dessert);
console.log(food.has(dessert)); // false

food.forEach( (value, key) => {
  console.log('${key} = ${value}');
} );
// [
//   Object Object = 柠檬
//   function cook() {} = 烹饪
// ]

food.clear();
console.log(food); // Map {}