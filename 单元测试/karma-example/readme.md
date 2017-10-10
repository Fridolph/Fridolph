# Karma Example

Karma配置实例项目,支持ES6语法：

    测试管理工具：Karma
    测试框架：Mocha
    断言库：Chai
    测试浏览器：Chrome
    测试覆盖率统计工具：Karma-Coverage

单元测试，顾名思义，就是为了测试代码的质量。对于某段代码或组件，如果通过单元测试后的代码覆盖率越高，说明该代码或组件鲁棒性更高，在生产环境中出现bug的机率越低。

代码覆盖率（code coverage）有四个测量维度，

    行覆盖率（line coverage）：是否每一行都执行了？
    函数覆盖率（function coverage）：是否每个函数都调用了？
    分支覆盖率（branch coverage）：是否每个if代码块都执行了？
    语句覆盖率（statement coverage）：是否每个语句都执行了？

本文简要介绍如何搭建一个支持 ES6 语法的单元测试环境，本工程demo源码可参考这里

本工程使用的相关工具介绍如下：

测试管理工具：Karma
测试框架：Mocha
断言库：Chai
测试浏览器：Chrome
测试覆盖率统计工具：Karma-Coverage

**karma 配置文件内容：**

```js
// Karma configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/**/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
          { type: 'html' },
          { type: 'text'},
          { type: 'text-summary' }
      ]
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015'],
            plugins: ['istanbul']
          }
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  })
}
```

    npm test

即可查看测试报告了