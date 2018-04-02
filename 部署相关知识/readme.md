# 部署相关学习

下载 putty 连接SSH  

版本 

root
password

**常用命令：**

fdisk -l  查看系统盘信息

df -h  查看硬盘使用情况

在MAC里输入  ssh root@120.77.246.102  再输密码也可以连

一个小方法： 安装过 zsh 

进入 .zshrc 配置文件：

再最后一行添加：   alias ssh_imooc="ssh root@120.77.246.102"  保存
载入一次 source .zshrc

现在直接 输入 ssh_imooc 即可 达到 `ssh_imooc="ssh root@120.77.246.102"` 的效果

## 增加用户

adduser imooc_manager  回车， 输入密码

现在将添加的用户进行授权 

gpasswd -a imooc_manager sudo

sudo visudo  -> #User privilege ... 下面的root增加一行
imooc_manager ALL=(ALL:ALL) ALL

%E9%BB%94ICP%E5%A4%8718001905%E5%8F%B7%EF%BC%8C%E5%A4%87%E6%A1%88%E5%AF%86%E7%A0%81%E4%B8%BA%EF%BC%9AFRE527

