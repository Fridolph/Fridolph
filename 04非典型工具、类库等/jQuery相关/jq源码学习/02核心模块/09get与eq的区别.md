# get 与 eq 的区别

.eq() 减少匹配元素的集合，根据index索引值，精确指定索引对象
.get() 通过检索匹配jQuery对象得到对应的DOM元素

同样是返回元素，那么eq与get有什么区别呢？

eq返回的是一个jQuery对象，get返回的是一个DOM对象

get方法本质是把jQuery对象转换成DOM对象，但是css属性jQuery构造器的，DOM是不存在这个方法的

eq()的实现原理就是在上面代码中的把eq方法内部转成jQuery对象：

    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);

      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    }

上面试下你代码的逻辑就是跟get是一样的，区别是通过pushStack产生了一个新的jQuery对象

jQuery考虑很周到，通过eq方法只能产生一个新的对象，但是如果需要的是一个合集对象要怎么处理？ 
因此jQuery便提供了一个slice方法：

    .slice(start, [, end])

作用：

根据指定的小下标范围，过滤匹配的元素集合，并合成一个新的jQuery对象

因为是数组对象，意味着我们可以用slice来直接取值了，所以针对合体对象我们可以写下面的代码：

<script>
var arr = [];
arr.push(this.slice(start[, end]))
this.pushStack(arr)
</script>

这个this指的是jQuery对象，因为jQuery对象是数组集合，所以我们可以通过原生的slice方法直接取到集合数，然后通过包装处理即可了

    slice: function() {
      return this.pushStack(slice.apply(this, arguments))
    }