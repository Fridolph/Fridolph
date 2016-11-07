jQuery.fn.maxLength = function (max) { 
    this.each(function () { 
        var type = this.tagName.toLowerCase(); 
        var inputType = this.type ? this.type.toLowerCase() : null; 
        
        if (type == "input" && inputType == "text" || inputType == "password") { 
            this.maxLength = max; 
        } 
        else if (type == "textarea") { 
            this.onkeypress = function (e) { 
                var ob = e || event; var keyCode = ob.keyCode; var hasSelection = document.selection ? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd; return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection); 
            }; 

            this.onkeyup = function () { 
                if (this.value.length > max) { 
                    this.value = this.value.substring(0, max); 
                } 
            }; 
        } 
    }); 
};
//用法 $('#mytextarea').maxLength(500);