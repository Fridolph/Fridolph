// 声明一个局部变量 fireworks 它是一个IIFE
// 其向外暴露了 3个接口 render, setCanvasSize, animateParticules
var fireworks = (function() {
  // 画布
  var canvasEl = document.querySelector('.fireworks')
  var ctx = canvasEl.getContext('2d')
  // 颗粒数 默认取40 有query则取整个query
  var numberOfParticules = Number(location.href.split('?')[1]) || 40
  var pointerX = 0
  var pointerY = 0
  // 移动端 ontouchstart事件兼容
  var tap = 'ontouchstart' in window || navigator.msMaxTouchPoints
    ? 'touchstart'
    : 'mousedown'
  // 几种烟花颜色，可自己配置
  var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']

  /**
   * 画布大小默认为视口宽高的2倍，同时将其放大一倍（这应该是做移动端 ratio适配的）
   */
  function setCanvasSize() {    
    canvasEl.width = window.innerWidth * 2
    canvasEl.height = window.innerHeight * 2
    canvasEl.style.width = window.innerWidth + 'px'
    canvasEl.style.height = window.innerHeight + 'px'
    canvasEl.getContext('2d').scale(2, 2)
  }

  /**
   * 用于实时获取鼠标 / 手势 的横纵坐标
   * @param {Object} e 原生的event事件对象
   */
  function updateCoords(e) {    
    pointerX = e.clientX || e.touches[0].clientX
    pointerY = e.clientY || e.touches[0].clientY
  }
  
  /**
   * 设置颗粒运动方向
   * @param {Object} p 用于存储单个粒子的相关属性
   */
  function setParticuleDirection(p) {
    // 随机生成烟花角度
    var angle = anime.random(0, 360) * Math.PI / 180
    // 随机生成烟花颗粒大小
    var value = anime.random(50, 180)
    // 半径都为正（若取到 -1 则用于计算）
    var radius = [-1, 1][anime.random(0, 1)] * value
    // 对于数学白痴- -算法真不懂
    // 猜想这里返回 一个烟花颗粒的初始坐标，而后根据这坐标进行轨迹移动
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.x + radius * Math.sin(angle)
    }
  }

  function createParticlue(x, y) {
    var p = {}
    p.x = x
    p.y = y
    // 从定义好的颜色数组里，随机取一个色
    p.color = colors[anime.random(0, colors.length - 1)]
    // 烟花颗粒 取16-32的随机半径
    p.radius = anime.random(16, 32)
    // 烟花颗粒 运动结束的位置
    p.endPos = setParticuleDirection(p)
    p.draw = function() {
      // 开始绘制
      ctx.beginPath()
      // canvas画弧度的api
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.fillStyle = p.color
      ctx.fill()
    }
    return p
  }

  /**
   * 画圆
   * @param {*} x 坐标
   * @param {*} y 坐标
   */
  function createCircle(x, y) {
    var p = {}
    p.x = x
    p.y = y
    p.color = '#fff'
    p.radius = 0.1
    p.alpha = 0.5
    p.lineWidth = 6
    p.draw = function() {
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.lineWidth = p.lineWidth
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return p
  }

  /**
   * 渲染颗粒
   * @param {*} anime 
   */
  function renderParticule(anime) {
    // 对生成的颗粒 执行 draw方法
    for (var i = 0; i < anime.animatables.length; i++) {
      // 对初始的40个 执行draw绘制 
      anime.animatables[i].target.draw()
    }
  }

  /**
   * 生成颗粒动画
   */
  function animateParticules(x, y) {
    // 生成颗粒渲染的坐标
    var circle = createCircle(x, y)
    // particules 存放 生成颗粒的相关数据
    var particules = []
    for (var i = 0; i < numberOfParticules; i++) {
      particlues.push(createParticule(x, y))
    }
    anime
      .timeline()
      // 添加初始坐标和颗粒状态
      .add({
        targets: particules,
        x: function(p) {
          return p.endPos.x
        },
        y: function(p) {
          return p.endPos.y
        },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule
      })
      // 结束坐标和状态，然后 动画会为我们生成其过渡效果
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800)
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0
      })
  }

  var render = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  })
  // 添加事件监听
  document.addEventListener(
    tap,
    function(e) {
      window.human = true
      render.play()
      updateCoords(e)
      animateParticules(pointerX, pointerY)
      ga('send', 'event', 'Fireworks', 'Click')
    },
    false
  )

  window.addEventListener('resize', setCanvasSize, false)

  return {
    render: render,
    setCanvasSize: setCanvasSize,
    animateParticules: animateParticules
  }
})()