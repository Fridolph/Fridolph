HTML5的data属性可以帮助我们插入数据，特别是前后端的数据交换。

jQuery的data()方法，有效的利用了HTML5的属性，来自动得到数据。下面就是个例子：

    <div id="dl" 
      data-role="page" 
      data-last-value="43"
      data-options='{"name": "John"}'
    >
      ...
    </div>

为了读取数据，你需要使用如下代码：

    $("#dl").data("role");          // dl
    $("#dl").data("lastValue");     // 43
    $("#dl").data("options").name;  // "John"