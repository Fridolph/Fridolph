// Node.js在单线程中运行单实例。有时，开发者为了多核系统，会用一串的Node.js进程去处理负载任务
// cluster模块允许简单容易的创建共享服务器端口的子进程

const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`)
  })
} else {
  // 工作进程可以共享任何TCP连接
  // 在本例中，共享的是一个HTTP服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n')
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`)
}
