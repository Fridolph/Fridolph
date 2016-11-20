#### 【3】循环时的DOM操作

要使用jQuery可以很方便的添加，删除或修改DOM节点，但是在一些循环，
例如for(), while()或者$.each()中处理节点时，下面有个实例值值得注意：

    var top_100_list = [...],   // 假设这里是100个独一无二的字符串
        $mylist = $("#mylist"); // jQuery选择到ul元素
    for( var i=0, l=top_100_list.length; i<l; i++ ) {
      $mylist.append("<li>" + top_100_list[i] + "</li>");
    }

以上代码中，我们将每一个新添加的标签元素都作为一个节点添加到容器ID中，实际上jQuery操作消耗的性能也不低，所以更好的方式是尽可能的减少DOM操作，这里应该将整个元素字符串在插入DOM之前全部创建好，修改代码如下：

    var top_100_list = [...], 
        $mylist = $("#mylist"),
        top_100_list = "";      // 这个变量将用来存储我们的列表元素
    for( var i=0, l=top_100_list.length; i<l; i++ ) {
      top_100_list += "<li>" + top_100_list[i] + "</li>";
    }
    $mylist.html(top_100_list);

错误示例：
    
    for( var i=0; i<100; i++ ) {
      var $mylist = $("#mylist");
      $mylist.append("This is list item " + i);
    } 

这样做无疑 把#mylist循环获取了100次