/**
 * Created by Danny on 2015/9/20 10:29.
 */
var bar = require("./bar.js");
var msg = "你好";
var info = "呵呵";

function showInfo(){
    console.log(info);
}

exports.msg = msg;
exports.info = info;
exports.showInfo = showInfo;