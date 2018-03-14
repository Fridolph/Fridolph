## 知识点

### 通用事件绑定

```js
var btn = document.getElementById('btn1')
btn.addEventListener('click', function(event) {
  console.log('clicked')
})
// 封装
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
}
var a = document.getElementById('link1')
bindEvent(a, 'click', function(e) {
  e.preventDefault()
  console.log('clicked')
})
```

### 事件冒泡
```html
<body>
  <div id="div1">
    <p id="p1">激活</p>
    <p id="p2">激活</p>
    <p id="p3">激活</p>
    <p id="p4">激活</p>
  </div>
  <div id="div2">
    <p id="p5">取消</p>
    <p id="p6">取消</p>
  </div>
</body>
<script>
  var p1 = document.getElementById('p1')
  var body = document.body
  bindEvent(p1, 'click', function(event) {
    e.stopPropatation()
    console.log('激活')
  })
  bindEvent(body, 'click', function(event) {
    alert('取消')
  })
</script>
```

### 代理
```html
<div id="div1">
  <a href="#">a1</a>
  <a href="#">a2</a>
  <a href="#">a3</a>
  <a href="#">a4</a>
  <!-- 会随时新增更多的a标签 -->
</div>  
<script>
  var div1 = document.getElementById('div1')
  div1.addEventListener('click', function(event) {
    var target = e.target
    if (target.nodeName === 'a') {
      alert(target.innerHTML)
    }
  })
</script>
```

### 完善通用绑定事件的函数

* 编写一个通用的事件监听函数 

```js
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, function(e) {
    var target
    if (selector) {
      target = e.target
      if (target.matches(selector)) {
        fa.call(target, e)
      }
    } else {
      fn(e)
    }
  })
}
// 使用代理
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function(e) {
  console.log(this.innerHTML)
})
// 不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function(e) {
  console.log(a.innerHTML)
})
```

### 描述事件冒泡过程

* DOM树形结构
* 事件冒泡
* 阻止冒泡
* 冒泡的应用


### 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

* 使用代理（事件）
* 知道代理的两个优点