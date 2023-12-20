### 函数之url()

#### 内联Data URI图像

Stylus捆绑了一个可选函数，名叫url(), 其替换了字面上的url() 调用且使用base64 Data URIs有条件地内联它们

**示例**

通过 require('stylus').url 该函数本身是可用的，其接受一个options对象，当看到url()时，返回Stylus内部调用的函数。

.define(name, callback) 方法指定了一个可被调用的JS函数。在这种情况下，因为我们图片在 ./css/images中， 我们可以忽视 paths 选项（默认情况下，会查找相关要呈现的图像文件）
如果愿意，该行为是可以改变的。

stylus(str)
  .set('filename', __dirname + '/css/test.styl')
  .define('url', stylus.url())
  .render(function(err, css) {
    
  })

例如，想象图片在 ./public/images 我们想要使用 url(images/tobi.png)，可以传递 paths公共目录。
这样，它就成为了向上查找进程的一部分，同样，我们如果想替换为 url(tobi.png) 我们可以传递 paths: [__dirname + '/public/images']

stylus(str)
  .set('filename', __dirname + '/css/test.styl')
  .define('url', stylus.url({ paths: [__dirname + '/public'] }))
  .render(function() {

  })

#### 选项 options

limit 大小默认限制 30kb
paths 图像解析路径