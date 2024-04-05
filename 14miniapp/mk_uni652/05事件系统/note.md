# 5-2 什么是事件系统

## 基本概念

- 视图层与逻辑层的通讯方式
- 可以将用户的行为反馈到逻辑层进行处理
- 可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数
- 事件对象可以携带额外信息，如 id、dataset、touches

# 5-3 注册事件的不同方式

## 注册点击事件

- 在 JS 中写入事件处理函数
- 在 wxs 中写入事件处理函数
- 事件名必须是一个字符串
- 通过 bind:tap 的方式等同于 bindtap

```html [registerEvent.wxml]
<view>
  <button bindtap="sayHello">点我</button>
</view>
<view>
  <button bindtap="sayHi">Hi</button>
</view>
<view bindlongpress="sayWorld"></view>

<!-- wxs -->
<wxs module="event">
  var sayHi = function() { console.log('hi') } module.exports = { sayHi: sayHi }
</wxs>
```

> wxs 只能用 es5 语法，但 js 里就可以正常写 es6+语法了

```js [registerEvent.js]
Page({
  sayHello() {
    console.log('🚀 ~ sayHello:')
  },
  sayWorld() {
    console.log('🚀 ~ Hello World')
  },
})
```

# 5-4 捕获阶段 和 冒泡阶段

事件的传播阶段

## 冒泡阶段 bind\*

```html [eventType.wxml]
<!-- 冒泡阶段 -->
<view bindtap="clickOutter">
  <text>outter</text>
  <view bindtap="clickCenter">
    <text>center</text>
    <view bindtap="clickInner">
      <text>inner</text>
    </view>
  </view>
</view>
```

> 使用冒泡绑定事件。点 inner 会依次打印 clickInner、clickCenter、clickOutter

```js [eventType.js]
Page({
  clickOutter() {
    console.log('clickOutter')
  },
  clickCenter() {
    console.log('clickCenter')
  },
  clickInner() {
    console.log('clickInner')
  },
})
```

## 捕获阶段 capture\*

```html [eventType.wxml]
<!-- 捕获阶段 -->
<view capture-bind:tap="clickOutter">
  <text>outter</text>
  <view capture-bind:tap="clickCenter">
    <text>center</text>
    <view capture-bind:tap="clickInner">
      <text>inner</text>
    </view>
  </view>
</view>
```

> 使用捕获绑定事件。点 inner 会依次打印 clickOutter、clickCenter、clickInner

```js [eventType.js]
Page({
  clickOutter() {
    console.log('clickOutter')
  },
  clickCenter() {
    console.log('clickCenter')
  },
  clickInner() {
    console.log('clickInner')
  },
})
```

## 当捕获冒泡同时存在时

先捕获、后冒泡

# 5-5、5-6 事件对象

- 获取事件的相关信息
- 事件的类型
- 触发事件的来源
- 自定义数据的收集
- 获取坐标点
- 获取表单的 value

```html [event.wxml]

```

```js [event.js]
Page({
  handleTap(event) {
    console.log('🚀 ~ handleTap: 事件对象 event', event)
  },
})
```

## event 对象的属性详解

- type 事件的类型
- timeStamp 记录页面打开到事件触发所经历的毫秒数
- target 记录触发事件的源组件
- target.id 如果绑定有 id 这里就是 id
- currentTarget 触发事件的当前组件
- dataset 用于获取自定义数据（data-xxx）的集合
- mark 用于获取自定义数据（mark:xxx）的集合（该条线上的都会被搜集）
- detail 通常用于表单中获取最新的 value 值
- touches 触摸事件触发时，记录触摸点的相关信息
  - clientX 触摸点相对于屏幕左边的距离（距离页面可显示区域左边的距离）
  - clientY 触摸点相对于屏幕上边的距离（距离页面可显示区域上边的距离）
  - pageX 触摸点相对于页面左边的距离
  - pageY 触摸点相对于页面上边的距离（如果有滚动条，会把滚动的高度也加上）

> 注意：dataset 驼峰命名大写 会转小写；中横线命名小写 会转大写但 mark 就不会转换驼峰 和 中横线。同名属性，子组件中的值会覆盖掉父组件的值

# 5-7 交互反馈 Toast

Toast - 消息提示框

wx.showToast(Object: object) 打开消息提示框

```html [toast.wxml]
<button type="primary" bindtap="showToast">Open Toast</button>
```

```js [toast.js]
Page({
  showToast() {
    wx.showToast({
      title: '操作成功',
      duration: 0, // 默认值 1500 ms
      icon: 'none', // 这样可以不用默认的 勾选 图标
      // image: '../img/icon.png', 这里可以使用自定义图片
      mask: true, // 是否有遮罩
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})
```

# 5-8 交互反馈 Modal

Modal - 模态对话框

wx.showModal(Object: object) 打开模态对话框

```html [modal.wxml]
<button type="primary" bindtap="showModal">Open Modal</button>
```

```js [modal.js]
Page({
  showToast() {
    wx.showModal({
      cancelColor: 'cancelColor',
      cancelText: 'cancelText',
      confirmColor: 'confirmColor',
      confirmText: 'confirmText',
      content: 'content',
      editable: true,
      placeholderText: 'placeholderText',
      showCancel: true,
      title: '操作成功',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})
```

# 5-9 交互反馈 Loading

Loading - 加载提示框

```html [loading.wxml]
<button type="primary" bindtap="showLoading">Open loading</button>

<!-- <button type="primary" bindtap="hideLoading">Hide loading</button> -->
```

```js [loading.js]
Page({
  showLoading() {
    wx.showLoading({
      title: 'title',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })

    setTimeout(() => {
      wx.hideLoading({
        noConflict: true,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }, 2000)
  },
})
```

# 5-10 交互反馈 ActionSheet

操作菜单 ActionSheet

wx.showActionSheet(Object object) 打开操作菜单

```html [actionSheet.wxml]
<button type="primary" bind:tap="showActionSheet">打开操作菜单</button>
```

```js [actionSheet.js]
Page({
  showActionSheet() {
    wx.showActionSheet({
      itemList: ['item1', 'item2', 'item3'],
      alertText: '提醒',
      // itemColor: 'itemColor',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})
```
