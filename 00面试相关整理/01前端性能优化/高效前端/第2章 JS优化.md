## 5.减少前后端耦合

* 避免全局耦合
  * 使用传参方式减少耦合
* JS/CSS/HTML耦合
  * 通过类来控制样式
* 减少重复代码
  * 把发请求处理抽离成一个函数
  * 封装成一个类
  * 使用策略模式
  * 访问者模式

---

提一下整体思路：

出现了重复代码 -> 封装成一个函数 -> 封装成一个模块 -> 封装成一个插件

* 单一职责原则
* 开闭原则

---

### 访问者模式

```js
// 初始化访问者数据结构
function Input(inputDOM) {
  this.visitors = {
    click: [],
    change: [],
    special: []
  }
  this.inputDOM = inputDOM
}
// 提供一个对外的接口，传2参数
// 一个是事件类型，一个是回调函数
Input.prototype.on = function(eventType, callback) {
  if (typeof this.visitors[eventType] !== 'undefined') {
    this.visitors[eventType].push(callback)
  }
}
Input.prototype.off = function(eventType, callback) {
  if (typeof this.visitors[eventType] !== 'undefined') {
    var index = visitors.indexOf(callback) 
    if (index >= 0) {
      visitors.splice(index, 1)
    }
  }
}
// 一旦接受者收到消息会向它的访问者一一传递
Input.prototype.trigger = function(eventType, event) {
  var visitor = this.visitors[eventType]
  // 获取消息并做格式化
  var eventFormat = processEvent(event) 
  if (typeof visitors !== 'undefined') {
    for (var i = 0; i < visitors.length; i++) {
      visitors[i](eventFormat)
    }
  }
}
```

## 6.JS书写优化

1. 按强类型风格写代码 
  * 指明变量类型
  * 指明变量默认值
  * 函数返回类型要统一
2. 减少作用域查找
  * 不要让代码暴露在全局作用域下，代码逻辑运行在局部作用域
  * 不要滥用闭包(频繁使用的全局变量，可以在局部变量缓存)
3. 避免 == 的使用
4. 合并表达式
  * 减少魔数 （给常量起个名字）
5. 使用ES6简化代码

