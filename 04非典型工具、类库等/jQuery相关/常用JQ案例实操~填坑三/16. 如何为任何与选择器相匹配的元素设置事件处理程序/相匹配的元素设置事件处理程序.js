$('button.someClass').live('click', someFunction);

//注意，在jQuery 1.4.2中，delegate和undelegate选项 
//被引入代替live，因为它们提供了更好的上下文支持 
//例如，就table来说，以前你会用 
//.live() $("table").each(function () { $("td", this).live("hover", function () { $(this).toggleClass("hover"); }); });
//现在用 
    $("table").delegate("td", "hover", function () {
        $(this).toggleClass("hover"); 
    });