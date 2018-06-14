* 基于H5 History的前端路由实现

## HTML5新路由方案

我们可以直接在浏览器中查询History API的属性和方法

也可以查询MDN文档  https://developer.mozilla.org/zh-CN/docs/Web/API/History

* history.back() 后退
* history.forward() 前进
* history.go(-3) 后退3个页面， 正数就前进

### history.pushState

用于在浏览器历史中添加历史记录，但是并不触发跳转，此方法接受三个参数，依次为：

1. state 一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。若不需要该对象，可填null
2. title 新页面的标题，目前忽略，填null
3. url 新的网址，必须与当前页面处同域，浏览器地址栏会显示该网址

### history.replaceState

和pushState一样，区别是它修改浏览器历史中当前记录，而非添加记录，同样不触发跳转

### popState事件

每当同一个文档的浏览器历史（即history对象）出现变化时，就会触发popState事件。需注意，仅仅调用pushState方法或replaceState方法，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者JS调用back、forward、go方法时才会触发。

另外，该事件只针对同一文档，如果浏览历史切换，导致加载不同文档，该事件也不会触发

## 新标准下，history路由的实现

```js
class Routes {
  constructor() {
    this.routes = {}
    // 在初始化时监听popState事件
    this._bindPopState()
  }

  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path)
    this.routes[path] && this.routes[path]()
  }

  // 将路径和对应回调函数加入hashMap存储
  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path)
    this.routes[path] && this.routes[path]()
  }

  // 监听popState事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    })
  }
}
```
