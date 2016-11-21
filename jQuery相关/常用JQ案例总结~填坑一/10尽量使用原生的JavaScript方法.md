下面一段代码，它用来判断多选框是否被选中：

    var $cr = $("#cr");

    $cr.click(function() {
      if ($cr.is(":checked")) { // jQuery的判断方式
        alert("感谢你的支持，你可以继续操作了！");
      }
    })

它使用了jQuery提供的is()方法来判断多选框是否选中， 但这里可以直接使用原生的JS方法，如下：

    var $cr = $("#cr"),   // jQuery对象
        cr = $cr.get(0);  // DOM对象，获取$cr[0]

    $cr.click(function() {
      if(cr.checked) {    // 原生js方式判断
        alert("感谢你的支持，你可以继续操作了！");
      }
    });
