'use strict';

class Chef {
  constuctor (food) {
    this.food = food;
    this.dish = [];
  }

  get menu () {
    return this.dish
  }

  set menu (dish) {
    this.dish.push(dish)
  }

  cook () {
    console.log(this.food);
  }
}

let Mr_wang = new Chef('');
/*Mr_wang.cook(); // 西红柿 */

console.log(Mr_wang.menu = '青椒');
console.log(Mr_wang.menu = '肉丝');
console.log(Mr_wang.menu);
// ['青椒', '肉丝']

