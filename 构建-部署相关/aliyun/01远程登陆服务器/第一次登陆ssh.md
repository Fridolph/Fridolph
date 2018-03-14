ssh root@120.77.246.102 

输入公网IP后回车，yes

输入登陆密码即可访问

---

fdisk -l 查看系统盘情况

df -h 查看系统空间情况

---

增加代理用户，防止以ROOT权限的误操作

adduser imooc_manager
密码 imooc

gpasswd -a imooc_manager sudo  添加root权限

sudo visudo 

root  ALL=(ALL:ALL) ALL 下添加一行
imooc_manager ALL=(ALL:ALL) ALL

service ssh restart 重启服务
然后以我们新建的用户的登陆

ssh imooc_manager@120.77.246.102  密码imooc