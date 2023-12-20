## 一面

1. https? http协议相关 状态码 http缓存

2. 正则

* 写一个parseUrl

```js
function parseUrl(url) {
  let ret = {}
  let query = /[^?]+\?(.*)/.exec(url) && /[^?]+\?(.*)/.exec(url)[1]
  if (query) {
    let group = query.match(/&?[^&]+/g)
    group.forEach(item => {
      if (item.includes('&')) {
        item = item.slice(1)
      }

      if (item.includes('=')) {
        let arr = item.split('=')
        ret[arr[0]] = arr[1]
      } else {
        ret[item] = true
      }
    })
  }
  return ret
}
const url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled'
parseUrl(url)
```

* 模版引擎 `/\{\{(.*)\}\}/`
* 汉字范围 `/[\u4e00-\u9fa5]/`

3. 原型链 继承原理

4. 闭包 问烂的题 循环 i引用问题

5. setInterval setTimeout setImmediate nextTick I/O 的区别 nodejs eventLoop执行机制

6. 页面性能优化

---

## 二面

1. vue原理 && 源码

2. webpack 原理 及相关优化

3. 页面性能优化

## 三面

1. 数据结构 栈 队列 链表 的区别

冒泡、快排和二分查找的实现和区别

二叉树、图、平衡二叉树

2. http协议、缓存

3. 页面性能优化的点

4. 监控如何去做

5. 项目 怎么实现的，遇到什么问题，怎么解决的，有没优化空间

6. 团队管理、带人经验

7. 最近看的书以及看过的书，学到了什么

8. 倾向于做什么类型的业务（流量不大但复杂）

9. 个人职业规划

10. 为啥要离开，期望与money

## 四面

1. 前端安全相关 xss csrf

2. 项目 怎么实现的，遇到什么问题，怎么解决的，有没优化空间

3. 如何写出优雅的代码 eslint 项目规范等

4. 如何做codeReview

5. 团队中最棘手的问题是什么，如何解决的

6. 如何帮助新人成长

7. 公司业务了解程度

8. 如何学的前端

9. 个人优缺点

10. 期望
