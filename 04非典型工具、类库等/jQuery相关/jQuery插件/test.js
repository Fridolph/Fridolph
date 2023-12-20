;(function($,window,document,undefined) {
  var Blockquote = function(elem, options) {
    this.$element = elem,
    this.defaults = {
      background: '#f1f5f6',
      color: '#777',
      padding: '15px 15px 15px 30px',
      borderLeft: '5px solid #aaa'
    },
    this.options = $.extend({}, this.defaults, options)
  }

  Blockquote.prototype = {
    nice: function() {
      return this.$element.css({
        background: this.options.background,        
        color: this.options.color,        
        padding: this.options.padding,        
        borderLeft: this.options.borderLeft,        
      })
    }
  }

  $.fn.myPlugin = function(options) {
    var block = new Blockquote(this, options)

    return block.nice()
  }


})(jQuery, window,document)


/*;(function($, window, document, undefined) {
  var Niceblockquote = function(elem, options) {
    this.$element = elem,
    this.defaults = {
      padding: '10px 10px 10px 30px',
      background: '#f2f4f5',
      color: '#666',
      fontSize: '14px',
      borderLeft: '5px solid #aaa'
    },
    this.options = $.extend({}, this.defaults, options)
  }

  Niceblockquote.prototype = {
    nice() {
      return this.$element.css({
        'padding': this.options.padding,
        'background': this.options.background,
        'color': this.options.color,
        'fontSize': this.options.fontSize,
        'borderLeft': this.options.borderLeft
      })
    }
  }

  $.fn.myPlugin = function(options) {
    var blockquote = new Niceblockquote(this, options)

    return blockquote.nice()
  }  

})(jQuery, window, document)*/