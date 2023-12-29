# 全局API

## Vue.extend(options)

参数: {Object} options

用法：使用基础Vue构造器，创建一个“子类”。参数是一个包含组件选项的对象。 
data选项是特例，需要注意 - 在 `Vue.extend()` 中它必须是函数

```html
<div id="mount-point"></div>
<script>
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function() {
    return {
      firstName: 'fri',
      lastName: 'yk',
      alias: 'friends'
    }
  }
})
// 创建Profile实例，并挂在到一个元素上
new Profile().$mount('#mount-point')

// 结果如下：
<p>Walter White aka Heisenberg</p>
</script>
```

## Vue.nextTick( [callback, context] )

参数：
* { Function } [callback]
* { Object } [context]

用法：
在下次DOM更新循环结束之后执行延迟回调。 在修改数据之后立即使用这个方法，获取更新后的DOM

```js
// 修改数据
vm.msg = 'Hello'
// DOM还未更新
Vue.nextTick(function() {
  // DOM更新了
})
```

> 2.1.0起新增：如果没有提供回调且在支持Promise的环境中，则返回一个Promise。

## Vue.set(target, key, value)

参数：
{Object | Array} target
{string | number} key
{any} value

返回值：设置的值

用法：设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开Vue不能检测属性被添加的限制。

> 注意对象不能是Vue实例，或者Vue实例的根数据对象

## Vue.delete(target, key)

参数：
{Object | Array} target
{string | number} key/index

用法：
删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开Vue不能检测到属性被删除的限制

> 注意对象不能是一个Vue实例或Vue实例的根数据对象

## Vue.directive(id, [definition])

参数：
{string} id
{Function | Object} [definition]

用法：注册或获取全局指令

```js
// 注册
Vue.directive('my-directive', {
  bind: function() {},
  inserted: function() {},
  update: function() {},
  componentUpdated: function() {},
  unbind: function() {}
})
// 注册（指令函数）
Vue.directive('my-directive', function() {
  // 这里将会被`bind`和`update`调用
})
// getter 返回已注册的指令
var myDirective = Vue.directive('my-directive')
```

## Vue.filter(id, [definition])

参数：
{string} id
{Function} [definition]

用法：注册或获取全局过滤器

```js
Vue.filter('my-filter', function(value) {
  // 返回处理后的值
})
// getter 返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

## Vue.component(id, [definition])

参数: 
{string} id
{Function | Object} [definition]

用法：注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
```js
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend(/**/))

// 注册组件，传入一个选项对象（自动调用 Vue.extend ）
Vue.component('my-component', {/**/})

// 获取注册的组件（始终返回构造器）
var myComponent = Vue.compnent('my-component')
```

## Vue.use(plugin)

参数：
{Object | Function} plugin

用法：安装Vue.js插件。如果插件是一个对象，必须提供install方法。如果插件是一个函数，它会被作为install方法。install方法将被作为Vue的参数调用。`当install方法被同一个插件多次调用，插件将只会被安装一次`

## Vue.mixin(mixin)

参数：
{Object} mixin

用法：全局注册一个混合，影响注册之后所有创建的每个Vue实例。插件作者可以混合使用，向组件注入自定义的行为。**不推荐在应用代码中使用**

```js
// 为自定义的选项 myOption 注入一个处理器
Vue.mixin({
  created: function() {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'Hello'
})
// -> Hello
```

> 谨慎使用全局混合对象，因为会影响到每个单独创建的Vue示例（包括第三方模版）大多数情况下，只应当应用于自定义选项，就像上面的示例一样。也可以将其用作Plugins以避免产生重复应用

## Vue.compile(template)

参数：
{string} template

用法：在render函数中编译模版字符串。**只在独立构建时有效**

```js
var res = Vue.compile('<div>{{msg}}</div>')
new Vue({
  data: {
    msg: 'Hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

## Vue.version

细节：提供字符串形式的Vue安装版本号。

