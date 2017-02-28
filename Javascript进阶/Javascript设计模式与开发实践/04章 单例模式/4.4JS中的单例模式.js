/**
 * 单例模式的核心是确保只有一个实例，并提供全局访问。
 */
    
// 全局变量不是单例模式，但在JS中，我们经常会把全局变量当成单例来使用
// var a = {}

// 1.使用命名空间
var namespace1 = {
  a: function() {
    console.log(1);
  },
  b: function() {
    console.log(2);
  }
}

// 2.动态创建命名空间
var MyApp = {};

MyApp.namespace = function(name) {
  var parts = name.split('.');
  var current = MyApp;

  for(var i in parts) {
    if ( !current[parts[i]] ) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
};

MyApp.namespace('event');
MyApp.namespace('dom.style');

console.dir(MyApp);


// 3.使用闭包封装私有变量
// 这种方法把一些变量封装在闭包的内部，只暴露一些接口跟外界通信
var user = (function() {
  var __name = 'sven',
      __age = 25;

  return {
    getUserInfo: function() {      
      return __name + '-' + __age;
    }
  }

})();
