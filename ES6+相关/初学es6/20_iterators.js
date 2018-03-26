'use strict';

/**
 * [手工来创建迭代器]
 * @param  {[type]} foods [description]
 * @return {[type]}       [description]
 */
function chef (foods) {
  let i = 0;

  return {
    next () {
      let done = (i >= foods.length);
      let value = !done ? foods[i++] : undefined;

      return {
        value: value,
        done: done
      }
    }
  }
}

let Mr_wang = chef(['西红柿', '鸡蛋']);
console.log(Mr_wang.next());
// Object {value: '西红柿', done: false}
console.log(Mr_wang.next());
// Object {value: '鸡蛋', done: false}
console.log(Mr_wang.next());
// Object {value: undefinded, done: true}
