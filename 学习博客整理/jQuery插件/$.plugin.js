$.fn.myPlugin = function(options) {
  var defaults = {
    'color': 'red',
    'fontSize': '14px'
  }

  var settings = $.extend({}, defaults, options); // 将一个空对象作为第一个参数

  return this.css({
    'color': settings.color,
    'fontSize': settings.fontSize
  })
}