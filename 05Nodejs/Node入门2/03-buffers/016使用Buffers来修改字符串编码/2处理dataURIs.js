/**
 * Data URIs是说明Buffer API非常有用的另外一个例子。
 * Data URIs允许一个资源以行内编码的形式存在于web页面中，只需要遵从以下的格式:
 * data:[MIME-type][;charset=<encoding>][;base64],<data>
 */


// 我们看一下如何使用Buffer API来创建data URI.
// var mime = 'image/png';

// 二进制文件可以使用Base64编码以data URIs的方式呈现所以我们先声明一个编码变量：
// var encoding = 'base64';

// 使用mime和编码格式，我们可以先构建data URI的开头部分：
// var mime = 'image/png';
// var encoding = 'base64';
// var uri = 'data:' + mime + ';' + encoding + ',';

// 接下来需要添加主要的土坡图片数据，我们使用fs.readFileSync同步地读取文件数据并且直接返回。
// fs.readFileSync将返回一个Buffer，我们把它转换为base64编码的字符串：
// var data = fs.readFileSync('./me.png').toString(encoding);

// 我们将上述代码组合起来，便可以创建一个程序用于输出data URI：
var fs = require('fs');
var mime = 'image/png';
var encoding = 'base64';
var data = fs.readFileSync('./me.png').toString(encoding);
var uri = 'data:' + mime + ';' + encoding + ',' + data;
// var uri = `data:${mime};${encoding},${data}`;
console.log(uri);

// 使用split方法来分隔数组以获取需要的数据：
// var data = uri.split(',')[1];
// 使用字符串数据来创建一个Buffer并且制定它的编码：
// var buf = Buffer(data, 'base64');

// 接下来使用fs.writeFileSync来把数据同步地写入磁盘，传入两个参数，文件名称和存放数据的Buffer：
// fs.writeFileSync('./writeme.png', buf);
