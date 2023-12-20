/**
 * Created by Danny on 2015/9/22 10:22.
 */
var express = require("express");
var fs = require("fs");

var app = express();

//当你不写路径的时候，实际上就相当于"/"，就是所有网址
app.use(haha);

app.get("/admin",function(req,res){
    res.send("管理员");
})

app.listen(3000);

function haha(req,res,next){
    var filePath = req.originalUrl;
    //根据当前的网址，读取public文件夹中的文件
    //如果有这个文件，那么渲染这个文件
    //如果没有这个文件，那么next();
    fs.readFile("./public/" + filePath,function(err,data){
        if(err){
            //文件不存在
            next();
            return;
        }
        res.send(data.toString());
    });
}