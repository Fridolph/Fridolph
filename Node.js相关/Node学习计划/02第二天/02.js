/**
 * Created by Danny on 2015/9/20 9:23.
 */
var http = require("http");

//创建服务器
var server = http.createServer(function(req,res){
    //每次接受请求之后做的事情
    if(req.url == "/"){
        //设置响应头
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end("成功！");
    }else{
        res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"});
        res.end("失败");
    }
});

server.listen(80,"127.0.0.1");