var popType = {
  userReg: {
    title: 'Create your account'
  },
  favHouse: {
    title: 'Add home to favorite'
  },
  saveSearch: {
    title: 'Save this search'
  }
}

var tpl = `<section><h1>{{title}}</h1></section>`

Mustache.render(tpl, popType['userReg'])

// 把回调操作封装成一个策略
var popCallback = {
  userReg: function() {},
  favHouse: function() {},
  saveSearch: function() {}
}

util.ajax('/register', function() {
  var popType = 'favHouse' // 获取popType
  popCallback[popType]
})