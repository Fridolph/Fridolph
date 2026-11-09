# Axios

Axios 是一个基于 Promise 的 HTTP 库，支持浏览器和 Node.js。它具有许多高级功能和特性，使得发送 HTTP 请求更加简单和高效。

## 安装

使用 npm 安装 Axios：

```bash
npm install axios
```

## 使用

```js
import axios from 'axios'

axios.get('/user').then(res => {
  console.log('🚀 ~ axios.get:', res)
})
```

在深入源码之前，先简要了解一下 axios 实例的属性和整体请求流程，这将有助于我们更轻松地阅读源码。

下面是 axios 实例属性的简图：

## axios 实例与请求流程

<Image src="/00other/axios1.png" alt="axios实例" />

axios 实例主要有三个核心属性：

- `config` 包括 url、method、params、headers 等配置。

- `interceptors` 拦截器，分为请求拦截器和返回拦截器。

- `request` 用于调用 xhr 或 http 请求的方法，参数是 config。

由于可以再次传入 `config` 调用 `request` 方法，但不能传入 `interceptors`，因此需要在 axios 上提前添加拦截器，无法临时添加。

以下是 axios 的请求流程图：

<Image src="/00other/axios2.png" alt="axios 的请求流程图" />

## 源码文件结构解析

axios 的源码都在 lib 文件夹下，最核心的内容在 core 文件夹里。

```js
lib
│  axios.js                     // 最终导出的文件
│  utils.js                     // 工具类
├─adapters                      // 适配器相关
│      adapters.js //适配器类
│      http.js                  // node请求
│      xhr.js                   // 浏览器请求
├─cancel                        // 取消功能相关
│      CanceledError.js         // 取消异常类
│      CancelToken.js           // 取消token类
│      isCancel.js              // 判断是否取消
├─core                          // 核心功能相关
│      Axios.js                 // axios类
│      AxiosError.js            // axios异常类
│      AxiosHeaders.js          // 请求头
│      buildFullPath.js         // 构造请求地址
│      dispatchRequest.js       // 发送请求方法
│      InterceptorManager.js    // 拦截器的类
│      mergeConfig.js           // 合并配置方法
│      settle.js                // 处理请求结果方法
│      transformData.js         // 数据转换执行方法
├─defaults                      // 默认配置
│      index.js                 // 默认请求参数配置
│      transitional.js          // 默认transitional配置
├─env                           // node环境没有FormData，
│  │  data.js
│  └─classes
│          FormData.js
├─helpers                       // 各种工具类方法，看名字就可以大概猜到作用（太长了进行省略...）
│      ...
└─platform                      // 为不同环境下准备的方法（太长了进行省略...）
       ...
```

## 源码文件阅读

### 入口文件 axios.js

该文件创建了 axios 实例并导出，因此我们通过 `import axios from 'axios'` 引入的即为该实例，无需再 new Axios({...})。

以下是 axios 实例创建的代码：

```js
// 核心方法，根据config 创建 axios 实例
function createInstance(defaultConfig) {
  // 创建 axios 实例
  const context = new Axios(defaultConfig)
  // 给Axios原型上的request方法绑定context为它的this
  // 这个instance就是我们最终使用的axios
  // 没想到吧，最开始的instance其实是个函数，
  // 所以我们才可以使用这个用法axios('/api/url')
  // 只不过后面给它扩展了很多东西
  const instance = bind(Axios.prototype.request, context)

  // 将Axios.prototype上的属性都绑定到instance上，
  // 这样它就拥有了简写的请求方法，比如axios.get(),axios.post()
  // 如果是函数，this绑定为context
  utils.extend(instance, Axios.prototype, context, { allOwnKeys: true })

  // 将context上的属性都绑定到instance上，
  // 这样它就拥有了拦截器属性，可以使用axios.interceptors.request.use()
  // 因为context上的函数的this本就指向context，所以第三个参数不需要再指定
  utils.extend(instance, context, null, { allOwnKeys: true })

  // 给instance增加create方法，可以通过create创建一个实例
  instance.create = function create(instanceConfig) {
    // 入参为拼接配置项，以instanceConfig为优先
    return createInstance(mergeConfig(defaultConfig, instanceConfig))
  }

  return instance
}

// 调用上面的方法，最终导出的是axios，
// 其实是Axios.prototype.request，并扩展了很多属性
const axios = createInstance(defaults)

// 继续给axios增加属性
// 这就说明如果自己通过const myAxios=axios.create({});
// 创建出来的实例就没有下面这些属性了
// 所以下面这些属性只能通过import axios from 'axios';
// axios.all()这样的方式来使用

axios.Axios = Axios

// Cancel相关
axios.CanceledError = CanceledError
axios.CancelToken = CancelToken
axios.isCancel = isCancel
axios.VERSION = VERSION
// 工具函数，将对象转为FormData
axios.toFormData = toFormData

// Axios通用异常类
axios.AxiosError = AxiosError

// Cancel异常类
axios.Cancel = axios.CanceledError

// Expose all/spread
// 工具函数
axios.all = function all(promises) {
  return Promise.all(promises)
}

// 工具函数,利用apply将数组参数改为单个传入的参数
axios.spread = spread

// 判断异常是否是AxiosError
axios.isAxiosError = isAxiosError

// 合并config对象方法
axios.mergeConfig = mergeConfig

axios.AxiosHeaders = AxiosHeaders

// 工具方法
axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing)

// 获取适配器：xhr 、http
axios.getAdapter = adapters.getAdapter

// 请求状态
axios.HttpStatusCode = HttpStatusCode

axios.default = axios

// 最终导出
export default axios
```

### Axios 类

Axios 类是 Axios 的核心方法，其中的 `request` 方法是最核心的请求方法。

以下是 Axios 类的核心代码：

```js
class Axios {
  // 可以看到Axios的构造函数相当简单
  // 仅仅是保存了我们传入的config,
  // 然后初始化空的拦截器对象
  constructor(instanceConfig) {
    // 所有的配置都设置再defaults上
    this.defaults = instanceConfig
    // 初始化空的拦截器对象，包含请求拦截器request和返回拦截器response
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }

  // request是Axios的核心方法
  // 所有的核心都在request方法里，
  // request方法接收两种参数：
  // 1.【直接传config对象】
  // 2.【传url和config对象】
  request(configOrUrl, config) {
    // 允许axios('example/url'[, config]) 这样使用
    if (typeof configOrUrl === 'string') {
      config = config || {}
      config.url = configOrUrl
    } else {
      config = configOrUrl || {}
    }

    // request会使用传入的配置merge默认配置
    // 所以即使只传了一个url，也会使用默认的Get方法
    config = mergeConfig(this.defaults, config)

    const { headers } = config

    // 默认get请求
    config.method = (config.method || this.defaults.method || 'get').toLowerCase()

    // 说明header可以直接设置
    // 也可以在common设置通用header,也可以为每种请求设置特定的header
    let contextHeaders = headers && utils.merge(headers.common, headers[config.method])

    headers &&
      utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], method => {
        delete headers[method]
      })

    // 优先使用headers下配置，再使用headers.common和headers[get,post]的配置
    config.headers = AxiosHeaders.concat(contextHeaders, headers)

    // 请求拦截器链
    const requestInterceptorChain = []
    // 记录是否使用同步的方式调用，我们配置拦截器的时候，默认是false，也就是异步
    let synchronousRequestInterceptors = true

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      // 如果配置了runWhen函数，那么会先执行runWhen，如果为true，才会添加该拦截器
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous
      // unshift说明后传入的请求拦截器先执行，一次放入两个，分别是fulfilled和rejected
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    // 响应拦截器链
    const responseInterceptorChain = []
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      // push说明先传入的响应拦截器先执行
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
    })

    let promise
    let i = 0
    let len

    // 默认是异步执行，也就是一个执行完再执行下一个
    if (!synchronousRequestInterceptors) {
      //dispatchRequest是真正的发送请求
      const chain = [dispatchRequest.bind(this), undefined]
      // 前面插入请求拦截器
      chain.unshift.apply(chain, requestInterceptorChain)
      // 后面插入响应拦截器
      chain.push.apply(chain, responseInterceptorChain)
      len = chain.length

      promise = Promise.resolve(config)
      // 依次执行
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++])
      }

      return promise
    }

    len = requestInterceptorChain.length

    let newConfig = config

    i = 0

    // 同步执行，请求拦截器
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++]
      const onRejected = requestInterceptorChain[i++]
      try {
        newConfig = onFulfilled(newConfig)
      } catch (error) {
        onRejected.call(this, error)
        break
      }
    }

    // 发起请求
    try {
      promise = dispatchRequest.call(this, newConfig)
    } catch (error) {
      return Promise.reject(error)
    }

    i = 0
    len = responseInterceptorChain.length

    // 返回有异常可以继续走下去
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++])
    }

    return promise
  }

  // 获取请求地址
  getUri(config) {
    config = mergeConfig(this.defaults, config)
    const fullPath = buildFullPath(config.baseURL, config.url)
    return buildURL(fullPath, config.params, config.paramsSerializer)
  }
}

// Provide aliases for supported request methods
// 给Axios原型注入四个请求方法，请求方法本质都是调用request方法
// 这四个都是不带请求体的
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(
      mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data,
      })
    )
  }
})

// 给Axios注入post,put,patch,postForm,putForm,patchForm方法
// 这几个方法都是带请求体的
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          headers: isForm
            ? {
                'Content-Type': 'multipart/form-data',
              }
            : {},
          url,
          data,
        })
      )
    }
  }

  Axios.prototype[method] = generateHTTPMethod()

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true)
})

export default Axios
```

### InterceptorManager 类

拦截器的管理者，可以添加、删除和清空拦截器。

以下是 `InterceptorManager` 类的代码：

```js
axios.interceptors.request.use({
  fulfilled: () => {},
  rejected: () => {},
})
```

可以看到我们给 use 传递的是一个对象，对象包含 `fulfilled` 函数和 `rejected` 函数。

接下来看源码：

```js
class InterceptorManager {
  // 构造函数只初始化了一个空的handlers数组
  // 拦截器就是放在这个数组里的
  constructor() {
    this.handlers = []
  }
  // 添加拦截器，返回索引，可以用索引来移除拦截器
  // 可以发现除了fulfilled和rejected，
  // 我们还可以设置synchronous和runWhen
  // runWhen函数用来动态控制是否使用该拦截器
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    })
    return this.handlers.length - 1
  }
  // 根据添加时返回的索引去删除拦截器
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }
  // 清空拦截器
  clear() {
    if (this.handlers) {
      this.handlers = []
    }
  }
  // 提供遍历拦截器快捷操作
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h)
      }
    })
  }
}

export default InterceptorManager
```

### dispatchRequest 发送请求

看完上面的代码，我们已经基本搞清楚了 axios 的整体流程：

组装 config -> 组装 header -> 调用请求拦截器 -> 发送实际请求 -> 调用返回拦截器。

但是我们还不知道 axios 具体是如何调用请求的，那么接下来就要看 `dispatchRequest` 代码

```js
// 暂且先记住，这个函数的作用就是用来判断请求是否被取消，
// 如果要的话，则直接抛出异常，
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config)
  }
}

// 发送请求核心函数
export default function dispatchRequest(config) {
  // 刚开始请求前判断一次是否取消
  throwIfCancellationRequested(config)

  config.headers = AxiosHeaders.from(config.headers)

  // 执行数据转换操作
  config.data = transformData.call(config, config.transformRequest)

  // 默认设置请求头的contentType为application/x-www-form-urlencoded
  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false)
  }

  // 获取适配器，如果是浏览器环境获取xhr，
  // 如果是Node环境，获取http
  // 适配器就是最终用来发送请求的东西
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter)

  // 请求是使用适配器执行config
  return adapter(config).then(
    function onAdapterResolution(response) {
      // 请求完之后判断是否要取消
      throwIfCancellationRequested(config)

      // 对返回结果进行转换
      response.data = transformData.call(config, config.transformResponse, response)

      // 设置返回头
      response.headers = AxiosHeaders.from(response.headers)

      return response
    },
    function onAdapterRejection(reason) {
      // 如果不是因为取消而报错
      if (!isCancel(reason)) {
        // 再次判断是否要取消，如果是会抛出异常
        throwIfCancellationRequested(config)

        // 处理正常错误的返回值
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          )
          reason.response.headers = AxiosHeaders.from(reason.response.headers)
        }
      }

      return Promise.reject(reason)
    }
  )
}
```

### adapter 请求适配器，此处以 xhr 请求适配器为例

dispatchRequest 的流程还是相对简单的，剩下的疑惑就是 adapter 干了些什么，让我们接着往下看吧！

```js
// 用于给上传和下载进度增加监听函数
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0
  const _speedometer = speedometer(50, 250)

  return e => {
    const loaded = e.loaded
    const total = e.lengthComputable ? e.total : undefined
    const progressBytes = loaded - bytesNotified
    const rate = _speedometer(progressBytes)
    const inRange = loaded <= total

    bytesNotified = loaded

    const data = {
      loaded,
      total,
      progress: total ? loaded / total : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e,
    }

    data[isDownloadStream ? 'download' : 'upload'] = true

    listener(data)
  }
}
```

该函数 progressEventReducer 用于生成一个处理进度事件的函数，传入参数为一个监听函数 listener 和一个布尔值 isDownloadStream。返回的函数接收一个进度事件对象 e 作为参数，对其进行处理并调用监听函数 listener，传递一个包含各种进度相关信息的对象作为参数。

具体处理过程如下：

初始化变量 bytesNotified 为 0，用于记录之前已通知的字节数。
创建一个 speedometer 实例，用于计算速度。
返回一个函数，该函数接收进度事件对象 e 作为参数。
从 e 中获取已加载的字节数 loaded 和总字节数 total。
计算本次通知的进度字节数 progressBytes。
使用 speedometer 实例计算速度 rate。
判断加载是否在范围内（即是否已加载小于或等于总字节数）。
更新 bytesNotified 为当前已加载的字节数 loaded。
创建一个包含各种进度信息的对象 data，包括已加载字节数、总字节数、加载进度、本次通知的进度字节数、速度、估计剩余时间和进度事件对象。
根据 isDownloadStream 的值，将 download 或 upload 属性设置为 true。
调用监听函数 listener，传递 data 对象作为参数。

```js
// 判断是否支持XMLHttpRequest
const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined'

// 适配器的请求参数是config
export default isXHRAdapterSupported &&
  function (config) {
    // 返回Promise
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      // 请求体
      let requestData = config.data
      // 请求头
      const requestHeaders = AxiosHeaders.from(config.headers).normalize()
      // 返回数据类型
      const responseType = config.responseType
      let onCanceled

      //
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled)
        }

        if (config.signal) {
          config.signal.removeEventListener('abort', onCanceled)
        }
      }
      // 自动帮我们设置contentType,
      // 这就是为什么我们使用的时候都不需要
      // 特别设置contentType的原因了
      if (utils.isFormData(requestData)) {
        if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
          // 浏览器环境让浏览器设置
          requestHeaders.setContentType(false)
        } else {
          requestHeaders.setContentType('multipart/form-data;', false)
        }
      }

      // 请求
      let request = new XMLHttpRequest()

      // 设置auth，帮我们转码好了
      if (config.auth) {
        const username = config.auth.username || ''
        const password = config.auth.password
          ? unescape(encodeURIComponent(config.auth.password))
          : ''
        requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password))
      }

      // 拼接完整URL路径
      const fullPath = buildFullPath(config.baseURL, config.url)

      // 开启请求
      request.open(
        config.method.toUpperCase(),
        buildURL(fullPath, config.params, config.paramsSerializer),
        true
      )

      // 设置超时时间
      request.timeout = config.timeout

      //
      function onloadend() {
        if (!request) {
          return
        }
        // 预准备返回体的内容
        const responseHeaders = AxiosHeaders.from(
          'getAllResponseHeaders' in request && request.getAllResponseHeaders()
        )
        const responseData =
          !responseType || responseType === 'text' || responseType === 'json'
            ? request.responseText
            : request.response
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request,
        }

        // 请求完之后判断请求是成功还是失败
        // 执行resolve和reject的操作
        settle(
          function _resolve(value) {
            resolve(value)
            done()
          },
          function _reject(err) {
            reject(err)
            done()
          },
          response
        )

        // 清除request
        request = null
      }

      if ('onloadend' in request) {
        // 设置onloadend
        request.onloadend = onloadend
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (
            request.status === 0 &&
            !(request.responseURL && request.responseURL.indexOf('file:') === 0)
          ) {
            return
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          // readystate之后再执行onloadend
          setTimeout(onloadend)
        }
      }

      // 处理浏览器请求取消事件
      request.onabort = function handleAbort() {
        if (!request) {
          return
        }
        reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request))
        request = null
      }

      // 处理低级的网络错误
      request.onerror = function handleError() {
        reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request))
        request = null
      }

      // 处理超时
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config.timeout
          ? 'timeout of ' + config.timeout + 'ms exceeded'
          : 'timeout exceeded'
        const transitional = config.transitional || transitionalDefaults
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage
        }
        reject(
          new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          )
        )

        request = null
      }

      // 添加 xsrf
      if (platform.isStandardBrowserEnv) {
        const xsrfValue =
          (config.withCredentials || isURLSameOrigin(fullPath)) &&
          config.xsrfCookieName &&
          cookies.read(config.xsrfCookieName)

        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue)
        }
      }

      // 无请求体的话就移除contentType
      requestData === undefined && requestHeaders.setContentType(null)

      // 添加headers
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val)
        })
      }

      // 添加withCredentials
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials
      }

      // 添加responseType
      if (responseType && responseType !== 'json') {
        request.responseType = config.responseType
      }

      // 增加下载过程的监听函数
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true))
      }

      // 增加上传过程的监听函数
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress))
      }

      // 请求过程中取消
      if (config.cancelToken || config.signal) {
        onCanceled = cancel => {
          if (!request) {
            return
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel)
          request.abort()
          request = null
        }

        config.cancelToken && config.cancelToken.subscribe(onCanceled)
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled)
        }
      }

      // 获取请求协议，比如https这样的
      const protocol = parseProtocol(fullPath)
      // 判断当前环境是否支持该协议
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(
          new AxiosError(
            'Unsupported protocol ' + protocol + ':',
            AxiosError.ERR_BAD_REQUEST,
            config
          )
        )
        return
      }

      // 发送请求
      request.send(requestData || null)
    })
  }
```

这段代码是一个封装了 XMLHttpRequest 的函数，用于发送网络请求。函数接受一个 config 对象作为参数，返回一个 Promise 对象。函数内部通过 XMLHttpRequest 对象实现了请求的发送和接收，并对请求的各个阶段进行了处理和设置，包括请求体、请求头、返回数据类型、超时时间、取消请求等。同时，函数还处理了网络请求过程中的各种异常情况，如请求被取消、网络错误、超时等，并通过 Promise 的 resolve 和 reject 函数返回请求的结果或错误。

创建 Promise: 函数首先返回一个新的 Promise 实例，内部定义了一个名为 dispatchXhrRequest 的回调函数，这个函数负责处理整个网络请求过程。

请求体与请求头: 根据 config.data 和 config.headers 设置请求体和请求头信息。这里使用了 AxiosHeaders.from()方法对 headers 进行标准化处理。

响应类型: 从 config.responseType 获取响应数据的预期类型（如 'text', 'json' 等）。

取消请求处理:

定义了一个 done 函数，在请求完成后取消相关的监听器，以避免内存泄漏。如果存在 config.cancelToken 或 config.signal（表明支持 abort API），则会相应地移除取消订阅或事件监听器。
自动设置 Content-Type: 检查请求体是否为 FormData 类型，如果是，则根据运行环境自动处理 Content-Type。

创建 XMLHttpRequest 实例: 使用 new XMLHttpRequest()创建一个 HTTP 请求实例。

设置请求参数:

设置认证信息（Basic Auth）。
拼接完整 URL 路径。
使用 request.open()方法打开请求，指定 HTTP 方法、URL 以及异步模式。
设置超时时间: 根据 config.timeout 设置请求的超时时间。

请求完成回调:

定义一个 onloadend 回调函数，当请求完成（无论成功还是失败）时执行。在此函数中解析响应头和响应数据，封装成包含状态码、状态文本、响应头、原始响应数据等信息的对象 response。
调用 settle 函数判断请求结果并调用 resolve 或 reject 来解决或拒绝 Promise。
错误处理:

对于请求取消、网络错误、超时等情况，分别定义对应的回调函数（如 handleAbort, handleError, handleTimeout），在这些异常情况下调用 reject 并传递错误信息。
添加额外信息:

添加跨站请求伪造保护（xsrf protection）的相关 header。
如果请求没有数据，则移除 Content-Type。
将所有配置好的请求头添加到 XMLHttpRequest 实例上。
其他配置项:

设置 withCredentials 属性以启用跨域资源共享（CORS）带凭证请求。
设置 responseType 属性以指定响应的数据类型。
如果提供了进度监听函数，就绑定到请求的下载或上传进度事件。
请求取消机制:

根据 config.cancelToken 或 config.signal 实现请求取消功能，并在取消时触发 reject。
协议检查:

检查请求协议是否受当前环境支持，如果不支持，则直接抛出错误。
发送请求: 最后，调用 request.send()方法发送请求，携带请求体数据。

## 参考

- [十分钟，带你深入了解 axios 源码实现](https://mp.weixin.qq.com/s/tDo3nIdppgtk558PSoxv2Q)——程序员Sunday

吐槽一下 - - 标题骗人，读代码，整理加上理解花了1个多小时。。。