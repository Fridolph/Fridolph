chunk 可理解为 我们写的entry 里，声明的不同入口对应文件（节点）。
使用异步加载模块时，每一个加载模块就是一个单独的chunk。

entry: {
  app1: ...
  app2: ...
}

直接使用 [hash] 打包出来的 整个应用的 hash（相同于一次这一次打包 生成的一个唯一ID）
使用 [chunkHash] 每一个entry节点 会单独生成一个唯一ID。
所以打包公共类库 必须使用 chunkHash

```js
config.plugins.push(
  // 讲 css 单独打包成一个 css文件
  new ExtractTextPlugin('styles.[contentHash:8].css'),
  new webpack.optimize.CommonChunkPlugin({
    name: 'vendor'
    // 这里对应 我们在 entry 里写的入口名
  }),
  new webpack.optimize.CommonChunkPlugin({
    name: 'runtime'
  })
)
```

webpack打包时，会给每一个模块单独加上一个ID， 在有新的模块加入时，模块插入的顺序在中间，导致后面的模块顺序发生变化

> 这里可以理解为： 我们给ul 的每个li 定义了一个index值，对应其索引。当在中间插入一个li时，后续的每个li的索引都加了1。 li既然都变了，对于没用框架的html上的dom来说ul其实就已变化了

接上，多添加一个 

new webpack.optimize.CommonChunkPlugin({
  name: 'runtime'
})

不管我们后来的模块怎么加，我们已打包过的vendor 就不会变，那么打包时的性能是不是提升了呢？

