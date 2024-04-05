# 4-2 什么是 wxs

- WXS 是小程序的脚本语言，WXS 脚本可以运行在微信小程序的页面、组件、原生模块中。WXS 脚本可以访问小程序的 API，并且可以访问页面、组件、原生模块中的数据。

- 可以用过 JS 进行编写，但不全都支持

- 可用于视图数据的处理和转换

# 4-3 小程序的模块化

## 模块化的优势

- 避免命名冲突
- 更好的代码分离，按需加载
- 具有良好的复用性，方便维护

## 小程序的模块化

- 每一个 wxs 文件和 wxs 标签都是一个单独的模块
- 每个模块都拥有一个内置的 module 对象
- 它们拥有独立的私有做哟黄骨鱼，完全隔离与其他模块
- 可以通过 module.exports 对外共享本模块的私有变量与函数

## wxs 标签基本使用

1. 通过 module 声明一个名称
2. 变量和方法的声明
3. 通过 module.exports 导出

```html
<wxs module="user">module.exoprts = { }</wxs>
```

# 4-4 wxs 变量声明和 wxs 的两种使用方式

- 使用 var 声明变量和方法
- 首字符必须是：字母 (a-zA-Z)，下划线 ( \_ )
- 剩余字符可以是：字母 (a-zA-Z)，下划线 ( \_ )，数字 (0-9)
- 保留标识符不可以作为变量名

## 1. 使用 wxs 标签定义模块

```js [user.js]
Page({
  data: {
    price: 101.123,
  },
})
```

```html
<view>{{ user.name }} - {{ user.age }}</view>
<view>金额：{{ user.formatPrice(price) }}</view>

<wxs module="user">
  var name = 'luffy' var age = 17 var formatPrice = function(price) { return '$ ' + price.toFixed(2)
  } module.exoprts = { name: name, age: age, formatPrice: formatPrice }
</wxs>
```

> 注 wxs 里面只能用 es5 写法， 不能 module.exports = { name } 这样省略

## 2. 使用 wxs 的 src 属性去导入外部的 wxs 文件

```js [wxs/teacher.wxs]
var name = 'fridolph'
var age = 18

module.exports = {
  name: name,
  age: age,
}
```

```html
<wxs src="./wxs/teacher.wxs" module="teacher" />

<!-- 使用 -->
<view>{{ teacher.name }} - {{ teacher.age }}</view>
```

## 3. 通过 require 的形式去导入了其他的 wxs 文件

```js
var utils = require('./utils/utils.wxs')

module.exports = {
  fn: utils.fn,
}
```

# 中间略过

# 4-10 wxss 的基础概念

- 尺寸单位
- 内置的全局样式
- 部分的 css 选择器
- 样式导入
- 内联样式
- 动态样式

# 4-11 rpx 的概念和换算规则

## rpx

rpx 是 resonsive pixel 的缩写。是小程序里的响应式尺寸单位，可以根据屏幕宽度进行自适应。规定屏幕宽度为 750 rpx。

如在 iphone 6 上，屏幕宽度为 375 px ，共有 750 个物理像素，

则 750 rpx = 375px = 750 物理像素， 1rpx = 0.5 px = 1 物理像素
