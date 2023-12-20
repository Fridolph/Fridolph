# VS Code常用快捷键

ps 由于篇幅不多，这篇就放到和 vs code插件一起了

---

学习编辑器的快捷键看上去挺无聊，但一旦掌握且熟悉后，用于今后的生产可是会大大提高生产效率的。相比前期的学习成本，还是大可以接受的，于是直接进入主题吧

    ctrl + k & ctrl + s

可打开全键盘快捷方式一览(不带改字为插件默认)

### 字符操作相关

* 剪切 `ctrl + x`
* 块注释 `shift + alt + A`
* 行注释 `ctrl + /`
* 多删右符 `ctrl + delete` 比单独的delete删得多
* 多删左符 `ctrl + backspace` 同理
* 向上复制行 `shift + alt + 上`
* 向下复制行 `shift + alt + 下`
* 向上移动行 `alt + 上`
* 向下移动行 `alt + 下`
* 在文件中查找 `ctrl + f`
* 在文件中替换 `ctrl + h`
* 在全局中替换 `ctrl + shift + f` 
* 在文件中替换 `ctrl + shift + h`
(这里的全局是以打开的项目为单位)



## 基础快捷键

* Quick open 视图 `ctrl + q`

* 以递归方式展开 `ctrl + k  ctrl + ]`

* 全部展开 `ctrl + k  ctrl + j` 

* 以递归方式折叠 `ctrl + k  ctrl + [`

* 全部折叠 `ctrl + k  ctrl + 0` 

* 保存 `ctrl + s`

* 全部保存 `ctrl + k  s`

* 另存为 `ctrl + shift + S`

### 编辑器

* 保留编辑器
(点开一个文件，再点开其他的, tab上不会保留, 其实鼠标点两下也可以实现)
`ctrl + k  enter回车`

* 关闭工作区 `ctrl + k  F` 

* 关闭当前编辑器 `ctrl + w`

* 显示所有编辑器 `ctrl + k  ctrl + p`

* 关闭组中未作更改的编辑器 `ctrl + k  U` 
很实用，对了修改了一堆的文件，使用此命令可先关闭未作修改的

* 关闭组中所有编辑器 `ctrl + k  W`

* 编辑器左右移动 `ctrl + pageUp` `ctrl + pageDown`

* 切换Zen模式 按ESC可退出 `ctrl + k  Z`
F11 可全屏模式，感觉比这个有用些

* 切换侧边栏可见性 `ctrl + b`

* 切换编辑器组布局(水平/垂直) `shift + alt + 1`

* 切换输出 `ctrl + shift + U` 用得不多

* 切换面板 `ctrl + J` 把下面的那4个隐藏掉，类似ctrl + B

* 复制活动(当前)文件的路径 `ctrl + k  P` 常用 & 强大

* 将编辑器移动到上一组 `ctrl + alt + 左`
* 将编辑器移动到下一组 `ctrl + alt + 右`

### 命令

* 右键 `shift + F10`

* 显示所有命令 `F1` `ctrl + shift + P`

* 语言模式 识别 .html .jsx `ctrl + k  M`

* 格式化(美化)文件 `shift + alt + f`
* 格式化 选中代码 `ctrl + k  ctrl + F`  
实测，这两个在 .vue .jsx下不一定能格式化得很好，使用须谨慎


* 裁剪尾随空格 `ctrl + k  ctrl + x` 挺好用，配合ESlint



---

## 插件相关快捷键

* Can I Use 查看兼容性  
改为 `ctrl + c & ctrl + i`

* Document This 函数注释 
`ctrl + alt + d & ctrl + alt + d`

* fileheader 文件头部信息 
`ctrl + alt + I`

* Close Tag 关闭标签
`alt + i`
