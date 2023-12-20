const express=require('express');
const static=require('express-static');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const bodyParser=require('body-parser');
const multer=require('multer');
const consolidate=require('consolidate');
const mysql=require('mysql');
const common = require('./libs/common')

//连接池
const db=mysql.createPool({
  host: 'localhost', 
  port: 3307,
  user: 'root', 
  password: 'keke', 
  database: 'blog'
});

var server=express();
server.listen(8080, () => { console.log('打开浏览器localhost:8080'); });

//1.解析cookie
server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'));

//2.使用session
var arr=[];
for(var i=0;i<100000;i++){
  arr.push('keys_'+Math.random());
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000}));

//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './views');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/', (req, res, next) => {
  //查询banner的东西
  db.query("SELECT * FROM banner_table", (err, data)=>{
    if(err){
      console.log(err);
      res.status(500).send('database error').end();
    }else{
      // console.log('\n拿到了数据库里查到的data: \n', data);      
      res.banners = data;

      next()
    }
  });
})
server.get('/', (req, res, next)=>{
  // 查询articles列表
  db.query('SELECT title, summary, ID FROM article_table', (err, data) => {
    if (err) {
      res.status(500).send('database error').end()
    } else {
      res.articles = data
      next()      
    }
  })
})
server.get('/', (req, res) => {
  res.render('index.ejs', {
    banners: res.banners,
    articles: res.articles
  })
})

server.get('/article', (req, res)=>{
  if(req.query.id){
    if(req.query.act=='like'){
      //增加一个赞
      db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, (err, data)=>{
        if(err){
          res.status(500).send('数据库有小问题').end();
          console.error(err);
        }else{
          //显示文章
          db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data)=>{
            if(err){
              res.status(500).send('数据有问题').end();
            }else{
              if(data.length==0){
                res.status(404).send('您请求的文章找不到').end();
              }else{
                var articleData=data[0];
                articleData.sDate=common.time2date(articleData.post_time);
                articleData.content=articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');

                res.render('conText.ejs', {
                  article_data: articleData
                });
              }
            }
          });
        }
      });
    }else{
      //显示文章
      db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data)=>{
        if(err){
          res.status(500).send('数据有问题').end();
        }else{
          if(data.length==0){
            res.status(404).send('您请求的文章找不到').end();
          }else{
            var articleData=data[0];
            articleData.sDate=common.time2date(articleData.post_time);
            articleData.content=articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');

            res.render('conText.ejs', {
              article_data: articleData
            });
          }
        }
      });
    }
  }else{
    res.status(404).send('您请求的文章找不到').end();
  }
});
//4.static数据
server.use(static('./www/'));

