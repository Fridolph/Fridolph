# user-select

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select>

user-select CSS 属性用于控制用户是否可以选择文本。这不会对作为浏览器用户界面（即 chrome）的一部分的内容加载产生任何影响，除非是在文本框中。

> 备注： user-select 不是继承属性，即使默认的属性值 auto 的表现基本上以继承为主，似乎是继承属性。甚至，WebKit/基于 Chromium 的浏览器在实现此属性时将其作为继承属性，但这和有关规范是相悖的，且会带来一些问题。目前，Chromium 暂时选择修复将其作为继承属性所带来的问题，使最终表现符合规范。

- auto 的具体取值取决于一系列条件，具体如下：
  - 在 ::before 和 ::after 伪元素上，采用的属性值是 none
  - 如果元素是可编辑元素，则采用的属性值是 contain
  - 否则，如果此元素的父元素的 user-select 采用的属性值为 all，则该元素采用的属性值也为 all
  - 否则，如果此元素的父元素的 user-select 采用的属性值为 none，则该元素采用的属性值也为 none
  - 否则，采用的属性值为 text
- text 用户可以选择文本。
- all 在一个 HTML 编辑器中，当双击子元素或者上下文时，那么包含该子元素的最顶层元素也会被选中。
- contain 允许在元素内选择；但是，选区将被限制在该元素的边界之内。

## User Select

| Class       | Properties         |
| ----------- | ------------------ |
| select-none | user-select: none; |
| select-text | user-select: text; |
| select-all  | user-select: all;  |
| select-auto | user-select: auto; |
