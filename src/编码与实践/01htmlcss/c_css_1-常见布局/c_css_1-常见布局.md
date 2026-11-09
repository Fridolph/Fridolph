# 常见布局

传统布局为了展示就用 `float` `定位` 来实现了。

如果不考虑兼容性，现在更推荐用 `flex` 和 `grid` 

<script setup>
import Grail from './圣杯布局.vue'
import DoubleWings from './双飞翼布局.vue'
</script>

## 圣杯布局

<Grail />

::: code-group
```html
<div class="demo-wrapper">
  <div id="header">this is header</div>
  <div id="container" class="clearfix">
      <div id="center" class="column">this is center</div>
      <div id="left" class="column">this is left</div>
      <div id="right" class="column">this is right</div>
  </div>
  <div id="footer">this is footer</div>
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
  margin-left: -50px;
  margin-top: -50px;
}
```
:::


## 双飞翼布局

<DoubleWings />

::: code-group
```html
<div id="main" class="col">
  <div id="main-wrap">
      this is main
  </div>
</div>
<div id="left" class="col">
  this is left
</div>
<div id="right" class="col">
  this is right
</div>
```

```css
.col {
  float: left;
}

#main {
  width: 100%;
  height: 200px;
  background-color: #ccc;
}
#main-wrap {
  margin: 0 190px 0 190px;
}

#left {
  width: 190px;
  height: 200px;
  background-color: #0000FF;
  margin-left: -100%;
}
#right {
  width: 190px;
  height: 200px;
  background-color: #FF0000;
  margin-left: -190px;
}
```
:::
