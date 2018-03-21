## JSX

### JSX 语法、JSX 解析成 JS

```jsx
var profile = (
  <div>
    <img src="avatar.png" className="profile" />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>
)
// 解析结果
var profile = React.createElement(
  'div',
  null,
  React.createElement('img', { src: 'avatar.png', className: 'profile' }),
  React.createElement('h3', null, [user.firstName, user.lastName].join(' '))
)
```

### JSX 解析

* JSX 其实是语法糖
* 开发环境会将 JSX 编译成 JS 代码
* JSX 的写法大大降低了学习成本和编码工作量
* 同时，JSX 也会增加 debug 成本

### 独立的标准

* JSX 是 React 引入的，但不是 React 独有的
* React 已经将它作为独立标准开放，其他项目也可使用
* React.createElement 是可以自定义修改的
* 说明：本身功能已完备，和其他标准兼容和扩展没问题

## JSX 和 Vdom 的关系

vdom是React初次推广开的，结合JSX

###　自定义组件的解析

* div 直接渲染 `<div>` 即可，vdom可以做到
* 自定义组件定义时必须声明render函数
* 根据props初始化实例，然后执行实例的render函数
* render函数返回的还是vnode对象