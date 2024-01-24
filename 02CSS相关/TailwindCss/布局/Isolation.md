# isolation

isolation CSS 属性定义该元素是否必须创建一个新的层叠上下文（stacking context）。

该属性的主要作用是当和 background-blend-mode 属性一起使用时，可以只混合一个指定元素栈的背景：它允许使一组元素从它们后面的背景中独立出来，只混合这组元素的背景。

## 语法

```css
isolation: auto;
isolation: isolate;

isolation: initial;
isolation: inherit;
isolation: unset;
```

- auto 该关键字定义只有在该元素的属性需要的时候才会创建一个新的元素栈环境

- isolate 该关键字定义一个新的元素栈环境会被创建

> 吐槽 - - 好多些的 css 基本没怎么用过。看了例子感觉用得也少，这里就码一遍有个概念吧

## 用法


| Class          | Properties         |
| -------------- | ------------------ |
| isolate        | isolation:isolate; |
| isolation-auto | isolation: auto;   |
