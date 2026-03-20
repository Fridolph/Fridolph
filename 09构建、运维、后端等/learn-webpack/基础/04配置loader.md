# 04配置loader

## loader匹配规则

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.jsx?/, // 条件
        include: [
          path.resolve(__dirname, 'src'),
        ], // 条件
        use: 'babel-loader', // 规则应用结果
      }, // 一个 object 即一条规则
      // ...
    ],
  },
}
```

loader的匹配规则中有两个关键因素，一个是匹配条件，一个是匹配规则后的应用。

匹配条件通常使用请你滚球资源的绝对路径来匹配`resource`，除此还有较少用到的`issuer`(声明依赖请求的源文件的绝对路径)

### 规则条件配置

配置loader匹配条件，一般使用`test`就好。若需配置较复杂的匹配条件，webpack的规则提供了多种配置形式：

* test 匹配特定条件
* include 匹配特定路径
* exclude 排除特定路径
* and 必须匹配数组中的所有条件
* or 匹配数组中的任一条件
* not 排除匹配数组中的条件

上述的所谓条件的值可以是：

* 字符串：必须以提供的字符串开始，所以是字符串的话，这里我们需要提供绝对路径
* 正则表达式：调用正则的 test 方法来判断匹配
* 函数：(path) => boolean，返回 true 表示匹配
* 数组：至少包含一个条件的数组
* 对象：匹配所有属性值的条件

### module type

webpack 4.x版本后，模块类型概念。不同模块类型类似于配置了不同的loader

* javascript/auto：即 webpack 3 默认的类型，支持现有的各种 JS 代码模块类型 —— CommonJS、AMD、ESM
* javascript/esm：ECMAScript modules，其他模块系统，例如 CommonJS 或者 AMD 等不支持，是 .mjs 文件的默认类型
* javascript/dynamic：CommonJS 和 AMD，排除 ESM
* javascript/json：JSON 格式数据，require 或者 import 都可以引入，是 .json 文件的默认类型
* webassembly/experimental：WebAssembly modules，当前还处于试验阶段，是 .wasm 文件的默认类型

### 使用loader配置

`module.rules`匹配规则最重要的还是用于配置loader，我们可以用use字段：

```js
rules: [
  {
    test: /\.less/,
    use: [
      'style-loader',
      {
        loader: 'css-loader,
        options: {
          importLoaders: 1
        }
      }, // 用对象表示loader，可以传递loader配置等
      {
        loader: 'less-loader',
        options: {
          noIeCompat: true
        } // 传递loader配置
      }
    ]
  }
]
```

### loader应用顺序

顾名思义，所有的loader按照`前置 -> 行内 -> 普通 -> 后置`的顺序执行。所以当要确保eslint-loader在babel-loader之前执行时，可以添加enforce，如下：

```js
rules: [
  {
    enforce: 'pre', // 指定为前置类型
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  }
]
```

* 使用 `noParse`

我们使用loader在module.rules下配置，而webpack配置下的module用于控制如何处理项目中不同类型的模块。

除了module.rules字段用于配置loader外，还可用`module.noParse`，可配置哪些模块文件的内容不需要进行解析。对于一些不需要`解析依赖`的第三方大型类库等，可以通过该字段配置，以提高整体的构建速度

> 使用`noParse`进行忽略的模块文件中不能使用import require define等导入机制

```js
module.exports = {
  module: {
    noParse: /jQuery|lodash/,
    // 或使用function
    // noParse(content) {
    //   return /jQuery|lodash/.test(content)
    // }
  }
}
```

noParse 从某种程度上说是个优化配置项，日常也可以不去使用。
