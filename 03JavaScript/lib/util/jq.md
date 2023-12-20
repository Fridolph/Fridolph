# jQuery 库中的 $() 是什么？
返回jquery对象

# 网页上有 5 个元素，如何使用 jQuery来选择它们？
$$("*")

# jQuery 里的 ID 选择器和 class 选择器有何不同？
$("#id")  $(".class")

# 如何在点击一个按钮时使用 jQuery 隐藏一个图片？
$(btn).on('click', (e) => {
  e.preventDefault();
  $("#img").hide('fast');
})

# $(document).ready() 是个什么函数？为什么要用它？
文档处于ready状态时就执行代码，适用于所有浏览器

# JavaScript window.onload 事件和 jQuery ready 函数有何不同？
window.onload = function() {
  ... 阻塞进程   等待资源完全加载
}

$(function() {
  不阻塞  只用等待DOM树，跑起来更快，多次调用
});

# 如何找到所有 HTML select 标签的选中项？
$("[select] :selected")

# jQuery 里的 each() 是什么函数？你是如何使用它的？
$("div").each(function(item) {
  迭代函数  可用于循环
});

# 你是如何将一个 HTML 元素添加到 DOM 树中的？
var elem = document.createElement("div");
elem.innerHTML = 'div';
document.body.appendChild(elem);

# 你能用 jQuery 代码选择所有在段落内部的超链接吗？
$("a[href]")

# $(this) 和 this 关键字在 jQuery 中有何不同？
this原生，返回调用时指向的对象   $(this)返回jquery对象

# 你如何使用jQuery来提取一个HTML 标记的属性 例如. 链接的href?
$("a").each(function() {
  console.log($(this).attr('href'));
})

# 你如何使用jQuery设置一个属性值?
$("jquery").attr('attrName', 'name')

# jQuery中 detach() 和 remove() 方法的区别是什么?

# 你如何利用jQuery来向一个元素中添加和移除CSS类?
$("elem").removeClass()

# 使用 CDN 加载 jQuery 库的主要优势是什么 ?
快，压缩，缓存

# jQuery.get() 和 jQuery.ajax() 方法之间的区别是什么?
$.get()封装过  $.ajax()相对更底层

# jQuery 中的方法链是什么？使用方法链有什么好处？
代码量少，返回当前对象

# 你要是在一个 jQuery 事件处理程序里返回了 false 会怎样？


# 哪种方式更高效：document.getElementbyId("myId") 还是 $("#myId")？
当然是原生