* jQuery 实现 todo-list

```html
<div>
  <input type="text" name=""  id="txt-title" />
  <button id="btn-submit">submit</button>
</div>
<ul id="ul-list"></ul>
<scirpt src="./jquery.min.js"></scirpt>
<script>
  var $txt = $('#txt-title')
  var $btn = $('#btn-submit')
  var $list = $('#ul-list')
  $btn.on('click', () => {
    var title = $txt.val()
    var $li = $(`<li>${title}</li>`)
    $list.append($li)
    $txt.val('')
  })
</script>
```

* vue 实现 todo-list

```html
<div id="root">
  <input v-model="title">
  <button @click="add">添加</button>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
<script src="https://cdn.bootcss.com/vue/2.2.1/vue.min.js"></script>
<script>
  console.log(Vue)
  var vm = new Vue({
    el: '#root',
    data: {
      title: '',
      list: []
    },
    methods: {
      add: function() {
        if (!this.title) return
        this.list.push(this.title)
        this.title = ''
      }
    }
  })
</script>
```

## 两者间的区别

* 数据和视图的分离
* 以数据驱动视图

开放封闭原则