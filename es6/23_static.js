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

  static cook (food) {
    console.log(this.food);
  }
}

Chef.cook('西红柿'); // 西红柿

