程序运行题 （注：假设以下代码都运行在浏览器的Console调试台中，说出运行结果）

1.
```js
var y = 1, x = y = typeof x
console.log(x)   
```

2.
```js
var x = 1;
if (function f() {}) {
  x += typeof f
}
console.log(x)
```

3.
```js
var x = [typeof x, typeof y][1]
console.log(typeof typeof x)
```

4.
```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); 
```

5.
```js
(function() {
  return [
    (() => this.x).bind({x: 'inner'})(),
    (() => this.x)()
  ]
}).call({x: 'outter'})
```

`

综合实践题

> 请候选人下面场景的一些解决思路、方案。 注：列出用到的重要属性，核心思路，伪代码也行，能get到考点即可

1. 编写一个函数解析url地址参数

```js
var url = 'http://www.domain.com/?user=anonymous&id=123'
console.log(parseUrl(url))
/**
结果：
{
  user: 'anonymous',
  id: '123'      
}
*/
```

2. 有一个按钮button，为其添加高亮等交互效果（可自行发挥），点击后出现一个水平垂直居中的弹窗，用代码完成该需求
