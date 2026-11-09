# grid 布局

布局首推，兼容性好，效果佳

我自己写的居然用上了

## grid 和 flex

讲到布局，我们就会想到 flex 布局，甚至有人认为竟然有 flex 布局了，似乎没有必要去了解 Grid 布局。

但 flex 布局和 Grid 布局有实质的区别

- flex 布局是`一维`布局，Grid 布局是`二维`布局。
- flex 布局一次只能处理一个维度上的元素布局，一行或者一列。
- Grid 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。

> Grid 布局远比 flex 布局强大！

<script setup>
import Grid from './grid.vue'
</script>

<Grid />

::: code-group

```html
<div class="wrapper">
  <div class="one item">One</div>
  <div class="two item">Two</div>
  <div class="three item">Three</div>
  <div class="four item">Four</div>
  <div class="five item">Five</div>
  <div class="six item">Six</div>
  <div class="seven item">Seven</div>
  <div class="eight item">eight</div>
  <div class="nine item">Nine</div>
</div>
```

```css
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: 200px 100px;
  /*  只设置了两行，但实际的数量会超出两行，超出的行高会以 grid-auto-rows 算 */
  grid-template-rows: 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
.item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}
/* 设置 background-color 的省略了 */
```

:::

## 参考资料

- 最强大的 CSS 布局 —— Grid 布局 <https://juejin.cn/post/6854573220306255880>
