最近在看《Node.js开发指南》，看到使用nodejs进行web开发的时候，准备创建ejs项目遇到问题了，
书上命令为：
1
express -t ejs microblog
可是执行后，仍旧创建的是jade项目。
原来，express3.x，express4.x中创建ejs命令更新为：
express -e microblog //即ejs，-j（即jade）
当然，最直接的，你也可以修改package.json里的定义来实现安装ejs。
PS：建立工程过程
1.必须得安装express框架把：express的安装命令也更新了，需要安装express-generator
$ npm install -g express //全局安装
$ npm install -g express-generator //这段命令可别忘了，不然会提示“express命令找不到的”
2.建立网站工程结构：
express -e ejs microblog
3.根据提示，进入文件夹安装
cd microblog //microblog为前面创建工程的文件夹
npm install