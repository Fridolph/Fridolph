此跨域方法和上面介绍的比较类似，一样是动态插入一个iframe然后设置其src为服务端地址，而服务端同样输出一端js代码，也同时通过与子窗口之间的通信来完成数据的传输。
关于锚点相信大家都已经知道了，其实就是设置锚点，让文档指定的相应的位置。锚点的设置用a标签，然后href指向要跳转到的id，当然，前提是你得有个滚动条，不然也不好滚动嘛是吧。
而location.hash其实就是url的锚点。比如http://www.nealyang.cn#Nealyang的网址打开后，在控制台输入location.hash就会返回#Nealyang的字段。
基础知识补充完毕，下面我们来说下如何实现跨域
如果index页面要获取远端服务器的数据，动态的插入一个iframe，将iframe的src执行服务器的地址，这时候的top window 和包裹这个iframe的子窗口是不能通信的，因为同源策略，所以改变子窗口的路径就可以了，将数据当做改变后的路径的hash值加载路径上，然后就可以通信了。将数据加在index页面地址的hash上，index页面监听hash的变化，h5的hashchange方法

```html
<body>
  <script type="text/javascript">
    function getData(url, fn) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;

      iframe.onload = function() {
        fn(iframe.contentWindow.location.hash.substring(1));
        window.location.hash = '';
        document.body.removeChild(iframe);
      };

      document.body.appendChild(iframe);
    }

    // get data from server
    var url = 'http://localhost:8080/data.php';
    getData(url, function(data) {
      var jsondata = JSON.parse(data);
      console.log(jsondata.name + ' ' + jsondata.age);
    });
  </script>
</body>
```

> 补充说明：其实location.hash和window.name都是差不多的，都是利用全局对象属性的方法，然后这两种方法和jsonp也是一样的，就是只能够实现get请求
