1 server.listen(port[, host][, backlog][, callback])
监听指定端口 port 和 主机 host ac连接。 默认情况下 host 接受任何 IPv4 地址(INADDR_ANY)的直接连接。端口 port 为 0 时，则会分配一个随机端口。

2 server.listen(path[, callback])
通过指定 path 的连接，启动一个本地 socket 服务器。

3 server.listen(handle[, callback])
通过指定句柄连接。

4 server.listen(options[, callback])
options 的属性：端口 port, 主机 host, 和 backlog, 以及可选参数 callback 函数, 他们在一起调用server.listen(port, [host], [backlog], [callback])。还有，参数 path 可以用来指定 UNIX socket。

5 server.close([callback])
服务器停止接收新的连接，保持现有连接。这是异步函数，当所有连接结束的时候服务器会关闭，并会触发 'close' 事件。

6 server.address()
操作系统返回绑定的地址，协议族名和服务器端口。

7 server.unref()
如果这是事件系统中唯一一个活动的服务器，调用 unref 将允许程序退出。

8 server.ref()
与 unref 相反，如果这是唯一的服务器，在之前被 unref 了的服务器上调用 ref 将不会让程序退出（默认行为）。如果服务器已经被 ref，则再次调用 ref 并不会产生影响。

9 server.getConnections(callback)
异步获取服务器当前活跃连接的数量。当 socket 发送给子进程后才有效；回调函数有 2 个参数 err 和 count。

事件
1 listening
当服务器调用 server.listen 绑定后会触发。
2 connection
当新连接创建后会被触发。socket 是 net.Socket实例。
3 close
服务器关闭时会触发。注意，如果存在连接，这个事件不会被触发直到所有的连接关闭。
4 error
发生错误时触发。'close' 事件将被下列事件直接调用。