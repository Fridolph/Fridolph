/**
 * Created by Danny on 2015/9/20 9:34.
 */
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var server = http.createServer(function(req,res){
    //这里如果不用req.url来if判断，那么用户不管输入什么网址，
    //做的事情都一样啊
    //得到地址
    var pathname = url.parse(req.url).pathname;
    //判断此时用户输入的地址是文件夹地址还是文件地址
    //如果是文件夹地址，那么自动请求这个文件夹中的index.html
    if(pathname.indexOf(".") == -1){
        pathname += "/index.html";
    }
    //输入的网址是127.0.0.1/images/logo.png
    //实际请求的是./static/images/logo.png
    var fileURL = "./" + path.normalize("./static/" + pathname);
    //得到拓展名
    var extname = path.extname(pathname);

    //把文件读出来
    fs.readFile(fileURL,function(err,data){
        //读完之后做的事情
        if(err){
            //文件不存在
            res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"})
            res.end("404,页面没有找到");
        }
        //读完之后做的事情
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime})
            res.end(data);
        });
    });
});

server.listen(80,"127.0.0.1");

function getMime(extname,callback){
    //读取mime.json文件，得到JSON，根据extname key ，返回对应的value
    //读取文件
    fs.readFile("./mime.json",function(err,data){
        if(err){
            throw Error("找不到mime.json文件！");
            return;
        }
        //转成JSON
        var mimeJSON = JSON.parse(data);
        var mime =  mimeJSON[extname]  || "text/plain";
        //执行回调函数，mime类型字符串，就是它的参数
        callback(mime);
    });
}