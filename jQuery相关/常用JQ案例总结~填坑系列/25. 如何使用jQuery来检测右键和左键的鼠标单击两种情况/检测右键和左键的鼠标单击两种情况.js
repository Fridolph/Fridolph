$("#someelement").live('click', function (e) { 
    if ( (!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1) ) { 
        alert("Left Mouse Button Clicked"); 
    } else if (e.button == 2) { 
        alert("Right Mouse Button Clicked"); 
    } 
});