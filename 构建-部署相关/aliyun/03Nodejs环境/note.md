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

