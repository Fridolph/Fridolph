webpack.config.js

```js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    // 会在全局变量中，增加一个library变量
    library: 'library',
    // 全局变量挂载方式
    // umd 、 this 、 window 、 global
    libraryTarget: 'umd'
  }
}
```

如果打包的库里，使用了其他库

```js
module.exports = {
  // ... 省略

  // 打包时忽略掉下面的依赖， 但在使用时必须要引入需要的库
  externals: ['lodash']
}
```

最后再修改package.json

`main -> ./dist/输出.js`
