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

9种用法整体来说可以分三大块：**选择器**、**dom的处理**、**dom加载**。