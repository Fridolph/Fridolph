function isArray(arg) {
  if (typeof arg === 'object') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return false
}

console.log(isArray('123'));
console.log(isArray([]));