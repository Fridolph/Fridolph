问题：
希望打开一个不在模块系统中的文件

解决方案：
通过__dirname 或者 __filename来找到文件的位置

通过字符串拼接当然也可以实现：
var view = __dirname + './views/view.html';

还可以使用path模块的path.join方法：
path.join(__dirname, 'views', 'view.html');

