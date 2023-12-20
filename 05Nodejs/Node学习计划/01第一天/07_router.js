var http = require("http");

var server = http.createServer(function(req,res){
	//得到url
	var userurl = req.url;

	res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
	//substr函数来判断此时的开头
	if(userurl.substr(0,9) == "/student/"){
		var studentid = userurl.substr(9);
		console.log(studentid);
		if(/^\d{10}$/.test(studentid)){
			res.end("您要查询学生信息，id为" + studentid);
		}else{
			res.end("学生学号位数不对");
		}
	}else if(userurl.substr(0,9) == "/teacher/"){
		var teacherid = userurl.substr(9);
		if(/^\d{6}$/.test(teacherid)){
			res.end("您要查询老师信息，id为" + teacherid);
		}else{
			res.end("老师学号位数不对");
		}
	}else{
		res.end("请检查url");
	}
});

server.listen(3000,"127.0.0.1");