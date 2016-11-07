

jQuery('a.popup').live('click', function () { 
    newwindow = window.open($(this).attr('href'), '', 'height=200,width=150'); 
    
    if (window.focus) { 
        newwindow.focus(); 
    } 
    
    return false; 
});