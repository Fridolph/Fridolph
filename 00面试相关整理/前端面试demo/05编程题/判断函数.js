function isFunction(obj) {
  if (obj) {
    if (typeof (/./) !== 'function') {
      return typeof obj === 'function'
    } else {
      return Object.prototype.toString.call(obj) === '[object Function]'
    }
  }
  return false
}

var a = function() {}

console.log(isFunction('123'));
console.log(isFunction(a));