/* 
* @Author: fys
* @Date:   2016-09-07 10:43:26
* @Last Modified time: 2016-09-07 10:44:30
*/

var fs = require('fs');

fs.readFile('file.txt', 'utf-8', function(err, data) {
  if (err) {
    console.error('err');
  } else {
    console.log(data);
  }
})

console.log('end.');