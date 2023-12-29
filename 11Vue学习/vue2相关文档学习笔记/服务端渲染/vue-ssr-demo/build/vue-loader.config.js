// const docsLoader = require.resolve('./docs-loader')

module.exports = isDev => {
  return {
    preserveWhitespace: true, // 空格
    extract: !isDev, // 将vue模版中的 style 里的样式打包出来'
    cssModules: {
      // 根据文件所在路径，文件名，及文件内容hash生成
      // 生成一个独一无二的className
      localIdentName: isDev ? '[name]-[hash:base64:4]' : ['hash:base64:4'],
      camelCase: true // 将 - 风格转为小驼峰
    },
    // hotReload: false, 根据环境变量 是否热重载
    // loaders: {
    //   'docs'
    // }
    // preLoader: {
    // 在使用指定的loader解析之前，先用这里指定的loader解析
    // },
    // postLoader: {
    // 在对文件解析之后， 再用指定的loader解析一遍
    // }
  }
}

// 说一下。scoped区别
