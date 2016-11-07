jQuery('a.newTab').live('click', function () { 
    newwindow = window.open($(this).href); 

    jQuery(this).target = "_blank"; 
    
    return false; 
});
