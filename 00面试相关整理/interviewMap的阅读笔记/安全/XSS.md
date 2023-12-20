## XSS

> Cross-Site Scripting 跨站脚本攻击XSS是一种网站应用程式的安全漏洞攻击，是代码注入的一种。它允许恶意使用者将程式码注入到网页上，其他使用者在观看网页时就会受到影响。这类攻击通常包含了HTML以及使用者端脚本语言。

XSS分为三种：反射型、存储型和DOM-based

    <div><script>alert(1)</script></div>

上述这类属于反射型攻击，也可以说是DOM-based攻击

## 如何防御

最普遍的做法是转义输入输出内容，对于引号、尖括号、斜杠进行转义

```js
function escape(str) {
  str = str.replace(/&/, '&amp;')
  str = str.replace(/</, '&lt;')
  str = str.replace(/>/, '&gt;')
  str = str.replace(/"/, '&quto;')
  str = str.replace(/'/, '&##39;')
  str = str.replace(/`/, '&##96;')
  str = str.replace(/\//, '&##x2F;')
  return str
}
```

对于富文本考虑到需要过滤的标签和属性可以采用白名单过滤的方法。

## CSP

内容安全策略CSP是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本XSS和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要手段。

我们可以通过CSP来尽量减少XSS攻击。CSP本质上也是建立白名单，规定了浏览器只能够执行特定来源的代码。

* 只允许加载本站资源 `Content-Security-Policy: default-src 'self'`
* 只允许加载HTTPS协议图片 `Content-Security-Policy: img-src https://*`
* 允许加载任何来源框架 `Content-Security-Policy: child-src 'none'`
