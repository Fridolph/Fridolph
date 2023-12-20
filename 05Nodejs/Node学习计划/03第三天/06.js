/**
 * Created by Danny on 2015/9/22 10:47.
 */
var http = require("http");

// 这个语句，就在打开服务器的时候，执行一次。
// 每次用户访问的时候，不执行这个语句
var a = 100;

var server = http.createServer(function(req,res){
    // 用户访问的时候，执行这里的语句：
    a++;
    res.end(a.toString());
});

server.listen(3000,"127.0.0.1");