# 7-2 网络请求的概念

- 通过计算机网络和远程服务器进行数据交换的过程
- 使用标准的 HTTP 协议
- 获取数据和发送数据
- 传统的前端会使用 ajax、fetch、axios
- 原生微信小程序需要使用 wx.request

# 7-3 小程序中的请求

- wx.request(Object object)
- 不支持 Promise 风格的调用
- 生成的服务器域名需要在小程序后台进行配置
- 只支持 https 协议

```js
// index.js
Page({
  handleTap() {
    // 发起请求
    // wx.request({
    //   url: 'url',
    // })

    // 获取用户列表 http://121.4.100.140:9091/info
    wx.request({
      url: 'http://121.4.100.140:9091/info',
      // data: {},
      // method: 'GET',
      // timeout: 0,
      success: (result) => {
        console.log(result.data)
      },
      fail: (err) => {},
      complete: (res) => {},
    })

    // 修改用户信息 http://121.4.100.140:9091/info/15
    wx.request({
      url: 'http://121.4.100.140:9091/info/15',
      data: {
        name: 'coderMonkey-1',
        height: 1001,
      },
      method: 'POST',
      timeout: 60000,
      success: (result) => {
        console.log(result.data)
        wx.request({
          url: 'http://121.4.100.140:9091/info',
          // data: {},
          // method: 'GET',
          // timeout: 0,
          success: (result) => {
            console.log(result.data)
          },
          fail: (err) => {},
          complete: (res) => {},
        })
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
})
```

# 7-4 封装的意义

- 提高代码的可读性、可维护性、可复用性
- 抽离公共的属性（请求配置、回调处理）
- 高内聚、低耦合

# 7-5 封装请求函数

- 使用回调
- 如何进一步封装请求参数
- Promise 更优雅的异步解决方案
- Class 更强的扩展方式

```js [http.js]
class Request {
  constructor(domain) {
    this.domain = domain
  }

  request(path, data, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.domain}/${path}`,
        data,
        method,
        timeout: 60000,
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        },
      })
    })
  }

  get(path, data) {
    return this.request(path, data, 'GET')
  }

  post(path, data) {
    return this.request(path, data, 'POST')
  }
}

// 使用
const myRequest = new Request('http://121.4.100.140:9091')

module.exports = {
  myRequest,
}
```

```html [request.wxml]
<button bind:tap="getUser">发起请求</button>
```

```js [request.js]
const { myRequest } = require('./http.js')

Page({
  async getUser() {
    const res = await myRequest.get('/user').catch((err) => console.log(err))
    if (res.code === 0) {
      console.log(res.data)
    }
  },
})
```

# 7-6 后端接口的封装

```js [services/index.js]
const userService = require('./user.js')

module.exports = {
  ...userService,
}
```

```js [services/user.js]
const { myRequest } = require('../http/index.js')

const userService = {
  // 获取所有的用户信息
  getUserList() {
    return myRequest.get('info')
  }
}

module.exports = userService
```

```html [request.wxml]
<button bind:tap="_getUserList">发起请求</button>
```

```js [request.js]
const { getUserList } = require('../services/index.js')

Page({
  async _getUserList() {
    const res = await getUserList().catch(err => console.log(err))
    if (res.code === 0) {
      console.log('getUserList -> res.data', res.data)
    }
  }
})
```
