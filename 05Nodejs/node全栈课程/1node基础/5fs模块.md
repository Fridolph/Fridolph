### fs.stat 检测文件还是目录

```js
const fs = require('fs')
fs.stat('hello.js', (err, stats) => {
  if (err) {
    console.log(err)
  } else {
    console.log(stats)
    console.log(`文件：${stats.isFile()}`);
    console.log(`目录：${stats.isDirectory()}`)
  }
})
```

### fs.mkdir 创建目录

### fs.writeFile 创建写入文件

### fs.appendFile 在文件里追加内容

### fs.readFile　读取文件

### fs.readdir 读取目录

### fs.rename 重命名

### fs.rmdir 删除目录

### fs.unlink 删除文件

---

### fs.createReadStream 从文件流中读取数据

### fs.createWriteStream　从文件流中写入文件
