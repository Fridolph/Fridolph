jsonp跨域其实也是JavaScript设计模式中的一种代理模式。在html页面中通过相应的标签从不同域名下加载静态资源文件是被浏览器允许的，所以我们可以通过这个“犯罪漏洞”来进行跨域。一般，我们可以动态的创建script标签，再去请求一个带参网址来实现跨域通信

原生方式：

```js
let script = document.createElement('script')
script.src = 'xxx url'
document.body.appendChild(script)

function callback(res) {
  console.log(res)
}
```

jQuery

```js
$.ajax({
  url:'http://www.nealyang.cn/login',
  type:'GET',
  dataType:'jsonp',//请求方式为jsonp
  jsonpCallback:'callback',
  data:{
    "username":"Nealyang"
  }
})
```

jsonp缺点，只能实现get请求
