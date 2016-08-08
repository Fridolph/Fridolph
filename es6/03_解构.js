/**
 * 01 赋值
 */

function breakfast() {
  return ['水果', '牛奶', '面包']
}

let [fruit, drink, food] = breakfast()

console.log(fruit, drink, food);
// '水果', '牛奶', '面包'



/**
 * 02 对象解构
 */

function breakfast () {
  return {
    fruit: '水果',
    drink: '牛奶',
    food: '面包'
  }
}

let {
  fruit: fruit, 
  drink: drink, 
  food: food
} = breakfast()

console.log(fruit, drink, food); 
//'水果', '牛奶', '面包'