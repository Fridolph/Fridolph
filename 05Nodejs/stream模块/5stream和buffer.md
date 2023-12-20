stream就是数据一点一点地流动起来，那么每次流动的数据是什么呢？

```js
var readStream = fs.createReadStream('./file.txt')
readStream.on('data', function(chunk) {
  // ...
})
```

## 二进制

冯诺依曼结构，其核心内容之一就是：计算机使用二进制形式存储计算。

计算机内存由若干个存储单元组成，每个存储单元只能存储0或1（因为内存是硬件，计算机硬件本质上就是一个一个的电子元件，只能识别充电和放电的状态，充电代表1，放电代表0），即二进制单元（bit）。但是这一个单元所能存储的信息太少，因此约定将8个二进制单元为一个基本存储单元，叫做字节（byte）。一个字节所能存储的最大整数就是(2^8 = 256)，也正好是16^2，因此也常常使用两位的16进制数代表一个字节。例如css常见的颜色值就是6位16进制数字，它占用3个字节的空间。

二进制是计算机最底层的数据格式，也是一种通用格式。计算机中的任何数据格式，字符串、数字、视频、音频、程序、网络包等，在最底层都是用二进制来进行存储的。这些高级格式和二进制之间，都可通过固定的编码格式进行相互转换。例如，C语言中int32类型的十进制数，就占用32bit即4byte。总之，计算机底层存储的数据都是二进制格式，各种高级类型都有对应的编码规则，和二进制进行相互转化。

## nodejs表示二进制

Buffer就是nodejs中二进制的表述形式。

```js
var str = '学习nodejs stream'
var buf = Buffer.from(str, 'utf-8')
```

以上代码，先通过 Buffer.from 将一段字符串转化为二进制形式，其中utf-8是一个编码规则。二进制打印出来之后是一个类数组的对象，每个元素都是两位的16进制数字，即代表一个byte，打印出来的buf一共有20byte。即根据utf-8的编码规则，这段字符串需要20byte进行存储，最后再通过utf-8规则将二进制转换为字符串并打印出来

### 流动的数据是二进制格式

```js
var readStrem = fs.createReadStream('./file.txt')
readStream.on('data', function(chunk) {
  console.log(chunk instanceof Buffer)
  console.log('chunk: ', chunk)
})
```

可以看到stream中流动的数据就是Buffer类型。因此，在使用stream chunk时，需要将这些二进制数据转换为相应的格式。例如之前讲解post请求是，从request中接收数据就是这样。再回归一下之前的代码，就能明白了。

```js
var dataStr = ''
req.on('data', function(chunk) {
  // 将二进制数据先转化为字符串
  var chunkStr = chunk.toString()
  dataStr += chunkStr
})
```

stream中为何要“流动”二进制格式的数据呢？

为了优化IO操作。无论是文件IO还是网络IO，其中包含的数据格式是未知的，如字符串、音频、视频、网络包等。即便这些字符串，其编码规则也是未知的，如ASC编码、utf-8编码。再这么多未可知的情况下，只能是以不变应万变，直接用最通过的二进制格式，谁都能认识，且二进制格式进行流动和传输，效率是最高的。

### Buffer带来的性能提升

略

## 总结

* 二进制和字节的基本认识
* node.js中Buffer表示二进制
* stream中的chunk是二进制格式，以及和字符串格式的转换
* 二进制格式在http请求中的性能提升
