// 下面这段代码想要循环延时输出结果0 1 2 3 4,请问输出结果是否正确,如果
// 不正确,请说明为什么,并修改循环内的代码使其输出正确结果

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i + ' ');
  }, 100)
}

// 修改方法

for (var i = 0; i< 5;i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i + ' ');
    }, 1000 * i)
  })(i)
}

// 或者

for (let i = 0; i< 5;i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000 * i)
}
