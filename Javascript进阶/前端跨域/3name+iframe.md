window.name属性可设置或者返回存放窗口名称的一个字符串。他的神器之处在于name值在不同页面或者不同域下加载后依旧存在，没有修改就不会发生变化，并且可以存储非常长的name(2MB)
假设index页面请求远端服务器上的数据，我们在该页面下创建iframe标签，该iframe的src指向服务器文件的地址（iframe标签src可以跨域），服务器文件里设置好window.name的值，然后再在index.html里面读取改iframe中的window.name的值。完美~

```html
<body>
  <script type="text/javascript">
    iframe = document.createElement('iframe'),
    iframe.src = 'http://localhost:8080/data.php';
    document.body.appendChild(iframe);
    iframe.onload = function() {
      console.log(iframe.contentWindow.name)
    };
  </script>
</body>
```


因为规定如果index.html页面和和该页面里的iframe框架的src如果不同源，则也无法操作框架里的任何东西，所以就取不到iframe框架的name值了，告诉你我们不是一家的，你也休想得到我这里的数据。
既然要同源，那就换个src去指，前面说了无论怎样加载window.name值都不会变化，于是我们在index.html相同目录下，新建了个proxy.html的空页面，修改代码如下：

```html
<body>
  <script type="text/javascript">
    iframe = document.createElement('iframe'),
    iframe.src = 'http://localhost:8080/data.php';
    document.body.appendChild(iframe);
    iframe.onload = function() {
      iframe.src = 'http://localhost:81/cross-domain/proxy.html';
      console.log(iframe.contentWindow.name)
    };
  </script>
</body>
```

理想似乎很美好，在iframe载入过程中，迅速重置iframe.src的指向，使之与index.html同源，那么index页面就能去获取它的name值了！但是现实是残酷的，iframe在现实中的表现是一直不停地刷新，
也很好理解，每次触发onload时间后，重置src，相当于重新载入页面，又触发onload事件，于是就不停地刷新了（但是需要的数据还是能输出的）。修改后代码如下：

```html
<body>
  <script type="text/javascript">
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    var state = 0;

    iframe.onload = function() {
      if(state === 1) {
          var data = JSON.parse(iframe.contentWindow.name);
          console.log(data);
          iframe.contentWindow.document.write('');
          iframe.contentWindow.close();
        document.body.removeChild(iframe);
      } else if(state === 0) {
          state = 1;
          iframe.contentWindow.location = 'http://localhost:81/cross-domain/proxy.html';
      }
    };

    iframe.src = 'http://localhost:8080/data.php';
    document.body.appendChild(iframe);
  </script>
</body>
```

## 小结

- iframe标签跨域能力
- window.names属性值在文档刷新后依然存在的能力
