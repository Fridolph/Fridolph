> 可写的流可用于输出数据到底层的I/O

问题：
使用一个流接口I/O输出数据

解决方案：
stream.Writable并且实现一个_write方法向底层源数据发送数据



你可能会只是希望简单实现一个可写流作为管道链，或者实现不支持的I/O资源。在一般情况下，所有你需要做的是正确地继承stream.Writable，然后添加一个_write方法

所有的_write方法需要做的就是当数据被写入时调用提供的回调。

MyWritable.prototype._write = (chunk, encoding, callback) => {
  this.customWriteOperation(chunk, (err) => {
    callback(err);
  });
}

注：
* chunk 参数是Buffer的一个实例或者是一个字符串
* customWriteOperation是你的类中自定义的写操作，它可以是伊布都 ，这样的话回调会在之后安全地调用
* 如果发生了错误，要调用Node内部代码提供的回调

一个_wirte方法提供一个回调，你可以在写完时调用，这允许_write是异步的。
在这里customWriteOperation方法被简单地使用——在真正实现时，将执行基本I/O。
这可能涉及通过套接字访问数据库，或写入文件。提供给回调的第一个参数应该是一个错误，
允许在需要时_write传递错误。

节点的stream.Writable基类并不需要知道数据如何写，它只需要关心操作是成功还是失败。错误可以通过传递一个错误的对象回调报告调用者。这将导致错误的事件被触发。请记住这些数据流的基类，所以你通常应该添加一个监听器捕获错误并优雅地处理错误。