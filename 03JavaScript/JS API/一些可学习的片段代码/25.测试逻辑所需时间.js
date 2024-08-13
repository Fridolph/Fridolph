// 使用performance.now（）获取函数的开始和结束时间，console.log（）所花费的时间。第一个参数是函数名，随后的参数传递给函数。
const timeTaken = (cb) => {
  console.time(`timeTaken`)
  const r = cb()
  console.timeEnd(`timeTaken`)
  return r
}
