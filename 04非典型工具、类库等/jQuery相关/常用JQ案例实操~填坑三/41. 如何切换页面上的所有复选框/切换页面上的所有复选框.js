var tog = false ;
// 或者为true，如果它们在加载时为被选中状态的话
// 
 $('a').click(function () { 
    $("input[type=checkbox]").attr("checked", !tog); tog = !tog; 
});