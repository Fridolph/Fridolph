var Promise = function() {}

var isPromise = function(value) {
  return value instanceof Promise;
}

var defer = function() {
  var pending = [], 
      value;

  // 声明promise对象
  var promise = new Promise();

  // 给promise对象增加then方法
  promise.then = function(callback) {
    if (pending) {
      pending.push(callback);
    } else {
      callback(value);
    }
  }

  // 返回resolve方法和promise对象
  return {
    // _value传参
    resolve: function(_value) {
      if (pending) {
        value = _value;

        for (var i = 0, len = pending.length; i < len; i++) {
          var callback = pending[i];
          callback(value);
        }
        pending = undefined;
      }
    },
    promise: promise
  }
}
