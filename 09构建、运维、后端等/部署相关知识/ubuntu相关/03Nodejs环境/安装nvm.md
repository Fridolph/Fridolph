sudo apt update

安装需要的应用

sudo apt-get install vim openssl build-essential libssl-dev wget curl git

安装 nvm node.js版本控制

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

这时候 nvm 命令无效，进入 ~/.nvm  创建一个 vi .bash_profile 文件

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

这样输 nvm 就由命令了， 接下来安装node.js

nvm install 8.9.1  nvm use 8.9.1

添加一个 淘宝镜像源，让下载更快

npm --registry=https://registry.npm.taobao.org install -g npm

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


cd ~
vi .bash_profile

```bash
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

将上面的添加并保存即可

python flask高级编程(无密)

Python3数据分析与挖掘建模实战

Python3数据科学入门与实战

Python操作三大主流数据库

Python高级编程技巧实战

Python接口测试框架实战与自动化进阶

Python进阶强化训练

python就业班

Python爬虫工程师必学 App数据抓取实战

慕课网 python分布式爬虫打造搜索引擎【完整版】

强力Django 和杀手级xadmin

全网最热Python3入门+进阶 更快上手实际开发
