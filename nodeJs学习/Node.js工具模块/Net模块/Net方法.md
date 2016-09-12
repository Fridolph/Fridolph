// Node.js Net 模块提供了一些用于底层的网络通信的小工具，包含了创建服务器/客户端的方法，我们可以通过以下方式引入该模块：
// var net = require("net")

// 1 net.createServer([options][, connectionListener])
// 创建一个 TCP 服务器。参数 connectionListener 自动给 'connection' 事件创建监听器。
// 2 net.connect(options[, connectionListener])
// 返回一个新的 'net.Socket'，并连接到指定的地址和端口。
// 当 socket 建立的时候，将会触发 'connect' 事件。
// 3 net.createConnection(options[, connectionListener])
// 创建一个到端口 port 和 主机 host的 TCP 连接。 host 默认为 'localhost'。
// 4 net.connect(port[, host][, connectListener])
// 创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
// 5 net.createConnection(port[, host][, connectListener])
// 创建一个端口为 port 和主机为 host的 TCP 连接 。host 默认为 'localhost'。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
// 6 net.connect(path[, connectListener])
// 创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件上。返回 'net.Socket'。
// 7 net.createConnection(path[, connectListener])
// 创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
// 8 net.isIP(input)
// 检测输入的是否为 IP 地址。 IPV4 返回 4， IPV6 返回 6，其他情况返回 0。
// 9 net.isIPv4(input)
// 如果输入的地址为 IPV4， 返回 true，否则返回 false。
// 10  net.isIPv6(input)
// 如果输入的地址为 IPV6， 返回 true，否则返回 false。