###学习Buffer 

打开命令行 node 

> Buffer  

Buffer 是一个对象， 可用new 来实例化(构造函数)

new Buffer("你好, 我叫xxx")

new Buffer("你好, 我叫xxx", "base64")

-----------------------------------------


var buf = new Buffer(8)

buf.length    // 8

超出长度的内容是不会被缓冲的

var buf = new Buffer('12345678')

console.log(buf)   

// <Buffer 31 32 33 34 35 36 37 38>


var buf = new Buffer(7)
buf.write('12345678')
console.log(buf);
// <Buffer 31 32 33 34 35 36 37>

var buf = new Buffer([1, 2, 3, 4])
console.log(buf)
// <Buffer 01 02 03 04>

console.log(buf[1])   // 2


> Buffer 

{
  [Function: Buffer]
  poolSize: 8192,
  isBuffer: [Function: isBuffer],
  compare: [Function: compare],   
  isEncoding: [Function],
  concat: [Function],
  byteLength: [Function]
}


compare 用来判断两个Buffer的相对位置，处理按字符串的排序等
isEncoding 判断是否支持编码
concat 用于将几个Buffer 连接创建为一个Buffer
byteLength 用来获得指定编码下字符串所占的字节数


### Buffer实例方法

buffer[index]
buffer.length
buffer.write(string, offset=0, length, encoding='utf8')
buffer.toString(encoding, start=0, end=buffer.length)
buffer.copy(target, tStart, sStart, sEnd=buffer.length)
buffer.slice(start, end)
buffer.compare(otherBuffer)
buffer.equals(otherBuffer)
buffer.fill(value, offset, end)