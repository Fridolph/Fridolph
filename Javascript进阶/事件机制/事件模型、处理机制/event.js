// 定义R对象 如果支持es6用原生的Reflect，没就相当于提供polyfill
'use strict';
var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }
var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

// console.warn的封装
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

// Number.isNaN 是es6加入的，后面是并联的兼容处理，Number类型 自身与自身不相等的只有NaN了
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
// 将EventEmitter构造函数作为默认导出
module.exports = EventEmitter;
// 向后兼容node 0.10.x 版本 看来这个库相当老了啊，不过也不妨碍我们学习

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// 默认情况下，如果超过10个侦听器，EventEmitters将会输出警告添加到它
// 这是一个有用的默认值，它有助于查找内存泄漏
var defaultMaxListeners = 10;
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

// 构造类的静态方法
EventEmitter.init = function() {
  // 相当于constructor的构造函数调用 初始化
  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// 显然不是所有的Emitters侦听器都应该限制为10个。这个功能允许增加
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

// 给下面的 getMaxListeners方法用  EventEmitter原型方法里的 this指向实例对象
// 所以可从实例中 拿到 属性值 _maxListeners
function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  // emit第一个参数一般是方法名，所以 从arguments[1]开始
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  // 右边的表达式返回一个布尔值 ，type报错就为true。doError可理解为错误标记的flag
  var doError = (type === 'error');

  // 拿到 实例的 _events 对象
  var events = this._events;
  if (events !== undefined)
    // 没有错就直接返回 false
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // 下面是错误处理
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // 注意：“throw”这一行的注释是有意的，他们表示 如果这导致未处理的异常，则在Node的输出中输入。
      throw er;
    }
    // 错误上下文为er 这里的er就是传进来的type的报错环境上下文
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err;
  }

  // 从events里找type对应的函数 拿到 并赋给handler
  var handler = events[type];
  if (handler === undefined)
    return false;
  if (typeof handler === 'function') {
    // 绑定上下文
    ReflectApply(handler, this, args);
  } else {
    // handler多次调用  把多个handler 放到数组里来处理
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }
  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  // listener类型判断
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // 为了避免在 type === "newListener" 这种情况下递归
    // 在将其添加到侦听器之前，首先触发 "newListener"
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);
      // 重新分配 `events`，因为newListener处理程序可能导致了 this._events被分配给一个新的对象
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // 优化一个listener的情况。不需要额外的数组对象
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // 添加第二个元素，需要更改为数组
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      //如果我们已经有了一个数组，只需追加
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
    // 检查监听器泄漏
    m = $getMaxListeners(target);
    // m > 0 && (exiting.length > m && !existing.warned )
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // 没有错误代码，因为它是一个warning
      var w = new Error(
        'Possible EventEmitter memory leak detected. ' +
        existing.length + ' ' + String(type) + ' listeners ' +
        'added. Use emitter.setMaxListeners() to ' +
        'increase limit'
      )
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}

// 结合上面的函数，这是高阶函数的用法 普通地，我们一般会传 事件名和回调
// 这里返回 _addListner方法 第一个参数是 this 实例对象作为上下文环境
// 然后是 事件名，回调，prepend默认为false
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
// 同名方法 addListner 和用 on等效
EventEmitter.prototype.on = EventEmitter.prototype.addListener;

// 和on的区别在于 prepend为true，当前已经是数组了才会这样用（不同我们来，已经封装在内部逻辑里了）
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  // 把参数放到 args中。 我们先看下面的 _onceWrap方法
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  // 显然，这个if逻辑会走到里
  if (!this.fired) {
    // removeListener会被调用
    this.target.removeListener(this.type, this.wrapFn);
    // 然后再把fired 设回true
    this.fired = true;
    // 这里因为ReflectApply的原因，this上下文回到了 实例对象上
    ReflectApply(this.listener, this.target, args);
  }
}
function _onceWrap(target, type, listener) {
  // 初始state
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  // 好 有了这个bind后，上面onceWrapper的this就知道了，我们再跳回去
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
  // 回到wrapped这个上下文中
}

// 该方法可理解为调用一次后 自动把方法注销掉
EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  // 后同，return this 是返回实例对象自身，方便链式调用
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// 删除监听方法
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  // 错误判断，这里先略过了
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  events = this._events;
  if (events === undefined)
    return this;

  // list被赋值为evnets[type] 即 一个注册的事件
  list = events[type];
  if (list === undefined)
    return this;

  // 当前list 和所传的注册事件若一致就进入这个逻辑里
  if (list === listener || list.listener === listener) {
    // 处理 注册事件 为单个函数 的情况
    if (--this._eventsCount === 0)
      this._events = Object.create(null);
    else {
      delete events[type];
      if (events.removeListener)
        this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    // 处理 注册事件 为数组的情况
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0)
      return this;
    if (position === 0)
      list.shift();
    else {
      spliceOne(list, position);
    }
    if (list.length === 1)
      events[type] = list[0];
    if (events.removeListener !== undefined)
      this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};

// 同名方法，等同于 removeListener
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

// 删除所有的监听
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined)
    return this;

  // 不侦听removeListener，不需要触发emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      // 通过赋值的方式 让 实例对象的 _events 为空
      this._events = Object.create(null);
      // 事件数清0
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0)
        this._events = Object.create(null);
      else
        delete events[type];
    }
    return this;
  }

  // 为所有事件上的所有侦听器发出removeListener
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};

// 同样的，我们先看 原型方法
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined)
    return [];
  // 参数type为事件名
  var evlistener = events[type];
  if (evlistener === undefined)
    return [];
  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  // 返回 _listeners调用的结果，回到 _listener函数
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

// 辅助方法，浅拷贝数组
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

// 从数组中删除某项
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

// listner的拷贝
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
