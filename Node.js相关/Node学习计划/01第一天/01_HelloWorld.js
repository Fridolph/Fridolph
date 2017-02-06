//require表示引包，引包就是引用自己的一个特殊功能
var http = require("http");
//创建服务器，参数是一个回调函数，表示如果有请求进来，要做什么
var server = http.createServer(function(req,res){
	//req表示请求，request;  res表示响应，response
	//设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
	res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
	res.end("哈哈哈哈，我买了五个iPhone" + (1+2+3) + "s");
});

//运行服务器，监听3000端口（端口号可以任改）
server.listen(3000,"127.0.0.1");