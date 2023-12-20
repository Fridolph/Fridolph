## node.js读写文件

```js
var fs = require('fs')
var path = require('path')
var fileName = path.resolve(__dirname, 'data.txt')
// 读文件
fs.readFile(fileName, function(err, data) {
  if (err) return
  console.log(data.toString())
})
// 写文件
fs.writeFile(fileName, 'xxx', function(err) {
  if (err) return
  console.log('写入成功')
})
```

根据以上读写操作，可以做一个简单的文件拷贝程序，将data.txt中的内容拷贝到data-bak.txt 中

```js
var fs = require('fs')
var path = require('path')

// 读文件
var fileName1 = path.resolve(__dirname, 'data.txt')
fs.readFile(fileName1, function(err, data) {
  if (err) return
  var dataStr = data.toString()
  // 写入文件
  var fileName2 = path.resolve(__dirname, 'data-bak.txt')
  fs.writeFile(fileName2, dataStr, function(err) {
    if (err) return
    console.log('拷贝文件成功')
  })
})
```

### 使用stream读写文件

* 使用 fs.cretaeReadStream(filename) 来创建读取文件的stream对象
* 使用 fs.createWriteStream(filename) 来创建写入文件的stream对象

```js
var fs = require('fs')
var path = require('path')

var filename1 = path.resolve(__dirname, 'data.txt')
var filename2 = path.resolve(__dirname, 'data-bak.txt')
var readStream = fs.createReadStream(filename1)
var writeStream = fs.createWriteStream(filename2)
readStream.pipe(writeStream)
readStream.on('end', function() {
  console.log('拷贝完成')
})
```

### 使用stream带来的性能提升

略

### 应用场景

所有执行文件操作的场景，都应该尝试使用stream，例如文件的读写、拷贝、解压缩、格式转换等。除非是体积小且读写次数少，性能上可忽略。

