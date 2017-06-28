> 这一篇到了源码170行以后，主要是`underscore(下文用下划线代替- -)`向外暴露的一些核心API， `_` 扩展了很多原生JS拥有的方法，有很多优秀地设计思想值得我们学习和探究。我们在用的过程中，了解到底层的实现更有利于我们将来的选择及性能优化

<!-- more -->

## 集合函数 170 - 486行


### each  

_.each(obj, iteratee, [context]) 

`_` 的each方法遍历所传obj（这里可看作一个列表，数组或类数组）中的所有元素，按顺序用遍历输出每个元素。如果传递了context参数，则把iteratee绑定到context对象上。每次调用iteratee都会传递三个参数：(element, index, list)。如果list是个JavaScript对象，iteratee的参数是 (value, key, list))。返回list以方便链式调用。

```js
_.each = _.forEach = function(obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;
  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};
```

```js
_.each([1, 2, 3], i => console.log(i));  
=> 1, 2, 3  注，返回的是每个迭代对象自身
_.each({a: '1', b: [1,2,3], c:{name: 'fri'}}, item => console.log(item))
=> 1, [1,2,3], {name: 'fri'}  注：返回的是迭代对象的每一项，拿到的是value值
```

`iteratee = optimizeCb(iteratee, context)形成一个递归调用`，if分支用于控制是迭代数组还是对象，最后返回的是迭代的自身。

### map

_.map(obj, iteratee, [context]) 

通过转换函数(iteratee迭代器)映射列表中的每个值产生价值的新数组。该方法接收三个参数，循环对象，迭代器和环境参数。后两个参数作为活动对象传到了cb方法中。

```js
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
```

```js
_.map([1,2,3], num => num * 2);
=> [2,4,6] 注：返回的是results这是一个数组

_.map({name: 'fri', age: 24}, (k, v) => `${k}: ${v}`);
=> ["fri: name", "24: age"] map一个对象，返回的是由key,val组成的数组
```

* keys, length, results这三个变量的声明很精髓，(后面也有很多地方用到) !有隐式转换变为布尔型，所以keys = `布尔` && _.keys(obj) 因为逻辑与，表达式成立的条件是，前面部分会为真，即这句直接拿到了 _.key(obj)。
* 数组中才有length这一属性，普通对象中是没有定义的
* Array(length)会创建一个长度为length的数组这么再来看循环体中的results[index]就清楚多了

### reduce reduceRight

_.reduce(list, iteratee, [memo], [context]) 
_.reduceRight(list, iteratee, memo, [context])

reduce方法把list中元素归结为一个单独的数值。
Memo是reduce函数的初始值，reduce的每一步都需要由iteratee返回。这个迭代传递4个参数：memo,value 和 迭代的index（或者 key）和最后一个引用的整个 list。

```js
  var createReduce = function(dir) {
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  _.reduce = _.foldl = _.inject = createReduce(1);

  _.reduceRight = _.foldr = createReduce(-1);
```

```js
_.reduce([1,2,3], (memo, num) => memo + num)
=> 6  这里只传了memo和num, 因为传入的是数组initial默认为0
```

如果没有memo传递给reduce的初始调用，iteratee不会被列表中的第一个元素调用。第一个元素将取代 传递给列表中下一个元素调用iteratee的memo参数。

最外层的匿名函数中的dir传到了 `index = dir > 0 ? 0 : length - 1 ` 由dir来判断是reduce还是reduceRight，这里高度抽象的思想值得我们学习

createReduce是 `_` 作用域中的私有变量，外部访问不到，这里 _.reduce 是向外暴露的接口，我们调用的api 其实是调用craeteReduce()所返回的函数

### find

_.find(obj, predicate, [context]) 

keyFinder的结果由传入obj是数组(下标)还是对象(key)决定，这里的key是一个递归调用。在obj中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有值传递给测试迭代器将返回undefined。 如果找到匹配的元素，函数将立即返回，不会遍历整个list。

```js
  _.find = _.detect = function(obj, predicate, context) {
    // _.findIndex() 652行
    // _.findKey() 1093行
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

```

```js
_.find([2,4,5,6,7,8], num => num % 2 != 0)
=> 5， 找到5就不会继续找7了
```

### filter

_.filter(obj, predicate, [context]) 

遍历所传obj中的每个值，返回包含所有通过predicate真值检测的元素值。（如果存在原生filter方法，则用原生的filter方法。）

```js
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };
```

```js
_.filter([2,3,4,6,8,10], num => num % 2 === 0)
=> [2,4,6,8,10] 3被过滤掉
_.filter([{name:'fri'},{name: 'yk'}, {name: 'hhh'}], item => item['name'] == 'fri')
=> [{name: 'fri'}]
```

这里额外说两句，其实暴露的API写法大同小异，主要是理解核心方法中的 `cb` `optimizeCb` 知道 `_` 是怎么通过高阶函数传参，拿到传入对象（函数）的作用域 `func.apply(context, arguments);`

### reject

_.reject(list, predicate, [context]) 返回list中没有通过predicate真值检测的元素集合，与filter相反

```js
_.reject = function(obj, predicate, context) {
  return _.filter(obj, _.negate(cb(predicate)), context);
};
```

对_.filter的一个封装， `_.negate(916行)`可见到，返回的是结果为false的集合

### every 

_.every(obj, [predicate], [context])  如果list中的所有元素都通过predicate的真值检测就返回true。

```js
_.every = _.all = function(obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
};
```

```js
_.every([false, 0, null, undefined, NaN, 1], item => item != true) 
=> true
```


### some

_.some(obj, [predicate], [context])  如果obj中有任何一个元素通过 predicate 的真值检测就返回true。一旦找到了符合条件的元素, 就直接中断对obj的遍历. 

```js
_.some = _.any = function(obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }
  return false;
};
```

```js
_.some([false, 0, null, undefined, NaN, 1], item => item == true) 
=> true
```

### contains

_.contains(obj, value, [fromIndex])  如果obj包含指定的value则返回true。如果obj 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。这个方法ES6已有实现 参考`Array.prototype.includes`

```js
_.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = _.values(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return _.indexOf(obj, item, fromIndex) >= 0;
};
```

```js
_.contains([a,b,c], 3)
=> true
```

### invoke 

_.invoke(list, methodName, *arguments) 在list的每个元素上执行methodName方法。 任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它

```js
_.invoke = restArgs(function(obj, path, args) {
  var contextPath, func;
  if (_.isFunction(path)) {
    func = path;
  } else if (_.isArray(path)) {
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }
  return _.map(obj, function(context) {
    var method = func;
    if (!method) {
      if (contextPath && contextPath.length) {
        context = deepGet(context, contextPath);
      }
      if (context == null) return void 0;
      method = context[path];
    }
    return method == null ? method : method.apply(context, args);
  });
});
```

```js
_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
=> [[1, 5, 7], [1, 2, 3]]
```

### pluck

_.pluck(list, propertyName)  萃取数组对象中某属性值，返回一个数组

```js
_.pluck = function(obj, key) {
  return _.map(obj, _.property(key));
};
```

```js
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
=> ["moe", "larry", "curly"]
```

这是对 _.map用法的一个封装

### where、findWhere

_.where(obj, attrs) 遍历obj中的每一个值，返回一个数组，这个数组包含attrs所列出的属性的所有的 键 - 值对。

```js
_.where = function(obj, attrs) {
  return _.filter(obj, _.matcher(attrs));
};
```

_.findWhere(obj, attrs) 遍历整个obj，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值。

```js
_.findWhere = function(obj, attrs) {
  return _.find(obj, _.matcher(attrs));
};
```

### max 和 min

_.max(obj, [iteratee], [context]) 返回list中的最大值

```js
 _.max = function(obj, iteratee, context) {
  var result = -Infinity, 
    lastComputed = -Infinity,
    value, 
    computed;

  if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
    obj = isArrayLike(obj) ? obj : _.values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    _.each(obj, function(v, index, list) {
      computed = iteratee(v, index, list);
      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }
  return result;
};
```

这里是实现看起来挺复杂，不要畏惧，一行一行来。 第一段if做了安全检测，防止内存溢出，虽然一般人用不会乱传数字，但xx就不一定了是吧。 让我们继续来断句

```js
if (
  iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') 
    && obj != null
) {
  ...
}
```

通过条件为 第2行 的 逻辑或 || 成立
1  iteratee == null
2  typeof iteratee == 'number' && typeof obj[0] != 'object'
两句任其一为真即可，1.8.3与1.8.2中唯一的变化就是对obj类型检测提炼了，让其能对对象或数组都能安全迭代，最后返回的 result 即为安全的value值

那么当安全检测未通过时，`_`是这么来处理的，`iteratee = cb(iteratee, context)` 让其提供安全的作用域，然后对传入的obj进行迭代（_.each） computed拿到了迭代对象的作用域，进行自处理，把拿到的值进行安全处理（赋值）

继续断句：

```js
if (
  (computed > lastComputed) || 
  (computed === -Infinity && result === -Infinity)
) {
  ...
}
```
这样看就容易多了，-Infinity限制了所传或最终得到的结果会在js允许的安全范围内

_.min(obj, [iteratee], [context]) 返回list中的最小值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据，如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。

这里和 _.max 差不多就不做过多解释了

```js
_.min = function(obj, iteratee, context) {
  var result = Infinity, lastComputed = Infinity,
      value, computed;
  if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
    obj = isArrayLike(obj) ? obj : _.values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    _.each(obj, function(v, index, list) {
      computed = iteratee(v, index, list);
      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }
  return result;
};
```

### sample 和 shuffle

_.sample(obj, [n], [guard]) 从 obj中产生一个随机样本。传递一个数字表示从obj中返回n个随机元素。否则将返回一个单一的随机项

```js
_.sample = function(obj, n, guard) {
  if (n == null || guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return obj[_.random(obj.length - 1)];
  }
  var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
  var length = getLength(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;
  for (var index = 0; index < n; index++) {
    var rand = _.random(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }
  return sample.slice(0, n);
};
```

我们先看if段，当n或guard未传时返回所传时，返回obj中的一个随机项。
若传了n和guard时，用`私有变量sample`存储了对obj的处理——数组浅拷贝，对象就创建一个副本。然后遍历sample将其内容打乱并返回。


_.shuffle(obj) 返回一个随机乱序的 list 副本

```js
_.shuffle = function(obj) {
  return _.sample(obj, Infinity);
};
```

上懂了sample方法这里就很简单了，shuffle方法即是对sample的一种应用，传入obj，n取无限大（即obj.length）这样返回的是打乱后的obj

### sortBy

_.sortBy(obj, iteratee, [context]) 返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。迭代器也可以是字符串的属性的名称进行排序的(比如 length)。

```js
_.sortBy = function(obj, iteratee, context) {
  var index = 0;
  iteratee = cb(iteratee, context);
  return _.pluck(_.map(obj, function(value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function(left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }
    return left.index - right.index;
  }), 'value');
};
```

我们直接看return就好， _.pluck()返回由obj的某些值所组成的'数组'(当然，1.8.3扩展后也可以是对象)，然后再对这个'数组'进行原生的sort()排序，并将结果返回

### group

这是用于聚合group by操作的内部函数

```js
var group = function(behavior, partition) {
  return function(obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = cb(iteratee, context);
    _.each(obj, function(value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
};
```

所传的behavior其实是一个回调函数，只是这里表现得很语义化，我们读源码要根据上下文来看，不然很容易迷糊。这里的group是一个高阶函数，对内层进行了封装，group执行后返回一个闭包，该闭包执行后返回处理结果。
在闭包用变量`result`对partition进行兼容处理，若数组则[[], []]分隔开，对象的话默认处理为空对象，iteratee我们见得很多了，即返回一个安全的执行环境。然后迭代所传对闭包所传的参数obj，内部有声明一个变量key用于返回新的执行环境
这里有点绕，允许我啰嗦一下（以后水平上来了会精简，这里我尽量用自己的话说清楚）iteratee()后返回的执行环境在 group执行返回的闭包中，这个闭包里进行的迭代由于绑定了obj，就由group的调用 _ 这个环境跳到了 所要迭代的对象 obj 中了~ 然后此时的回调 behavior再来对result进行处理

有点把自己绕进去了，我们先来看看实际运用，就知道为什么要进行这个封装了

**groupBy** _.groupBy(result, value, key) 把一个集合分组为多个集合，通过 value 返回的结果进行分组. 如果 value 是一个字符串而不是函数, 那么将使用 value 作为各元素的属性名来对比进行分组.

```js
_.groupBy = group(function(result, value, key) {
  // _.has()方法在1369行  用于对象是否包含给定的键
  if (_.has(result, key)) result[key].push(value); 
  else result[key] = [value];
});
```

**indexBy** 

_.indexBy(result, value, key) 给定一个集合(对象)，和 一个用来返回一个在列表中的每个元素键 的iterator 函数（或属性名）， 返回一个每一项索引的对象。和groupBy非常像，但是当你知道你的键是唯一的时候可以使用indexBy 。

```js
_.indexBy = group(function(result, value, key) {
  result[key] = value;
});
```

**countBy**  countBy_.countBy(list, iteratee, [context]) 排序一个列表组成一个组，并且返回各组中的对象的数量的计数。类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目。

```js
_.countBy = group(function(result, value, key) {
  if (_.has(result, key)) result[key]++; else result[key] = 1;
});
```

### toArray

_.toArray(obj) 把obj(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。

```js
_.toArray = function(obj) {
  if (!obj) return [];
  if (_.isArray(obj)) return slice.call(obj);
  if (_.isString(obj)) {
    // Keep surrogate pair characters together
    return obj.match(reStrSymbol);
  }
  if (isArrayLike(obj)) return _.map(obj, _.identity);
  return _.values(obj);
};
```

### size

.size(obj) 返回所传合法对象的长度。

```js
_.size = function(obj) {
  if (obj == null) return 0;
  return isArrayLike(obj) ? obj.length : _.keys(obj).length;
};
```

这其实是一个扩展处理，我们知道对象是没有length属性的。这里进行了处理，返回 由对象的key值所组成数组的长度~

### partition

_.partition(array, predicate) 拆分一个数组（array）为两个数组：  第一个数组其元素都满足predicate迭代函数， 而第二个的所有元素均不能满足predicate迭代函数。

```js
_.partition = group(function(result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true);
```

group的第一个参数是个回调没异议，第二个传了一个true是什么呢？ 我们可翻到上面看看，`partition`的值决定了如何处理result 这里变成了 [[], []] 的形式。那么很简单了，根据回调的pass结果，通过放到 [[], []][0]中， 未通过则放到[[], []][1]中



## 下期预告 Array Functions 

这一部分Collection，集合函数的相关学习就到此为止了，在下一章中，就开始Array Functions的学习了。

## 小结

随着 underscore.js 源码的阅读与学习深入，我们可以了解到很多底层封装的原理与细节。在阅读源码时，不要害怕自己看不懂，理解错，不清楚的地方可以单独拎出来，自己写写或者代码跑起来看看效果以便加深理解。

Collections Function中，其实很多都是对第一章核心函数的一些封装和重复使用，如cb optimizeCb这类用得多的，向外暴露的API又可以让封装的其他API来使用，如 where findWhere就是对filter的运用， pluck是对map的二次封装。