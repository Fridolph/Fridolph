https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

## 概念和用法

Fetch 提供了对 Request 和 Response （以及其他与网络请求有关的）对象的通用定义。使之今后可以被使用到更多地应用场景中：无论是service workers、Cache API、又或者是其他处理请求和响应的方式，甚至是任何一种需要你自己在程序中生成响应的方式。

它还提供了一种定义，将 CORS 和 HTTP 原生的头信息结合起来，取代了原来那种分离的定义。

发送请求或者获取资源，需要使用 GlobalFetch.fetch 方法。它在很多接口中都被实现了，比如 Window 和 WorkerGlobalScope。所以在各种环境中都可以用这个方法获取到资源。

 fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 promise 对象，resolve 对应请求的 Response。你也可以传一个可选的第二个参数init（参见 Request）。

一旦 Response 被返回，就有一些方法可以使用了，比如定义内容或者处理方法（参见 Body）。

你也可以通过 Request() 和 Response() 的构造函数直接创建请求和响应，但是我们不建议这么做。他们应该被用于创建其他 API 的结果（比如，service workers 中的 FetchEvent.respondWith）。

## Fetch 接口

GlobalFetch
包含了fetch() 方法，用于获取资源。

Headers
相当于 response/request 的头信息，可以修改它，或者针对不同的结果做不同的操作。

Request
相当于一个资源请求。

Response
相当于请求的响应

## 进行fetch请求

Fetch API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

请注意，fetch规范与jQuery.ajax()主要有两种方式的不同，牢记：

* 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。

* 默认情况下，fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

### 支持的请求参数

fetch() 接受第二个可选参数，一个控制不同配置的init对象：

参考fetch()，查看所有可选的配置和更多描述

```js
postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

function postData(url, data) {
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // default
    credentials: 'same-origin', // 默认忽略  | include
    withCredentials: false, // default
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // default GET
    mode: 'cors', // same-origin
    redirect: 'follow',
    referrer: 'no-referrer' // 默认 client
  })
  .then(response => response.json()) // parses response to JSON
}
```

### 发送带凭据的请求

为了让浏览器发送包含凭据的请求（即时是跨域源），要将`credentials: 'include'`添加到传递给fetch()方法的init对象

```js
fetch(`https://example.com`, {
  credentials: 'include'
})
```

如果你只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加`credentials: same-origin'`。

要改为确保浏览器不在请求中包含凭据，请使用`credentials: 'omit'`。

### 上传JSON数据

```js
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error(error))
.then(res => console.log('Success: ', response))

```

### 上传文件

```js
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response))
```

### 检测请求是否成功

如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。类似以下代码：

```js
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
});
```

### 自定义请求对象

除了传给 fetch() 一个资源的地址，你还可以通过使用 Request() 构造函数来创建一个 request 对象，然后再作为参数传给 fetch()：

```js
var myHeaders = new Headers();

var myInit = { method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```

## Headers

使用 Headers 的接口，你可以通过 Headers() 构造函数来创建一个你自己的 headers 对象。一个 headers 对象是一个简单的多名值对

### Guard

由于 Headers 可以在 request 请求中被发送或者在 response 请求中被接收，并且规定了哪些参数是可写的，Headers 对象有一个特殊的 guard 属性。这个属性没有暴露给 Web，但是它影响到哪些内容可以在 Headers 对象中被操作。

## Response 对象
