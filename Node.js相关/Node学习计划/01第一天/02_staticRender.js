//require表示引包，引包就是引用自己的一个特殊功能
var http = require("http");
var fs = require("fs");

//创建服务器，参数是一个回调函数，表示如果有请求进来，要做什么
var server = http.createServer(function(req,res){
	if(req.url == "/fang"){
		fs.readFile("./test/xixi.html",function(err,data){
			//req表示请求，request;  res表示响应，response
			//设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
			res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
			res.end(data);
		});
	}else if(req.url == "/yuan"){
		fs.readFile("./test/haha.html",function(err,data){
			//req表示请求，request;  res表示响应，response
			//设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
			res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
			res.end(data);
		});
	}else if(req.url == "/0.jpg"){
		fs.readFile("./test/0.jpg",function(err,data){
			//req表示请求，request;  res表示响应，response
			//设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
			res.writeHead(200,{"Content-type":"image/jpg"});
			res.end(data);
		});
	}else if(req.url == "/bbbbbb.css"){
		fs.readFile("./test/aaaaaa.css",function(err,data){
			//req表示请求，request;  res表示响应，response
			//设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
			res.writeHead(200,{"Content-type":"text/css"});
			res.end(data);
		});
	}else{
		res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
		res.end("嘻嘻，没有这个页面呦");
	}
});

//运行服务器，监听3000端口（端口号可以任改）
server.listen(3000,"127.0.0.1");