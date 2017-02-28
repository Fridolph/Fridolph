/**
 * 单例模式的用途远不止创建对象，比如我们通常渲染完页面中的一个列表之后，接下来要给这个列表绑定click事件。
 * 如果是通过ajax动态往列表追加数据，在使用事件代理的前提下，click事件实际上只需要第一次渲染列表的时候被绑定一次，
 * 但是我们不想去判断当前是否是第一次渲染列表，借助于jQuery, 我们通常选择给节点绑定one事件：
 */

var bindEvent = function() {
  $('div').one('click', function() {
    alert('click');
  });
};

var render = function() {
  console.log('开始渲染列表');
  bindEvent();
}

render();
render();
render();

// 如果利用getSingle函数，也能达到一样的效果。
var bindEvent = getSingle(function() {
  document.getElementById('div1').onclick = function() {
    alert('click');
  }
  return true;
});

var render = function() {
  console.log('开始渲染列表');
  bindEvent();
}

render();
render();
render();
