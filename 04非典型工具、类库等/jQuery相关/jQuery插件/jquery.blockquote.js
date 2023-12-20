;(function($, window, document, undefined) {
  // 定义niceBlockquote的构造函数
  var Niceblockquote = function(elem, options) {
    this.$element = elem,
    this.defaults = {
      'padding': '10px 10px 10px 30px',
      'background': '#f2f4f5',
      'color': '#666',
      'fontSize': '14px',
      'borderLeft': '5px solid #aaa'
    },
    this.options = $.extend({}, this.defaults, options)
  }

  // 定义niceBlockquote的方法
  Niceblockquote.prototype = {
    nice() {
      return this.$element.css({
        'padding': settings.padding,
        'background': settings.background,
        'color': settings.color,
        'fontSize': settings.fontSize,
        'borderLeft': settings.borderLeft
      })
    }
  }

  // 在插件中使用niceBlockquote对象
  $.fn.myPlugin = function(options) {
    // 创建Niceblockquote的实例
    var blockquote = new Niceblockquote(this, options);
    // 调用其方法
    return blockquote.nice()
  }
})(jQuery, window, document)