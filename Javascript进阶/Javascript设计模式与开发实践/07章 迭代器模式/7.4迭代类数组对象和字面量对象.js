/**
 * 迭代器模式不仅可以迭代数组，还可以迭代一些类数组的对象。
 * 据观察，无论哪种迭代，只要被迭代的聚合对象拥有length属性且可以用下标访问，那它就可以被迭代。
 *
 * 在JS中，for in 语句可以用来迭代普通字面量对象的属性。jQuery提供$.each函数来封装各种迭代行为：
 */

$.each = function(obj, callback) {
  var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike(obj);

  if (isArray) { // 迭代类数组
    for (; i < length; i++) {
      value = callback.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  } else {
    for (i in obj) { // 迭代object对象
      value = callback.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  }
  return obj;
}