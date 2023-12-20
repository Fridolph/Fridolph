/**
 * Process属性
 *
 * stdout 标准输出流
 * 
 * stderr 标准错误流
 * 
 * stdin 标准输入流
 * 
 * argv 该属性返回一个数组，由命令行执行脚本时的各个参数组成，它的第一个成员总是node, 第二个成员是脚本文件名, 其余成员是脚本文件的参数
 * 
 * execPath 返回执行当前脚本的Node二进制文件的绝对路径
 * 
 * execArgv 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数
 *
 * env 返回一个对象，成员为当前shell环境变量
 *
 * exitCode 进程退出时的代码，如果进程优先通过process.exit()退出，不需要指定退出码
 *
 * version 包含了node 的版本和依赖
 *
 * config 一个包含用来编译当前node执行文件的javascript配置选项的对象。它与运行 ./configure 脚本生成的"config.gypi"文件相同
 *
 * pid 当前进程的进程号
 *
 * title 进程名，默认为"node"， 可以自定义
 *
 * arch 当前的CPU架构 arm ia32 x64
 *
 * platform 运行时所在平台系统
 *
 * mainModule require.main的备选方法. 
 * 
 */

// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

// 获取执行路局
console.log(process.execPath);


// 平台信息
console.log(process.platform);