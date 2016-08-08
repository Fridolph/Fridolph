'use strict';

/*function* chef() {
  yield '西红柿';
  yield '鸡蛋';
}

let Mr_wang = chef();

console.log(Mr_wang.next());
// Object {value: '西红柿', done: false}
console.log(Mr_wang.next());
// Object {value: '鸡蛋', done: false}
console.log(Mr_wang.next());
// Object {value: undefinded, done: true}
*/


let function* chef (fodds) {
  for (var i = 0; i < foods.length; i++) {
    yield foods[i];
  }
}

let Mr_wang = chef(['西红柿', '鸡蛋']);

