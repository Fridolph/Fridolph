## ssh 五密码登陆

本地私钥 -> 本地传送服务器的公钥 -> 密码算法比对 -> 登陆成功

pwd 本地文件 一般打开iterm 就是根目录了

ls 显示文件夹名 ls -a 可以显示所有隐藏的

cd .ssh -> ssh-keygen 生成本地公钥

cp id_rsa id_rsa_backup
cp id_rsa.pub id_rsa_backup.pub  将之备份

cd ~ 
ssh-keygen -t rsa -b 4096 -C "249121486@qq.com"

cd .ssh   ->  cat id_rsa  查看文件内容

eval "$(ssh-agent -s)"    开启私钥代理

ssh-add ~/.ssh/id_rsa  加入到代理中

---

本地开启私钥代理后，服务器也用同样的操作，我们来复习一下

ssh imooc_manager@120.77.246.102

ls -a 
ssh-keygen -t rsa -b 4096 -C "249121486@qq.com"
eval "$(ssh-agent -s)"
ls -a  cd .ssh
ssh-add ~/.ssh/id_rsa

vi .ssh/authorized_keys   shift + `:`

wq! q!

把本地 id_rsa.pub 的内容复制到 authorized_keys中

~/.ssh   vi authorized_keys

esc   i   复制  esc shift + `:` 输入 wq! 就保存好了

---

chomd 600 authorized_keys   接下来是授权
sudo service ssh restart   然后重启服务