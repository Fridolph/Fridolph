// 序列化一组数据，它可以接受两种不同类型的对象
// 一个输入元素数组
// 一个包含键值对的散列
// 该函数返回一个序列化的字符串
function serialize(a) {
  // 一组序列化后的结果
  var s = [];

  // 如果传入一个数组，则假定该数组为表单元素数据
  if (a.constructor === Array) {
    // 序列化表单元素
    for (var i=0; i<a.length; i++) {
      s.push( a[i].name + '=' + encodeURIComponent( a[i].value ) );
    }
  } 

  // 否则，假定改数组为一个包含键值对的对象
  else {
    // 将键值对序列化
    for(var j in a) {
      s.push( j + '=' encodeURIComponent( a[j] ) );
    }
  }

  // 返回最终结果
  return s.join('&');
}