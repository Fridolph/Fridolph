# HTTP 缓存：从字段到发布策略

## 一次缓存决策

```text
存在可用缓存？
  → 在新鲜期内且允许直接复用：使用缓存
  → 需要验证：携带 ETag / 修改时间发送条件请求
      → 未变化：304，复用已存响应体并更新元数据
      → 已变化：200，使用新内容并按策略存储
  → 不允许存储 / 未命中：请求服务端
```

304 是条件请求的响应，不是重定向。ETag 是不透明的版本标识，不一定是文件哈希；Last-Modified 描述源表示的修改时间，不是本地缓存创建时间。两类验证条件同时存在时，If-None-Match 有优先处理规则。

| 指令 | 准确理解 |
| --- | --- |
| `max-age=600` | 定义新鲜期，计算年龄还涉及 Date / Age 等；不是下载后永远固定倒计时 |
| `no-cache` | 可以存储，但每次复用前需要成功验证 |
| `no-store` | 不允许缓存存储当前请求 / 响应；不是清空全部已有缓存的按钮 |
| `private` | 禁止共享缓存存储，可允许浏览器私有缓存 |
| `s-maxage` | 针对共享缓存的新鲜度，优先于 max-age / Expires |
| `must-revalidate` | 过期后必须验证，不能随意拿陈旧响应顶替 |

`no-store` 已禁止私有与共享缓存存储，不是必须再加 private 才有效。private 适合“允许个人缓存但禁止共享”的响应。HTTP 缓存指令也不能代替权限控制，不能假设它一定清除 Service Worker 的程序化 Cache Storage。

## 面向发布的组合

| 内容 | 常见策略 | 代价与边界 |
| --- | --- | --- |
| 带内容哈希的 JS / CSS | 长 max-age，可配 immutable | URL 内容应不可变；发布要保留旧资源供旧页面引用 |
| HTML 入口 | no-cache，结合 ETag 验证 | 仍会访问网络验证，便于发现新引用 |
| 个性化 API | 按敏感程度选择 private 或 no-store | CDN 配置与用户隔离必须一起检查 |
| 公共可缓存 API | 明确新鲜度、Vary 与失效方式 | 不把 Cookie / Authorization 用户数据误存为公共内容 |

缓存策略是客户端、反向代理、CDN 与源站的协作结果，源站设了字段不代表 CDN 一定照做。带 query 的资源也可以缓存，POST 与 GET 的缓存规则应按协议和实现核实，不能靠“后缀有问号就不缓存”的经验判断。

## 一个验证实验

在自己的本地服务上配置 ETag 和 `Cache-Control: no-cache`，第一次访问观察200和响应体；再次访问观察 If-None-Match 与304；改变内容后验证返回200与新标识。再切换成短 max-age，比较新鲜期内是否发请求。

DevTools 的 Disable cache、硬刷新与普通导航行为不同，记录实验操作，否则容易把调试设置当线上缓存失效。缓存命中还应区分内存、磁盘、Service Worker 与 CDN。

关联阅读：[HTTP 缓存详解](./s_http_4-cache)、[浏览器存储与离线缓存](/概念与原理/06opt/s_opt_12-storage_cache)。

> 来源：[个人缓存笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/HTTP/浏览器缓存)（原笔记参考 [缓存机制文章](https://segmentfault.com/a/1190000008377508)）；[MDN HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Caching)；[RFC 9111](https://www.rfc-editor.org/rfc/rfc9111)。
