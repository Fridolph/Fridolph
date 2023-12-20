#### 【2】缓存对象

$("#form input.on").on("click, function() {...}");
$("#form input.on").css({...});
$("#form input.on").fadeIn({...});
$("#form input.on").ajax({...});

编程中的跳跃思维可能会这样写，但导致的结果是，jQuery会在创建每一个选择器的过程中，
查找DOM，并创建多个jQuery对象。   更好的书写方式如下：

var $form_input = $("#form input.on"); // 缓存变量, jquery的DOM对象加上$用以区别原生DOM对象
$form_input.on("click", function() {...});
$form_input.on("click", function() {...});

如果打算在其他函数中使用jQuery对象，那么可以把它们缓存到全局环境中

     // 在全局范围定义一个对象
     window.$my = {
          head: $("head"),
          form_input: $("#form_input"),
          form_button: $("#form_button")
     };

     function doSomething() {
       // 引用存储的结果来操作它们
       var script = document.createElement("script");
       $my.head.append(script);

       // 当你在内部操作时，可以继续将查询存入全局对象中去
       $my.good_results = $("#some_ul li");
       $my.other_results = $("some_table td");

       // 将全局函数作为一个普通的jQuery对象去使用
       $my.other_results.css({...});
       $my.other_results.css({...});
     }

     // 也可以在其他函数中使用, 但不要让相同的选择器在代码中出现多次

