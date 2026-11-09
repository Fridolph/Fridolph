# 水平垂直居中的各种实现方式

> 在写这篇前，自己只能想起 4、5 种方式。刷了下掘金 …… 此刻的我只想吐槽一句，你们好卷啊！

<script setup>
import Absolute1 from './1-absolute+负margin.vue'
import Absolute2 from './2-absolute+margin-auto.vue'
import Absolute3 from './3-absolute+calc.vue'
import Absolute4 from './4-absolute+transform.vue'
import WritingMode from './5-writing-mode.vue'
import LineHeight from './6-line-height.vue'
import Table from './7-table.vue'
import TableCell from './8-table-cell.vue'
import Flex from './9-flex.vue'
import Grid from './10-grid.vue'
</script>

## 仅居中元素定宽高适用

### 1. absolute + 负 margin

<Absolute1 />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box size">123123</div>
  </div>
</div>
```

```css
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -60px;
}
```

:::

### 2. absolute + margin auto

<Absolute2 />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box size"></div>
  </div>
</div>
```

```css
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

:::

### 3. absolute + calc

<Absolute3 />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box size"></div>
  </div>
</div>
```

```css
.wp {
  position: relative;
}
.box {
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
}
```

:::

## 居中元素不定宽高适用

### 4. absolute + transform

<Absolute4 />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box"></div>
  </div>
</div>
```

```css
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

:::

### 5. writing-mode

不常用了解即可

<WritingMode />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="wp-inner">
      <div class="box">writing-mode</div>
    </div>
  </div>
</div>
```

```css
.wp {
  writing-mode: vertical-lr;
  text-align: center;
}
.wp-inner {
  writing-mode: horizontal-tb;
  display: inline-block;
  text-align: center;
  width: 100%;
}
.box {
  display: inline-block;
  margin: auto;
  text-align: left;
}
```

:::

### 6. lineheight

<LineHeight />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box">line-height</div>
  </div>
</div>
```

```css
.wp {
  line-height: 300px;
  text-align: center;
  font-size: 0px;
}
.box {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
}
```

:::

### 7. table

<Table />

::: code-group

```html
<div class="center-wrapper">
  <table>
    <tbody>
      <tr>
        <td class="wp">
          <div class="box">利用Table实现居中</div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.wp {
  text-align: center;
}
.box {
  display: inline-block;
}
```

:::

### 8. table-cell 

和 VitePress 的样式有冲突，这里就不贴了

### 9. flex

<Flex />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box">
      <div>display: flex;</div>
      <div>justify-content: center;</div>
      <div>align-items: center;</div>
    </div>
  </div>
</div>
```

```css
.wp {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

### 10. grid

<Grid />

::: code-group

```html
<div class="center-wrapper">
  <div class="wp">
    <div class="box">display: grid;</div>
    <div class="box">align-self: center;</div>
    <div class="box">justify-self: center;</div>
  </div>
</div>
```

```css
.wp {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

## 参考

- CSS 实现水平垂直居中的 10 种方式 <https://juejin.cn/post/6844903679242305544>
- 文章的 github demo <https://github.com/yanhaijing/vertical-center>
