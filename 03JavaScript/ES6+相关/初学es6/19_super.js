'use strict';

let breakfast = {
  getDrink () {
    return '绿茶'
  }
}

let dinner = {
  getDrink () {
    return '啤酒'
  }
}

let sunday = {
  __proto__: breakfast,
  getDrink () {
    return super.getDrink() + '牛奶'
  }
}

console.log(sunday.getDrink());
// 绿茶 牛奶