# 3-2 数据绑定

- 关联页面数据和JS变量
- 数据的变化引起视图的变化
- 在 Page 的 data 声明变量
- 使用 mustache 语法（双大括号）包裹变量


```js [index.js]
Page({
  data: {
    name: 'fri',
    age: '18',
    isStudent: true,
    hobby: ['唱', '跳', 'Rap', '篮球']
  }
})
```

```html [index.wxml]
<view>{{ name }}</view>
<!-- 注：这里会变成 [object Object] -->
<view>{{ hobby }}</view>
<!-- 其他运算，表达式，三元运算符都和vue jsx 里差不多 -->
```

# 3-3 列表渲染

- 在标签的属性中使用 wx:for 对数据进行遍历和渲染
- 使用 wx:for 遍历的数据默认会在当前标签下生成 index 作为下标或对象的 key。生成 item 作为当前下标 (key) 对应的数据（value）
- 使用 wx:for-item 可以对 item 重新命名
- 使用 wx:for-index 可以对 index 重新命名

## 字符串遍历

```js [wxfor.js]
Page({
  data: {
    name: 'fridolph',
    age: 6,
    list: [
      { id: 1, name: 'fri', age: 18 },
      { id: 2, name: 'mk', age: 22 },
    ],
    friend: {
      name: 'luffy',
      age: 17
    }
  }
})
```

```html [wxfor.wxml]
<view wx:for="{{ name }}">
  {{ item }}
</view>
<view wx:for={{ name }}>
  {{ item }} - {{ index }}
</view>
<!-- 这里页面展示的是 f<br>r<br>i<br>d<br>o<br>l<br>p<br>h -->
<view wx:for="name">
  {{ item }}
</view>
<view wx:for={{ name }}>
  {{ item }} - {{ index }}
</view>
```

## 数字遍历

```html
<view wx:for={{ age }}>
  {{ item }}
</view>
<!-- 这里页面展示为 0<br>1<br>2<br>3<br>4<br>5 -->
```

## 数组渲染

```html
<view wx:for="{{ list }}">
  <!-- 注：如果是 数组，这里 item 会 变成 [object Object] -->
  <!-- {{ item }} - {{ index }}  -->

  序号：{{ index + 1 }}, 姓名：{{ item.name }}, 年龄：{{ item.age }}
</view>
```

## 对象的渲染

```html
<view wx:for="{{ friend }}">
  {{ item }} - {{ index }}
</view>
<!-- 这里展示为 -->
<!-- luffy - name -->
<!-- 17 - age -->
```

对于对象的遍历来说，item 就是 value（值），index 就是 key（属性）。

这样不容易理解，我们用下面的方式遍历对象：

```html
<view wx:for="{{ friend }}" wx:for-item="value" wx:for-index="key">
  {{ key }} - {{ value }}
</view>
<!-- 这样打印出来的结果为 -->
<!-- name - luffy -->
<!-- age - 17 -->
```

## 遍历嵌套渲染 - 九九乘法表

```html
<view wx:for="{{ 9 }}" wx:for-item="row">
  <view wx:for="{{ 9 }}" wx:for-item="col">
    {{ row + 1 }} * {{ col + 1 }} = {{ (row + 1) * (col + 1) }}
  </view>
</view>
```


# 3-4 列表的 key 详解

## wx:key 的概念

- 遍历数据时每条数据对应的唯一标识
- 可在数据更新时提高渲染效率（虚拟DOM，Diff算法）
- 若不标识对应的 Key 则会有 warning 提示
- 静态字符串或数字则可忽略警告或者使用 this（表征 item 本身）

## wx:key 的作用

- 参考vue，v-for的key；列表，或者表单动态添加的内容，若想保持自己的状态和标识，需要用 wx:key 来指定

# 3-5 条件渲染 与 hidden 属性的区别

- 通过 wx:if 、wx:elif 、wx:else 判断某个条件是否成立来决定是否渲染某个组件或元素的方法

```js [wxif.js]
Page({
  isLogin: true,
  status: 1,
  // 1 操作成功
  // 2 操作失败
  // 3 其他未知原因
  isShow: true
})
```

```html [wxif.wxml]
<!-- 因isLogin为true，所以页面展示的是个人中心 -->
<view wx:if="{{ isLogin }}">个人中心</view>
<view wx:else>登录注册</view>

<!-- 状态 -->
<view wx:if="{{ status === 1 }}">操作成功</view>
<view wx:elif="{{ status === 2 }}">操作失败</view>
<view wx:elif="{{ status === 3 }}">其他未知原因</view>
<view wx:else>未登录</view>

<!-- 使用 hidden 属性 -->
<!-- 类似于vue的 v-show  -->
<view hidden="{{ !isShow }}">
  通过 hidden 控制显示与隐藏
</view>
```

# 3-6 微信小程序中的组件

- 视图层的基本组成单元
- 自带一些功能与微信风格一致的样式
- 一个组件通常包括 "开始标签" 和 "结束标签"
- 通过"属性"来修饰行为和外观

# 组件可以看文档，这里我跳过了

# 3-18 template 的基本使用

- 在标签中定义代码片段，然后在不同地方调用
- 通过 name 声明模版的名称
- 通过 is 明确要使用的模版
- 通过 data 传递数据

## 定义模版和使用

- import 导入 template 里面的内容
- include 导入除了 template 之外的所有内容

```html [template.wxml]
<!-- 先声明 template -->
<!-- 通过 name 属性知道是哪个模版 -->
<template name="msg">
  <view>
    我是 template
  </view>
</template>

<!-- 声明后就可使用 template -->
<template is="msg" />
<!-- 这里的 msg 就是 name 属性声明的模版名称 -->
<!-- 页面展示为 -->
<!-- 我是 template -->
```

## 为模版传递数据

```js [template.js]
Page({
  data: {
    name: 'fridolph',
    friend: {
      name: 'luffy',
      age: 17
    }
  }
})
```

```html [template.wxml]
<!-- 声明模版 -->
<template name="friend" data="{{ friend }}">
  <view>--------------</view>
  <view>我是 {{ friend.name }}，今年 {{ friend.age }} 岁</view>
  <view>--------------</view>
</template>
<!-- 使用模版 -->
<!-- ps 如果不传 name 模版就只会渲染两行横线 -->
<template is="friend" data="{{ friend }}" />
```

## 创建和使用公共模版（组件形式）

```html [common/header.wxml]
<template name="header">
  <view class="layout-header">我是header</view>
</template>
```

```html [common/footer.wxml]
<template name="footer">
  <view class="layout-footer">我是footer</view>
</template>
```

### 引入外部的template

```html [pages/index.wxml]
<import src="../common/header" />
<import src="../common/footer" />

<template is="header" />
<!-- 在这里写其他内容 -->
  Main Content
<!-- --------------- -->
<template is="footer" />
```

# 3-19 include 导入的基本使用

导入除了 template 之外的所有内容。ps 就像拷贝到了 include 位置

```html [include.wxml]
<template name="tpl">
  <view>-------------</view>
  <view>我是 template</view>
  <view>-------------</view>
</template>

<view>
  我是 template 之外定义的内容，如果是 include 导入会拿到这部分
</view>
```

```html [page2.wxml]
<import src="../common/header" />
<import src="../common/footer" />

<template is="header" />

<include src="./include" />

<template is="footer" />
```

这里页面展示为：

我是header
-------------
我是 template
-------------
我是footer

# 3-20 组件的公共属性和属性的类型

## 组件的公共属性

- id 标识组件的唯一性
- class 声明组件的样式类
- style 声明组件的内联样式
- hidden 控制组件的显示与隐藏（类比v-show）
- data-* 声明自定义数据
- bind* / catch* 声明组件要绑定的事件和类型

## 属性的类型

- String 字符串
- Number 数字
- Boolean 布尔值
- Array 数组
- Object 对象
- EventHandler 事件处理函数
