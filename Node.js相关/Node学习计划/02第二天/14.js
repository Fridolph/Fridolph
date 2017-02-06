/**
 * Created by Danny on 2015/9/20 16:59.
 */
var ejs = require("ejs");

//模板
var string = "好高兴啊，今天我买了iphone<%= a %>s";
//数据
var data = {
    a : 6
};
//数据绑定
var html = ejs.render(string, data);
//输出
console.log(html);