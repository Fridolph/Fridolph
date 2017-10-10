// Node.js在单线程中运行单实例。有时，开发者为了多核系统，会用一串的Node.js进程去处理负载任务
// cluster模块允许简单容易的创建共享服务器端口的子进程

const cluster = require('cluster')
const worker = cluster.fork();
worker.on('exit', (code, signal) => {
  if (signal) {
    console.log(`worker was killed by signal: ${signal}`);
  } else if (code !== 0) {
    console.log(`worker exited with error code: ${code}`);
  } else {
    console.log('worker success!');
  }
});