## Service Worker简介

Service Worker是一个在浏览器后台运行的脚本，它的生命周期完全独立于网页。它无法直接访问DOM，但可以通过postMessage接口发送消息来和UI进程通信。拦截网络请求是Service Worker的重要功能，通过Service Worker能完成离线缓存、编辑响应、过滤响应等功能。

## 开始使用

1. 判断兼容性

主流浏览器都支持，高版本 Android移动端浏览器支持。由于Service worker无法通过注入polyfill实现兼容，所以在使用它之前，先弄明白运行场景，别盲目使用。

判断浏览器是否支持Service Worker最简单的方法是通过以下代码：

```js
// 如果navigator对象上存在serviceWorker对象，就表示支持
if (navigator.serviceWorker) {
  // 通过navigator.serviceWorker 使用
}
```

2. 注册Service Worker

要为网页接入Service Worker就需要在网页加载后注册一个描述Service Worker逻辑的脚本。

```js
if (navigator.serviceWorker) {
  window.addEventListener('DOMContentLoaded', function() {
    // 调用serviceWorkder.register注册，参数/sw.js为脚本所在的URL路径
    navigator.serviceWorker.register('/sw.js')
  })
}
```

一旦这个脚本文件被加载，Service Worker的安装就开始了。在这个脚本被安装到浏览器中后，就算用户关闭当前网页，它仍会存在。
也就是说第一次打开网页时，Service Worker的逻辑不会生效，因为脚本还没有被加载和注册，但在以后打开该网页时脚本里的逻辑会生效。

可以在chrome浏览器中打开网址 chrome://inspect/#service-worker 来查看当前浏览器中已注册的Service Worker

3. 使用Service Worker实现离线缓存

Service Worker在注册成功后会在其生命周期中派发一些事件，通过监听对应事件在特殊节点上做的一些事情。
在Service Worker脚本中引入心的关键字self，代表当前的Service Worker实例。
在Service Worker安装成功后会派发出install事件，需要在这个事件中执行缓存资源的逻辑，实现代码如下：

```js
// 当前混存版本的唯一标识符，用当前事件替代
var cacheKey = new Date().toISOString()
// 需要背缓存的文件的url列表
var cacheFileList = [
  '/index.html',
  '/app.js',
  '/app.css'
]
// 监听install事件 self代表当前Service Worker实例
self.addEventListener('install', function(event) {
  // 等待所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function(cache) {
      // 要缓存的文件的url列表
      return cache.addAll(cacheFileList)
    })
  )
})
// 接下来需要监听网络请求事件去拦截请求、复用缓存
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // 去缓存中查询对应的请求
    caches.match(event.request).then(function(response) {
      // 如果本地命中缓存，就直接返回本地的资源
      if (response) {
        return response
      }
      // 否则就用fetch下载资源
      return fetch(event.request)
    })
  )
})
```

这样就实现了离线缓存。

4. 更新缓存

线上的代码有时需要更新和重新发布，如果这个文件被离线缓存了，就需要在Service Worker脚本中又对应的逻辑去更新缓存。这可以通过更新Service Worker 脚本中有对应的逻辑去更新缓存。这可以通过Service Worker脚本文件做到。

浏览器针对Service Workers 有如下机制：

* 每次打开接入了Service Worker的网页时，浏览器都会重新下载Service Worker脚本文件（所以要注意该文件不能太大）。若发现和当前已经注册过的文件存在字节差异，就将其视为“新服务工作线程”。
* 新的Service Worker线程将会启动，且将会触发其install 事件
* 当网栈上当前打开的网页关闭时，旧的Service Worker线程将会被终止。新的Service Worker线程将会取得控制权
* 新的Service Worker线程取得控制权后，将会触发其activate事件

新的Service Worker线程中的activate事件就是清理旧缓存的最佳时间点，代码如下：

```js
// 当前缓存的白名单，在新脚本的install事件里将使用白名单里的key
var cacheWhitelist = [cacheKey]
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 将不再白名单中的缓存全部清理掉
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 删除缓存
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```

最终，我们完成的Service Workers脚本如下：

```js
// 当前混存版本的唯一指定符，用当前时间替代
var cacheKey = new Date().toISOString()
// 当前缓存的白名单，在新脚本的install事件里将使用白名单里的key
var cacheWhiteList = [cacheKey]
// 需要背缓存的文件的url列表
var cacheFileList = [
  '/index.html',
  'app.js',
  'app.css'
]
// 监听install事件
self.addEventListener('install', function(event) {
  // 等待所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function(cache) {
      // 要缓存的文件url列表
      return cache.addAll(cacheFileList)
    })
  )
})
// 拦截网络请求
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // 去缓存中查询对应的请求
    caches.match(event.request).then(function(response) {
      // 如果命中本地缓存，就直接返回本地的资源
      if (response) {
        return response
      }
      // 否则就用fetch下载资源
      return fetch(event.request)
    })
  )
})
// 新的Service Workers线程取得控制权后，将会触发activate事件
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 将不在白名单中的缓存全部清理掉
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            // 删除缓存
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```