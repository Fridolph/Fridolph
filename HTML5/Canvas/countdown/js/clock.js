var WINDOW_WIDTH = 1024,
    WINDOW_HEIGHT = 600,
    RADIUS = 7,
    MARGIN_TOP = 60,
    MARGIN_LEFT = 30;

// 声明倒计时结束的时间(目前有限制)
// const endTime = new Date(2016,8,31,10,05,00);
// 这里有坑，新建的时间必须以正规时间的形式

// const endTime = new Date("2016/8/1, 00:00:00");
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600*1000);

var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#B21E01", "#2d3F20"];

window.onload = function() {
  WINDOW_WIDTH = document.body.clientWidth;
  WINDOW_HEIGHT = document.body.clientHeight;

  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
  MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
  RADIUS = Math.round(WINDOW_WIDTH*4/5 / 108) - 1;


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurrentShowTimeSeconds();
  // render(context);  开始动画了
  setInterval(function() {
    render(context);
    update();
  }, 50);
}

function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret = curTime.getHours() * 3600 + 
            curTime.getMinutes() * 60 + 
            curTime.getSeconds();

  return ret >= 0 ? ret : 0;
}

/**
 * 该函数负责:
 * 1. 时间的改变
 * 2. 时间改变对应小球的生成
 * 3. 对已产生的小球运动进行更新
 */
function update() {  
  var nextShowTimeSeconds = getCurrentShowTimeSeconds();

  var nextHours = parseInt(nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600) / 60 );
  var nextSeconds = nextShowTimeSeconds % 60;

  var curHours = parseInt(curShowTimeSeconds / 3600);
  var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600) / 60 );
  var curSeconds = curShowTimeSeconds % 60;
  
  if (nextSeconds !== curSeconds) {
    // 对时间的小时进行判断
    if(parseInt(curHours / 10) !== parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
    }
    if(parseInt(curHours % 10) !== parseInt(nextHours % 10)) {
      addBalls(MARGIN_LEFT + 15*(RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
    }
    // 对时间的分钟进行判断
    if(parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
      addBalls(MARGIN_LEFT + 39*(RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
    }
    if(parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
      addBalls(MARGIN_LEFT + 54*(RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
    }
    // 对时间的秒数进行判断
    if(parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
      addBalls(MARGIN_LEFT + 78*(RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
    }
    if(parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
      addBalls(MARGIN_LEFT + 93*(RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }

  updateBalls();
  // 此时的性能非常差，因为滚出去的小球还留在内存中
  console.log("停留在画面中小球的个数是" + balls.length);
  for (var i=0; i<balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS
      balls[i].vy = - balls[i].vy * 0.75;
    }
  }
  

  var count = 0;
  for (var i=0; i<balls.length; i++) {
    // 小球本身的左边缘 一定 要比整个画面的长度还小
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[count++] = balls[i]
    }
  }

  while (balls.length > Math.min(300, count)) {
    balls.pop();
  }
}

function updateBalls() {
  for(var i=0; i<balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;  
    balls[i].vy += balls[i].g;

    // 这里同样是在做碰撞检测
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy*0.75;
    }  
  }
}

function addBalls(x, y, num) {
  for (var i=0; i<digit[num].length; i++) {
    for (var j=0; j<digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        var aBall = {
          x: x+j*2*(RADIUS + 1)+(RADIUS + 1),
          y: y+i*2*(RADIUS + 1)+(RADIUS + 1),
          g: 2 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,
          vy: -4 + Math.random()*2,
          color: colors[Math.floor(Math.random()*colors.length)]
        }
        balls.push(aBall);
      }
    }
  }
}

function render(cxt) {
  // 对之前绘制的动画清除（不然会叠加在一起）
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
 
  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt( (curShowTimeSeconds - hours * 3600) / 60 );
  var seconds = curShowTimeSeconds % 60;

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
  renderDigit(MARGIN_LEFT + 15*(RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
  renderDigit(MARGIN_LEFT + 30*(RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 39*(RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
  renderDigit(MARGIN_LEFT + 54*(RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
  renderDigit(MARGIN_LEFT + 69*(RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 78*(RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
  renderDigit(MARGIN_LEFT + 93*(RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

  // 渲染小球
  for (var i=0; i<balls.length; i++) {
    cxt.fillStyle = balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
    cxt.closePath();
    cxt.fill();
  }  
}

function renderDigit(x, y, num, cxt) {
  cxt.fillStyle = "rgb(0, 102, 153)";

  for (var i=0; i<digit[num].length; i++) {
    for (var j=0; j<digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
        cxt.closePath();
        cxt.fill()
      }
    }
  }
}