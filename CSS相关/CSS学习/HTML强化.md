## 常见元素

meta
title
style
link
script
base

不会在页面中留下直接内容

div 
section article aside header footer (明确含义的区域)
p 段落
span em strong 文字
table thead tbody tr td 表格
ul ol li dl dt dd 列表
a 链接
form input select textarea button 表单

## 重要属性

a[href, target]
img[src, alt]
table td[colspan, rowspan]
form[target, method, enctype]
input[type, value]
button[type]
select > option[value]
label[for]

## 如何理解HTML

HTML“文档”
描述文档的“结构”
有区块和大纲

h5o - HTML5 Outliner

## HTML5新增内容

表单增强
日期、时间、搜索
表单验证
placeholder自动聚焦

新增语义
header footer 头尾
section article 区域
nav 导航
aside 不重要内容
em strong 强调

## HTML元素

分类：
块级
行内
inline-block

嵌套关系：
块级元素可以包含行内元素
块级元素不一定能够包含块级元素
行内元素一般不能包含块级元素

---

1. doctype的意义是什么
让浏览器以标准模式渲染
让浏览器知道元素的合法性

2. HTML XHTML HTML5的关系
HTML属于SGML
XHTML属于XML，是HTML进行XML严格化的结果
HTML5不属于SGML或XML，比XHTML宽松

3. HTML5有什么变化
新的语义化元素
表单增强
新的API
离线 Aplication-cache Service-worker
音视频 Audio Video
图形 Canvas SVG
实时通信 Websocket
本地存储 localStorage indexDB
设备能力 陀螺仪 地址
分类和嵌套变更

4. em和i有什么区别
em是语义化的标签，表强调
i是纯样式标签，表斜体 - HTML中i不推荐使用，一般用作图标

5. HTML语义化的意义是什么
开发者容易理解
机器容易理解结构 搜索、读屏软件
有助于SEO

6. 可自闭合元素？
表单元素input
图片img
br hr
meta link

7. HTML和DOM的关系
DOM是由HTML解析而来
JS可以维护DOM

8. property和attribute的区别
attribute 是元素属性
property 是元素特性