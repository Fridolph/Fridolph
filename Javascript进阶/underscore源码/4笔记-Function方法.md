

> 这一篇到了源码749行，主要是`underscore`Function.prototype的一些扩展。从代码行数上可能没之前的多，但很多概念反而是最复杂的，而现在我们要做的，就是不要急，耐心的读下去，分析，我现在的水平可能理解不了多少精髓，但只要有了这个开始，以后再回来看一定会更有收获，那么废话不多说直接开始吧

## Function Functions 749-961行

那么是否要执行绑定呢？我们深入到代码里
(ps我觉得在代码里写注释比自己下来这样更好些，后面的都直接写到代码里了)

```js
// Determines whether to execute a function as a constructor
// or a normal function with the provided arguments.
// 决定是否使用提供的参数作为构造函数或普通函数执行函数
var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
  // 若 callingContext 不是由 boundFunc生成的，则返回 sourceFunc，通过apply方法把执行上下文及参数传了进去
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  // 在核心函数里，具体可翻前面的，执行baseCreate返回的是一个原型对象，这里绑定了sourceFunc
  var self = baseCreate(sourceFunc.prototype);
  // 通过apply函数绑定到了sourceFunc的原型，并把args传进去
  var result = sourceFunc.apply(self, args);
  // 这里作了判断，最终都返回绑定好的函数上
  if (_.isObject(result)) return result;
  return self;
};
```

我自己读着可能也绕，所以具体的要由语境来观察和学习…… 那就耐着性子，继续读源码吧

### bind

`_.bind(func, context, args)`

大名鼎鼎的bind方法：创建一个绑定到给定对象的函数(可以分配和选择该参数)。如果绑定可用，则执行ECMAScript 5的原生函数的委托。

```js
// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.
// bind里其实是一个restArgs方法，里面传了一个匿名函数
_.bind = restArgs(function(func, context, args) {
  // 若不是函数则报错，具体isFunction可以去看看，实现很简单
  if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
  // 声明私有方法，并返回
  var bound = restArgs(function(callArgs) {
    // 这里就用到了上面的executeBound方法，这里算是函数柯里化的运用其参数已经预定义好了
    // 我们传入的args通过callArgs的形式合并到了这里
    return executeBound(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
});
```

例子： 

```js
var say = function(somethind){ return somethind + ', ' + this.name };
say = _.bind(say, {name: 'world'}, 'hello');
func();
// "hello, world"
```

### partial

`_.partial(func, boundArgs)`

局部应用一个函数填充在任意个数的 arguments，不改变其动态this值。和bind方法很相近。你可以传递_ 给arguments列表来指定一个不预先填充，但在调用时提供的参数。

```js
// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
// 
// 局部应用一个函数填充在任意个数的 arguments，不改变其动态this值。和bind方法很相近。
// 你可以传递 _ 给arguments列表来指定一个不预先填充，但在调用时提供的参数。
_.partial = restArgs(function(func, boundArgs) {
  var placeholder = _.partial.placeholder;
  var bound = function() {
    var position = 0, length = boundArgs.length;
    var args = Array(length);
    // 对传入的boundArgs遍历，事先被标记过的则索引自增1，否则就赋值给args[i]
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }
    // 遍历的次数小于参数个数，就将 参数自增并填充进args里
    while (position < arguments.length) args.push(arguments[position++]);
    // 最后返回函数绑定
    return executeBound(func, bound, this, this, args);
  };
  return bound;
});
```

### bindAll

`_.bindAll(object, keys)`

把methodNames参数指定的一些方法绑定到object上，这些方法就会在对象的上下文环境中执行。绑定函数用作事件处理函数时非常便利，否则函数被调用时this一点用也没有。

```js
// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
_.bindAll = restArgs(function(obj, keys) {
  // keys取之前的数组扁平化的一个方法，所以得到的是一个一维数组
  keys = flatten(keys, false, false);
  var index = keys.length;
  // 作判断，若绑定的方法不通过则报错
  if (index < 1) throw new Error('bindAll must be passed function names');
  // 通过while循环index自减给key作绑定
  while (index--) {
    var key = keys[index];
    obj[key] = _.bind(obj[key], obj);
  }
});
```

### memoize

`_.memoize(function, hasher)`  Memoizes方法可以缓存某函数的计算结果。对于耗时较长的计算是很有帮助的。

```js
// Memoize an expensive function by storing its results.
// 通过存储结果来记忆一个昂贵的函数。
_.memoize = function(func, hasher) {
  // 私有方法
  var memoize = function(key) {
    // 暴露私有属性~ 在上一层作用域也可访问到cache
    var cache = memoize.cache;
    // address的赋值表达式， '' + 用作强制转换为字符串
    // 若hasher不存在默认为key，存在就将hasher方法的this绑定到 _ 作用域下
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    // 若当前不存在缓存地址，就将其实绑定，否则直接返回新创建的缓存空间
    if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  // 这里又清空了缓存对象，让之前的操作得以回收
  memoize.cache = {};
  return memoize;
};
```

### delay 

`_.delay(function, wait, args)`

类似setTimeout，等待wait毫秒后调用function。如果传递可选的参数args，当函数function执行时， args 会作为参数传入。

```js
// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
// 在给定的毫秒数中延迟一个函数，然后调用所提供的参数
_.delay = restArgs(function(func, wait, args) {
  // restArgs里传入一个匿名函数接受func, wait, args三个参数，并返回一个setTimeout定时器  
  return setTimeout(function() {
    // 定时器里返回所传的func方法，this绑定为null，参数为args，等待时间为传入的wait
    return func.apply(null, args);
  }, wait);
});
```

### throttle

`_.throttle(function, wait, options)` 

大名鼎鼎的函数节流方法，具体可参考高级程序设计第23章吧(具体记不太清了)？ 比起高程里实现的简易节流，这里的更安全可靠。那么我深入到底层，来一探究竟吧

```js
// throttle方法，接受三个参数，1为要执行的函数，2为节流时间， 3为可配置对象
_.throttle = function(func, wait, options) {
  // 声明私有属性
  var timeout, context, args, result;
  var previous = 0;
  // options默认为空对象 {} es6可以写默认函数参数了
  if (!options) options = {};

  // 私有方法
  var later = function() {    
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };


  var throttled = function() {
    // now 为当前调用时间
    var now = _.now();
    // previous为不0 options.leading 为false时，把当前时间赋值给previous
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间，wait是我们传入的时间，这里的now - previous一般来说是相等的，但考虑到安全性就有了这样的写法
    var remaining = wait - (now - previous);    
    context = this;
    args = arguments;
    // 当未到节流时间时，一般来说会执行到这步
    if (remaining <= 0 || remaining > wait) {
      // 2. 我们初始化的timeout是null，所以不会进到这里，所以我标记了2，如果timeout有值说明当前正在执行，可进入节流判断，具体为，清空定时器并清楚timeout的引用防止污染内存
      if (timeout) {        
        clearTimeout(timeout);
        timeout = null;
      }
      // 1. 第一次会进入到这里，result赋给了 func的绑定上
      previous = now;
      result = func.apply(context, args);
      // context args是这个私有方法里的，公有属性，所以清楚了它们的引用以继续使用
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 然后就是进入运行时间了，延迟remaining时间后运行later
      timeout = setTimeout(later, remaining);
    }
    // 最后将结果返回
    return result;
  };

  // 清除定时器，并初始化默认设置
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};
```

这个函数是真的长，真心厉害… 懵懵懂懂能理解到一些，不用着急，慢慢来就好了，毕竟“学武不是一朝一夕的事”