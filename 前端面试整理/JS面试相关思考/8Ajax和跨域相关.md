题目：

* 手写一个ajax，不依赖第三方库
* 跨域的几种实习方式

## 知识点

### XMLHttpRequest

```js
var xhr = new XMLHttpRequest()
xhr.open('GET', '/api', false)
xhr.onreadystatechange = function() {
  // 这里的函数异步执行
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText)
    }
  }
}
xhr.send(null)
```

### 状态码说明

#### readyState

0 - 未初始化 还没有调用send()方法
1 - 载入 已调用send()方法，正在发送请求
2 - 载入完成 send()方法执行完成，已经接收到全部响应内容
3 - 交互 正在解析内容
4 - 完成 响应内容解析完成，可以在客户端调用了

#### status

2xx - 表示成功处理请求
3xx - 需要重定向，浏览器直接跳转
4xx - 客户端请求错误
5xx - 服务器端错误

### 跨域
