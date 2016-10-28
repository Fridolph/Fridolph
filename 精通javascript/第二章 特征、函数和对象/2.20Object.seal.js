/**
 * 使用Object.seal()能够限制对象的能力，这类似于Object.preventExtensions(), 不过和之前例子不同的是，属性不能删除，也不能转换成存取器( accessor, getter方法 )
 * 删除或添加属性同样会导致TypeError错误，已有的可写属性则是例外，正常可以更新。
 */

var obj = {};
obj.greeting = 'Welcome';
Object.seal(obj);

// 更新已有的可写属性
// 无法将已有属性转换成存取器，抛出TypeError
obj.greeting = 'Hello World';
obj.defineProperty(obj, 'greeting', {
  get: function() {
    return 'Hello World!'
  }
})

// 无法删除属性，静默失败
delete obj.greeting;

function makeTypeError() {
  'use strict';

  // 试图删除属性时会产生TypeError
  delete obj.greeting;

  // 仍然可以更新属性
  obj.greeting = 'welcome';
  console.log(obj.greeting);
}