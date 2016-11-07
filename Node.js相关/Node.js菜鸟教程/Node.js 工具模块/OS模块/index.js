// Node.js os 模块提供了一些基本的系统操作函数。我们可以通过以下方式引入该模块：

// 1 os.tmpdir()
// 返回操作系统的默认临时文件夹。
// 
// 2 os.endianness()
// 返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
// 
// 3 os.hostname()
// 返回操作系统的主机名。
// 
// 4 os.type()
// 返回操作系统名
// 
// 5 os.platform()
// 返回操作系统名
// 
// 6 os.arch()
// 返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"
// 
// 7 os.release()
// 返回操作系统的发行版本
// 
// 8 os.uptime()
// 返回操作系统运行的时间，以秒为单位
// 
// 9 os.loadavg()
// 返回一个包含 1、5、15 分钟平均负载的数组
// 
// 10  os.totalmem()
// 返回系统内存总量，单位为字节
// 
// 11  os.freemem()
// 返回操作系统空闲内存量，单位是字节
// 
// 12  os.cpus()
// 返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）
// 
// 13  os.networkInterfaces()
// 获得网络接口列表

var os = require('os')

// CPU 的字节序
console.log('endianness : ' + os.endianness());

// 操作系统名
console.log('type : ' + os.type());

// 操作系统名
console.log('platform : ' + os.platform());

// 系统内存总量
console.log('total memory : ' + os.totalmem() + " bytes.");

// 操作系统空闲内存量
console.log('free memory : ' + os.freemem() + " bytes.");