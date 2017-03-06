/**
 * 我们有这样一段代码，先遍历一个集合，然后往页面中添加一些div,
 * 这些div的innerHTML分别对应集合里的元素
 */
var appendDiv = function(data) {
  for (var i = 0, l = data.length; i < l; i++) {
    var div = document.createElement('div');
    div.innerHTML = data[i];
    document.body.appendChild(div);
  }
}

appendDiv([1,2,3,4,5,6]);
// appendDiv本只是负责渲染数据，这个还承担遍历聚合对象data对职责
// 我们有必要把遍历data的职责提取出来，这正是迭代器模式的意义，
// 迭代器模式提供了一种方法来访问聚合对象，而不用暴露这个对象的内部表示。

var each = function(obj, callback) {
  var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike(obj);  // isArraylike函数未实现，可翻阅jQuery源码

  if (isArray) { // 迭代类数组
    for (; i < length; i++) {
      callback.call(obj[i], i, obj[i]);
    }
  } else {
    for (i in obj) { // 迭代Object对象
      value = callback.call(obj[i], i, obj[i]);
    }
  }
  return obj;
}

var appendDiv = function(data) {
  each(data, function(i, n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
  });
}

appendDiv([1,2,3,4,5,6]);
appendDiv( {a: 1, b: 2, c: 3, d: 4} );