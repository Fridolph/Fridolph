# 实现一个功能完整的简易 Promise

需求：

1. 满足 promise 规范，和原生一样的使用方式
2. 支持 .then()
3. 支持链式调用

::: code-group
```js [deepClone.js]
function deepClone(target) {  
  if (target === null) return target
  // JS内置对象 基础类型不需要深拷贝
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (typeof target !== 'object') return target
  // 初始化返回结果
  let result 
  if (Array.isArray(target)) {
    result = []
  } else {
    result = {}
  }
  // 处理 和 递归
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      return result[key] = deepClone(target[key])
    }
  }

  return result
}
```
:::

## 其他版本

## 参考

浅拷贝与深拷贝 <https://juejin.cn/post/6844904197595332622>