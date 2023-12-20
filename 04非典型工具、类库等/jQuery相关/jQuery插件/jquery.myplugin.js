$.fn.myPlugin = function(options) {
    //在这里面,this指的是用jQuery选中的元素
    //example :$('a'),则this=$('a')
    var defaults = {
      'padding': '10px 10px 10px 30px',
      'background': '#f2f4f5',
      'color': '#666',
      'fontSize': '14px',
      'borderLeft': '5px solid #aaa'
    }
    
    var settings = $.extend({}, defaults, options)

    return this.css({
      'padding': settings.padding,
      'background': settings.background,
      'color': settings.color,
      'fontSize': settings.fontSize,
      'borderLeft': settings.borderLeft
    })
}
