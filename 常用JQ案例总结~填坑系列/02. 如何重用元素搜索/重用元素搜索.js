

var allItems = $("div.item"); 
var keepList = $("div#container1 div.item"); 
//现在你可以继续使用这些jQuery对象来工作了。
//例如，基于复选框裁剪“keep list”，复选框的名称符合 
 

 //<DIV>class names:
    $(formToLookAt + " input:checked").each(function () { 
        keepList = keepList.filter("." + $(this).attr("name")); 
    });
 //</DIV>