如果每次都需花上一定的时间去开发类似jQuery的代码，那么你可以考虑将代码变成插件。
它能够使你的代码有更好的重要性，并且能够有效的帮助你组织代码。创建一个插件代码如下：

(function($) {
  $.fn.yourPluginName = function() {
    // your code goes here
    return this;
  }
})(jQuery)

