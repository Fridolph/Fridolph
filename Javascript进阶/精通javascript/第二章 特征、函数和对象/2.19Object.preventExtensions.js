var obj = {};
var obj2= Object.preventExtensions(obj);

function makeTypeError() {
  'use strict';

  //试图定义新属性时会产生TypeError错误
  Object.defineProperty(obj2, 'greeting', {value: 'Hello World!'});
}

makeTypeError()