function parseXml(xml) { 
//找到每个Tutorial并打印出author 
    $(xml).find("Tutorial").each(function () { 
        $("#output").append($(this).attr("author") + ""); 
    }); 
}