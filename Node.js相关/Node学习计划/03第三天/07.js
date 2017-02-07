/**
 * Created by Danny on 2015/9/22 10:22.
 */
var express = require("express");

var app = express();

var a = 100;

app.get("/:username/:id",function(req,res,next){
    var username = req.params.username;
    //检索数据库，如果username不存在，那么next()
    if(检索数据库){
        console.log("1");
        res.send("用户信息");
    }else{
        next();
    }
});

app.get("/admin/login",function(req,res){
    console.log("2");
    res.send("管理员登录");
});


app.listen(3000);