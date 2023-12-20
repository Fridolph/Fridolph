node中间件实现跨域代理，是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中的域名，实现当前域名的cookie写入，方便接口登录认证。

利用 node + express + http-proxy-middleware 搭建一个proxy服务器，下为前端代码：

```html
<script>
var xhr = new XMLHttpRequest()
// 前端开关，浏览器是否读写cookie
xhr.withCredentials = true
// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true)
xhr.send()
</script>
```

后端代码：

```js
const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

app.use('/', proxy({
  // 代理跨域目标
  target: 'http://www.domain2.com:8080',
  changeOrigin: true

  // 修改响应头信息，实现跨域并允许带cookie
  onProxyRes: (proxyRes, req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://www.domain1.com')
    res.header('Access-Control-Allow-Credentials', 'true')
  },

  // 修改响应信息中的cookie签名
  cookieDomainRewrite: 'www.domain1.com' //也可为false表示不修改
}))

app.listen(3000)
console.log('proxy server is listen at port 3000...')
```

