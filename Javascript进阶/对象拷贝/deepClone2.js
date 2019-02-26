function deepClone(source, target) {
  let target = target || {}
  let toString = Object.prototype.toString
  let arrType = '[object Array]'

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (toString.call(source[key]) === arrType) {
          target[key] = []
        } else {
          target[key] = {}
        }
        deepClone(source[key], target[key])
      } else {
        target[key] = source[key]
      }
    }
  }
}
