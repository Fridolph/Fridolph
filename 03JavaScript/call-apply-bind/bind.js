Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
     throw new Error('必须bind一个函数')
  }
  const that = this
  const args = [...arguments].slice(1)
  return function F() {
    // 因为返回了一个函数，我们可以 new F() 所以需要判断
    if (this instanceof F) {
      return new that(...args, ...arguments)
    }
    return that.apply(context, args, concat(...arguments))
  }
}
