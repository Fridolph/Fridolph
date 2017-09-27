// arguments对象是所有函数中可用的局部变量。你可以使用arguments对象在函数中引用函数的参数
// 此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始

function learnArguments(params) {
  var args = Array.prototype.slice.call(arguments, 1);

  console.log(args);
}

learnArguments([1,2,3,4], 1);
