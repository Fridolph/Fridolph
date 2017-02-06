/**
 * Created by Danny on 2015/9/20 16:59.
 */
var ejs = require("ejs");
var fs = require("fs");
var http = require("http");


var server = http.createServer(function(req,res){
    fs.readFile("./views/index.ejs",function(err,data){
        //绑定模板
        var template = data.toString();
        var dictionary = {
            a:6,
            news : [
                {"title":"陈伟我爱你","count":10},
                {"title":"哈哈哈哈","count":20},
                {"title":"逗你玩儿的","count":30}
            ]
        };
        var html = ejs.render(template,dictionary);

        //显示
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end(html);
    });
});

server.listen(80,"127.0.0.1");