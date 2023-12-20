## 问题

1. 什么是错误优先的回调函数？
2. 如何避免回调地狱？
3. 什么是Promise?
4. 用什么工具保证一致的代码风格？为什么要这样？
5. 什么是Stub?举例说明
6. 什么是测试金字塔？举例说明
7. 最喜欢哪个HTTP框架？为什么？
8. Cookies如何防范XSS攻击？
9. 如何保证依赖的安全性？

---

1. node里用得多，api里回调第一个参数接受错误，并验证错误，其他参数返回数据

```js
const fs = require('fs')
fs.readFile((err, data) => {
  if (err) console.log(err)
  console.log(data)
})
```

2. 多个嵌套逻辑，避免使用回调方式。用Promise、async/await代替

3. es6新增特性，是一个新的标准.

4. 写.editorconfig/eslint校验，选用同样的标准，比如airbnb startard保证一致性

5. 不知道

6. 不知道

7. express简单好用，易于处理服务和扩展

8. encodeURIComponent 进行转义

9. 不清除
