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

#### 【3】循环时的DOM操作

要使用jQuery可以很方便的添加，删除或修改DOM节点，但是在一些循环，
例如for(), while()或者$.each()中处理节点时，下面有个实例值值得注意：

    var top_100_list = [...],   // 假设这里是100个独一无二的字符串
        $mylist = $("#mylist"); // jQuery选择到ul元素
    for( var i=0, l=top_100_list.length; i<l; i++ ) {
      $mylist.append("<li>" + top_100_list[i] + "</li>");
    }

以上代码中，我们将每一个新添加的标签元素都作为一个节点添加到容器ID中，实际上jQuery操作消耗的性能也不低，所以更好的方式是尽可能的减少DOM操作，这里应该将整个元素字符串在插入DOM之前全部创建好，修改代码如下：