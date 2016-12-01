var fs = require('fs')

function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src))  
}

function main(argv) {
  copy(argv[0], argv[1])
}

main(process.argv.slice(2))

// 以上程序使用 fs.readFileSync 从源路径读取文件内容
// 并使用 fs.writeFileSync 将文件内容写入目标路径

// process 是一个全局变量，可通过 process.argv 获得命令行参数
// 由于 argv[0] 固定等于 NodeJS执行程序的绝对路径，
// argv[1] 固定等于主模块的绝对路径，
// 因此第一个命令行参数从 argv[2] 这个位置开始