# 移动开发相关场景

## H5 如何解决移动端适配问题

让网页在不同的移动设备上显示效果一致，需要用到移动端适配。可参考以下方案：

::: details

1. 使用 viewport 标签

通过设置 viewport 标签的 meta 属性，来控制页面的缩放比例和宽度，以适配不同设备

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>
```

2. 通过 CSS3 媒体查询

根据不同设备宽度设置不同的样式，以适配不同的设备

3. flexible 布局方案，将 px 转为 rem 单位，并且动态计算根节点字体大小，以适配不同的设备

4. 同上，要求兼容性；将 px 转为 vw/vh 单位，以适配不同的设备

:::

## 实现一键换肤的方式有哪些？

### 1. 简单换肤方案 - CSS

::: details

1. CSS 变量

通过定义一些变量来控制字体，颜色，布局等，然后在切换主题时动态修改这些变量的值

```vue
<style scoped>
--el-border-color: #eee;
--el-color-primary: red;

.v-header {
  border-bottom: 1px solid var(--el-border-color);
  .logo {
    color: var(--el-color-primary);
  }
}
</style>
```

修改 CSS 变量，在我们需要更换主题样式时，只需动态修改 CSS 变量即可

```js
document.documentElement.style.setProperty('--el-border-color', '#ddd')
document.documentElement.style.setProperty('--el-color-primary', 'blue')
```

- 建立配色方案的 CSS 变量

单个属性还好，但属性多这样操作比较麻烦。那 dark 模式的切换是怎么做的呢？

可通过 html 标签 .dark 类名，来切换配色方案。同事新建一份属于 dark 的 CSS 变量 ，同理只需不同的主题设置不同变量，动态修改 class 即可简单实现：

```js
document.getElementByTagName('html')[0].className = theme
// 或者设置 html 的 data-theme 属性
```

在 assets/css 中新建 theme.css

```css
.dark {
  --el-color-primary: #ff2551;
}

.light {
  --el-color-primary: #f47983;
}

.other {
  --el-color-primary: #333;
}
```

也可以使用 CSS 类来做切换：

- 为每个主题创建不同的 CSS 类
- 手动切换 CSS 类
- 主题持久化：pinia 加 persist，或者使用 localStorage 记录当前的主题
- 使用媒体查询自动应用 prefers-color-scheme

:::

### 2. 个性化自定义

::: details

思路类似，用户可以自己定义 color，menu，border 等一些常用值，然后保存为自己的主题方案。核心就是修改单个 css 变量

```js
document.documentElement.style.setProperty('--el-color-primary', 'red')
```

获取初始化时的 CSS 变量，用于显示调色板的初始值

```js
const currentCss = getComputedStyle(document.querySelector('html') as Element)

let colors = reactive({
  primary: { label: '主要颜色', value: '', key: '--el-color-primary' },
  info: { label: '次要颜色', value: '', key: '--el-color-info' },
  warning: { label: '警告颜色', value: '', key: '--el-color-warning' },
  danger: { label: '危险颜色', value: '', key: '--el-color-danger' },
  bg: { label: '背景颜色', value: '', key: '--el-bg-color' }
})
```

第二种加上以后，和第一种产生了一些冲突——当我修改了自定义配色，再去选择配色方案的时候，颜色不会变成配色方案的色值 ，因为它们都是全局的 CSS Vars。

利用 CSS 的优先级，我们把第一种方案的 CSS 代码稍微改下，增加#app 的限制，这样配色方案的优先级会高于自定义配色。

```css
.blue #app {
  --el-color-primary: #0052d9;
}
```

当我们选择了自定义配色后，把 html 上的 className 改为空 ''，去除配色方案的影响。

两种方案并行的处理逻辑大体如此

:::

### 3. 修改布局

核心思路是 选择不同的布局，从而来渲染不同的布局模版，达到换皮的效果。这里就不具体展开了

### 4. tailwindcss

本质上就是第二种的综合应用了。

## 移动端如何实现上拉加载，下拉刷新

1. 使用第三方库 iScroll BetterScroll Ant 等

2. 自定义实现 - 使用原生事件 touchstart、touchmove、touchend 和 scroll 等检测用户手势和滚动行为，根据这些事件触发相应加载和刷新逻辑

## 如何判断 DOM 元素是否在可视区域内

1. getBoundingCilentRect()

该方法返回元素大小及其相对于视口的位置

2. IntersectionObserver API

该 API 可以观察元素与其祖先元素或视口交叉的情况，并且可以设置回调函数，当元素的可见性发生变化时会调用该回调函数
