var fibonacci = function(n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number')
  }
  if (n < 0) {
    throw new Error('n should >= 0')
  }
  if (n > 10) {
    throw new Error('n should <= 10')
  }
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

if (require.main === module) {
  // 如果是直接执行main.js 则直接进入此处
  // 如果main.js被其他文件require则此处不会执行
  const n = Number(process.argv[2])
  console.log(`fibonacci(${n}) is ${fibonacci(n)}`)
}

exports.fibonacci = fibonacci
