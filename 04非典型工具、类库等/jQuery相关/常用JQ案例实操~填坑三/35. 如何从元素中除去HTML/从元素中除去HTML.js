(function ($) { 
    $.fn.stripHtml = function () { 
        var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi; 

        this.each(function () { 
            $(this).html($(this).html().replace(regexp, "")); 
        }); 
        
        return $(this); 
    } 
})(jQuery);
//用法： $('p').stripHtml(); 