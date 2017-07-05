简答题：

1、简单描述一下CSS盒模型。简述下box-sizing
<br>
<br>

2、display: none 和 visible:hidden的区别 
<br>
<br>


3、伪类和伪元素的区别，及各自的使用场景
<br>
<br>


4、textarea 默认可改变尺寸，怎么去掉
<br>
<br>


5、（随便打开个网站）拿到这个设计稿，谈谈制作思路

<br>
<br>


程序运行题

注：假设以下代码都运行在浏览器的Console调试台中

1、x的值？

```js
var y = 1, x = y = typeof x;
x;    
```

2、输出结果？

```js
var x = 1;
if (function f() {}) {
  x += typeof f;
}
x;
```

3、输出的类型是？

```js
var x = [typeof x, typeof y][1];
typeof typeof x;
```

4、下面的运行结果是？

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); 
```

5、返回的数组是？

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

<br>

1、请实现效果，标题只显示8个字，后面的内容以...形式省略

```html
<style>
  .art-wrap {
    width: 200px;
  }

  .art-wrap .art-title {


  }
</style>


<article class="art-wrap">
  <title class="art-title">
    标题很长很长很长啊，
    但真的显示不了这么长
  </title>
  <div class="art-content">...</div>
</article>
```

2、实现一个简易的stiky footer布局（概括如下：底部自适应，页面内容不够时，页脚粘连在底部，内容够时页脚块会跟着往下走）


<br>
<br>


3、登录按钮，默认灰，如图。hover后背景色逐渐变红

```html
<style>
.common-btn {



}
.btn-hover-red {



}
</style>


<button class="common-btn btn-hover-red">click me</button>
```

4、对上面的按钮增加一个点击事件，点击后，弹出一个水平垂直居中的弹窗，再次点击可关闭弹窗，在移动设备下也有良好的展示效果。

```html
<style>
  .pop-layer {
    

  }

  .pop-inner-box {
   

  }

</style>


<div class="pop-layer">
  <div class="pop-box">
    <div class="pop-box-header">
      <i class="icon-close" id="clickClose">x</i>
    </div>
    <div class="pop-box-content">
      <div class="pop-innerbox" id="removableBox"></div>
    </div>
  </div>
</div>

<script type="text/javascript">



</script>
```

5、实现对box的简单拖拽效果

```html
<script type="text/javascript">
  var box = document.documentById('removableBox');

  //todo
</script>
```