/* 
* @Author: fys
* @Date:   2016-09-02 17:17:53
* @Last Modified time: 2016-09-02 17:19:42
*/

// 阻塞
// var fs = require('fs');

// var data = fs.readFileSync('input.txt');

// console.log(data.toString());;
// console.log('程序执行结束');


var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data.toString());
});

console.log("程序执行结束!");