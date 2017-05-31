$(function(){
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoPlayHoverPause: true
  });
});


/**
 * 方法一  js或服务端（命令式实现）
 * 实现响应式图片方法
 * 当用户更改窗口时触发事件
 */
$(function(){
  function makeImageResponsive() {
    var width = $(window).width();
    var img = $(".content img");

    if (width <= 480) {
      img.attr('src', 'img/480.png');
    } else if (width <= 800) {
      img.attr('src', 'img/800.png');
    } else {
      img.attr('src', 'img/1600.png');
    }
  }

  $(window).on('resize load', makeImageResponsive);
});