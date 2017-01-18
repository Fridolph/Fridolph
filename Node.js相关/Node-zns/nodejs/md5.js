const crypto=require('crypto');

var obj=crypto.createHash('md5');

obj.update('123456');

var str=obj.digest('hex');

console.log(str);
