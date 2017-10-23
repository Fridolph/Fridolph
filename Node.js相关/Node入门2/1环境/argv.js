/**
 * argv
 * argv0
 * execArgv
 * execPath
 */

const {argv, argv0, execArgv, execPath} = process

argv.forEach(item => {
  // console.log(item)
})

// node argv.js --test a=1 b=2 可以在启动文件时 带上某些参数

// console.log(argv0)

// console.log(execArgv)

console.log(execPath)