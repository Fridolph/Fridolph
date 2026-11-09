# XSS、CSRF 与认证安全自测

## 1. 如何用一句话区分 XSS 和 CSRF？

**参考回答：** XSS 让不可信脚本在受信任页面上下文中执行；CSRF 利用浏览器自动携带的身份凭据诱导用户发起非预期操作。两者目标和入口不同，防护也不同，存在 XSS 时还可能绕过部分 CSRF 防护。

**追问：** HttpOnly 保护 Cookie 不被 JS 直接读取，为什么恶意脚本仍可能发出已登录请求？

## 2. 防 XSS 只做 HTML 转义够吗？

**参考回答：** 要按输出上下文处理。纯文本优先 textContent / 模板默认转义；富文本需要可靠的允许名单净化，属性、URL、脚本等上下文有不同规则。避免把不可信数据送入 innerHTML / v-html 或代码求值。CSP 是纵深防御，不能代替安全的数据流设计。

存储型、反射型强调数据存储 / 返回路径，DOM 型强调客户端不安全的数据处理；只看一个 payload 不能判断完整漏洞链路。

**验证：** 沿输入源 → 中间处理 → DOM / 脚本 sink 追踪数据，检查后台保存后再展示、Markdown / 富文本等场景。

## 3. CSRF 如何形成完整防护？

**参考回答：** 状态变更不要使用 GET，使用与会话绑定且正确验证的 CSRF token，结合 SameSite、Origin / Referer 校验等机制。SameSite 按站点而不是按 origin，可能存在同站跨源情形；CORS 控制响应可读性，不能作为唯一防护。

**追问：** API 使用 Authorization bearer token 与自动携带 Cookie 的风险有什么区别？不要由此推导 bearer token 不怕 XSS 或泄露。

## 4. 密码、令牌和日志怎样保护？

**参考回答：** 密码服务端使用 Argon2id、scrypt 等适当的密码派生方案，配合盐和可调整成本，不用 MD5 / 简单 SHA 替代。传输使用 TLS，前端哈希不能代替服务端安全存储。令牌有有效期、撤销和轮换策略，不写入 URL 与日志。

**追问：** 为什么“加盐后 MD5 多哈希几次”仍不是推荐方案？为什么登录限流和异常检测还必要？

## 5. 高级回答怎样体现安全边界？

**参考回答：** 不只列漏洞名，而是说明资产、攻击入口、信任边界、控制措施与验证。前端校验用于体验，后端仍要校验输入、身份和资源权限；参数化查询避免 SQL 拼接，最小权限限制故障影响面。

**验证任务：** 为“修改草稿”接口列出未登录、跨用户、恶意文本、重复提交和过期会话五种用例，区分认证、鉴权、校验和幂等各解决什么。

> 来源：[个人 interviewMap / 安全](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/interviewMap/安全)；[OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)；[CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)；[Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)。
