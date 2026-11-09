function deepClone(target) {  
  if (target === null) return target
  // JS内置对象 基础类型不需要深拷贝
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (typeof target !== 'object') return target
  // 初始化返回结果
  let result 
  if (Array.isArray(target)) {
    result = []
  } else {
    result = {}
  }
  // 处理 和 递归
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      return result[key] = deepClone(target[key])
    }
  }

  return result
}