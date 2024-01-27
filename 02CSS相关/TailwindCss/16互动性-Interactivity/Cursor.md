# cursor

cursor CSS 属性设置光标的类型（如果有），在鼠标指针悬停在元素上时显示相应样式。

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor>

## 取值

- General
  - auto 浏览器根据当前内容决定指针样式，例如当内容是文字时使用 text 样式
  - default 默认指针，通常是箭头。
  - none 无指针被渲染（慎用）
- 链接及状态
  - pointer 悬浮于连接上时，通常为手
  - progress 程序后台繁忙，用户仍可交互 (与 wait 相反).
  - wait 程序繁忙，用户不可交互
- 选择
  - cell 指示单元格可被选中
  - crosshair 交叉指针，通常指示位图中的框选
  - text 指示文字可被选中
  - vertical-text 指示垂直文字可被选中
- 拖拽
  - alias 复制或快捷方式将要被创建
  - copy 指示可复制
  - move 被悬浮的物体可被移动
  - no-drop 当前位置不能扔下（同 not-allowed）
  - grab 可抓取
  - grabbing 抓取中
- 缩放
  - zoom-in 指示可被放大
  - zoom-out 指示可被缩小
- 重设大小及滚动
  - 太偏门且多就不贴上来了，感兴趣自行看文档

# Cursor

<https://www.tailwindcss.cn/docs/cursor>

| Class                | Properties             |
| -------------------- | ---------------------- |
| cursor-auto          | cursor: auto;          |
| cursor-default       | cursor: default;       |
| cursor-pointer       | cursor: pointer;       |
| cursor-wait          | cursor: wait;          |
| cursor-text          | cursor: text;          |
| cursor-move          | cursor: move;          |
| cursor-help          | cursor: help;          |
| cursor-not-allowed   | cursor: not-allowed;   |
| cursor-none          | cursor: none;          |
| cursor-context-menu  | cursor: context-menu;  |
| cursor-progress      | cursor: progress;      |
| cursor-cell          | cursor: cell;          |
| cursor-crosshair     | cursor: crosshair;     |
| cursor-vertical-text | cursor: vertical-text; |
| cursor-alias         | cursor: alias;         |
| cursor-copy          | cursor: copy;          |
| cursor-no-drop       | cursor: no-drop;       |
| cursor-grab          | cursor: grab;          |
| cursor-grabbing      | cursor: grabbing;      |
| cursor-all-scroll    | cursor: all-scroll;    |
| cursor-col-resize    | cursor: col-resize;    |
| cursor-row-resize    | cursor: row-resize;    |
| cursor-n-resize      | cursor: n-resize;      |
| cursor-e-resize      | cursor: e-resize;      |
| cursor-s-resize      | cursor: s-resize;      |
| cursor-w-resize      | cursor: w-resize;      |
| cursor-ne-resize     | cursor: ne-resize;     |
| cursor-nw-resize     | cursor: nw-resize;     |
| cursor-se-resize     | cursor: se-resize;     |
| cursor-sw-resize     | cursor: sw-resize;     |
| cursor-ew-resize     | cursor: ew-resize;     |
| cursor-ns-resize     | cursor: ns-resize;     |
| cursor-nesw-resize   | cursor: nesw-resize;   |
| cursor-nwse-resize   | cursor: nwse-resize;   |
| cursor-zoom-in       | cursor: zoom-in;       |
| cursor-zoom-out      | cursor: zoom-out;      |
