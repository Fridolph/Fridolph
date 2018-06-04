var _  = require('underscore');

// 遍历list中的所有元素，按顺序用遍历输出每个元素。如果传递了context参数，则把iteratee绑定到context对象上。
// 每次调用iteratee都会传递三个参数：(element, index, list)。如果list是个JavaScript对象，
// iteratee的参数是 (value, key, list))。返回list以方便链式调用。

/*_.each([1,2,3], function(val, key) {
  console.log(`val - ${val}\nkey - ${key}\n`);
});*/

_.each({one: 1, two: 2, three: 3}, function(val, key) {
  console.log(`key - ${key}\nval - ${val}\n`);
})

// 注意：集合函数能在数组，对象，和类数组对象，比如arguments, NodeList和类似的数据类型上正常工作。 
// 但是它通过鸭子类型工作，所以要避免传递一个不固定length属性的对象
// （愚人码头注：对象或数组的长度（length）属性要固定的）。每个循环不能被破坏 - 打破， 使用_.find代替，这也是很好的注意。