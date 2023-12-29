> net模块构成了Node网络特性的基础。

问题：
想要启动自己的TCP服务，绑定一个端口，通过网络发送数据。

解决方案：
使用net.createServer创建一个服务，然后调用server.listen绑定到一个端口。
连接服务端，或者用命令行工具telnet或者创建一个进程内的客户端连接副本, net.connect。

