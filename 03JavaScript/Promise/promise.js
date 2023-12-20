function sleep(ms) {
  return function (v) {
    var p = Promise();

    setTimeout(function () {
      p.resolve(v);
    }, ms);

    return p;
  }
}


/*
function getImg(url) {
  var p = Promise();
  var img = new Image();

  img.onload = function() {
    p.resolve(this);
  }

  img.onerror = function(err) {
    p.reject(err);
  }

  img.url = url;

  return p;
}
*/
function getImg(url) {
  return Promise((resolve, reject) => {
    var img = new Image();

    img.onload = () => {
      resolve(this);
    }
    img.onerror = err => {
      reject(err);
    }
    img.url = url;
  });
}

// 接下来（见证奇迹的时刻），假设有一个BT的需求要这么实现：异步获取一个json配置，解析json数据拿到里边的图片，然后按顺序队列加载图片，每张图片加载时给个loading效果
function addImg(img) {
  $('#list').find('> li:last-child').html('').append(img);
}

function prepend() {
  $('<li>')
    .html('loading...')
    .appendTo($('#list'));
};

function run() {
  $('#done').hide();
  getData('map.json')
    .then(function (data) {
      $('h4').html(data.name);

      return data.list.reduce(function (promise, item) {
        return promise
          .then(prepend)
          .then(sleep(1000))
          .then(function () {
            return getImg(item.url);
          })
          .then(addImg);
      }, Promise.resolve());
    })
    .then(sleep(300))
    .then(function () {
      $('#done').show();
    });
};

$('#run').on('click', run)