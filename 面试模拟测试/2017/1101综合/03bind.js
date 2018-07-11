Function.prototype.bind = function(context) {
  // 判断调用此方法的是否是一个函数，不是函数就报错
  if (typeof this !== 'function') {
    throw new Error(this + 'is not a function')
  }
  var self = this
  var args = []
  // 把参数循环出来
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  var bound = function() {
    var bindArgs = Array.prototype.slice.call(arguments)
    self.apply(this instanceof self ? this : context, args.concat(bindArgs))
  }
  bound.prototype = Object.create(self.prototype)
  return bound
}
