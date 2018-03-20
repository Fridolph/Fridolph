with (this) {
  return _c('div', { attrs: { id: 'root' } }, [
    _c('input', {
      directives: [
        { name: 'model', rawName: 'v-model', value: title, expression: 'title' }
      ],
      domProps: { value: title },
      on: {
        input: function($event) {
          if ($ .target.composing) return
          title = $event.target.value
        }
      }
    }),
    _v(' '),
    _c('button', { on: { click: add } }, [_v('add')]),
    _v(' '),
    _c(
      'ul',
      _l(list, function(item, index) {
        return _c('li', { key: item + '-' + index }, [_v(_s(item))])
      })
    )
  ])
}

/*
 从 Vue 2.0开始支持预编译
 开发环境：写模版 -> 编译打包
 生产环境：JS
*/