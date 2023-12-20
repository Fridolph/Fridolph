## Token

前端 http 里所说的 Token  是指 `访问资源的凭据`。

例如当调用 google api 需要带上有效的token来表明请求的合法性。 这个token是google给的，代表了有权访问api背后的资源。

* access token 调用api时携带的token

1. 首先需要向google api注册应用程序，注册完毕后拿到认证信息（credentials）包括id和secret
2. 接下来向google请求access token。如果想访问用户资源，这里会提醒用户授权
3. 授权完毕，google会返回access token，或者授权代码（authorization code）, 再通过代码取得access token
4. token获取到后，就能带上token访问api了

![access token流程](https://user-gold-cdn.xitu.io/2018/7/3/1646088e5837a9a2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在第3步通过code兑换access token的过程中，google不仅会返回access token，还会返回额外信息，这其中和之后更新相关的就是refresh token

一旦access token过期，就可以通过refresh token再次请求access token。当然这要根据请求方式和访问的资源类型而定，这又会引起两个问题：

1. 如果refresh token也过期了怎么办？需要用户重新登录授权
2. 为什么要区分refresh token和access token？如果合并成一个token然后把过期时间调整更长，且每次失效后用户重新登录授权就好？

## OAuth

从获取token到使用token访问接口。这其实是标准的OAuth2.0机制下访问api的流程。

### SSO Single Sign-On

单点登录（公司内部，一个用户登录，可访问所有系统）

SSO是一类解决方案的统称，而在具体实施，我们有两种策略可供选择：

1. SAML 2.0
2. OAuth 2.0

**Authentication VS Authorisation**

* Authentication 身份鉴别 认证
* Authorisation 授权

认证的作用在于认可你有权限访问系统，用于鉴别访问者是否是合法用户；而授权用于决定你有访问哪些资源的权限。作为系统设计者来说，这两者的差别是不同的工作职责。

Authorization Server/Identity Provider(IdP) VS Service Provider(SP)/Resource Server
把负责认证的服务称为 Authorization Server 或者 Identity Provider，以下简称 IdP；而负责提供资源（API调用）的服务称为  Resource Server 或者 Service Provider，以下简称 SP

### SMAL 2.0

![SMAL2.0流程图](https://user-gold-cdn.xitu.io/2018/7/3/16460893ef7a34a4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* 还未登录的用户打开浏览器访问网站（SP）网站提供服务但是不负责用户认证
* SP向IdP发送一个SAML认证请求，同时SP向用户浏览器重定向到IdP
* IdP在验证完来自SAML的请求无误后，在浏览器中呈现登录表单让用户进行填写用户名和密码进行登录
* 一旦用户登录成功，IdP会生成一个包含用户信息（用户名和密码）的SAML token（SAML token 又称为 SAML Assertion，本质上是 XML 节点）IdP向SP返回token，并且将用户重定向到SP（token的返回是在重定向步骤中实现的）
* SP对拿到的token进行验证，并且解析用户信息。此时就能够根据这些信息允许用户访问我们网站的内容了

当用户在IdP登录成功后，IdP需要将用户再次重定向至SP站点，这一步有两个方法：

* HTTP重定向（不推荐，因无法携带更长的信息）
* HTTP POST请求，当用户登录后渲染表单，点击向SP提交POST

如果是应用是基于web，无问题。但若是Android和IOS问题就来了：

* 用户在iphone上打开应用，需要通过IdP认证
* 应用跳转safari登录认证完毕后，需要通过http post形式将token返回至手机应用

虽然post的url可以拉起应用，但无法解析post内容，也就无法获取SAML token

---

### OAuth 2.0

![OAutho2.0流程图](https://user-gold-cdn.xitu.io/2018/7/3/164608b5c33898d0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* 用户通过客户端（也可以是浏览器或手机应用）想要访问SP上的资源，但是SP告诉用户需要认证，将用户重定向至IdP
* IdP向用户询问SP是否可以访问用户信息，若用户同意，IdP向客户端返回access code
* 客户端拿code向IdP换access token，并拿着access token向SP请求资源
* SP接受请求后拿着附带token向IdP验证用户身份

OAuth本意是一个应用允许另一个应用在用户授权的情况下访问自己的数据，OAuth设计本意更倾向于授权而非认证（当然授权用户信息就间接实现了认证）

### OpenID

* OpenID只用于身份验证，允许你以同一个账户在多个网站登录。它仅仅是为你的合法身份背书，当你以xx帐号登录某个站点后，该站点无权访问你在xxb上的数据
* OAuth用户授权，允许被授权方访问授权方的用户数据

### Refresh Token

为什么需要？

这样处理是为了职责分离：refresh token负责身份验证， access token负责资源请求。虽然两者都由IdP发出，但access token还要和SP进行数据交换，如果公用会有身份泄漏可能。

---

token其实是为OAuth服务的，它是访问数据的一把钥匙。

## JWT

JWT 也是token，它是访问资源的凭证。甚至你可以不需要向 Google 索要 access token，而是携带 JWT 作为 HTTP header 里的 bearer token 直接访问 API 也是可以的。

顾名思义，它是json结构的token，由三部分组成：

* header

用于描述元信息，例如产生signature的算法

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

* payload

用于携带你希望向服务端传递的信息。即可以往里面添加字段，也可以塞入自定义字段

```json
{
  "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```

* signature

创建签名需要分以下几个步骤

1. 需要从接口服务端拿到密钥 假设为 `secret`
2. 将header进行base64编码，假设为 `headerStr`
3. 将payload进行base64编码，假设为 `payloadStr`
4. 将headerStr和payloadStr用 `.` 字符串拼接，成为字符 `data`
5. 以data和secret作为参数，使用哈希算法计算出签名

下面是伪代码：

```js
// signature algorithm
data = base64URLEncoded(header) + '.' + base64URLEncoded(payload)
signature = Hash(data, secret)
```

假设我们的原始 JSON 结构是这样的：

```json
// Header
{
  "typ": "JWT",
  "alg": "HS256"
}
// Payload:
{
  "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```

如果密钥是字符串secret的话，那么最终 JWT 的结果就是这样的

    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM

你可以在 [jwt.io](https://jwt.io/) 上验证这个结果

---

JWT的目的不是为了隐藏或者保密数据，而是为了确保数据确实来自被授权的人创建的（不被篡改）

用于接口调用

## 有状态的会话

因为HTTP是无状态的，所以客户端和服务端需要解决如何让之间的对话变得有状态。例如只有登录状态的用户才有权限去调用某些接口，那么在用户登录后，需要记住该用户是已经登录的状态。常见的方法是使用session机制。

![常见的session模型](https://user-gold-cdn.xitu.io/2018/7/3/164608d56ba8fc6e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* 用户在浏览器登录后，服务端为用户生成唯一的session id，存储在服务端的存储服务（mysql redis）
* 该session id也返回给浏览器以SESSION_ID为key存储在cookie中
* 如果用户再次访问该站，cookie里的SESSION_ID会随着请求一同发往服务端
* 服务端通过判断SESSION_ID是否在redis判断用户是否处于登录状态
