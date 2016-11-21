### 05数组方式使用jQuery对象

使用jQuery选择获取结果是一个jQuery对象。然而，jQuery类库会让你感觉正在使用一个定义了索引和长度的数组。
在性能方面，建议使用简单for或者while循环来处理，而不是$.each(), 这样能使你的代码更快

    $.each(array, function(i) {
      array[i] = i;
    })

使用for代替each()方法，代码如下

    var array = [];
    for (var i=0; i<array.length; i++) {
      array[i] = i;
    }

另外注意，检查长度也是检查jQuery对象是否存在的方式，
下面一段代码通过length属性检查页面中是否含有id为"content"元素：

    var $content = $("#content");
    if ( $content ) { // 总是true
      // do something
    }
    if ( $content.length ) { // 拥有元素才返回true
      // do something
    }