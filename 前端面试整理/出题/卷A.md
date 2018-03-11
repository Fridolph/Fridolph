简答题：

1、简单描述一下CSS盒模型。简述下box-sizing
<br>
<br>

2、display: none 和 visible:hidden 的区别 
<br>
<br>


3、伪类和伪元素的区别，及各自的使用场景
<br>
<br>


4、textarea 默认可改变尺寸，怎么去掉
<br>
<br>


5、拿到这个设计稿(淘宝、京东网首页)，谈谈页面制作思路
<br>
<br>


程序运行题

注：假设以下代码都运行在浏览器的Console调试台中

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

5、下面代码执行返回的结果是？

```js
(function() {
  return [
    (() => this.x).bind({x: 'inner'})(),
    (() => this.x)()
  ]
}).call({x: 'outter'})
```

综合实践题

> 请候选人下面场景的一些解决思路、方案。
注：列出用到的重要属性，核心思路，伪代码也行，能get到考点即可

编写一个函数解析url地址参数

    var url = 'http://www.domain.com/?user=anonymous&id=123'
    console.log(parseUrl(url))
    /**
    结果：
    {
      user: 'anonymous',
      id: '123'      
    }
    */


