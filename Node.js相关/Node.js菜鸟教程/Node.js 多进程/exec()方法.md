##exec() 方法

child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。

语法如下所示：

    child_process.exec(command[, options], callback)

参数
参数说明如下：
* command： 字符串， 将要运行的命令，参数使用空格隔开
* options ：对象，可以是：
* cwd ，字符串，子进程的当前工作目录
* env，对象 环境变量键值对
* encoding ，字符串，字符编码（默认： 'utf8'）
* shell ，字符串，将要执行命令的 Shell（默认: 在 UNIX 中为/bin/sh， 在 Windows 中为cmd.exe， Shell 应当能识别 -c开关在 UNIX 中，或 /s /c 在 Windows 中。 在Windows 中，命令行解析应当能兼容cmd.exe）
* timeout，数字，超时时间（默认： 0）
* maxBuffer，数字， 在 stdout 或 stderr 中允许存在的最大缓冲（二进制），如果超出那么子进程将会被杀死 （默认: 200*1024）
* killSignal ，字符串，结束信号（默认：'SIGTERM'）
* uid，数字，设置用户进程的 ID
* gid，数字，设置进程组的 ID
* callback ：回调函数，包含三个参数error, stdout 和 stderr。
* exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。

