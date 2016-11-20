// 允许链式日志记录 
// 用法：
    $('#someDiv').hide().log('div hidden').addClass('someClass'); 
    
    jQuery.log = jQuery.fn.log = function (msg) { 
        if (console) { 
            console.log("%s: %o", msg, this); 
        } 
        return this; 
    };