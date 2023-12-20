1. 升级 Node、npm、Yarn 工具版本

2. 在尽可能少的模块上应用 loader （include exclude）

3. Plugin 尽可能精简并确保可靠

4. resolve 参数合理配置

```js
resolve: {
  // 不建议配过多
  extensions: ['.js', '.vue']
}
```

5. 使用 DllPlugin 提高打包速度

第三方模块，只在第一次打包时分析，之后不再分析

```js
//
plugins: [
  // ...
  new AddAssetHtmlWebpackPlugin({
    filepath: path.resolve(__dirname, '../dll/vendor.dll.js')
  }),
  new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, '../dll/vendor.manifest.json')
  })
]
```

6. 控制包的大小

7. thread-loader parallel-webpack happypack 多进程打包

8. 合理使用 sourceMap

9. 结合 stats 分析打包结果

10. 开发环境内存编译、无用插件剔除
