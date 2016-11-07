我们考虑下面的一个例子：

    var div = document.querySelectorAll('div')[0];
    div.innerHTML = "<script>alert('慕课网')";
这样JavaScript 不会执行。换句话能插入script标签，但是不执行脚本代码，但是在早起的ie下面，如果设置了defer是另外，这个后面单独讲innerHTML的缺陷会提到


如果我们换成jQuery的appned方法：这样的处理代码就执行了，可见jQuery的方法内部可不是那么简单的处理了

    $('div').append("<script>alert('慕课网')")
简单讲，如果.html()传入的字符串有

<script> <object> <embedt> <optiont> <style>
其中一个 .html()方法就不会用innerHTML 操作，而是用jQuery.append() 处理字符串塞入

.append()-> .domManip() -> buildFragment() ->clean() 这样的处理流程

clean() 中会动态产生一个div， 将div 的innerHTML 设为传入的字符串，再用getElementsByTagName('script') 的方式把所有的script 抓出来另行储存

clean() 执行完毕回到domManip() 中， domManip() 再将script 们一一拿出来执行

如果是外部js 就动态载入，如果是内联 js 就用eval()

总结下来，domManip主要就做了两件事：

1.根据用户传入的参数，创建了多个fragment，然后通过回调函数参数传入
2.控制script的执行过程，在创建fragment的时候不执行，最后dom操作结束后会统一执行