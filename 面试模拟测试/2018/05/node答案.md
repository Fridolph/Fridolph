1. 什么是错误优先的回调函数

错误优先的回调函数 Error-First Callback 用于同时返回错误和数据。第一个参数返回错误，并且校验它是否出错，其他参数用于返回数据

2. 如何避免回调地域

* 模块化，将回调函数转换为独立的函数
* 使用流程控制库
* 使用Promise
* 使用async/await

3. 什么是Promise

es6新增特性，帮助我们更好地处理异步操作

4. 用什么工具保证一致的代码风格？为什么要这样？

团队协作时，保证一致的代码风格是非常重要的，这样团队成员才可以更快地修改代码，而不需要每次去适应新的风格。这些工具可以帮助我们:

* editorconfig
* ESLint
* Standard

5. 什么是Stub？举例说明

Stub用于模拟模块的行为。测试时，Stub可以为函数调用返回模拟的结果。比如说，当我们写文件时，实际上并不需要真正去写

```js
var fs = require('fs')
var writeFileStub = sinon.stub(fs, 'writeFile', function(path, data, cb) {
  return cb(null)
})
expect(writeFileStub).to.be.called
writeFileStub.restore()
```

6. 什么是测试金字塔

测试金字塔反映了需要写的单元测试、集成测试以及端到端测试的比例

![测试金字塔](https://blog.fundebug.com/2017/04/10/nodejs-interview-2017/test_pyramid.png)

测试HTTP接口时应该是这样的：

* 很多单元测试，分别测试各个模块（依赖需要Stub）
* 较少的集成测试，测试各个模块之间的交互（依赖不能Stub）
* 少量端到端测试，去调用真正的接口（依赖不能Stub）

7. 最喜欢哪个HTTP框架？为什么

这个问题没有标准答案。需要描述框架的优缺点，这样可以反映开发者对框架的熟悉程度。

8. Cookies如何防范XSS攻击

XSS(Cross-site Scripting 跨站脚本攻击)是指攻击者在返回html中插入JS脚本。为了减轻这些攻击，需要在HTTP头部配置`set-cookie`

* httpOnly 这个属性可以防止XSS，因为它会禁止JS脚本访问cookie
* secure 该属性告诉浏览器仅在请求为HTTPS时发送cookie

结果应该是这样的 `Set-Cookie: sid=;HttpOnly` 。使用Express的话，`cookie-session`默认配置好了

9. 如何保证依赖的安全性

编写Node.js应用时，很可能依赖成百上千模块。例如Express就直接依赖27个模块，手动检查不现实，自动化安全检查可有以下工具选择：

* npm outdated
* Trace by RisingStack
* NSP
* GreenKeeper
* Snyk
