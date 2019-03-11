## code-splitting

1. 如果引用了库，写业务代码打包，打包文件大，加载时间过长

2. 只更改业务代码，还是会重新打包，重新加载 js

---

- 代码分隔，和webpack无关
- webpack中实现代码分隔
  1. 同步代码，只需要在webpack.common.js 中做optimization 配置
  2. 异步代码 import 无需做任何配置，会自动进行代码分隔

---

## splitChunksPlugin

默认优化的配置项

```js
optimization: {
  splitChunks: {
    // 在代码分隔时，只对异步代码生效
    chunks: 'async',
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    // 只做最多5个代码分隔（一般根据需要设多个）
    maxAsyncRequests: 5,
    // 入口文件(或依赖库)，最大做3个代码分隔
    maxInitialRequests: 3,
    // 文件中间生成的连接符
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        // 值越大，通过时 放入vendor的优先级越高
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        // 如果模块已经被打包过了，再打包就会忽略
        reuseExistingChunk: true
      }
    }
  }
}
```
