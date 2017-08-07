> 这一篇到了源码488行，主要是`underscore`对原生Array.prototype的一些扩展，arguments`参数`对象将在所有数组函数中工作 。然而, `_` 函数的设计并不只是针对稀疏（"sparse"）数组的。在下面的阅读学习中，我们会慢慢了解到

## 数组函数 488 - 747行

### first

`first_.first(array, [n])` 返回array（数组）的第一个元素。传递 n参数将返回数组中从第一个元素开始的n个元素（返回数组中前 n 个元素）

```js
// Get the first element of an array. Passing **n** will return the first N
// values in the array. Aliased as `head` and `take`. The **guard** check
// allows it to work with `_.map`.
_.first = _.head = _.take = function(array, n, guard) {
  if (array == null || array.length < 1) return void 0;
  if (n == null || guard) return array[0];
  return _.initial(array, array.length - n);
};
// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
_.initial = function(array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
};
```

作用域内有三个同名方法，前两个if判断用于安全检测，若参数参数正确，则返回 _.initial(array, array.length - n)的调用结果，于是我们继续来看看这个initial方法


这里是slice在之前声明过，为原生数组的slice方法，参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="_blank">MDN - Array.prototype.slice</a>
知道这个后也很简单了——对传递array的一个副本，返回前n个~




### last

`_.last(array, n, guard)` 返回array（数组）的最后一个元素。传递 n参数将返回数组中从最后一个元素开始的n个元素（愚人码头注：返回数组里的后面的n个元素）。

```js
// Get the last element of an array. Passing **n** will return the last N
// values in the array.
_.last = function(array, n, guard) {
  if (array == null || array.length < 1) return void 0;
  if (n == null || guard) return array[array.length - 1];
  return _.rest(array, Math.max(0, array.length - n));
};

// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array.
_.rest = _.tail = _.drop = function(array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
};
```

last方法也差不多，只不过这里n是slice的第二个参数，也就是说从n开始，到array剩余的元素

### compact

`compact_.compact(array)` 返回一个除去所有false值的 array副本。

```js
// Trim out all falsy values from an array.
_.compact = function(array) {
  return _.filter(array, Boolean);
};
```

从传入的数组中过滤掉“错误值”，虽然很短，但很有意思，filter方法我们在之前已经知道了，这里把Boolean作为参数直接传进去，隐式转换为false的值都会被过滤掉，即 null, 0, "", undefined 和 NaN

### flatten

`_.flatten(array, shallow)` 
将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。

```js
// Internal implementation of a recursive `flatten` function.
var flatten = function(input, shallow, strict, output) {
  output = output || [];
  var idx = output.length;
  for (var i = 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
      // Flatten current level of array or arguments object.
      if (shallow) {        
        var j = 0, len = value.length;
        while (j < len) output[idx++] = value[j++];
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};

// Flatten out an array, either recursively (by default), or just one level.
_.flatten = function(array, shallow) {
  return flatten(array, shallow, false);
};
```

这里很有意思，说下我的理解。`var flatten = function() {}`这里是在作用域里声明了一个私有变量，然后 `_.flatten`是给 _ 添加属性方法，在函数作用域内，返回的 flatten是在上下文环境中的 var flatten 这个私有变量。

flatten 接受四个参数：
* input：待展开数组
* shallow：是否是浅展开，反之为深度展开
* strict：是否为严格模式
* output：可以指定输出数组，如果指定了输出数组，则将展开后的数组添加至输出数组尾部

对传入数组 input 进行遍历，对于遍历到的元素 value：
如果 value 为数组，则需要展开，浅展开很简单，只是展开该元素最外一层数组，深度展开则需要递归调用 flatten。
如果 value 不为数组，则只有在非严格模式下该 value 才会被赋值到新的数组中。

如果不是深度展开，只是从value(数组)中不断抽出元素赋值output中，否则进行递归


### without

`_.without(array, otherArrays)` 返回一个删除所有values值后的 array副本

```js
// Return a version of the array that does not contain the specified value(s).
_.without = restArgs(function(array, otherArrays) {
  return _.difference(array, otherArrays);
});
// 这里为了便于观看，我把 _.difference也拿到这里一起说了
// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = restArgs(function(array, rest) {
  rest = flatten(rest, true, true);
  return _.filter(array, function(value){
    return !_.contains(rest, value);
  });
});
```

至于为什么能返回新的array副本，我们来看看这个方法。
之前介绍过了restArgs，就相当于es6的 ...args 函数里的展开参数。 rest就是我们的 ...args 在函数内部赋值给 rest变量。 这里返回的都是封装好的两个方法的调用，所以在直接代码中的封装为后续节省了很多代码量可读性也更高，所以我们在日常开发中，也应该学习。

_.contains 返回包含的参数在之前加上`!`即转为了 Boolean型，布尔型为true才会通过filter方法，所以该方法是这样拿到最后结果的。


### uniq 

`_.uniq(array, isSorted, iteratee, context)`

返回 array去重后的副本, 使用 === 做相等测试. 如果您确定 array 已经排序, 那么给 isSorted 参数传递 true值, 此函数将运行的更快的算法. 如果要处理对象元素, 传递 iteratee函数来获取要对比的属性.

```js
// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// Aliased as `unique`.
_.uniq = _.unique = function(array, isSorted, iteratee, context) {
  if (!_.isBoolean(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }
  if (iteratee != null) iteratee = cb(iteratee, context);
  var result = [];
  var seen = [];
  for (var i = 0, length = getLength(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!_.contains(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!_.contains(result, value)) {
      result.push(value);
    }
  }
  return result;
};
```

条件判断我们先略过，从for循环来看。如果排好序了, 直接通过比较操作!== 。
如果已经排序, seen 只需要反映最近一次见到的元素；
如果尚未排序, 且存在比较函数, 亦即不能直接通过 === 判断；
否则直接通过 contains 进行判断

### union

`_.union(arrays)` 返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays（数组）。

```js
// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
_.union = restArgs(function(arrays) {
  return _.uniq(flatten(arrays, true, true));
});
```

### intersection

`_.intersection(arrays)` 返回传入 arrays（数组）交集。结果中的每个值是存在于传入的每个arrays（数组）里。

```js
// Produce an array that contains every item shared between all the
// passed-in arrays.
_.intersection = function(array) {
  var result = [];
  var argsLength = arguments.length;
  for (var i = 0, length = getLength(array); i < length; i++) {
    var item = array[i];
    if (_.contains(result, item)) continue;
    var j;
    for (j = 1; j < argsLength; j++) {
      if (!_.contains(arguments[j], item)) break;
    }
    if (j === argsLength) result.push(item);
  }
  return result;
};
```

数组交集的求取思路为：遍历第一个数组的每个元素，在之后的所有数组中找寻是否有该元素，有则放入结果数组。


### difference 

`_.difference(...array)` 求取数组差集

```js
// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = restArgs(function(array, rest) {
  rest = flatten(rest, true, true);
  return _.filter(array, function(value){
    return !_.contains(rest, value);
  });
});
```

数组差集的求取思路为：令剩余的数组为 rest，flatten方法在之前有提到过，相当于ES6里的...args。然后用filter方法对array进行处理， `_.contains`返回的是布尔值，再取反，也就是最终返回array中存在的，而 rest 中不存在的值。

### unzip 和 zip

`uniq_.uniq(array)` 数组解压就是将多个数组的对应位置的元素抽离出来，组成新的数组：

    [['moe', 18, 'male'], ['larry', 23, 'female'], ['curly', 30, 'male']]

```js
// Complement of _.zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
_.unzip = function(array) {
  var length = array && _.max(array, getLength).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = _.pluck(array, index);
  }
  return result;
};
```

length为array.length，在其中做了安全校验，我们暂时省略。之后又声明了变量result，这是原生数组其长度为length。接下来进行循环，重组result，至于这个_.pluck怎么实现的我们放到后面来说… （还没看到那，说早了怕后面又忘了）

于是加上例子，更好地说明：

```js
var names = ['fri', 'yk', 'wb'];
var ages = [22, 23, 24];
var hobby = ['LOL', 'Dota2', ['毒奶粉', '亡者荣耀']];

var students = _.unzip([names, ages, hobby]);
// => students: [['fri', 22, 'LOL'], ['yk', 23, 'dota2'], ['wb', 24, ['毒奶粉', '亡者荣耀']]]
```

_.zip(array)：压缩 array ~ 同字面意思

```js
// Zip together multiple lists into a single array -- elements that share
// an index go together.
_.zip = restArgs(_.unzip);
```

就是上面 unzip方法的逆过程


## 总结

这一章的学习主要是操作Array的相关函数。可发现，其实最主要都是第一章里介绍的主要方法，很多都是方法的封装与实现，可见我们有一个好的封装是多么重要。
