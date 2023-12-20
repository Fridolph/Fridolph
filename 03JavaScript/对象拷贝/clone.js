// 深克隆两大步
// 1. 判断类型
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false
  const typeString = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]'
      break
    case 'Date':
      flag = typeString === '[object Date]'
      break
    case 'RegExp':
      flag = typeString === '[object RegExp]'
      break
    default:
      flag = false
  }
  return flag
}

const getRegExp = re => {
  let flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}

// 2. 定义方法
const deepClone = target => {
  // 维护两个存储循环引用的数组
  const parents = []
  const children = []

  const clone = target => {
    if (target === null) return null
    if (typeof target !== 'object') return target

    let child
    let proto

    // 对数组进行特殊处理
    if (isType(target, 'Array')) {
      child = []
    } else if (isType(target, 'RegExp')) {
      // 对正则特殊处理
      child = new RegExp(target.source, getRegExp(target))
      if (target.lastIndex) child.lastIndex = target.lastIndex
    } else if (isType(target, 'Date')) {
      // 对日期对象做特殊处理
      child = new Date(target.getTime())
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(target)
      // 利用Object.create切断原型链
      child = Object.create(proto)
    }
    // 处理循环引用
    const index = parents.indexOf(target)

    if (index !== -1) {
      // 如果父数组存在本对象，说明之前已经被引用过，直接返回此对象
      return children[index]
    }
    parents.push(target)
    children.push(child)

    for (let key in target) {
      child[key] = clone(target[key])
    }
    return child
  }
  return clone(target)
}
