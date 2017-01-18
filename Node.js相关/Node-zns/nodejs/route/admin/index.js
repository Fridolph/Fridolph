const express=require('express');
const common=require('../../libs/common');

module.exports=function (){
  var router=express.Router();

  //检查登录状态
  router.use((req, res, next)=>{
    if(!req.session['admin_id'] && req.url!='/login'){ //没有登录
      res.redirect('/admin/login');
    }else{
      next();
    }
  });

  router.get('/', (req, res)=>{
    res.render('admin/index.ejs', {});
  });

  router.use('/login', require('./login')());
  router.use('/banners', require('./banners')());
  router.use('/custom', require('./custom')());

  return router;
};
