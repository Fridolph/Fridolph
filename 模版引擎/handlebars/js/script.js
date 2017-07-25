(function($) {

  var GETCLASSES = 'http://imoocnote.calfnote.com/inter/getClasses.php'

  // 添加全局的错误处理
  $.ajaxSetup({
    error: function() {
      alert('调用接口失败');
    }
  })

  $.getJSON(GETCLASSES, {curPage: 1}, function(data) {
    console.log(data)

    var t = $('#class-template').html();
    var f = Handlebars.compile(t);
    var h = f(data.data);

    $('#classes').html(h);
  })

  Handlebars.registerHelper('equal', function(v1, v2, options) {
    if (v1 == v2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })

  Handlebars.registerHelper('long', function(value, options) {
    if (value.indexOf('小时') != -1) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })

})(jQuery)