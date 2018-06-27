# 什么是数据协商

客户端在给服务端发送一个请求时，客户端会声明这个请求我拿到的数据格式、数据相关限制是怎样的，服务端根据该声明判断不同类型的返回。

## 分类

### 请求

* Accept 想要怎样的数据类型
* Accept-Encoding 服务端用何种形式压缩
* Accept-Language 展示语言
* User-Agent 浏览器相关信息

### 响应

* Content-Type 返回的数据格式
* Content-Encoding 对应Accept-Encoding
* Content-Language 对应根据请求返回的语言

X-Content-Type-Options: nosniff 不会去预测返回内容
