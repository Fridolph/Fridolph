
## Vue style scoped

在vue组件中，为了使样式私有化（模块化），不对全局造成污染，可以在style标签上添加scoped属性以表示它的只属于当下的模块，这本是一个非常好的举措，但是为什么要慎用呢？

因为在我们需要修改公共组件（三方库或者项目定制的组件）的样式的时候，scoped往往会造成更多的困难，需要增加额外的复杂度。通过查看DOM结构发现：vue通过在DOM结构以及css样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的。具体的渲染结果是怎样的，通过一个例子来说明。

### 公共组件button组件

一个公共组件button，为了样式模块化，给其加上scoped属性，

```html
<template>
  <div class="button-warp">
    <button class="button">text</button>
  </div>
</template>

<style scoped>
  .button-warp{
    display:inline-block;
  }
  .button{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
  }
</style>
```

浏览器渲染button组件, button组件在浏览器渲染出的html部分和css部分分别为：

```html
<div data-v-2311c06a class="button-warp">
  <button data-v-2311c06a class="button">text</button>
</div>

<style>
.button-warp[data-v-2311c06a]{
  display:inline-block;
}
.button[data-v-2311c06a]{
  padding: 5px 10px;
  font-size: 12px;
  border-radus: 2px;
}
</style>
```

从上面的字可以看出，添加了scoped属性的组件，为了达到组件样式模块化，做了两个处理：

* 给HTML的DOM节点加一个不重复的data属性（如data-v-2311c06a）来表示唯一性
* 在css选择器末尾加一个当前组件的data属性选择器（如[data-v-2311c06a）来私有化样式

这样虽达到了模块化的目的，但也带来一个后果：每个样式的权重加重了。


### 其他组件引用 上面的button组件

上面分析了单个组件渲染后的结果,那么组件互相调用之后会出现什么样的结果呢？，具体分两种情况：模块一般组件引用模块私有组件（本质和模块私有组件引用模块一般组件一样）；模块私有组件引用模块私有组件。

举个例子：在组件content.vue中使用了button组件，那么content.vue组件是否添加scoped属性渲染出来的结果有什么区别呢？

```html
<!-- content.vue -->
<template>
  <div class="content">
    <p class="title"></p>
    <!-- v-button假设是上面定义的组件 -->
    <v-button></v-button>
  </div>
</template>

<style>
  .content{
    width: 1200px;
    margin: 0 auto;
  }
  .content .button{
    border-raduis: 5px;
  }
</style>
```

模块一般组件（未添加scoped）引用模块私有组件

如果style上没有加scoped属性，那么渲染出来html和css分别就是：

```html
<div class="content">
  <p class="title"></p>
  <!-- v-button假设是上面定义的组件 -->
  <div data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
  </div>
</div>

<!-- button.vue 渲染出来的css -->
<style>
  .button-warp[data-v-2311c06a]{
    display:inline-block;
  }
  .button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
  }
  /*content.vue渲染出来的css*/
  .content{
    width: 1200px;
    margin: 0 auto;
  }
  .content .button{
    border-raduis: 5px;
  }
</style>
```

可以看出，虽然在content组件中，修改了button的border-raduis属性，但是由于权重关系，生效的依然是组件内部的样式（此时是外部的样式被覆盖）。所以如果要达到修改样式的目的，就必须加重我们要修改样式的权重（增加选择器层级，ID选择器，并列选择器，impotant等）

### 模块私有组件（添加scoped）引用模块私有组件

如果加了scoped属性呢？按照开始分析出来的规则（事实也是这样）：

1. 在所有的DOM节点加上data属性
2. 在css选择器尾部加上data属性选择器

那么渲染出来html和css分别就是：

```html
<div data-v-57bc25a0 class="content">
  <p data-v-57bc25a0 class="title"></p>
  <!-- v-button假设是上面定义的组件 -->
  <div data-v-57bc25a0 data-v-2311c06a class="button-warp">
    <button data-v-2311c06a class="button">text</button>
  </div>
</div>

<style>
  /*button.vue渲染出来的css*/
  .button-warp[data-v-2311c06a]{
    display:inline-block;
  }
  .button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
  }
  /*content.vue渲染出来的css*/
  .content[data-v-57bc25a0]{
    width: 1200px;
    margin: 0 auto;
  }
  .content .button[data-v-57bc25a0]{
    border-raduis: 5px;
  }
</style>
```

虽然我们在content添加了想要修改button组件的样式的代码，但是仔细看，由于.content .button这句在末尾加的是content组件的scoped标记，最后这句其实根本作用不到我们想要的DOM节点上，所以这种情况我们在content内部写的任何样式都不会影响到button.vue组件，所以这就尴尬了。

这也就是我们用element、iview等框架时我们直接在scoped样式里该某些框架的 class名修改样式不生效，也正是这样的原因。

当然这个问题也是可以解决的，就是直接加全局样式可以修改到，但这势必会影响全部地方的组件；所以需要另外一种方法在content.vue组件内再加一个不带scoped属性的style标签，也就意味着要加两个style，一个用于私有样式，一个用于共有样式。这肯定是有点shit的，并且这两种解决方案都回避不了一个问题：权重！

```html
//content.vue
<template>
  <div class="content">
    <p class="title"></p>
    <!-- v-button假设是上面定义的组件 -->
    <v-button></v-button>
  </div>
</template>

<style scoped>
  .content{
    width: 1200px;
    margin: 0 auto;
  }
</style>

<style>
  .content .button{
    border-raduis: 5px;
  }
</style>
```

### 总结下scoped的渲染规则

* 给HTML的DOM节点加一个不重复的data属性，来表示唯一性
* 在每句css选择器末尾（编译后的css语句）加一个当前组件的data属性选择器来私有化样式
* 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性

**解决方案**

* 引用第三方库，若使用scoped，需在全局style中修改样式
* 自己维护的组件，想清除样式是否满足所有情况

> 注：scoped设计的初衷就是不能让当前组件的样式修改其他任何地方的样式。所以我们在书写时应尽可能完全

## CSS Module

原理与scoped相似，但差异还是挺大的。我们来看下面的例子：

```html
<template>
  <div :class="$style.cssModule"></div>
</template>

<script>
export default {
  computed: {
    $style() {
      return {
        cssModule: ''
      }
    }
  }
}
</script>

<style module>
  .css-module {
    background: bluesky;
  }
</style>
```

首先在 style 标签加一个 module标识，表示使用css module，更多配置下面会介绍。

使用了css module相当于在 computed中添加了 一个 $style属性。在该文件的作用域下 this.$style 是能够访问到的。这样的好处是避免了命名空间的污染，在生产环境中还可定义class名称，可谓终极压缩。

我们还是来看看例子吧：

```html
<template>
  <header class="main-header">
    <h1 class="title">Todo List</h1>
  </header>
</template>

<style scoped>
.main-header {
  text-align: center
}
.title {
  font-size: 40px
  color: rgba(180,199,238,0.9)
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0,0,0,0.3)
  font-weight: 100
  margin: 20px  
}
</style>
``

scoped编译后

```html
<header data-v-688b5a46 data-v-bced26ea class="main-header">
  <h1 data-v-688b5a46>Todo List</h1>
</header>

<style>
.main-header[data-v-688b5a46] {
  text-align: center;
}
.main-header .title[data-v-688b5a46] {
  font-size: 40px;
  color: rgba(180,199,238,0.9);
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0,0,0,0.3);
  font-weight: 100;
  margin: 20px;
}
</style>
```

使用css module

<template>
  <header :class="$style.mainHeader">
    <h1 :class="$style.title">Todo List</h1>
  </header>
</template>

<style module>
.main-header {
  text-align: center
}
.title {
  font-size: 40px
  color: rgba(180,199,238,0.9)
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0,0,0,0.3)
  font-weight: 100
  margin: 20px  
}
</style>
``

编译后

```html
<header data-v-bced26ea= class="header-2SMy_0">
  <h1 class="header-1Wjx_0">Todo List</h1>
</header>

<style>
.header-2SMy_0 {
  text-align: center;
}
.header-2SMy_0 .header-1Wjx_0 {
  font-size: 40px;
  color: rgba(180,199,238,0.9);
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0,0,0,0.3);
  font-weight: 100;
  margin: 20px;
}
</style>
```

这样一对比，其实还是挺直观的，CSS Module没有增加选择器权重，只是在后面跟了我们配置的hash值。

### 总结下scoped的渲染规则

* 给HTML的DOM节点加一个不重复的data属性，来表示唯一性
* 在每句css选择器末尾（编译后的css语句）加一个当前组件的data属性选择器来私有化样式
* 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性
