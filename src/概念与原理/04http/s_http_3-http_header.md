# HTTP 标头（header）

HTTP 标头（header）允许客户端和服务器通过 HTTP 请求（request）或者响应（response）**传递附加信息**。一个 HTTP 标头由它的名称（不区分大小写）后跟随一个冒号（:），冒号后跟随它具体的值。该值之前的空格会被忽略。

根据不同的消息上下文，标头可以分为：

- **请求标头**包含有关要获取的资源或客户端或请求资源的客户端的更多信息。
- **响应标头**包含有关响应的额外信息，例如响应的位置或者提供响应的服务器。
- **表示标头**包含资源主体的信息，例如主体的 MIME 类型或者应用的编码/压缩方案。
- **有效负荷标头**包含有关有效载荷数据表示的单独信息，包括内容长度和用于传输的编码。

标头也可以根据代理处理它们的方式进行分组：

- Connection
- Keep-Alive
- Proxy-Authenticate
- Proxy-Authorization
- TE
- Trailer
- Transfer-Encoding
- Upgrade (en-US)（另见协议升级机制）。

## 验证 Authentication

- WWW-Authenticate

定义应该用于访问资源的身份验证方法。

- Authorization

包含用于向服务器验证用户代理身份的凭据。

- Proxy-Authenticate

定义应用于访问代理服务器后面资源的身份验证方法。

- Proxy-Authorization

包含用于使用代理服务器验证用户代理的凭据。

## 缓存（Cache）

- Age

对象在代理缓存中的时间（以秒为单位）。

- Cache-Control

请求和响应中缓存机制的指令。

- Clear-Site-Data

清除与请求网站相关联的浏览器数据（例如 cookie、storage、cache）。

- Expires

响应被视为过时的日期/时间。

- Pragma

特定于实现的标头可能会在请求—响应链（request-response chain）的任何地方产生各种影响。用于向后兼容 Cache-Control 标头尚不存在的 HTTP/1.0 缓存。

## 条件 Conditional

- Last-Modified

资源的最后修改日期，用于比较同一个资源的多个版本。它不如 ETag 准确，但在某些环境中更容易计算。使用 If-Modified-Since 和 If-Unmodified-Since 的条件请求可以使用此值来更改请求的行为。

- If-Modified-Since

使请求有条件，并期望只有在给定日期后修改资源时才请求传输资源。仅当缓存过期时才用于传输数据。

- If-Unmodified-Since

使请求有条件，并期望只有在给定日期后资源未被修改时才请求传输资源。这确保了特定范围的新片段与先前片段的一致性，或者在修改现有文档时实现乐观的（optimistic）并发控制系统。

- ETag

标识资源版本的唯一字符串。使用 If-Match 和 If-None-Match 的条件请求使用此值来更改请求的行为。

- If-Match

使请求有条件，并且仅当存储的资源与给定的 ETag 之一匹配时才应用该方法。

- If-None-Match

使请求有条件，并且仅当存储的资源与给定的 ETag 都不匹配时才应用该方法。这用于更新缓存（用于安全请求），或防止在资源已存在时上传新资源。

- Vary

确定如何匹配请求标头以决定是否可以使用缓存的响应而不是从源服务器请求新的响应。

## 消息主体信息

- Content-Length

资源的大小，以十进制字节数表示。

- Content-Type

指示资源的媒体类型。

- Content-Encoding

用于指定压缩算法。

- Content-Language

描述面向受众的人类语言，以便用户可以根据自己的首选语言进行区分。

- Content-Location

指示返回数据的备用位置。

## 连接管理 Connection management

- Connection

控制当前事务完成后网络连接是否保持打开状态。

- Keep-Alive

控制持久连接应保持打开状态的时间。

## 内容协商 Content negotiation

内容协商（Content negotiation）标头。

- Accept

通知服务器可以发回的数据类型。

- Accept-Encoding

编码算法，通常是压缩算法，用于返回的资源。

- Accept-Language

通知服务器有关服务器预期返回的人类语言。这是一个提示，不一定在用户的完全控制之下：服务器应该始终注意不要覆盖明确的用户选择（比如从下拉列表中选择一种语言）。

## 控制 Control

- Expect

表示服务器需要满足的期望才能正确处理请求。

- Max-Forwards

使用 TRACE 时，指示请求在被反映到发送方之前可以执行的最大跃点数。

## Cookie

Cookie 算一个大知识点，单独开了一个文档。请跳转查看

## CORS

同上，跨域资源共享最近经常考，单独开了一个文档。

## 下载

- Content-Disposition

指示传输的资源是否应内联显示（没有标题的默认行为），或者是否应像下载一样处理并且浏览器应显示“另存为”对话框。

## 代理

- Forwarded

包含来自代理服务器面向客户端的信息，当请求路径中涉及代理时，这些信息会被更改或丢失。

- Via

由代理添加，包括正向和反向代理，并且可以出现在请求标头和响应标头中。

## 重定向

### Location

指示要将页面重定向到的 URL。

### Refresh

指示浏览器重新加载页面或重定向到另一个页面。采用与带有 http-equiv="refresh" 的 meta 元素相同的值。

## 请求上下文

- From

包含一个电子邮箱地址，这个电子邮箱地址属于发送请求的用户代理的实际掌控者的人类用户。

- Host

指定服务器的域名（用于虚拟主机）和（可选）服务器侦听的 TCP 端口号。

- Referer

前一个网页的地址，表示从该网页链接（进入）到当前请求的页面。

- Referrer-Policy

管理 Referer 标头中发送的哪些引用信息应包含在发出的请求中。

- User-Agent

包含一个特征字符串，允许网络协议对端识别发起请求的用户代理软件的应用程序类型、操作系统、软件供应商或软件版本。另请参阅 Firefox 用户代理字符串参考。

## 响应上下文

- Allow

列出资源所支持的 HTTP 方法的集合。

- Server

包含了处理请求的源头服务器所用到的软件相关信息。

## 范围请求

- Accept-Ranges

指示服务器是否支持范围请求，如果支持，范围可以用哪个单位表示。

- Range

指示服务器应返回的文档部分。

- If-Range

创建一个条件范围请求，只有在给定的 etag 或日期与远程资源匹配时才会满足。用于防止从资源的不兼容版本下载两个范围。

- Content-Range

指示部分消息在完整正文消息中的位置。

## 安全

单独开了一个文档，详情跳转

## 传输编码

- Transfer-Encoding
指定用于将资源安全地传输给用户的编码形式。

- TE
指定用户代理愿意接受的传输编码。

- Trailer
允许发送方在分块消息的末尾包含其他字段。

## 自测

[http](../../学习自测/04http/q_http_2-http.md)

## 参考资料

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers>