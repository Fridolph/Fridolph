https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString

toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

```js
var array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
var localeString = array1.toLocaleString('en', {timeZone: "UTC"});

console.log(localeString);
// expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
```
