# 跨域、Cookie、Session 与 Token

## Origin、Site 与 CORS

Origin 由协议、主机、端口组成；同源策略限制脚本访问跨源资源。Site 是 Cookie SameSite 等机制使用的不同概念，不能等同于 Origin。

CORS 是服务器通过响应字段允许浏览器向脚本暴露跨源响应的机制。它不是接口认证，也不能限制命令行客户端。部分跨源请求可直接发送，只是脚本读不到响应，因此 CORS 本身不能阻止 CSRF。

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Vary: Origin
```

携带凭据的跨源读取不能把 Allow-Origin 写成 `*`。服务器应从允许名单选择具体 origin，不能无条件反射输入；客户端还需选择合适的 credentials 模式。第三方 Cookie 策略、SameSite 与浏览器隐私限制仍可能影响结果。

非简单请求通常先发送 OPTIONS 预检，询问允许的方法和请求字段。预检通过不意味着用户登录，更不代表具体资源已授权。预检的缓存由相关 CORS 机制控制，和普通响应缓存不是一个概念。

## 三个概念不在同一层

| 名词 | 核心含义 | 常见风险 |
| --- | --- | --- |
| Cookie | 浏览器保存并按规则附带的状态机制 | 环境自动携带的凭据引入 CSRF 风险；作用域过宽 |
| Session | 服务端维护会话状态，客户端通常持有标识 | 多实例共享、过期、注销、固定会话攻击 |
| Token | 可代表凭据或授权信息的令牌 | 泄露、重放、撤销和受众验证 |

Session ID 可以放在 Cookie，JWT 也可以放在 Cookie；它们不是只能二选一的产品。JWT 通常是签名而非加密，内容不应放秘密。服务端要验证签名算法、签发方、受众、有效期等，刷新、撤销和密钥轮换也需要设计。

Cookie 的 `Secure` 限制安全传输，`HttpOnly` 限制脚本直接读取，`SameSite` 调整跨站携带策略。HttpOnly 不会让 XSS 失去所有危害，也不直接防 CSRF。Domain / Path 是作用域规则，Path 不能作为可靠的安全隔离边界。

## 存储与认证的取舍

令牌放 localStorage 易被同源恶意脚本读取；放 HttpOnly Cookie 降低直接读取风险，但要处理 CSRF。应结合应用形态、威胁模型、过期和退出策略设计，而不是宣称一种位置永远安全。全程使用 TLS，避免在 URL、日志中泄露凭据。

OAuth 2.0 主要处理授权，OIDC 在其上提供身份层。浏览器应用常使用授权码 + PKCE；不能把服务端 client secret 写进前端包。跨域单点登录依赖受信任身份服务与协议流程，不是设置任意共享 Cookie 就能完成。

**自测：** 同站不同源的两个子域是否还受 CORS 限制？为什么后端返回了200，浏览器却报跨域？JWT 已签名为什么还能被读取？

> 来源：[个人 Cookie / Session / Token / CORS 笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/HTTP)；[MDN CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)；[OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)；[OAuth 浏览器应用最佳实践](https://oauth.net/2/browser-based-apps/)。
