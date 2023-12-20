var _ = require('underscore');

// 通过转换函数(iteratee迭代器)映射列表中的每个值产生价值的新数组。
// iteratee传递三个参数：value，然后是迭代 index 或 key,最后一个是引用指向整个list。
// 愚人码头注：如果list是个JavaScript对象是，这个参数就是key)

// _.map([1, 2, 3], function(num){ console.log(num * 3); });
// _.map({one: 1, two: 2, three: 3}, function(num, key){ console.log(`key: ${key}, val: ${num * 3}`)});

_.map([[1,2], [3,4]], _.first);  // [1,3]