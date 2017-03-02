/******************* 先发布再订阅 *********************/

// Event.trigger('click', 1);
// Event.listen('click', a => {
//   console.log(a);
// });

/******************* 使用命名空间 *********************/

// Event.create('namespace1').listen('click', a => {
//   console.log(a);
// });

// Event.create('namespace1').trigger('click', 1);

// Event.create('namespace2').listen('click', a => {
//   console.log(a);
// });

// Event.create('namespace2').trigger('click', 2);


/**
 * 具体实现代码：
 */
var Event = (function() {
  var global = this,
      Event,
      _default = 'default';

  Event = function() {
    var _listen,
        _trigger,
        _remove,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {},
        _create,
        find;

    var each = function(arr, fn) {
      var ret;
      for (var i = 0, l = arr.length; i < l; i++) {
        var n = arr[i];
        ret = fn.call(n, i, n)
      }
      return ret;
    };

    _listen = function(key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };

    _remove = function(key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            cache[key].splice(i, 1);
          }
        } else {
          cache[key] = [];
        }
      }
    };

    _trigger = function() {
      var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          stack = cache[key],
          ret;

      if (!stack || !stack.length) {
        return;
      }

      return each(stack, function() {
        return this.apply(_self, args);
      });
    };

    _create = function(namespace) {
      var namespace = namespace || _default;
      var cache = {},
          offlineStack = [];  // 离线事件
      
      var ret = {
        listen: function(key, fn, last) {
          _listen(key, fn, cache);

          if (offlineStack === null) {
            return;
          }
          if (last === 'last') {
            offlineStack.length && offlineStack.pop()();
          } else {
            each(offlineStack, function() {
              this();
            });
          }
          offlineStack = null;
        },
        one: function(key, fn, last) {
          _remove(key, cache);
          this.listen(key, fn, last);
        },
        remove: function(key, fn) {
          _remove(key, cache, fn);
        },
        trigger: function() {
          var fn,
              args,
              _self = this;

          _unshift.call(arguments, cache);
          args = arguments;
          fn = function() {
            return _trigger.apply(_self, args);
          };
          
          if (offlineStack) {
            return offlineStack.push(fn);
          }
          return fn();
        }
      };

      return namespace ? 
        (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;

    };

    return {
      create: _create,
      one: function(key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function(key, fn) {
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function(key, fn, last) {
        var event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function() {
        var event = this.create();
        event.trigger.apply(this, arguments);
      }
    }
  }();

  return Event;
})();
