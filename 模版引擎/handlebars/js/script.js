(function($) {

  var GETCLASSES = 'http://imoocnote.calfnote.com/inter/getClasses.php'

  $.getJSON(GETCLASSES, {curPage: 1}, function(data) {
    console.log(data)

    var t = $('#class-template').html();
    var f = Handlebars.compile(t);
    var h = f(data.data);

    $('#classes').html(h);
  })

})(jQuery)