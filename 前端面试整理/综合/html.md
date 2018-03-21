## web 开发中回话跟踪的方法有哪些

1. cookie
2. session
3. url 重写
4. 隐藏 input
5. ip 地址

## <img>标签的 title 和 alt 有什么区别

title 用于显示元素提供的附加信息，当鼠标 hover 上时显示
alt 是 img 标签的特有属性，用于描述，当图片无法加载时显示，搜索引擎会重点分析

## web 语义化？有什么作用

web 语义化指通过 html 标记显示页面包含的信息，包含标签语义化 css 命名语义化为什么语义化：

* 去掉样式后页面呈现清晰的结构
* 盲人阅读
* 搜索引擎
* 便于维护

## HTTP method

1. GET 用于请求服务器发送某个资源
2. HEAD 与 GET 类似，但服务器在响应中只返回首部，不返回实体的 body
3. PUT 服务器用请求的主体部分来创建一个由所请求的 URL 命名的新文档，若 url 已存在就用主体替代
4. POST 向服务器输入数据，用于支持表单
5. TRACE 主要用于诊断，用于验证请求是否如愿穿过请求链
6. OPTIONS 请求 web 服务器告知其支持的各种功能，查询服务器支持哪些方法，或对特殊资源支持哪些方法
7. DELETE 请求服务器删除请求 url 指定的资源

# 从浏览器地址栏输入 URL 到显示页面 —— 这个过程

1. 在浏览器地址栏输入 URL
2. 浏览器查看缓存
   i. 如果资源未缓存，发起新请求
   ii. 如果有缓存，检验缓存 Expires(绝对时间) Cache-Control(max-age 以秒为单位的最大时间)

3. 浏览器解析 URL 获取协议，主机，端口，path
4. 浏览器组装一个 HTTP 请求(GET)报文
5. 浏览器获取主机 IP 地址
   i. 浏览器缓存
   ii. 本机缓存
   iii. hosts 文件
   iv. 路由器缓存
   v. ISP DNS 缓存
   vi. DNS 递归查询 （可能存在负载均衡导致每次 IP 不一样）

6. 打开一个 socket 与目标 IP 地址，端口建立 TCP 连接，三次握手：
   i. 客户端发送一个 TCP 的 SYN=1, Seq=X 的包到服务器端口
   ii. 服务端返回一个 ACK=Y+1, Seq=Y 的响应包
   iii. 客户端发送 ACK=Y+1, Seq=Z

7. TCP 连接建立后发送 HTTP 请求
8. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用 HTTP Host 头部判断请求的服务程序
9. 服务器检查 HTTP 请求头是否包含缓存验证信息，如果验证存在，返回 304 等对应状态码
10. 处理程序读取完整请求并准备 HTTP 响应，可能需要查询数据库等操作
11. 服务器将响应报文通过 TCP 连接发送回浏览器
12. 浏览器接收 HTTP 响应后，根据情况选择关闭 TCP 连接或者保留重用
13. 浏览器检查响应状态码
14. 如果资源可缓存，进行缓存，no-cache no-store 则不进行缓存
15. 对响应进行解码 gzip 压缩
16. 根据资源类型决定如何处理 Content-Type: text/html mime 类型
    i. 解析 html 文档 - 构建 DOM 树 构造 CSSOM 树 下载相关资源 css js img 等
    reflow repain
    ii. 解析 js 脚本

    * 浏览器创建 document 对象并解析 html,将解析到的元素和文本节点添加到文档中，此时 document.readystate 为 loading
    * 没遇到 sync 和 defer 的 script 时，将它们添加到文档继续(同步)执行脚本, 反之则下载脚本并继续解析
    * 文档完成解析, document.readyState 变成 ineteractive
    * 浏览器在 document 对象上触发 DOMContentLoaded 事件
    * 文档解析完成，可能还有图片等在加载，等这些内容完成载入且所有异步脚本载入执行后，document.readyState 变为 complete, window 触发 load 事件

17. 显示页面（HTML 解析过程中会逐步显示页面）

## 如何进行网站性能优化

从内容上：

1. 减少 HTTP 请求，合并文件，css spirits，base64 img
2. 减少 DNS 查询： 查询完成前浏览器不能从主机下载任何文件方法： DNS 缓存、将资源分布到恰当数量的主机名，平衡并行下载和 DNS 查询
3. 避免重定向：多余的中间访问
4. 使 Ajax 可缓存
5. 非必须组件延迟加载
6. 未来所需组件预加载
7. 减少 DOM 元素数量（从而加快解析, css, js 等的压缩同理）
8. 将资源放到不同域下： 浏览器同时从一个域下载的数目有限，增加域可提高并行下载量
9. 减少 iframe 数量
10. 减少 404

从服务器：

1. 使用 CDN
2. 添加 Expires 或 Cache-Control 响应头
3. 对组件使用 Gzip 压缩
4. 配置 Etag
5. Ajax 使用 GET 请求
6. 避免空 src 的标签
7. 减小 cookie 大小
8. 引入资源的域名不要包含 cookie

css 样式方面：

1. 样式表放页面顶部
2. 不用 css 表达式 !import 等
3. 少 hack

JS 方面：

1. 将脚本放底部
2. js css 从外部引入
3. 压缩 js css 文件
4. 减少 DOM 的访问 reflow repain
5. 合理设计事件监听

图片方面

1. 优化图片 压缩
2. webp
3. 尽量不要在 html 中拉伸图片
4. 保证 favicon.ico 小且可缓存

## 什么是渐进增强

指 web 设计时强调可访问性、语义化 HTML 标签、外部样式表和脚本。保证所有人都能访问页面的基本内容和功能同时为高级浏览器和高宽带用户提供更好的用户体验核心原则如下：

* 让大部分浏览器必须能访问基本内容
* 让大部分浏览器能使用基本功能
* 外部 css 提供增强布局
* 通过非侵入式、外部 js 提供增强功能

## HTTP 状态码及其含义

1XX: 信息状态码
2XX: 成功状态码
3XX: 重定向
4XX: 客户端错误
5XX: 服务器错误
