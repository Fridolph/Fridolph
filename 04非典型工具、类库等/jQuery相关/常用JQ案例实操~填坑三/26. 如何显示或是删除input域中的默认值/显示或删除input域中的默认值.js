//这段代码展示了在用户未输入值时，     
//如何在文本类型的input域中保留     
//一个默认值
    $(".swap").each(function (i) { 
        wap_val[i] = $(this).val(); $(this).focusin(function () { 
            if ($(this).val() == swap_val[i]) { 
                $(this).val(""); 
            } 
        }).focusout(function () { 
            if ($.trim($(this).val()) == "") { 
                $(this).val(swap_val[i]); 
            } 
        }); 
    });