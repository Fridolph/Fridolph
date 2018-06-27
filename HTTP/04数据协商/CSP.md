[CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

内容安全策略   (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。


## Content-Security-Policy

**作用**

* 限制资源获取
* 报告资源获取越权

**限制方式**

* default-src 限制全局
* 制定资源类型

**资源类型**

* content-src
* style-src
* script-src
* img-src
* font-src
* media-src
* frame-src
* manifest-src
