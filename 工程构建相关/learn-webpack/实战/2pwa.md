可以使用该插件 workbox-webpack-plugin

webpack.config.js (prod)

```js
// 其他代码省略
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new WorkboxPlugin.GenerateSw({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```

业务里 sw.js

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('sw registed')
      }).catch(err => {
        console.error(err)
      })
  })
}
```
