var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){
	//不处理小图标
	if(req.url == "/favicon.ico"){
		return;
	}
	//给用户加一个五位数的id
	var userid = parseInt(Math.random() * 89999) + 10000;
	
	console.log("欢迎" + userid);

	res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
	//两个参数，第一个是完整路径，当前目录写./
	//第二个参数，就是回调函数，表示文件读取成功之后，做的事情
	fs.readFile("./test/1.txt",function(err,data){
		if(err){
			throw err;
		}
		console.log(userid + "文件读取完毕");
		res.end(data);
	});
	
});

server.listen(3000,"192.168.41.30");