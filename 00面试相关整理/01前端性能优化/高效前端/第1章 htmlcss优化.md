## 1.能用html/css解决的问题，不要用js

1. hover

2. 自定义radio/checkbox样式
  checked

3. 多列等高

## 2.优化html标签

1. 文字 选择性用 p 段落 span 文字
2. 表单 原生表单好处多
3. html5 input 
4. 其他
  * 表强调 em strong 
  * 图片 alt
  * 输入 input textarea
  * 链接 a 跳转
  * 按钮 button 活用伪类 :disabled :active 
5. 语义化标签

## 3.用css画三角

原理

```css
.triangle {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #666;
}
```

套两个小三角，一实心，一空，就成了标签的小三角

## 4.尽可能地使用伪元素

* 清除浮动
* 辅助视觉效果
* 伪类content计数等