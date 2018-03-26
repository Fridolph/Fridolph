'use strict';

let breakfast = dessert => dessert;

// es5的写法

var breakfast = function breakfast (dessert) {
  return dessert;
}


/**
 * 多个参数时
 */

let breakfast = (dessert, drink) => {
  return dessert + drink;
}

// es5的写法

var breakfast = function breakfast (dessert, drink) {
  return dessert + drink;
}