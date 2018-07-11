// add(1)(2)(3)  add(1, 2)(3)
// 字符串拼接需要调用toString方法优先调用toString，
// 若调用后还是不能返回原始类型，则继续调用 valueOf
function add() {
  // 这里也用到了闭包，对参数存储
  let args = [].slice.call(arguments)
  let fns = function() {
    // 这里的递归是为了合并参数
    let fn = [].slice.call(arguments)
    return add.apply(null, args.concat(fn))
  }

  fns.valueOf = function() {
    return args.reduce((acc, val) => acc + val)
  }
  return fns
}
