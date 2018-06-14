https://juejin.im/post/5ace1b306fb9a028c71ed009

---

1. OK
2. 只完成了css3 transition animation / js setTimeout 缺少requestAnimationFrame的方案
3. 需要补习
4. OK
5. 基于document.cookie的操作OK，封装cookie有问题

---

### 1. node如何开启一个http服务

```js
const http = require('http')
http.createServer((req, res) => {
  res.end('hello world')
}).listen(3000, () => {
  console.log('server is running at localhost:3000')
})
```

### 2. CSS3动画的实现方式有哪些，动手写一下将一个div在1s内移动300px

```html
<style>
.box {
  width: 100px;
  height: 100px;
  background: skyblue;
  animation: translateRight 1s 1s linear forwards;
}
@keyframe translateRight {
  0% {}
  100% {
    transform: translate(300px, 0);
  }
}
</style>
<div class="box"></div>
```

```html
<style>
.box {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
<div id="box"></div>
<script>
  var start = null
  var box = document.getElementById('#box')

  function step(timestamp) {
    if (!start) start = timestamp
    var progress = timestamp - start
    box.style.left = Math.min(progress / 10, 300) + 'px'
    if (progress < 300) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
</script>
```



### 3. DNS解析过程？若是新申请的域名如何查找DNS?

DNS是应用层协议，用于将用户提供的主机名解析为ip地址。具体过程如下：

1. **浏览器缓存**：当用户通过浏览器访问某域名时，浏览器首先会在自己的缓存中查找是否有该域名对应的IP地址（若曾经访问过该域名且没有清空，缓存便存在）

2. **系统缓存**：当浏览器缓存中无域名对应IP则会检查用户计算机系统Hosts文件DNS缓存是否有该域名对应的IP

3. **路由器缓存**：当浏览器及系统缓存中均无域名对应IP则进入路由器缓存中检查，以上三步均为客户端的DNS查询

4. **ISP（互联网服务提供商）DNS缓存**：当在客户端查找不到域名对应IP地址，则进入ISP DNS缓存中查询

5. **根域名服务器**：以上均未完成，则进入根服务器进行查询

6. **顶级域名服务器**：顶级域名服务器收到请求后查看区域文件记录，若无则将其管辖范围内主域名服务器的IP地址告诉本地DNS服务器

7. **主域名服务器**：主域名服务器接受到请求后查询自己的缓存，如果没有则进入下一级域名服务器进行查找，并重复该步骤直至找到正确记录

8. **保存结果至缓存**：本地域名服务器把返回的结果保存到缓存，以备下一次使用，同时将该结果反馈给客户端，客户端通过这个IP地址与web服务器建立链接

### 4. Ajax请求状态及意义

xhr对象有一个 onreadystatechange方法，该方法能监听到readyState的改变. readyState表示Ajax请求的当前状态

* 0 未调用open
* 1 调用open，还未send
* 2 send调用，请求开始
* 3 拿到了响应头，部分内容
* 4 请求完成


### 5. cookie的操作，读写

基于 `document.cookie` 进行读写。封装方法写得有问题

下面看下参考

```js
(function() {
  var cookieObj = {
    get: function(key) {
      var arr = document.cookie.split(';')
      var r = arr.filter(item => {
        return item.indexOf(key) !== -1
      })

      if (r.length > 0) {
        return r[0].split('=')[1]
      } else {
        return ''
      }
    },

    add: function(key, value) {
      document.cookie = `${key}=${escape(value)}`
    }
  }

  window.cookieObj = cookieObj
})()
```
