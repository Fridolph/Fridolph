var s = function action_zero() {
  return new Promise(function (resolve, reject) {
    console.log('程序开始启动');
    var result = [];
    resolve(result);
  });
};

var a = function action_one(result) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('第一阶段开始');
    }, 1000);
    setTimeout(function () {
      for (var i = 0; i < 3; i++){
          var value = Math.floor(5*Math.random());
          result.push(value);
      }
      console.log('第一阶段结束');
      resolve(result);
    }, 2000);
  });
};

var b = function action_two(result) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      //reject();
      console.log('第二阶段开始');
    }, 1000);
    setTimeout(function () {
      for (var i = 0; i < 3; i++){
          var value = Math.floor(5*Math.random());
          result.push(value);
      }
      console.log('第二阶段结束');
      resolve(result);
    }, 2000);
  });
};

var c = function action_three(result) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('第三阶段开始');
    }, 1000);
    setTimeout(function () {
      for (var i = 0; i < 3; i++){
          var value = Math.floor(5*Math.random());
          result.push(value);
      }
      console.log('第三阶段结束');
      resolve(result);
    }, 2000);
  });
};

var e =  function action_end(result) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('得到的结果是:', result.toString());
      console.log('程序执行结束');
    }, 1000);
  });
};


function executeSequentially(promiseFactories) {
  var result = Promise.resolve();
  promiseFactories.forEach(function (promiseFactory) {
    result = result.then(myPromiseFactory(promiseFactory));
  });
  return result.catch(function () {
    console.log('error');
  });
}
function myPromiseFactory(a) {
  return a;
}

var d = [s, a, b, c, e];

function start() {
  executeSequentially(d);
}
document.getElementById('start').addEventListener('click', start, false);
//可以在任意阶段执行reject，可以捕获异常