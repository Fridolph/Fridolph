# Buffer

用于处理二进制数据流

实例类似整数数组，大小固定

C++代码在V8堆外分配物理内存

## Buffer类

现在不用实例化~  可直接使用Buffer类

**方法**

Buffer.byteLength()  判断字符串的 占字节数 一个中文汉字 占3字节
Buffer.isBuffer() 判断一个对象是否为Buffer对象
Buffer.concat() 拼接Buffer(传数组)
Buffer.toString() 同Object.toString()
Buffer.fill() 同ES6 Array.fill()
Buffer.equals() 判断两个Buffer是否相等
Buffer.indexOf() 类数组结构，同Array.indexOf()
Buffer.copy() 
