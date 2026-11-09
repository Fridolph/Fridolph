# JavaScript 基础串联自测

先尝试用30～60秒回答，再看参考；能举例和解释反例，比记住术语更重要。

## 1. JavaScript 有哪些类型，类型转换怎样理解？

**参考回答：** 原始类型包括 undefined、null、boolean、number、bigint、string、symbol，另外是 object。typeof null 是历史遗留的 object，typeof 函数为 function，但函数仍属于对象。对象转原始值会涉及 Symbol.toPrimitive 或 valueOf / toString，具体偏好由操作决定。

不要只背“双等号会转换”：`null == undefined`、`0 == ''` 等有具体规则，日常优先用严格相等。NaN 不等于自身，可用 Number.isNaN；BigInt 与 Number 混合运算还有额外限制。

**追问验证：** 解释 `[] + 1`、`Object.is(NaN, NaN)`、`0n === 0`；避免用真假判断替代合法的0值检测。

## 2. 原型链与 instanceof 分别检查什么？

**参考回答：** 对象查找属性时，先看自身，再沿内部原型链向上寻找。构造函数的 prototype 通常成为 new 出来的实例的原型，但箭头函数不是构造器，并非所有函数都有相同的 prototype 行为。

instanceof 的通常行为检查右侧构造器的 prototype 是否出现在左侧对象原型链上，还能受 Symbol.hasInstance 定制影响；跨 realm 场景也可能不符合直觉。Array.isArray 更适合判断数组。

**追问验证：** 用 Object.create 建立原型并区分 Object.hasOwn 与 in；解释改 prototype 与修改现有原型对象的差异。

## 3. 闭包为什么既有用，又可能占用内存？

**参考回答：** 函数能够访问其词法环境，即使外层调用已结束也可通过保留的函数继续使用相关变量。闭包可用于封装状态、工厂和回调；它本身不是内存泄漏，问题通常是长寿命引用保留了不再需要的数据。

**追问验证：** 比较循环中 var 与 let 的回调；组件卸载后清理监听、定时器和订阅，解释仍被全局引用的闭包为何不会被回收。

## 4. call、apply、bind 的区别是什么？

**参考回答：** call / apply 立即调用，参数组织方式不同；bind 返回绑定 this 和部分参数的新函数。箭头函数的 this 由词法环境决定，不能被这些方法重新绑定。对可构造的 bound function 使用 new 时，构造语义不使用预先绑定的 this。

**追问验证：** 手写实现要处理严格模式、不可扩展对象、Symbol、返回值和 new；“在对象上临时挂一个属性”只能演示部分机制，不能宣称完整 polyfill。

## 5. 浅拷贝、深拷贝和结构化克隆怎样选？

**参考回答：** 展开语法 / Object.assign 常用于第一层浅拷贝，嵌套对象仍共享引用。JSON 序列化不支持循环，会丢失或改变部分类型。structuredClone 支持循环和多种内置类型，但不支持函数、DOM 节点和任意原型保留。按数据契约选方案，避免为了通用写一份看似完整的递归。

**追问验证：** 比较 Date、Map、函数、循环引用；关联[深拷贝练习](/编码与实践/02js/c_js_2-deepcopy/c_js_2-deepcopy)。

## 6. map、flatMap、reduce 的关键区别？

**参考回答：** map 一对一映射，flatMap 相当于映射后展开一层数组，reduce 累积结果。空数组且没有初始值时 reduce 会抛错；稀疏数组与显式 undefined 不等价，要查看对应方法的空槽处理规则。异步回调产生 Promise 时，map 不会自动等待，需要按并发目标配合 Promise.all 等。

**追问验证：** 解释 `[1, 2].flatMap(x => [[x]])`；对对象数组按 id 去重时约定先后项保留规则。

## 7. Proxy 与模块化要注意什么边界？

**参考回答：** Proxy 拦截对象操作，可结合 Reflect 保留默认语义；一次代理不会自动把所有嵌套对象都包起来，响应式库还需依赖追踪和嵌套处理。ESM 有静态结构与 live bindings，CommonJS 围绕 module.exports；不能机械说成“一个永远异步，一个永远同步”，现代 Node 的互操作还受版本、模块条件和顶层 await 影响。

**追问验证：** 看修改导出值后导入方如何观察；区分模块缓存、循环依赖与打包器转换结果。

> 来源：[个人 interviewMap / JS必知点](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/interviewMap/JS必知点)，保留主题并重写参考回答；[MDN JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)。
