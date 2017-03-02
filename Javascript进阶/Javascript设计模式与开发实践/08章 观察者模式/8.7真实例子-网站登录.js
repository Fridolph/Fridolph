/**
 * 需求： 开发商城，网站有header、nav、消息列表、购物车等模块，这几个模块渲染有个前提条件，
 * 必须先用ajax异步请求获取用户的登录信息。 ajax请求何时返回用户信息是未知的。
 */
// login.succ(function(data) {
//   header.setAvatar(data.avatar);
//   nav.setAvatar(data.avatar);
//   message.refresh();
//   cart.refresh();
// });
// 很臃肿，且难易维护， 如果要增加新模块，需要在后续继续添加

/**
 * 用发布订阅模式重写后，对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件。
 * 当登录成功时，登录模块只需要发布登录成功的消息，而业务方接受到消息后，
 * 就会开始进行各自的业务处理，登录模块并不关心业务方需要做什么，代码如下：
 */
$.ajax('http://xxx.xxx.com?login', data => { // 登录成功
  login.trigger('loginSucc', data);  // 发布登录成功的消息
});

// 各模块监听登录成功的消息：
var header = (function() {
  login.listen('loginSucc', data => {
    header.setAvatar(data.avatar);
  });
  
  return {
    setAvatar: function(data) {
      console.log('设置header模块的头像');
    }
  }
})();

var nav = (function(){
  login.listen('loginSucc', data => {
    nav.setAvatar(data.avatar);
  });

  return {
    setAvatar: function(avatar) {
      console.log('设置nav模块的头像');
    }
  }
})();

/**
 * 如上，我们随时可把setAvatar名改为setTouxiang，如果有一天在登录完成之后，
 * 又增加了一个刷新收获地址列表的行为，那么只要在收获地址模块里加上监听消息的方法即可 
 */
var address = (function(){
  login.listen('loginSucc', obj => {
    address.refresh(obj);
  });

  return {
    refresh: function(avatar) {
      console.log('刷新收获地址列表');
    }
  }
})();