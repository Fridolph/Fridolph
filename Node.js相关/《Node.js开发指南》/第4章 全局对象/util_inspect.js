/**
 * util.inspect(object, [showHidden], [depth], [colors]) 是一个将任意对象转换为字符串的方法，通常用于调试和错误输出
 *
 * 它至少接受一个参数object, 即要转换的对象
 *
 * showHidden 是一个可选参数，如果值为true, 将会输出更多隐藏信息
 *
 * depth 表示最大递归的层数，如果对象很复杂，它可以制定层数以控制输出信息的多少。 如果不指定depth, 默认会递归2层，指定为null表示将不限递归层数完整遍历对象。
 *
 * 如果color值为true，输出格式将会以ANSI颜色编码，通常用于终端显示更漂亮的效果
 *
 * 特别要指出的是， util.inspect并不会简单地把对象转换为字符串，即时该对象定义了 toString 方法也不会调用
 */

var util = require('util');

function Person() {
  this.name = 'byvoid';

  this.toString = function() {
    return this.name;
  }
}

var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj, true));