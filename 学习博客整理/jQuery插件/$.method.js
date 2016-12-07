// 我自己写的jquery 插件
// 调用方式 $.方法(参数)即可
$.extend({
  log: function(message) {
    var now = new Date(),
        y = now.getFullYear(),
        month = now.getMonth() + 1,  // JS中月份是从0开始的
        d = now.getDate(),
        h = now.getHours(),
        min = now.getMinutes(),
        s = now.getSeconds(),
        time = `${y}/${month}/${d} ${h}/${min}/${s}`;

    console.log(`${time} My App ${message}`);
  }
})

