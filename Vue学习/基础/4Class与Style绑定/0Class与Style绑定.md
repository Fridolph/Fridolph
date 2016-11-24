### 绑定HTMLClass

数据绑定一个常见需要是操作元素的class列表和它的内联样式。
因为它们都是属性，我们可以用v-bind处理它们： 只需要计算出表达式最终的字符串，不过，字符串拼接麻烦又易错。
因此，在 v-bind 用于 class 和 style 时，Vue.js专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。

#### 对象语法

我们可以传给 v-bind:class 一个对象，以动态地切换class

<div v-bind:class="{ active: isActive }"></div>

上面的语法表示class active的更新将取决于数据属性 isActive是否为真值.

我们也可以在对象中传入更多属性用来动态切换多个class。
此外，v-bind:class 指令可以与普通的class属性共存，如下：

<div class="static"
  v-bind:class="{
    active: isActive,
    'text-danger'
  }"
>
</div>

如下data: 

data: {
  isActive: true,
  hasError: false
}

渲染为:

<div class="static active"></div>

当 isActive 或者 hasError 变化时，class列表将相应地更新。例如，如果hasError的值为true, class列表将变为 "static active text-danger"

你也可以直接绑定数据里的一个对象：

<div v-bind:class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}

渲染的结果和上面一样。我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式：

<div v-bind:class="classObject"></div>

data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function() {
    return (
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'false'
    )
  }
}

#### 数组语法

我们可以把一个数组传给 v-bind:class, 以应用一个class列表：

<div v-bind:class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

渲染为：

<div class="active text-denger"></div>

如果你也想根据条件切换列表中的class，可以用三元表达式：

<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

此例始终添加 errorClass, 但只有在 isActive是 true时添加activeClass

不过，当有多个条件class时这样写有些繁琐，可以在数组语法中使用对象语法：

<div v-bind:class="[{ active: isActive }, errorClass]"></div>

### 绑定内联样式

#### 对象语法

v-bind:style 的对象语法十分美观 —— 看着十分像css, 其实它是一个JavaScript对象。
CSS属性名可以用驼峰式 CamelCase 或 段莪会短横分隔命名 kebab-case

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}

直接绑定到一个样式对象通常更好，让模版更清晰：

<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

同样的，对象语法常常结合返回对象的计算属性使用。


#### 数组语法

v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：

<div v-bind:style="[baseStyles, overridingStyles]"></div>

#### 自动添加前缀

当 v-bind:style 使用需要特定前缀的CSS时许in个时，如 transform ，Vue.js会自动侦测并添加相应的前缀。