/**
 * Created by Danny on 2015/9/20 15:35.
 */
var http = require("http");
var querystring = require("querystring");


//创建服务器
var server = http.createServer(function(req,res){
    //如果你的访问地址是这个，并且请求类型是post
    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        var alldata = "";
        //下面是post请求接收的一个公式
        //node为了追求极致，它是一个小段一个小段接收的。
        //接受了一小段，可能就给别人去服务了。防止一个过大的表单阻塞了整个进程
        req.addListener("data",function(chunk){
            alldata += chunk;
        });
        //全部传输完毕
        req.addListener("end",function(){
            var datastring = alldata.toString();
            res.end("success");
            //将datastring转为一个对象
            var dataObj = querystring.parse(datastring);
            console.log(dataObj.hobby);
            console.log(dataObj.name);
            console.log(dataObj.sex);
        });
    }
});

server.listen(8080,"127.0.0.1");