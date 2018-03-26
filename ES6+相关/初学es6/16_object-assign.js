'use strict';

let breakfast = {};

/**
 * 第一个参数为接受者（复制到的目标）
 * 第二个参数为复制源
 */

/*Object.assign(
  breakfast,
  {drink: '啤酒'}
);

console.log(breakfast);
// Object {drink: '啤酒'}*/


Object.assign(
  breakfast,
  {drink: '啤酒'},
  {drink: '冰红茶'}
);

console.log(breakfast);
// Object {drink: '冰红茶'}
// 传入相同的参数， 后面会覆盖掉前面的

