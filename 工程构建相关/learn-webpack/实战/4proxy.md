配置 devServer

开发写的是 /api/react/test.json 在开发环境中，请求的是 localhost:8080/api/react/test.json，若请求转发到 后台服务地址，可通过proxy来配置

```js
devServer: {
  // 帮自动打开浏览器
  open: true,
  port: 8080,
  // 热更新
  hot: true,
  hotOnly: true,
  // 解决单页应用路由问题
  historyApiFallback: true,
  // historyApiFallback: {
  //   from: /^\/(libs)\/.*$/,
  //   to: 'index.html'
  // }
  proxy: {
    '/api': {
      target: 'www.test.com',
      pathRewrite: {
        'header.json': 'demo.json'
      },
      // 对https请求的转发
      secure: false,
      // 请求拦截
      // bypass(req, res, proxyOptions) {
      //   if (req.headers.accept.indexOf('html') !== -1) {
      //     console.log('Skipping proxy for browser request.')
      //     return './index.html'
      //   }
      // }
      // 突破爬虫等的限制
      changeOrigin: true
    }
  }
}
```
