/**
 * 三种中最严格的。一旦使用，对象就认为是不可改变了。无法再添加、删除或更新属性
 *
 * 如果属性本身是一个对象的话，那该对象可以更新，这称为浅冻结
 *
 * 要想生成一个完全不可改变的对象，所有值是对象的属性必须都要冻结
 */

var obj = {
  greeting: "welcome",
  innerObj: {}
}

// 冻结obj
Object.freeze(obj)

// 静默失败
obj.greeting = 'Hello World!';

// innerObj仍然可以更新
obj.innerObj.greeting = 'Helo World';
console.log('obj.greeting = ' + obj.greeting);
console.log('obj.innerObj.greeting = ' + obj.innerObj.greeting);

// 无法将已有的属性转换成存取器  --  抛出TypeError
Object.defineProperty(obj, 'greeting', {
  get: function() {
    return 'Hello World!';
  }
})

// // 无法删除属性，静默失败
delete obj.greeting;

// // 冻结内部对象
Object.freeze(obj.innerObj);

// // innerObj现在已经被冻结，静默失败
obj.innerObj.greeting = 'Worked so far...';

function makeTypeError() {
  'use strict';

  // 所有尝试都会抛出TypeError
  delete obj.greeting;
  obj.innerObj.greeting = 'Worked so far...';
  obj.greeting = 'Welcome';
}

makeTypeError();