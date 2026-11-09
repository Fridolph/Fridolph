# 浏览器存储与离线缓存

## 先区分用途与作用域

| 机制 | 用途 | 边界 |
| --- | --- | --- |
| Cookie | 会话凭据、少量需随请求携带的状态 | Domain / Path / SameSite 等规则；不是大容量数据库 |
| localStorage | 少量本地键值状态 | 同源、同步操作；不适合大量数据和可被脚本窃取的敏感凭据 |
| sessionStorage | 当前页面会话状态 | 按源和顶层浏览上下文分区，不能简单说成所有标签页共享 |
| IndexedDB | 结构化本地数据、索引与事务 | 异步、版本升级与多标签连接协调；不保证无限空间或永久保留 |
| Cache Storage | 程序管理 Request / Response | 不是自动遵循所有 HTTP 缓存字段的浏览器 HTTP 缓存 |

配额、隐私模式、持久化授权和回收规则因浏览器与环境而异。客户端数据可能被清理，离线写入还涉及重试、冲突、版本和服务端对账，不能当成可靠备份。

## Service Worker 是事件驱动的代理

运行在安全上下文（HTTPS，localhost 有开发例外），没有 DOM 访问能力，并非永久运行的后台进程。基本生命周期为注册 → install → waiting → activate，随后在作用域和控制关系符合条件时参与 fetch 等事件。

新版本通常等待旧客户端不再使用旧 worker 才激活。`skipWaiting` / `clients.claim` 会改变接管时机，需要考虑旧页面搭配新资源的兼容性，不能无条件“立即更新所有页面”。

## 一个有明确边界的缓存示意

以下代码仅用于**独立同源练习站点**的 `/offline-demo/` 资源，本站不注册此 worker。需自行准备离线页并验证作用域与部署 base；不是任意站点都可粘贴的生产方案。

```js
const PREFIX = 'offline-demo-'
const CACHE = `${PREFIX}v1`
const OFFLINE = '/offline-demo/offline.html'

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.add(OFFLINE)))
})

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(PREFIX) && key !== CACHE)
      .map(key => caches.delete(key)),
  )))
})

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin
      || !url.pathname.startsWith('/offline-demo/')
      || request.headers.has('Authorization')) return

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () =>
      (await caches.match(OFFLINE))
        ?? new Response('Offline', { status: 503 }),
    ))
  }
})
```

这个示例只预存固定离线页，导航优先网络，网络失败再回退，不把任意页面、私人 API、用户数据都存入缓存。HTTP 500 不会让 fetch 自动 reject，因此这里只回退网络错误；如果希望处理5xx，要显式定义策略。

旧代码每次 worker 执行时生成时间戳缓存名，会产生无意义的缓存版本；删除所有 caches 又可能误伤同源其他应用。应使用稳定版本、自己模块的前缀，并验证更新失败和多标签页行为。

## 缓存策略如何选择？

静态不可变资源可 cache-first，更新频繁的公共内容可考虑 stale-while-revalidate，需要最新结果的业务走 network-first 或纯网络。不同策略都有陈旧数据和失败回退代价。退出登录要考虑相关本地数据清理，但不能擅自清理同源其他应用的全部存储。

关联阅读：[HTTP 缓存策略](/概念与原理/04http/s_http_9-cache_strategy)、[Cookie 与认证](/概念与原理/04http/s_http_8-cors_identity)。

> 来源：[个人浏览器存储与缓存笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/性能优化相关/6浏览器存储)、[缓存优化笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/性能优化相关/7缓存优化)；[MDN Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)；[存储配额与回收](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)。
