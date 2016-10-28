function getModule() {
  // 命名空间
  var Foo = {}

  // 添加一个变量
  Foo.x = 10;

  // 添加一个函数
  Foo.addEmUp = function(x, y) {
    return x + y; 
  }

  return Foo;
}
var mySpace = getModule();

console.log(mySpace.x);
