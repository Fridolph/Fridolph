//这是1.3.2中我们使用setTimeout来实现的方式
setTimeout(function () { 
    $('.mydiv').hide('blind', {}, 500) 
}, 5000); 
 //而这是在1.4中可以使用delay()这一功能来实现的方式（这很像是休眠） 
 
 $(".mydiv").delay(5000).hide('blind', {}, 500);