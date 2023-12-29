自定义指令的选项是由几个钩子函数组成的，每个都是可选的

* bind 只调用一次， 指令第依次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
* inserted 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）
* update 被绑定元素所在的模版更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
* componentUpdated 被绑定元素所在模板完成一次更新周期时调用
* unbind 只调用一次，指令与元素解绑时调用

---

每个钩子函数都有几个参数可用

* el 指令所绑定元素，可用来直接操作DOM
* vnode Vue编译升哼的虚拟节点
* oldVnode 上一个虚拟节Ian仅在update和componentUpdated钩子中可用
* binding 一个对象，包括以下属性:
  name 指令名，不包括v-前缀
  value 指令绑定值 例如 v-my-directive="1+1" value值为2
  oldValue 指令绑定前一个值，仅在update和componentUpdated钩子中可用，无论值是否改变都可用
  expression 绑定值的字符串形式，例如v-my-directive="1+1" expreesion的值是 "1+1"
  arg 传给指令的参数，例如 v-my-directive:foo  arg的值是foo
  modifiers 一个包含修饰符的对象，例如v-my-directive.foo.bar 修饰符对象modifiers值为{foo:true, bar:true}

