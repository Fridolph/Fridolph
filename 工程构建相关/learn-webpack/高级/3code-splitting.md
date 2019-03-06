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
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}
```
