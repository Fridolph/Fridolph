# HTTP

## HTTP Headers

### 请说一下 HTTP 常用的状态码

::: details 查看提示

- 1XX 信息响应，如 100 继续响应
- 2XX 请求成功
  - 200 成功
  - 204 成功但没拿到内容
- 3XX 重定向
  - 301 永久重定向
  - 302 临时重定向
  - 304 从缓存拿
- 4XX 客户端错误
  - 400 坏请求
  - 401 客户端未验证
  - 403 无权限
  - 404 未找到
  - 405 方法未被许可
- 5XX 服务端错误
  - 500 服务器错误
    :::

### 请说一下 HTTP 常见请求头

::: details

- `Accept` 浏览器能够处理的内容类型
- `Accept-Charset` 浏览器能够显示的字符集
- `Accept-Encoding` 浏览器能够处理的压缩编码
- `Accept-Language` 浏览器当前设置的语言
- `Connection` 浏览器与服务器之间连接的类型
- `Cookie` 当前页面设置的任何 Cookie
- `Host` 发出请求的页面所在的域
- `Referer` 发出请求的页面的 URL
- `User-Agent` 浏览器的用户代理字符串

:::

### 请说一下 HTTP 常见响应头

::: details

- `Date` 表示消息发送的时间，时间的描述格式由 rfc822 定义
- `server` 服务器名称
- `Connection` 浏览器与服务器之间连接的类型
- `Cache-Control` 控制 HTTP 缓存

:::

### 常见 Content-Type 类型有哪些

::: details

- `application/x-www-form-urlencoded`：用于 URL 编码的表单数据，数据以键值对的形式发送。
- `multipart/form-data`：用于发送带有文件上传的表单数据，可以包含文本字段和文件字段。
- `application/json`：用于发送 JSON 格式的数据。
- `text/plain`：用于发送纯文本数据。
- `application/xml`：用于发送 XML 格式的数据。
- `text/xml`：用于发送 XML 格式的数据，与 application/xml 类似，但将数据视为纯文本。
- `application/octet-stream` 用于发送任意的二进制数据
  
::: tip
`Content-Type` 用于指定请求中的主体数据的类型。根据你要发送的数据类型，选择合适的 `Content-Type`。在 `Fetch API` 中，你可以通过设置请求头部中的 `Content-Type` 字段来指定 `Content-Type`
:::



## Restful API

### 说下对 Restful API 的理解

::: details 查看提示

- 一种 API 的设计方法（约定）
- 传统 API 把每个 URL 当做一个功能
- 而 Restful API 设计 把每个 URL 当做一个唯一的资源
  :::

### GET 和 POST 请求的区别

::: details

| 特性     | GET                                | POST                                   |
| -------- | ---------------------------------- | -------------------------------------- |
| 应用场景 | 幂等，请求资源、数据；             | 非幂等，请求接口可能有影响操作         |
| 是否缓存 | 可能缓存，会被放到浏览器历史记录中 | 不缓存                                 |
| 报文格式 | 请求报文中实体为空                 | 请求报文中实体一般为向服务器发送的数据 |
| 安全性   | 可将参数（明文）暴露在 url 中      | 放到请求体中，相对安全                 |
| 请求长度 | 浏览器对 URL 长度限制              | 请求体限制由浏览器定，比 GET 大得多    |
| 参数类型 | 单一                               | 参数传递支持更多的数据类型             |

:::

### PUT 和 POST 请求的区别

::: details

- PUT 请求向浏览器发送数据，从而修改数据内容，但是`不会增加数据的种类`等（可理解为实时更新数据）

- POST 请求向服务端发送数据，该请求`会改变数据的种类等资源`，它会创建新的内容（可理解为创建数据）
  :::

## 回顾

[http status code](../../概念与原理/04http/s_http_2-http_status_code.md)
