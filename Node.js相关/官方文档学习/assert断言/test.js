const assert = require('assert');

const obj1 = {
  a: {
    b: 1
  }
};
const obj2 = {
  a: {
    b: 2
  }
};
const obj3 = {
  a: {
    b: 1
  }
};
const obj4 = Object.create(obj1);

// assert.deepEqual(obj1, obj1);

// assert.deepEqual(obj1, obj2);

// assert.deepEqual(obj1, obj3);

assert.deepEqual(obj1, obj4);

// 如果两个值不相等，则抛出一个带有 message 属性的 AssertionError，其中 message 属性的值等于传入的 message 参数的值。 如果 message 参数为 undefined，则赋予默认的错误信息。