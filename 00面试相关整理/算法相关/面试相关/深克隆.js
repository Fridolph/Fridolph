const cloneDeep = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  switch (Object.prototype.toString.call(obj)) {
    case '[object Array]':
      return Object.entries(obj).reduce(
        (acc, [key, value]) => Object.assign(acc, {[key]: cloneDeep(value)}),
        []
      )
    case '[object RegExp]':
    case '[object Date]':
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
      return new obj.constructor(obj)
    default:
      return Object.entries(obj).reduce(
        (acc, [key, value]) => Object.assign(acc, {[key]: cloneDeep(value)}),
        {}
      )
  }
}
