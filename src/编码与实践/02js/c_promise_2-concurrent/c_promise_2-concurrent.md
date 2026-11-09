# 设计思路

## 运用 Promise 设计一个支持并发的前端接口缓存

## 1. 设计缓存池

缓存池不过就是一个 map，存储接口数据的地方，将接口的路径和参数拼到一块作为 key，数据作为 value 存起来。

```js
const cacheMap = new Map()
```

## 2. 封装一下调用接口的方法，调用时先走咱们缓存数据。

```js
import axios, { AxiosRequestConfig } from 'axios'
// 模拟请求
export function sendRequest(request: AxiosRequestConfig) {
  return axios(request)
}
```

## 3. 然后加上咱们的缓存

```ts
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

const cacheMap = new Map()

interface MyRequestConfig extends AxiosRequestConfig {
  needCache?: boolean
}

// 这里用 params 是因为 params 是GET方式传的参数
// 而我们的缓存一般是GET接口用的
function generateCacheKey(config: MyRequestConfig) {
  return config.url + '?' + qs.stringify(config.params)
}

export function sendRequest(request: MyRequestConfig) {
  const cacheKey = generateCacheKey(request)
  // 判断是否需要缓存，且当缓存池中有值时，返回缓存池中的值
  if (cacheMap.has(cacheKey)) {
    return Promise.resolve(cacheMap.get(cacheKey))
  }

  return new Promise((resolve, reject) => {
    sendRequest(request)
      .then(res => {
        cacheMap.set(cacheKey, res)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
```

## 4. 然后请求接口

```ts
const getArticleList = (params: any) =>
  sendRequest({
    needCache: true,
    url: '/article/list',
    method: 'get',
    params,
  })

getArticleList({
  page: 1,
  pageSize: 10,
}).then(res => {
  console.log(res)
})
```

这个部分就很简单，我们在调接口时给一个 needCache 的标记，然后调完接口如果成功的话，就会将数据放到 cacheMap 中去，下次再调用的话，就直接返回缓存中的数据。

## 5. 并发缓存

上面的虽然看似实现了缓存，不管我们调用几次，都只会发送一次请求，剩下的都会走缓存。但是真的是这样吗？

```ts
getArticleList({
  page: 1,
  pageSize: 10,
}).then(res1 => {
  console.log(res1)
})

getArticleList({
  page: 1,
  pageSize: 10,
}).then(res2 => {
  console.log(res2)
})

getArticleList({
  page: 1,
  pageSize: 10,
}).then(res3 => {
  console.log(res3)
})
```

## 发现问题

其实这样，就可以测出，我们的虽然设计了缓存，但是请求还是发送了三次，这是因为我们第二次第三次请求发出时，第一次请求还没完成，也就没给缓存池里放数据，所以第二次、第三次请求没命中缓存，也就又发了两次。

那么，有没有一种办法让第二次请求等待第一次请求调用完成，然后再一块返回呢？

### 思考

- 通过定时器解决

  比如我们可以给第二次请求加个定时器，定时器时间到了再去 cacheMap 中查一遍有没有缓存数据，没有的话可能是第一个请求还没好，再等几秒试试！

> 可是这样的话，第一个请求的时候也会在原地等呀！😒

让第一个请求在一个地方贴个告示不就好了，就像酒店里在房间门口挂个请勿打扰的牌子一样

### 改良后的代码

```ts
// 存储缓存当前状态，相当于挂牌子的地方
const statusMap = new Map<string, 'pending' | 'completed'>()

export function sendRequest(request: MyRequestConfig) {
  const cacheKey = generateCacheKey(request)

  // 判断是否需要缓存
  if (request.needCache) {
    if (statusMap.has(cacheKey)) {
      const currentStatus = statusMap.get(cacheKey)

      // 判断当前的接口缓存状态，如果是complete，则代表缓存完成
      if (currentStatus === 'completed') {
        return Promise.resolve(cacheMap.get(cacheKey))
      }

      // 如果是pending，则代表正在请求中，
      // 这里就等个 1.5 秒 然后再来看看情况 （时间可根据需求再设计）
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          sendRequest(request).then(resolve, reject)
        }, 1500)
      })
    }

    // pending 说明正在请求中，等待请求完成
    statusMap.set(cacheKey, 'pending')
  }

  // 初次请求时
  return axios(request).then(res => {
    // 这里简单判断一下，200就算成功，不管里面的data code啥的
    if (res.status === 200) {
      statusMap.set(cacheKey, 'completed')
      cacheMap.set(cacheKey, res)
    }
    return res
  })
}
```

> 成了！这里真的做到了，可以看到我们这里打印了两次，但是只发了一次请求。
> 这里测试代码就省略了，可自行跑一下。

### 再次优化

可是用 setTimeout 等待还是不太优雅，如果第一个请求能在 1.5s 以内完成还行，用户等待的时间还不算太久，还能忍受。可如果是 2s 的话，第二个接口用户可就白白等了 3s 之久，那么，有没有一种办法，能让第一个接口完成后，接着就通知第二个接口返回数据呢？

等待，通知，这种场景我们写代码用的最多的就是回调了，但是这次用的是 promise 啊，而且还是毫不相干的两个 promise。

等等！callback 和 promise，promise 本身就是 callback 实现的！promise 的 then 会在 resole 被调用时调用，这样的话，我们可以将第二个请求的 resolve 放在一个 callback 里，然后在第一个请求完成的时候，调用这个 callback！🥳

## 完整实现的代码

根据项目看，这里有用到 axios 和 qs

```ts [utils/sendCacheRequest.ts]
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

// 存储 缓存数据
const cacheMap = new Map()
// 存储 缓存当前状态
const statusMap = new Map<string, 'pending' | 'completed'>()
// 定义 回调的格式
interface RequestCallback {
  onSuccerss: (data: any) => void
  onError: (data: any) => void
}
// 存放 等待状态的请求回调
const callbackMap = new Map<string, RequestCallback[]>()

interface MyRuquestConfig extends AxiosRequestConfig {
  needCache?: boolean
}

// 这里用 params 是因为 params 是 GET方式传的参数
// 我们的缓存一般是GET接口用的
function generateCacheKey(config: MyRuquestConfig) {
  return config.url + '?' + qs.stringify(config.params)
}

export function sendCacheRequest(request: MyRequestConfig) {
  const cacheKey = generateCacheKey(request)

  // 判断是否需要缓存
  if (request.needCache) {
    if (statusMap.has(cacheKey)) {
      const currentStatus = statusMap.get(cacheKey)
      // 判断当前的接口缓存状态，如果是 completed 则代表缓存完成
      if (currentStatus === 'completed') {
        return Promise.resolve(cacheMap.get(cacheKey))
      }

      // 如果是 pending 则代表请求中，这里放入回调函数
      if (currentStatus === 'pending') {
        return new Promise((resolve, reject) => {
          // 缓存数据 有记录就把回调函数放进去
          if (callbackMap.has(cacheKey)) {
            callbackMap.get(cacheKey)!.push({
              onSuccess: resolve,
              onError: reject,
            })
          }
          // 缓存数据 没有记录时：
          // 设置 cacheKey，并把回调函数放进去
          else {
            callbackMap.set(cacheKey, [
              {
                onSuccess: resolve,
                onError: reject,
              },
            ])
          }
        })
      }
    }
    // 状态里面没有记录，说明是第一次请求，记录状态为pending
    statusMap.set(cacheKey, 'pending')
  }

  // 不需缓存，说明已开始执行
  return axios(request).then(
    resolve => {
      // 这里简单判断一下 200就算成功，不管里面的数据
      if (res.status === 200) {
        statusMap.set(cacheKey, 'completed')
        cacheMap.set(cacheKey, resolve)
      } else {
        // 不成功的情况下 删掉 statusMap 中的状态，让下次请求重新响应
        statusMap.delete(cacheKey)
      }
      // 这里触发 resolve 的回调函数
      if (callbackMap.has(cacheKey)) {
        callbackMap.get(cacheKey)!.forEach(callback => {
          callback.onSuccess(resolve)
        })
        // 调用完成后清除掉（垃圾回收）
        callbackMap.delete(cacheKey)
      }
      return resolve
    },
    reject => {
      // 不成功的情况下删掉 statusMap 中的状态
      // 以便让下次请求发送时，再重新调用该请求
      statusMap.delete(cacheKey)

      // 这里触发reject的回调函数
      if (callbackMap.has(cacheKey)) {
        callbackMap.get(cacheKey)!.forEach(callback => {
          callback.onError(reject)
        })
        // 调用完成之后清除掉（垃圾回收）
        callbackMap.delete(cacheKey)
      }
      return Promise.reject(reject)
    }
  )
}
```

## 总结

promise 封装并发缓存到这里就结束啦。

当时的场景是一个页面里有好几个下拉选择框，选项都是接口提供的常量。但是接口只提供了一个接口返回这些常量，前端拿到以后自己再根据类型挑出来，所以这种情况我们肯定不能每个下拉框都去调一次接口，只能是寄托缓存机制了。

这种写法，在另一种场景下也很好用，比如将需要用户操作的流程封装成 promise。

例如，A 页面点击 A 按钮，出现一个 B 弹窗，弹窗里有 B 按钮，用户点击 B 按钮之后关闭弹窗，再弹出 C 弹窗 C 按钮，点击 C 之后流程完成，这种情况就很适合将每个弹窗里的操作流程都封装成一个 promise，最外面的 A 页面只需要连着调用这几个 promise 就可以了，而不需要维护控制这几个弹窗显示隐藏的变量了。

## 参考

- [【你不知道的 promise】设计一个支持并发的前端接口缓存](https://juejin.cn/post/7104635370796482567)——背对疾风
