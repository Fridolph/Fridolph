// 使用performance.now() 获取函数的开始和结束时间 console.log话费时间
// 第一个参数是函数名，随后的参数传递给函数
const timeTaken = callback => {
  console.time('timeTaken')
  const r = callback()
  console.log('输出结果为：' + r)
  console.timeEnd('timeTaken')
  return r
}

timeTaken(() => Math.pow(2, 1000)) 