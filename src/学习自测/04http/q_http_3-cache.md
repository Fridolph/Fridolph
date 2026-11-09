# HTTP缓存机制

## 浏览器有几种刷新方式，它们有什么区别？

::: details
|特性|地址栏输入|手动刷新|强制刷新|
|-|-|-|-|
|操作方式|输入url链接跳转|F5或右键点击刷新|ctrl+F5强制刷新|
|缓存支持|强缓存、协商缓存都生效|强缓存失效，协商缓存有效|缓存都失效|
:::

## 说一下浏览器缓存策略

::: details 分为：
- `强缓存`：命中后浏览器不走服务器，直接读取本地的缓存资源，更快读取。
  - Cache-Control
  - Expires
- `协商缓存`：会通知服务器若命中，浏览器返304通知浏览器使用本地缓存资源，更快读取
  - ETag / If-None-Match
  - Last-Modified / If-Modified-Since
:::

## 回顾

- [http](../../概念与原理/04http/s_http_1-http.md)

- [http缓存](../../概念与原理/04http/s_http_4-cache.md)