miniConsole = {
  log: function() {
    // 真正代码略
    console.log(Array.prototype.join.call(arguments));
  }  
}