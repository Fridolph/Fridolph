// 1. 如何让一个DOM元素动起来？  position:absolute;  left || top
// 这样会引起重绘影响性能，所以优先使用 transform的translate

// 2. 如何获取当前浏览器是否支持transform的兼容写法
// ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform']

// 获取当前浏览器支持
function getTransform() {
  var transform = '',
      divStyle = document.createElement('div').style,
      // 可能设计到的几种兼容性写法，通过循环找出浏览器识别的那一个
      transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
      i = 0,
      len = transformArr.length;
  
  for (; i < arr; i++) {
    if (transformArr[i] in divStyle) {
      // 找到之后立即返回，结束函数
      return transform = transformArr[i];
    }
  }

  // 如果没有找到，就直接返回空字符串
  return transform;
}

// 3. 获取元素的初始位置
function getStyle(elem, property) {
  // IE通过currentStyle来获取元素的样式，其他浏览器通过getComputedStyle来获取
  return document.defaultView.getComputedStyle ? 
    document.defaultView.getComputedStyle(elem, false)[property] : 
    elem.currentStyle[property];
}

// 之后可以动手写获取目标元素初始位置的方法了
function getTargetPos(elem) {
  var pos = { x: 0, y: 0 };
  var transform = getTransform();

  if (transform) {
    var transformValue = getStyle(elem, transform);

    if (transformValue == 'none') {
      elem.style[transform] = 'translate(0,0)';
      return pos;
    } else {
      var temp = transformValue.match(/-?\d+/g);
      
      return pos = {
        x: parseInt(temp[4].trim()),
        y: parseInt(temp[5].trim())
      }
    }
  } else {
    if (getStyle(elem, 'position') === 'static') {
      elem.style.position = 'relative';
      return pos;
    } else {
      var x = parseInt(getStyle(elem, 'left') ? getStyle(elem, 'left') : 0);
      var y = parseInt(getStyle(elem, 'top') ? getStyle(elem, 'top') : 0);

      return pos = {
        x: x,
        y: y
      }
    }
  }
}

// 设置目标元素的新位置
// pos = {x:200, y: 100}
function setTargetPos(elem, pos) {
  var transform = getTransform();
  if (transform) {
    elem.style[transform] = 'translate(' + pos.x + 'px, ' + pos.y + 'px';
  } else {
    elem.style.left = pos.x + 'px';
    elem.style.top = pos.y + 'px';
  }
}

// 4. 拖拽事件
// PC: mousedown  mousemove  mouseup
// APP: touchstart  touchmove  touchend

// 5. 拖拽原理
// 事件触发时，精确获取到鼠标的当前位置
// 移动后鼠标位置 - 鼠标初始位置 = 移动后的目标元素位置 - 目标元素的初始位置
// 
// 移动后的目标元素位置 = 鼠标位置差值 + 目标元素的初始位置

// 6. 最终实现

// 获取目标元素对象
var elem = document.getElementById('target');

// 声明2个变量用来保存鼠标初始位置的x,y坐标
var startX = 0;
var startY = 0;

// 声明2个变量用来保存目标元素初始位置的x,y坐标
var sourceX = 0;
var sourceY = 0;

// 绑定在mousedown上的回调，event为传入的事件对象
function start(event) {
  // 获取鼠标初始位置
  startX = event.pageX;
  startY = event.pageY;

  // 获取要拖拽元素的初始位置
  var pos = targetPos(elem);

  sourceX = pos.x;
  sourceY = pos.y;

  // 绑定事件
  document.addEventListener('mousemove', move, false);
  document.addEventListener('mouseup', end, false);
}

function move(event) {
  // 获取鼠标当前位置
  var currentX = event.pageX;
  var currentY = event.pageY;

  // 计算差值
  var distanceX = currentX - startX;
  var distanceY = currentY - startY;

  // 计算并设置元素的当前位置
  setTargetPos(elem, {
    x: (sourceX + distanceX).toFixed(),
    y: (sourceY + distanceY).toFixed()
  })
}

function end(event) {
  document.removeEventListener('mousemove', move);
  document.removeEventListener('mouseup', end);
}