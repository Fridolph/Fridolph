# uniapp

## uni-app 的优缺点

优点:

- 一套代码可以生成多端
- 学习成本低,语法是 vue 的,组件是小程序的
- 拓展能力强
- 使用 HBuilderX 开发,支持 vue 语法
- 突破了系统对 H5 调用原生能力的限制

缺点:

- 问世时间短,很多地方不完善
- 社区不大
- 官方对问题的反馈不及时
- 在 Android 平台上比微信小程序和 iOS 差
- 文件命名受限

## uniapp 进行条件编译的两种方法

- #ifdef
- #ifndef

## 小程序端和 H5 的代表值是什么

- H5: H5
- MP-WEIXIN: 微信小程序

## uniapp 的配置文件、入口文件、主组件、页面管理部分

- pages.json 配置文件
- main.js 入口文件
- App.vue 主组件
- pages 页面管理部分

## uniapp 上传文件时用到 api 是什么 格式是什么

```js
uni.uploadFile({
  url: '要上传的地址',
  fileType: 'image',
  filePath: '图片路径',
  name: '文件对应的key',
  success: function (res) {
    console.log(res)
  },
})
```

## uniapp 获取地理位置的 API 是什么

`uni.getLocation`

## rpx、px、em、rem、%、vh、vw 的区别是什么

- rpx 相当于把屏幕宽度分为 750 份，1 份就是 1rpx
- px 绝对单位，页面按精确像素展示
- em 相对单位，相对于它的父节点字体进行计算
- rem 相对单位，相对根节点 html 的字体大小来计算
- % 一般来说就是相对于父元素
- vh 视窗高度，1vh 等于视窗高度的 1%
- vw 视窗宽度，1vw 等于视窗宽度的 1%

## uniapp 如何监听页面滚动

使用 onPageScroll 监听

## 如何让图片宽度不变，高度自动变化，保持原图宽高比不变

给 image 标签添加 `mode='widthFix'`

## 分别写出 jQuery、vue、小程序、uni-app 中的本地存储数据和接受数据是什么

| 类型 | vue                                  | 小程序                                 | uni-app                                    |
| ---- | ------------------------------------ | -------------------------------------- | ------------------------------------------ |
| 存储 | localstorage.setItem('key', 'value') | `wx.setStorage` 或 `wx.setStorageSync` | `uni.setStorage({key: string，data: any})` |
| 读取 | localstorage.getItem('key')          | `wx.getStorage` 或 `wx.getStorageSync` | `uni.getStorage(obj)`                      |

`uni.getStorage` 要传一个对象，如下：

```js
uni.getStorage({
  key: '属性名',
  success(e) {
    // 这就是你想要取的token
    e.data
  },
})
```

## vue、uni-app、小程序的页面传参方式

vue、uni-app：

- router-link 跳转传参，通过 path + 路径，query + 参数等
- `this.$router.push({ ... })` 传对应参数

小程序：

- 通过跳转路径后面拼接参数来进行跳转传参

## 微信小程序 , uni-app 绑定变量属性

- vue 和 uni-app 动态绑定一个变量的值为元素的某个属性的时候，会在属性前面加上冒号":" （v-bind）

- 小程序绑定某个变量的值为元素属性时，会用两个大括号括起来，如果不加括号，为被认为是字符串。

## 小程序的生命周期

- onLoad 首次进入页面加载时触发，可以在 onLoad 的参数中获取打开当前页面路径中的参数

- onShow 加载完成后、后台切到前台或重新进入页面时触发

- onReady 页面首次渲染完成时触发

- onHide 从前台切到后台或进入其他页面触发

- onUnload 页面卸载时触发

- onPullDownRefresh 监听用户下拉动作

- onReachBottom 页面上拉触底事件的处理函数

- onShareAppMessage 用户点击右上角转发

## 参考

- [uniapp 和小程序面试题](https://juejin.cn/post/7205839782383304764)——勋染
