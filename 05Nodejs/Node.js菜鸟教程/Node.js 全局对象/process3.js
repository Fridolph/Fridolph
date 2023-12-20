// 1 abort() 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。

// 2 chdir(directory) 改变当前工作进程的目录，如果操作失败抛出异常。
// 
// 3 cwd() 返回当前进程的工作目录
// 
// 4 exit([code]) 使用指定的 code 结束进程。如果忽略，将会使用 code 0。
// 
// 5 getgid() 获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。
// 
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 6 setgid(id) 设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 7 getuid() 获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 8 setuid(id) 设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID 。
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 9 getgroups() 返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 10  setgroups(groups) 设置进程的群组 ID。这是授权操作，所有你需要有 root 权限，或者有 CAP_SETGID 能力。
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 11  initgroups(user, extra_group) 读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所有你需要有 root 权限，或者有 CAP_SETGID 能力。
// 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// 
// 12  kill(pid[, signal]) 发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。
// 
// 13  memoryUsage() 返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。
// 
// 14  nextTick(callback) 一旦当前事件循环结束，调用回到函数。
// 
// 15  umask([mask]) 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。
// 
// 16  uptime() 返回 Node 已经运行的秒数。
// 
// 17  hrtime() 返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]
// 数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。
// 你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。

// 输出当前目录
console.log("当前目录: " + process.cwd());

// 输出当前版本
console.log("当前版本: " + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());