/**
 * Created by Danny on 2015/9/22 14:37.
 */
var express = require("express");

var app = express();

app.get("/",function(req,res){
    console.log(req.query);
    res.send();
});

app.listen(3000);