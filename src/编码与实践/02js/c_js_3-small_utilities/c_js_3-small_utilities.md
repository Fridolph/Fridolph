# 小工具练习：模板、字符串、对象与 DOM

把零散技巧写成小练习时，先说明输入契约。以下示例用于理解机制，标准能力优先使用内置 API，不扩展全局原型。

## 受限模板替换

```js
function render(template, data) {
  return template.replace(/\$\{([A-Za-z_]\w*)\}/g, (placeholder, key) =>
    Object.hasOwn(data, key) ? String(data[key]) : placeholder,
  )
}
render('Hello ${name}, ${unknown}', { name: 'NestJS' })
// Hello NestJS, ${unknown}
```

只替换简单键名，不执行表达式，不使用 eval / Function。缺失字段保留占位符，继承属性不读取。返回普通字符串；放进 HTML、URL、SQL 等上下文时，必须使用对应的安全插值或参数化机制。正则模板不是 HTML 净化器。

## trim 与克隆

`text.trim()` 用于移除两端 ECMAScript 定义的空白与行终止符。练习 `/^\s+|\s+$/g` 可以帮助理解锚点，但不能随意往 String.prototype 写自定义同名方法。

浅拷贝只复制第一层。`JSON.parse(JSON.stringify(value))` 会丢失 / 转换部分类型，也不能处理循环引用；`structuredClone` 支持许多内置类型和循环结构，但不复制函数、DOM 节点或任意自定义原型语义。按业务数据契约选方案，详见[深拷贝练习](/编码与实践/02js/c_js_2-deepcopy/c_js_2-deepcopy)。

## 页面有多少节点？

```js
// 在浏览器 DevTools Console 中运行；不包含 root 本身
const countElements = (root = document) => root.querySelectorAll('*').length

function countDescendantNodes(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL)
  let count = 0
  while (walker.nextNode()) count++
  return count
}
```

元素节点与文本、注释等所有节点不是同一指标。这里不跨 iframe 和 shadow root，querySelectorAll 返回静态集合。`$$` 是开发者工具便利函数，不能当页面标准 API 使用。

## 数组生成与对象聚合

```js
Array.from({ length: 5 }, (_, index) => index) // 0..4
```

数组元素是对象时，不要用 `Array(5).fill({})` 误建五个独立对象——它们共享同一个引用。按条件找对象最大值、去重、扁平化见[数组与字符串练习](/编码与实践/03algo/c_algo_6-arrays_strings/c_algo_6-arrays_strings)。

**验证任务：** 尝试继承属性、空字符串、值为0、DOM文本和注释、带循环引用的克隆对象，解释结果与契约。

> 来源：[个人 JavaScript 小练习](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/算法相关/面试相关)；[MDN structuredClone](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/structuredClone)。
