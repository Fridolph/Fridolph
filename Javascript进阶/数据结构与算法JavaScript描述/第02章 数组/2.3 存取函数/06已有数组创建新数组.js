// concat() splice() 方法允许通过已有数组创建新数组。
// concat() 可以合并多个数组为一个数组
// splice() 截取一个数组的子集创建一个新数组

var arr1 = ["fuyinsheng", "yangke", "wangbo", "yanhuan", "jialin", "huajun"];
var arr2 = ["chaochao", "zijie", "yisong"];

var itDiv = arr1.concat(arr2);
console.log(itDiv);

// 第一行首先输出arr1里的元素，第二行首先输出arr2里的元素
itDiv = arr2.concat(arr1);
console.log(itDiv);



// splice() 从现有的数组截取一个新数组, 该方法第一个参数是截取的起始索引，第二个参数是截取的长度。
var all = ["前端", "游戏", "唱歌", "摄影", "设计", "阅读", "电影", "甜食", "运动"];
var array1 = all.splice(1,3);
var array2 = all;
console.log(array1);
console.log(array2);