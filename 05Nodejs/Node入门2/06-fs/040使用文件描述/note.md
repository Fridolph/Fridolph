> 假如你没有使用过文件描述，那么在一开始会比较困惑，这个技巧介绍了如何在Node中使用它们。

问题：
希望通过文件描述读写文件

解决方案：
使用Node的fs文件描述模块


文件描述是在操作系统中管理的在进程中打开文件所关联的一些数字或者索引。
操作系统通过指派一个唯一的整数给每个打开个文件用来查看关于这个文件的更多信息。

虽然这个模块的名字中有个file，但它能做的远超过常规的文件。
文件描述可以指向目录、管道、网络套接字以及常规文件。

Node可以理解这一些底层比特数的含义。大多数进程有一组标准的文件描述，如下：

| Stream        | File descriptor | Description |
| ------------- |:---------------:| :----------:|
| stdin         | 0               | 标准输入    |
| stdout        | 1               | 标准输出    |
| stderr        | 2               | 标准错误    |

在Node中我们通常希望stdout打印的时候习惯用console.log语法糖

console.log('Logging to stdout');

假如使用全局的process对象，我们可以更明确地达到同样的目的。

process.stdout.write('Logging to stdout')

> 同步日志    console.log与process.stdout.write实际上是同步的方法，所提供的TTY是一个文件流


一个文件描述是open以及openSync方法调用返回一个数字

var fd = fs.openSync('myfile', 'a');
console.log(typeof fd === 'number');