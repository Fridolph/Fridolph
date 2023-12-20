首先我们看jQuery的入口都是统一的$, 通过传递参数的不同，实现了9种方法的重载：

1. jQuery([selector,[context]])
2. jQuery(element)
3. jQuery(elementArray)
4. jQuery(object)
5. jQuery(jQuery object)
6. jQuery(html,[ownerDocument])
7. jQuery(html,[attributes])
8. jQuery()
9. jQuery(callback)

9种用法整体来说可以分三大块：**选择器**、**dom的处理**、**dom加载**

<script>
  var aQuery = function(selector) {
    // 强制为对象
    if (!(this instanceof aQuery)) {
      return new aQuery(selector);
    }

    var elem = document.getElementById(/[^#].*/.exec(selector)[0]);
    this.length = 1;
    this[0] = elem;
    this.context = document;
    this.get = function(num) {
      return this[num];
    }
    
    return this;
  }
</script>


## jQuery的无new构建原理

函数aQuery() 内部首先保证了必须是通过new操作符构建。这样就能保证当前构建的是一个带有this的实例对象，既然是对象我们可以把所有的属性与方法作为对象的key与value的方式给映射到this上。
所以如上结构就可以模拟出jQuery这样的操作了，即可通过索引取值，也可以链式方法取值，但是这样的结构有很多缺陷，每次调用aJquery方法等于是创建了一个新的实例，那么类似get方法就要在每一个实例上重新创建，性能就大打折扣，所以jquery在结构上的优化不仅仅如此，除了实现**类数组结构、方法的原型共享**，而且还实现方法的**静态与实例的共存**