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
  __proto__: breakfast
}

console.log(sunday.getDrink());
// 绿茶
console.log(Object.getPrototypeOf(sunday) === breakfast);
// true

sunday.__proto__ = dinner;
console.log(sunday.getDrink());
// 啤酒
console.log(Object.getPrototypeOf(sunday) === dinner);
// true