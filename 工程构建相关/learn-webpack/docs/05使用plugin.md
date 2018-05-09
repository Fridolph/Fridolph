## 使用Plugin

> 社区参考 [plugins in awesome-webpack](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fawesome-webpack%23webpack-plugins)

### DefinePlugin

内置插件，可直接用`webpack.DefinePlugin`获取

该插件用于创建一些在编译时可配置的全局常用，这些常量值我们可以在webpack配置中去指定，如：

```js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // const isDev = 'true'
      isDev: JSON.stringify(true),
      // const VERSION = 'fridolph'
      VERSION: JSON.stringify('fridolph'),
      COMMON_OBJ: {
        ARRAY: [1,2,3],
        PERSON: {name: 'fri', age: 24}
      }
    })
  ]
}
```

有了上面的配置，就可以在应用中直接访问配置好的常量了。

* 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值，如上面的 "1+1"，最后的结果是 2
* 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
* 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义

### copy-webpack-plugin

如名字，就是用来复制的。若 有些文件没经过webpack处理，但希望它也能出现在build目录下，则可这么配置：

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/file.txt', to: 'build/file.txt' },
      { from: 'src/*.ico', to: 'build/*.ico' }
      // 可以配置很多项复制规则
    ])
  ]
}
```

更多参考 [copy-webpack-plugin](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fcopy-webpack-plugin)

### extract-text-webpack-plugin

用来把依赖的css分离出来成单独文件：

有的时候构建入口不止一个，extract-text-webpack-plugin 会为每一个入口创建单独分离的文件，因此最好这样配置：

```js
plugins: [
  new ExtractTextPlugin('[name].css')
]
```

### ProvidePlugin

该组件用于引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import，其用法相对简单：

```js
new webpack.ProvidePlugin({
  identifier: 'module'
})

// 或者
new webpack.ProvidePlugin({
  identifier: ['module', 'property']
  // 即引用module下的property，类似于
  // import {property} from 'module
})
```

当 identifier 被当作未赋值的变量时，module 就会被自动加载了，而 identifier 这个变量即 module 对外暴露的内容。

注意，如果是 ES 的 default export，那么你需要指定模块的 default 属性：identifier: ['module', 'default']

### IgnorePlugin

IgnorePlugin和ProvidePlugin一样，也是webpack内置的

该插件用于忽略某些特定模块，让webpack不把这些指定的模块打包进去。例如，使用moment.js，直接引用后，李敏啊有大量i18n代码，导致最后打包出来文件较大，可如下配置：

```js
module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
```

IgnorePlugin配置参数有两个:

1. 匹配引入模块路径的正则表达式
2. 匹配模块的对应上下文，即所在目录名
