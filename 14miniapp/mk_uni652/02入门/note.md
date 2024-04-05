# 小程序入门

## 2-7 json配置

project.private.config.json（项目私有配置） 中的相同设置优先级高于 project.config.json（项目公有配置）

可以在 project.config.json 文件中配置公共的配置，在 project.private.config.json 配置个人的配置，可以将 project.private.config.json 写到 .gitignore 避免版本管理的冲突。

project.private.config.json 中有的字段，开发者工具内的设置修改会优先先覆盖 project.private.config.json 的内容。如在 project.private.config.json 有 appid 字段，那么在 详情-基本信息 中修改了 appid，会写到 project.private.config.json 中，不会覆盖掉 project.config.json 的 appid 字段的内容

开发阶段相关的设置修改优先同步到 project.private.config.json 中，但与最终编译产物有关的设置无法在 project.private.config.json 中生效，界面上的改动也不会同步到 project.private.config.json 文件中。

## 2-8 app.json

app.json-全局配置文件，用于配置页面路径、窗口、网格、tab、全局属性等；

pages: 存放页面路径，默认第一个为入口页面

entryPagePath: 指定入口页面路径

window: 定义小程序的窗口表现和行为，可通过设置navigationStyle为custom进行自定义

tabBar: 定义小程序的底部导航栏

## 2-9 sitemap.json

sitemap.json-配置小程序页面是否允许微信索引，不指定时默认所有页面都会被收录

rules: 定义小程序的页面路由和页面权重

## 2-10 app.js 的作用和使用

- 注册App的全局实例，页面中通过 getApp() 获取
- 初始化小程序及生命周期的监听
- 全局数据存储

## 2-11 app.wxss 的作用和使用

- wxss 是 WeiXin Style Sheets 的缩写，是一套样式语言
- 用于全局样式注册
- 可以在所有的页面中引入

## 2-12 页面结构 .wxml 文件的作用

- WXML (WeiXin Markup Language的缩写)，是小程序设计的一套标签语言

## 2-13 页面结构 .wxss 的作用

- 描述页面特有的样式表
- 页面中的 .wxss 的优先级高于全局 app.wxss

## 2-14 页面结构 .js 文件的作用

- 使用 Page 构造器注册小程序页面
- 初始化页面数据
- 实时生命周期监听
- 注册自定义方法

## 2-15 页面结构 .json 文件的使用

- 描述页面单独配置的文件
- 会覆盖全局配置 window 中的相同属性
