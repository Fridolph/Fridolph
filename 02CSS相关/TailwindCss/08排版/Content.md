# content

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/content>

CSS 的 content CSS 属性用于在元素的 ::before 和 ::after 伪元素中插入内容。使用 content 属性插入的内容都是匿名的可替换元素。

# Content

## 用法

| Class        | Properties     |
| ------------ | -------------- |
| content-none | content: none; |

### 引用属性值

这些内容实用程序甚至支持诸如 attr（）函数之类的 CSS 功能，您可以使用它来引用存储在属性中的值：

```html
<div before="Hello World" class="before:content-[attr(before)]">
  <!-- ... -->
</div>
```

### 使用空格和下划线

由于空格在 HTML 中表示类的结尾，因此用下划线替换任意值中的任何空格：

```html
<div class="before:content-['Hello_World']">
  <!-- ... -->
</div>
```
