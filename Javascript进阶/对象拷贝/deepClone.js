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
  var flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const deepClone = parent => {
  // 维护两个储存循环引用的数组
  const parents = []
  const children = []

  const _clone = parent => {
    if (parent === null) return null
    if (typeof parent !== 'object') return parent

    let child, proto

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = []
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent))
      if (parent.lastIndex) child.lastIndex = parent.lastIndex
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime())
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent)
      // 利用Object.create切断原型链
      child = Object.create(proto)
    }

    // 处理循环引用
    const index = parents.indexOf(parent)

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index]
    }
    parents.push(parent)
    children.push(child)

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i])
    }

    return child
  }
  return _clone(parent)
}

// 测试
class Person {
  constructor(pname) {
    this.name = pname
  }

  static say() {
    console.log('hi')
  }
}

let Mi = new Person('Mi')

const oldObj = {
  a: Person.say,
  b: new Array(1),
  c: new RegExp('ab+c', 'i'),
  d: Mi
}

const newObj = deepClone(oldObj)

console.log(newObj.a, oldObj.a) //[Function: say] [Function: say]
console.log(newObj.b[0], oldObj.b[0]) // undefined undefined
console.log(newObj.c, oldObj.c) // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor) // [Function: person][Function: person]
