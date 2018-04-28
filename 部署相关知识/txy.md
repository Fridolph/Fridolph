安装nvm 

yum update

yum install git

git clone nvm.git

进入nvm路径里 先跟着操作，…… 忘了，回去补下

---

## mongodb

上传mongodb-linux-x86_64-2.6.0.tgz到/usr/local/src目录

cd  /usr/local/src  #进入软件存放目录

tar zxvf mongodb-linux-x86_64-2.6.0.tgz  #解压

mv mongodb-linux-x86_64-2.6.0  /usr/local/mongodb   #移动解压文件夹到MongoDB安装目录

mkdir  -p  /home/data/mongodb/mongodb_data/  #创建MongoDB数据库存放路径

mkdir  -p  /home/data/mongodb/mongodb_log/   #创建MongoDB数据库日志存放路径

# 启动MongoDB

/usr/local/mongodb/bin/mongod --port 27017 --fork --dbpath=/home/data/mongodb/mongodb_data/ --logpath=/home/data/mongodb/mongodb_log/mongodb.log --logappend

netstat -lanp | grep "27017"  #查看MongoDB是否启动

cd /usr/local/mongodb/bin/

./mongo  #进入MongoDB数据库控制台

use admin  #进入admin数据库

db.shutdownServer()  #关闭MongoDB数据库

exit #退出

三、设置MongoDB数据库

1、cd  /usr/local/mongodb/ #进入MongoDB安装目录

vi /usr/local/mongodb/mongodb.conf  #编辑

port=27017 #端口号

dbpath=/home/data/mongodb/mongodb_data/ #数据库路径

logpath=/home/data/mongodb/mongodb_log/mongodb.log #日志输出文件路径

pidfilepath=/usr/local/mongodb/mongo.pid

fork=true #设置后台运行

logappend=true #日志输出方式

shardsvr=true

directoryperdb=true

#auth=true  #开启认证

:wq! #保存退出

2、cd /usr/local/mongodb/bin/

./mongod --config /usr/local/mongodb/mongodb.conf  #启动MongoDB

./mongo 127.0.0.1:27017/admin --eval "db.shutdownServer()"  #关闭MongoDB

vi /etc/rc.d/init.d/mongod   #设置开机启动MongoDB

ulimit -SHn 655350

#!/bin/sh

# chkconfig: - 64 36

# description:mongod

case $1 in

start)

/usr/local/mongodb/bin/mongod  --maxConns 20000  --config /usr/local/mongodb/mongodb.conf

;;

stop)

/usr/local/mongodb/bin/mongo 127.0.0.1:27017/admin --eval "db.shutdownServer()"

;;

status)

/usr/local/mongodb/bin/mongo 127.0.0.1:27017/admin --eval "db.stats()"

;;

esac

:wq! #保存退出

chmod +x /etc/rc.d/init.d/mongod  #添加脚本执行权限

chkconfig mongod on  #设置开机启动

service  mongod  start #启动MongoDB



系统运维  www.osyunwei.com  温馨提醒：qihang01原创内容©版权所有,转载请注明出处及原文链接

3、vi /etc/profile  #添加环境变量，编辑，在最后一行添加下面的代码

export PATH=$PATH:/usr/local/mongodb/bin

:wq! #保存退出

source /etc/profile  #使配置立即生效

mongo  #进入MongoDB控制台

show dbs #查看默认数据库

use admin  #切换到admin数据库

exit #退出MongoDB控制台

---

## redis

yum update 

yum install gcc-c++

yum install redis 因为redis比较小，可以直接yum install redis 环境变量各种都配好了也不用担心

有问题重新来就是了~ 

