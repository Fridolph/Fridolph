## 服务器SSH服务

1. 安装SSH

yum install openssh-server

2. 启动SSH

service sshd start

3. 设置开机运行

chkconfig sshd on

服务器已经装好了，所以暂可无视以上

---

查进程栈的命令

ps -ef |grep ssh

连接到服务器

ssh vagrant@xxx.xxx.xx.xx

### SSH config讲解

* config为方便我们批量管理多个ssh
* config 存放在 ~/.ssh/config
* config 配置语法

关键字

Host 别名
HostName 主机名
Port 端口
User 用户名
IdentityFile 密钥文件路径

开始配置

cd ~/.ssh/  ls
touch config

```bash
host "imooc"
    HostName xxx.xx.xxx.xxx
    User root
    Port 22
```

这样直接 ssh imooc 就可以连进来了

---

### SSH安全免密码登录 ssh key

* ssh key 使用非对称加密方式生成公钥和私钥
* 私钥存放在本地 ~/.ssh目录
* 公钥可以对外公开，放在服务器的 ~/.ssh/authorized_keys

### 生成 ssh key

ssh-keygen -t rsa
ssh-keygen -t tsa

cd ~/.ssh  vim authorized_keys 将.pub 的公钥粘贴进来就好

### SSH安全端口

* 端口安全指的是尽量避免服务器的远程连接端口被不法分子知道，为此而改变默认服务端口号的操作
* 改变SSH服务端口 修改 /etc/ssh/sshd_config 配置