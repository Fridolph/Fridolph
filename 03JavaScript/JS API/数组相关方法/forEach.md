https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach

forEach() 方法对数组的每个元素执行一次提供的函数。

语法

    array.forEach(callback(currentValue, index, array){
        //do something
    }, this)

    array.forEach(callback[, thisArg])

参数

* callback 为数组中每个元素执行的函数，该函数接收三个参数：
* currentValue(当前值) 数组中正在处理的当前元素。
* index(索引) 数组中正在处理的当前元素的索引。
* array forEach()方法正在操作的数组。
* thisArg可选 可选参数。当执行回调 函数时用作this的值(参考对象)。
