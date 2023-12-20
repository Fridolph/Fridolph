## stream常用类型总结

再次回顾这张图 source通过一个管道流向了dest，如下图：

这里的source可能是http请求中的request，也可能是读取文件的stream对象，也可能是process.stdin；这里的dest可能是请求中的response，也可能是写入文件的stream对象，也可能是process.stdout；这里的管道就是pipe函数。

先不管pipe函数。source和dest完全就是两个不同的类型，一个是读取数据的，叫做readable stream，一个是写入数据的，叫作Writeable stream。除了这两种类型之外，还有一种类型叫作duplex stream（双工流），即有读取又有写入能力。示例代码如下：

```js
var fs = require('fs')
var zlib = require('zlib')
var readStream = fs.createReadStream('./file.txt')
var writeStream = fs.createWriteStream('./file.txt')
readStream.pipe(zlib.createGzip()).pipe(writeStream)
```

### readable stream

http请求中的request和读取文件的stream对象都是readable stream。它有两种常用操作方式，第一种是直接将数据pipe到一个Writeable stream

```js
var fileName = path.resolve(__dirname, 'data.txt')
var stream = fs.createReadStream(fileName)
//
stream.pipe(res)
```

第二种是通过监听on end自定义事件来获取数据再手动处理，例如之前讲解post请求时的代码示例

```js
var dataStr = ''
req.on('data', function(chunk) {
  // 接收到数据先存储起来
  var chunkStr = chunk.toString()
  dataStr += chunkStr
})
req.on('end',function() {
  // 接收完数据将数据写入文件
  var fileName = path.resolve(__dirname, 'post.txt')
  fs.writeFile(fileName, dataStr)
  res.end('OK')
})
```

以上说的两个例子，都是已经分装好的readable stream，那么它本来的面目是怎样的？如下代码：

```js
var Readable = require('stream').Readable
// 构造一个readable stream并往里添数据
var rs = new Readable
rs.push('learn')
rs.push('nodejs')
rs.push('stream')
rs.push(null)
// pipe到一个Writeable stream
rs.pipe(process.stdout)
```

从上代码可看出，nodejs提供了readable stream的构造函数，可以new出一个新的readable stream对象。然后通过push函数往里灌入完成，即可输入了。最后pipe到了一个Writeable stream

### Writeable stream

根据之前的分析，http请求中的response和写入文件的stream对象都是Writeable stream，它可以作为参数传入pipe函数，以读取上游的数据。例如之前讲解文件操作时拷贝文件的代码示例。

```js
var fileName = path.resolve(__dirname, 'post.txt')
var writeStream = fs.createWriteStream(fileName)
res.pipe(writeStream)
```

以上代码中 writeStream 是已经封装好了的 Writeable stream ，下面再来看看它的真实面目。

```js
var Writeable = require('stream').Writeable

var ws = Writeable()
ws._write = function(chunk, enc, next) {
  // 输出流动的数据
  console.log(chunk.toString())
  // 继续监听下一次输出
  next()
}
// 作为参数传递到pipe函数中
process.stdin.pipe(ws)
```

根据以上代码得知，nodejs提供了Writeable构造函数可以new一个新的Writeable stream。通过实现它的_write方法即可监听到每次流动的数据，运行next()可继续监听.

### 再谈pipe

之前一直是用`source.pipe(dest)`这种模式来用pipe的，其实pipe可以链式调用。例如上文演示的duplex stream示例代码`readStream.pipe(zlib.createGzip()).pipe(writeStream)`，还有之前讲解文件操作最后列举的gulp配置文件~

之前讲解`source.pipe(dest)`模式是为了方便理解和使用，现在我们更新一个更严谨的pipe用法：

* 调用pipe的对象必须是readable stream或者duplex stream，即具有读取数据的功能，如req.pipe(...)
* 传入pipe的参数必须是writeable stream或者duplex stream, 即具有写入数据的功能，如req.pipe(res)
* pipe支持链式调用

更新了pipe的最新规则，再来看就不会有困惑了。

### 小结

这里主要讲解了stream的常用类型和pipe函数的规则：

* stream的常见类型：readable stream和writeable stream
* readable stream的本质和用法
* writeable stream的本质和用法
* pipe的新规则
