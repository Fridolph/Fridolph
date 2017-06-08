大多数jQueryDOM遍历方法来操作jQuery对象实例，并创建一个新的对象，匹配一个不同的DOM元素集合。当发生这种情况时，实际上是新的元素集合被压入到对象内部维护的栈中。每次过滤方法都会被压入栈中。当我们需要返回到前一个状态时，我们可以使用end()进行出栈操作，来返回栈中的前一个状态。

end()方法主要用于jQuery的链式属性中。当没有使用链式用法时，我们通常只是调用变量名上的前一个对象，所以我们不需要操作栈。
使用end()时，我们可以一次性调用所有需要的方法：

链式的原理就是要返回当前操作的上下文。

总的来说：end方法就是回溯到上一个Dom合集,因此对于链式操作与优化，这个方法还是很有意义的。

源码实现：

既然是回溯到上一个DOM合集，那么肯定end方法中返回的就是一个jQuery对象了，所以我们看源码其实就是返回prevObject对象了

    end: function() {
      return this.prevObject || this.constructor(null)
    }

**prevObject在什么情况下会产生？**

在构建jQuery对象的时候，通过pushStack方法构建，如下代码：

<script>
jQuery.fn.extend({
  find: function(selector) {
    // ... 省略
    // 通过sizzle选择器，返回结果集
    jQuery.find(selector, self[i], ret);

    // Needed because $(selector, context) becomes $(context).find(selector)
    ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
    ret.selector = this.selector ? this.selector + ' ' + selector : selector;

    return ret;
  }
})
</script>

可以看到通过jQuery.find得到了结果ret这个就是通过纯的DOM节点，那么如果变成一个jQuery对象呢？

接着我们看pushStack对象，作用就通过新的DOM元素去创建一个新的jQuery对象

<script>
pushStack: function(elems) {
  // build a new jQuery matched element set 
  var ret = jQuery.merge(this.constructor(), elems);

  // add the old object onto the stack (as a reference)
  ret.prevObject = this;
  ret.context = this.context;

  // return the newly-formed element set
  return ret;
}
</script>

流程解析：

1. 首先创建一个新的jQuery对象，因为constructor是指向构造器的，所以这里就等同于调用jQuery()方法了，返回一个新的jQuery对象
2. 然后用jQuery.merge语句把elems节点合并到新的jQuery对象上
3. 最后给返回的新jQuery对象添加prevObject属性，我们看到prevObject其实还是当前jQuery的一个引用罢了，所以也就是为什么通过prevObject能取到上一个合集的原因