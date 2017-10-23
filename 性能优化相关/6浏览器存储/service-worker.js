self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('app-v1')
      .then(cache => {
        console.log('--------open cache--------')
        return cache.addAll([
          'app.js',
          'main.css'
        ])
      })
  )
})

self.addEventListener('fetch', event => {
  event.responseWith(
    caches.match(event.request)
      .then(res => {
        if (res) {
          return res
        } else {
          // // 通过fetch方法向网络发起请求
          // fetch(url).then(() => {
          //   if (res) {
          //     // 对于新请求到资源存储到我们的cachestorage中
          //     caches
          //   } else {
          //     // 用户提示
          //   }
          // })
        }
      })
  )
})