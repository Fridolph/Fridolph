child_process.fork 是 spawn() 方法的特殊形式，用于创建进程，语法格式如下：
    child_process.fork(modulePath[, args][, options])


参数
参数说明如下：
* modulePath： String，将要在子进程中运行的模块
* args： Array 字符串参数数组
* options：Object
* cwd String 子进程的当前工作目录
* env Object 环境变量键值对
* execPath String 创建子进程的可执行文件
* execArgv Array 子进程的可执行文件的字符串参数数组（默认： process.execArgv）
* silent Boolean 如果为true，子进程的stdin，stdout和stderr将会被关联至父进程，否则，它们将会从父进程中继承。（默认为：false）
* uid Number 设置用户进程的 ID
* gid Number 设置进程组的 ID

返回的对象除了拥有ChildProcess实例的所有方法，还有一个内建的通信信道。

