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

let sunday = Object.create(breakfast);
console.log(sunday.getDrink());
// 绿茶
console.log(Object.getPrototypeOf(sunday) === breakfast);
// true

Object.setPrototypeOf (sunday, dinner);
/**
 * 第一个参数为 要设置的对象
 * 第二个参数为 要设置成prototype的对象
 */
console.log(sunday.getDrink());
// 啤酒
console.log(Object.getPrototypeOf(sunday) === dinner);
// true