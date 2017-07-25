(function($) {

  var GETCLASSES = 'http://imoocnote.calfnote.com/inter/getClasses.php'

  // 添加全局的错误处理
  $.ajaxSetup({
    error: function() {
      alert('调用接口失败');
      return false;
    }
  });

  $.getJSON(GETCLASSES, {curPage: 1}, function(data) {
    console.log(data)
    var t = $('#class-template').html();
    var f = Handlebars.compile(t);
    var h = f(data.data);
    $('#classes').html(h);

    console.log(formatPage(data));
    var t = $('#page-template').html();
    var f = Handlebars.compile(t);
    var h = f(formatPage(data));
    $('#page').html(h);
  });

  Handlebars.registerHelper('equal', function(v1, v2, options) {
    if (v1 == v2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('long', function(value, options) {
    if (value.indexOf('小时') != -1) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('page', function(v1, v2, options) {
    var str = '';
    str += '<ul></ul>';
    return str;
  });

  /**
   * 格式化页码
   * @param {obj} pageData 
   */
  function formatPage(pageData) {
    var arr = [];
    var total = parseInt(pageData.totalCount);
    var cur = parseInt(pageData.curPage);
    
    // 处理到首页的逻辑
    var toLeft = {};
    toLeft.index = 1;
    toLeft.text = '&laquo;';    
    if (cur != 1) {
      toLeft.clickable = true;
    }
    arr.push(toLeft);
    
    // 处理到上一页的逻辑
    var pre = {};
    pre.index = cur - 1;
    pre.text = '&lsaquo;';
    if (cur != 1) {
      pre.clickable = true;
    }
    arr.push(pre);
    
    // 处理到cur页前的逻辑
    if (cur <= 5) {
      for (var i = 1; i < cur; i++) {
        var page = {};
        page.text = i;
        page.index = i;
        page.clickable = true;
        arr.push(page);
      }
    } else {
      // 如果 cur > 5 那么cur前的页要显示
      var page = {};
      page.text = 1;
      page.index = 1;
      page.clickable = true;
      arr.push(page);
      var page = {};
      page.text = '…';
      arr.push(page);
      for (var i = cur - 2; i < cur; i++) {
        var page = {};
        page.text = i;
        page.index = i;
        page.clickable = true;
        arr.push(page);
      }
    }

    // 处理到cur页的逻辑
    var page = {};
    page.text = cur;
    page.index = cur;
    page.cur = true;
    arr.push(page);

    // 处理到cur页码的逻辑
    if (cur >= total - 4) {
      for (var i = cur + 1; i <= total; i++) {
        var page = {};
        page.text = i;
        page.index = i;
        page.clickable = true;
        arr.push(page);
      }
    } else {
      // 如果cur<total-4, 那么cur后的页面显示
      for (var i = cur + 1; i <= cur + 2; i++) {
        var page = {};
        page.text = i;
        page.index = i;
        page.clickable = true;
        arr.push(page);
      }
      var page = {};
      page.text = '…';
      arr.push(page);
      var page = {};
      page.text = total;
      page.index = total;
      page.clickable = true;
      arr.push(page);
    }

    // 处理下一页的逻辑
    var next = {};
    next.index = cur + 1;
    next.text = '&rsaquo;';
    if (cur != total) {
      next.clickable = true;
    }
    arr.push(next);
    
    // 处理到尾页的逻辑 
    var toRight = {};
    toRight.index = total;
    toRight.text = '&raquo;';
    if (cur != total) {
      toRight.clickable = true;
    }
    arr.push(toRight);
    return arr;
  }

})(jQuery)