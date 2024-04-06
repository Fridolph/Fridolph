# 6-2 路由跳转 navigateTo

## 跳转方式

- 通过 navigator 标签实现
- 通过 API 实现

### navigateTo

- 保留当前页面
- 不能跳到 tabbar 页面
- 使用 wx.navigateBack 可以返回到上一页
- 小程序中页面栈最多 10 层

```html [navigateTo.wxml]
<!-- 1. 标签 -->
<!-- url 页面路径：相对 / 绝对路径都可 -->
<navigator url="../index/index">跳转到 Index</navigator>
<!-- open-type: navigate 默认值 -->
<navigator url="/pages/index/index" open-type="navigate">也可以跳转到 Index</navigator>

<!-- 2. 通过事件跳转 -->
<button type="primary" bind:tap="toIndexPage">点击跳转</button>
```

```js [navigateTo.js]
Page({
  toIndexPage() {
    wx.navigateTo({
      url: '/pages/index/index',
      // events: events,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})
```

# 6-3 路由跳转 navigateTo 中的 events 和 url 参数传递

接上

```html
<button type="primary" bind:tap="toIndexPage">点击跳转</button>
```

## 使用 eventChannel.emit 触发 events

```js [navigateTo.js]
Page({
  toIndexPage() {
    wx.navigateTo({
      url: '/pages/index/index?name=luffy&age=17',
      // 页面之间的通信接口：用于监听 跳转后的页面（这里为 pages/index/index）
      // 用于监听 跳转后页面 发送到当前页面的数据（当前页指 navigateTo.wxml)
      events: {
        navPageFn(name, age) {
          console.log('🚀 ~ navPageFn', name, age)
        },
      },
      success: (res) => {
        // off 用于取消一个事件的监听
        // result.eventChannel.off('navPageFn')
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})
```

```js [/page/index/index.js]
Page({
  // 用于监听页面的加载
  onLoad(options) {
    // eventChannel
    const eventChannel = this.getOpenerEventChannel()
    // emit 可用来触发一个事件
    eventChannel.emit('navPageFn', 'luffy', 17)
    // 这里将会打印  🚀 ~ navPageFn luffy 17
  },
})
```

## 通过 on 方法触发 events

```js [navigateTo.js]
Page({
  toIndexPage() {
    wx.navigateTo({
      url: '/pages/index/index?name=luffy&age=17',
      // 页面之间的通信接口：用于监听 跳转后的页面（这里为 pages/index/index）
      // 用于监听 跳转后页面 发送到当前页面的数据（当前页指 navigateTo.wxml)
      events: {
        navPageFn(name, age) {
          console.log('🚀 ~ navPageFn', name, age)
        },
      },
      success: (res) => {
        res.eventChannel.emit('navPageFn', 'luffy', 17)
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
})
```

```js [/page/index/index.js]
Page({
  // 用于监听页面的加载
  onLoad(options) {
    // eventChannel
    const eventChannel = this.getOpenerEventChannel()
    // emit 可用来触发一个事件
    eventChannel.on('navPageFn', 'luffy', 17)
    // 这里将会打印  🚀 ~ navPageFn luffy 17

    // 也可以通过 once 只监听一次
    eventChannel.once('navPageFn', 'luffy', 17)
  },
})
```

# 6-4 路由跳转 navigateBack

- 关闭当前页，返回上一页
- 通过 delta 跳转到指定页面

```html [/pages/Index/Index.wxml]
<navigator url="../One/One">跳转到 One 页面</navigator>
<view>我是 Index</view>
```

```html [/pages/One/One.wxml]
<navigator url="../Two/Two">跳转到 Two 页面</navigator>
<view>我是 One</view>
<navigator open-type="navigateBack">返回上一页</navigator>
```

```html [/pages/Two/Two.wxml]
<navigator url="../Three/Three">跳转到 Three 页面</navigator>
<view>我是 Two</view>
<navigator open-type="navigateBack">返回上一页</navigator>
```

```html [/pages/Three/Three.wxml]
<view>我是 Three</view>
<navigator open-type="navigateBack">返回上一页</navigator>
<!-- 通过设置 delta -->
<navigator open-type="navigateBack" delta="2">返回上上页</navigator>
<navigator open-type="navigateBack" delta="99">返回首页</navigator>

<!-- 通过事件的形式 -->
```

```js [/pages/Three/Three.js]
Page({
  // 返回上一页
  pageBack() {
    wx.navigateBack({
      delta: 1,
      success: (res) => {},
    })
  },
  // 返回上一页
  pageToIndex() {
    // 查看页面栈中的页面
    console.log(getCurrentPages())
    wx.navigateBack({
      // delta: 99, // 设置一个比较大的数，直接返首页
      delta: getCurrentPages().length,
      success: (res) => {},
    })
  },
})
```

# 6-5 路由跳转 redirect

- 关闭当前页，跳转到应用内的某个页面
- 不允许跳转到 tabbar 页面

```html [/pages/Three/Three.wxml]
<view>我是 Three</view>
<navigator open-type="redirect" url="/pages/One/One">跳转到 One</navigator>

<!-- 通过事件的形式 -->
<button type="primary" bind:tap="pageTo">跳转到 One</button>
```

```js [/pages/Three/Three.js]
Page({
  pageTo() {
    wx.redirectTo({
      // 可以通过 query 携带参数
      url: '/pages/One/One?username=luffy&uid=001',
      success: (res) => {},
    })
  },
})
```

```js [/pages/One/One.js]
Page({
  onLoad(options) {
    console.log('🚀 ~ onLoad ~ options:', options)
    // { username: 'luffy', uid: '001' }
  },
})
```

# 6-6 switchTab

- 仅可以跳转到 tabBar 页面
- 关闭所有的非 tabBar 页面

```html [/pages/SwitchTo/SwitchTo.wxml]
<!-- 1. 通过标签跳转 -->
<navigator open-type="switchTab" url="/pages/Home/Home">跳转到 Home 页面</navigator>

<!-- 2. 通过 API 跳转 -->
<button bind:tap="switchToProfile">跳转到 Profile 页面</button>
```

> open-type="redirect" 模拟器上可跳转，但其实不能这么用，要小心

```js [/pages/SwitchTo/SwitchTo.js]
Page({
  // 只可以跳转到 tabBar 的页面，且 url 不能传递参数
  switchToProfile() {
    wx.switchTab({
      url: '/pages/Profile/Profile',
      success: (res) => {},
    })
  },
})
```

```json [app.json]
{
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/Home/Home",
        "text": "Home"
      },
      {
        "pagePath": "pages/Profile/Profile",
        "text": "Profile"
      },
      {
        "pagePath": "pages/About/About",
        "text": "pages/About/About"
      }
    ]
  }
}
```

# 6-7 路由跳转 reLaunch

- 关闭所有页面，打开到应用内的某个页面
- 可以跳转到任意页面（包括 tabBar）

```html [/pages/ReLaunch/ReLaunch.wxml]
<!-- 1. 通过标签跳转 -->
<navigator open-type="reLaunch" url="/pages/Home/Home">跳转到 Home 页面</navigator>

<!-- 2. 通过 API 跳转 -->
<button bind:tap="reLaunchToProfile">跳转到 Profile 页面</button>
```

```js [/pages/ReLaunch/ReLaunch.js]
Page({
  reLaunchToProfile() {
    // reLaunch 通过API的方式可以传参
    wx.reLaunch({
      url: '/pages/About/About?username=sanji&uid=005',
      success: (res) => {},
    })
  },
})
```

```js [/pages/About/About.js]
Page({
  onLoad(options) {
    console.log('🚀 ~ onLoad ~ options:', options)
    // {username: "sanji", uid: "005"}
  },
})
```

# 6-8 生命周期的概念

- 小程序从创建到销毁整个执行过程中不同阶段对应的回调

# 6-9 App 的生命周期

```js [app.js]
App({
  // 当小程序初始化完成时，会触发onLaunch（全局只触发一次）
  onLaunch(options) {
    // 1. 获取用户的信息
    // 2. 初始化一些全局的变量
    console.log("🚀 ~ onLaunch ~ options:", options)
    // scene 场景值 -> 微信开发者工具，小手机 icon 点击
    // 可以查找对应的场景值，1001 -> 发现栏小程序主入口
  },

  // 当小程序启动，或从后台进入前台显示，会触发onShow
  onShow(options) {
    // 场景：操作小程序，来了短信，看短信，再回到小程序页面
    // 具体使用：
    // 1. 需要去刷新数据
    // 2. 更新页面的状态
    console.log("🚀 ~ onShow ~ options:", options)
  },

  // 当小程序从前台进入后台，会触发onHide
  onHide() {
    // 场景同上，来短信
    // 具体使用：
    // 1. 保存用户当前状态
    // 2. 清理多余的定时器，避免内存泄漏
  },

  // 当小程序发生脚本错误，或者 api 调用失败时，会触发onError并带上错误信息
  onError(msg) {}

  // 页面跳转时，若页面不存在会触发该钩子
  // 但是，fail时会拦截，走不到这里； 若想走到这里呢？
  onPageNotFound(res) {
    // 可以进行逻辑处理，跳转到一个自定义（404）页面
  },

  // 全局的 unhandledrejection 处理
  // 若错误未及时处理，会跳到这个钩子来
  onUnhandledRejection(err) {},

  // 当系统主题发生变化时
  onThemeChange(theme) {
    console.log("🚀 ~ onThemeChange ~ theme:", theme)
    // 这里生效的前提是 要在 app.json 里配置 "darkmode": true
    // 否则，theme 不会生效
    // { theme: "light" }
  },
})
```

# 6-10 Page 的生命周期

```js [lifeCycle.js]
Page({
  /* 页面的初始数据 */
  data: {},

  /* 监听页面加载 */
  onLoad(options) {
    // 可以做一些初始化操作
    console.log('🚀 ~ onLoad ~ options:', options)
  },

  /* 监听页面显示 */
  onShow() {
    // 1. 更新数据或状态
    // 2. 重新执行一些方法
    console.log('🚀 ~ onShow:')
  },

  /* 监听页面隐藏 */
  onHide() {
    // 1. 保存用户当前状态
    // 2. 清理多余的定时器，避免内存泄漏
    console.log('🚀 ~ onHide:')
  },

  /* 监听页面的卸载 */
  onUnload() {
    // 清空页面的状态 及 多余的操作
    console.log('🚀 ~ onUnload:')
  },

  /* 监听页面下拉操作 */
  onPullDownRefresh() {
    // 需在 lifeCycle.json 里配置 enablePullDownRefresh: true 才生效
    // 处理下拉操作，如刷新等
    console.log('🚀 ~ onPullDownRefresh:')
  },

  /* 监听拉触底，满足条件调用 */
  onReachBottom() {
    // 需在 lifeCycle.json 里配置 onReachBottomDistance: 100（rpx）才生效
    // 处理下拉操作，如刷新等
    console.log('🚀 ~ onReachBottom:')
  },

  /* 监听页面滚动 */
  onPageScroll(options) {
    // 可以监听页面滚动的位置（当前位置到页面顶部距离）
    console.log('🚀 ~ onPageScroll ~ options:', options)
    // options { scrollTop: 600 }
    // options { scrollTop: 700 }
  },
})
```

```html [lifeCycle.wxml]
<view>学习小程序的生命周期</view>
```

# 6-11 数据存储的概念

- 全局数据
- 页面数据
- 缓存数据

# 6-12 全局数据的存储

```js [app.js]
App({
  // 创建全局数据
  globalData: {
    userInfo: {
      name: 'fys',
      age: 19,
    },
    flag: true,
  },

  onLaunch(options) {
    console.log('🚀 ~ onLaunch ', this)
  },
})
```

# 6-13 页面数据的存储

```js [index.js]
Page({
  data: {
    msg: '你好嘛',
    flag: true,
  },

  changeMsg() {
    // 更新页面数据，要使用 this.setState 方法
    // 第二个参数，是个回调，当更新完成后触发，可写一些逻辑
    if (this.data.flag) {
      this.setData(
        {
          flag: !this.data.flag,
          msg: '哈哈哈哈',
        },
        () => console.log('更新成了', this.data.msg)
      )
    } else {
      this.setData(
        {
          flag: !this.data.flag,
          msg: '呵呵呵呵',
        },
        () => console.log('更新成了', this.data.msg)
      )
    }
  },
})
```

```html [index.wxml]
<view>我是测试数据：{{ msg }}</view>
<view>
  <button bind:tap="changeMsg">改变 msg</button>
</view>
```

# 6-14 缓存数据的存储

- 同步缓存
- 异步缓存（优先考虑）
