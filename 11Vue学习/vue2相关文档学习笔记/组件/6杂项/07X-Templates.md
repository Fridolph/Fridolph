另一种定义模版的方式是在 JavaScript 标签里使用 text/x-template 类型，并且指定一个id。例如：

<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>


Vue.component('hello-world', {
  template: '#hello-world-template'
})


这在有很多模版或者小的应用中有用，否则应该避免使用，因为它将模版和组件的其他定义隔离了。