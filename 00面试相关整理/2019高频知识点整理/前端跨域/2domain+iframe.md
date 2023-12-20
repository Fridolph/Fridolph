这种跨域的方式最主要的是要求主域名相同。什么是主域名相同呢？

- www.fridolph.wang
- blog.fridolph.wang
- resume.fridolph.wang

这三个主域名都是 fridolph.wang , 而主域名不同的就不能用此方法。

假设目前a.nealyang.cn 和 b.nealyang.cn 分别对应指向不同ip的服务器。

a.nealyang.cn 下有一个test.html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>html</title>
  <script type="text/javascript" src = "jquery-1.12.1.js"></script>
</head>
<body>
  <div>A页面</div>
  <iframe
  style = "display : none"
  name = "iframe1"
  id = "iframe"
  src="http://b.nealyang.cn/1.html" frameborder="0"></iframe>
  <script type="text/javascript">
      $(function(){
          try{
              document.domain = "fridolph.wang"
          }catch(e){
            
          }
          $("#iframe").load(function(){
              var jq = document.getElementById('iframe').contentWindow.$
              jq.get("http://nealyang.cn/test.json",function(data){
                  console.log(data);
              });
          })
      })
  </script>
</body>
</html>
```

利用 iframe 加载 其他域下的文件（nealyang.cn/1.html）, 同时 document.domain 设置成 nealyang.cn ，当 iframe 加载完毕后就可以获取 nealyang.cn 域下的全局对象，
此时尝试着去请求 nealyang.cn 域名下的 test.json （此时可以请求接口），就会发现数据请求失败了~~ 惊不惊喜，意不意外！！！！！！！
