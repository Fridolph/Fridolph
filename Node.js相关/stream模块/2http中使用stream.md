# 在HTTP GET请求中使用stream

## node.js实现http请求

```js
var http = require('http')
var fs = require('fs')
var path = require('path')

var server = http.createServer(function(req, res) {
  var fileName = path.resolve(__dirname, 'data.txt')
  fs.readFile(fileName, function(err, data) {
    res.end(data)
  })
})
server.listen(8000)
```

## get请求和response

通过req.method可获取请求方法

```js
var http = require('http')
var path = require('path')
var fs = require('fs')

var server = http.createServer(function(req, res) {
  var method = req.method
  if (method === 'GET') {
    var fileName = path.resolve(__dirname, 'data.txt')
    fs.readFile(fileName, function(err, data) {
      res.end(data)
    })
  }
})
server.listen(8000)
```

### response和stream

response常用的API有send、end等，如上面代码中的`res.end(data)`，但是response也是一个stream对象。大家再次回顾一开始的管道换水的图，以及source.pipe(dest)模型，response就是一个dest

```js
var http = require('http')
var path = require('path')
var fs = require('fs')

var server = http.createServer(function(req, res) {
  var method = req.method
  if (method === 'GET') {
    var fileName = path.resolve(__dirname, 'data.txt')
    var stream = fs.createReadStream(fileName)
    stream.pipe(res)
  }
})

server.listen(8000)
```

### 使用stream对性能的提升

略

###　实际应用

对response使用stream特性能提高性能。因此，在nodejs中如果要返回的数据是经过IO操作得来的，例如上面例子中读取文件内容，可以直接使用stream.pipe(res)这种方式，而不再使用res.end(data)了。

这种应用的实例很多，主要有两种场景：

* 使用node.js作为服务代理，即客户端通过node.js服务作为跳板去请求其他服务，返回请求的内容
* 使用node.js作为静态文件服务器，直接返回静态文件

### 总结

本节主要讲解了node.js如何处理http的get请求，以及如何对response使用stream特性，并做了压力测试证明可以提高性能。

---

## 在http post请求中使用stream

```js
var http = require('http')
var path = require('path')
var fs = require('fs')

var server = http.createServer(function(req, res) {
  var method = req.method
  if (method === 'POST') {
    req.on('data', function(chunk) {
      // 接受到部分数据
      console.log('chunk', chunk.toString().length)
    })
    req.on('end', function() {
      console.log('end')
      res.end('ok')
    })
  }
})
server.listen(8000)
```

post请求发送数据量若很大， res.on('data', ...) 要分多次才能把数据接受完毕

小结一下，request和response一样，本身也是一个stream对象，可以用stream的特性，那肯定也能提高性能。两者的区别在于，request是source类型，是stream的源头，而response是dest类型，是stream的目的地。

再举个例子，如果要把request请求的数据直接response，那么最快的方式就是res.pipe(res)

### 使用stream对性能的提升

```js
var http = require('http')
var path = require('path')
var fs = require('fs')

var server = http.createServer(function(req, res) {
  var method = req.method
  if (method === 'POST') {
    var dataStr = ''
    req.on('data', function(chunk) {
      var chunkStr = chunk.toString()
      dataStr += chunkStr
    })
    res.on('end', function() {
      var fileName = path.resolve(__dirname, 'data.txt')
      fs.writeFile(fileName, dataStr)
      res.end('ok')
    })
  }
})

server.listen(8000)
```

用stream改良后如下：

```js
var server = http.createServer(function(req, res) {
  var method = req.method
  if (method === 'POST') {
    var dataStr = ''
    req.on('data', function(chunk) {
      var chunkStr = chunk.toString()
      dataStr += chunkStr
    })
    res.on('end', function() {
      var fileName = path.resolve(__dirname, 'data.txt')
      var writeStream = fs.createWriteStream(fileName)
      res.pipe(writeStream)
      req.on('end', function() {
        res.end('ok')
      })
    })
  }
})
```

### 实际应用

和get请求使用stream场景类似，post请求使用stream的场景，主要是用于将接受的数据直接进行IO操作，例如：

* 将接收的数据直接存储为文件
* 将接收的数据直接post给其他的web server

## 总结

介绍了stream在http请求中的应用和性能提升，IO操作不仅仅包括网络IO，还包括文件IO，下一节讲解stream在文件操作中的使用，以及性能提升。
