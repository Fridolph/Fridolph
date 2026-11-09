# 从一次请求理解 HTTP 版本、报文与协商

## 层次与连接

HTTP 描述请求 / 响应的应用层语义。历史笔记中的“HTTP 三次握手”实际是 TCP 建连；HTTPS 通常还涉及 TLS。HTTP/3 使用 QUIC / UDP，并集成 TLS 1.3 安全握手。不能把所有 HTTP 版本都画成 TCP 三次握手。

一次访问可能经历 DNS、建连、TLS、发请求和接收响应，但缓存、连接复用、代理和 Service Worker 会改变路径，不能假设每个请求都重新建立连接。URL 的 fragment（`#...`）不随 HTTP 请求发给服务器，query 则通常会。

| 版本 | 传输特点 | 仍要考虑的边界 |
| --- | --- | --- |
| HTTP/1.1 | 持久连接、文本化报文表示 | 同连接请求响应组织存在限制；浏览器常使用多连接 |
| HTTP/2 | 二进制帧、多路复用、头部压缩 | TCP 丢包仍可能阻塞同连接上的多个流 |
| HTTP/3 | QUIC 流与连接管理 | 减少跨流传输阻塞，不代表消除拥塞、丢包与业务队列 |

HTTP/2 的 server push 不能当成当代浏览器默认优化手段；版本升级也不能替代索引、缓存与资源预算。

## 报文与语义

HTTP/1.1 学习报文可按“起始行 → 头部 → 空行 → 可选消息体”理解。HTTP/2、HTTP/3 的线上编码不同，但方法、状态码、字段等语义延续。

GET 应用于读取，PUT / DELETE 等方法语义具有幂等性，POST 通常没有。幂等不是“返回内容永远相同”，而是重复相同请求对目标资源的预期效果相同。GET 的幂等语义也不保证错误实现的服务端真的无副作用。

## 数据协商与重定向

- `Accept` 表达期望响应媒体类型；`Content-Type` 描述当前消息体类型，不能混为一谈。
- `Accept-Encoding` / `Content-Encoding` 涉及压缩编码，和字符集不是同一个维度。
- 响应内容随请求字段变化时，用对应 `Vary` 保持共享缓存键正确；例如 `Vary: Accept-Encoding`。
- 301 / 302 在历史客户端行为中可能把 POST 改成 GET；303 常用于提交后转向 GET；307 / 308 明确保留方法与请求体。永久跳转的缓存会使回退更复杂。

CSP 是浏览器安全策略，不属于普通表示格式协商；例如 `script-src` 控制脚本来源。不存在通用的 `content-src` 指令，`child-src 'none'` 表示禁止相关加载，不是允许。

## 动手核对

在浏览器 Network 中观察请求协议、缓存来源、Timing、响应字段和重定向链；使用已获授权的本地服务比较行为。命令行 `curl -I` 发送 HEAD，请求语义与完整 GET 不完全一样；排查真实响应时可用 `curl -i`，避免只看状态码就下结论。

关联：[HTTP 状态码](./s_http_2-http_status_code)、[HTTPS](./s_http_5-https)、[缓存策略](./s_http_9-cache_strategy)、[Nginx 代理](/概念与原理/20deploy/s_deploy_3-nginx)。

> 来源：[个人 HTTP 协议与协商笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/HTTP)；[MDN HTTP 概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)；[RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)。
