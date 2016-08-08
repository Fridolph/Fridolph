DOM原生的接口是即简单又单一，参数类型确定，也不会重载，每次只会处理一个元素。在看jQuery完全反其道而行之参数复杂多样，接口重载厉害。如果一次传递N多的节点元素那么在处理上要优化就必须引入文档碎片了。

我们知道用文档碎片无非就是先创建：

fragment = context.createDocumentFragment()
然后把所有需要处理的dom节点给appendChild进去：

buildFragment对于文档碎片的创建，可以看到被切分了2个部分：

先看第一部分代码，收集节点元素：

    var $newdiv1 = $('<div id="object1"/>'),
        newdiv2 = document.createElement('div'),
        existingdiv1 = document.getElementById('foo');
    $('body').append($newdiv1, [newdiv2, existingdiv1,'<td>慕课网</td>','文本','<script>alert(1)'])

这段代码包含了六种不同的类型的参数，基本覆盖了所有了buildFragment的处理其实很简单，我们只需要把不同类型的参数分解后，压入到文档碎片就可以了，当然因为类型的不同处理的方式也有不同。

比如常见的几个问题：

IE对字符串进行trimLeft操作，其余是用户输入处理, 很多标签不能单独作为DIV的子元素, td、th、tr、tfoot、tbody等等,需要加头尾：

<td>慕课网</td>
jQuery通过wrapMap转化成，否则有些会当成普通文本来解释：

"<table><tbody><tr><td>慕课网</td></tr></tbody></table>"
我们参考右边的代码，整个流程如下：

1. 分解类型，jQuery对象，节点对象，文本，字符串，脚本
2. 引入nodes收集各种分解的类型数据
3. 针对html节点，兼容IE的处理，先过滤空白，然后补全tr,td等
4. 创建文档碎片的div包含节点，把html结构给innerHTML进去
5. 取出创建的节点，jQuery.merge(nodes, tmp.childNodes)，因为靠div包装过

    function buildFragment(elems, context) {
        var elem, tmp, tag, wrap, contains, j,
          fragment = context.createDocumentFragment(),
          nodes = [],
          i = 0,
          l = elems.length;
    //筛选出不同类型的节点
    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          // 如果是jQuery对象
          // 如果是普通元素对象加[elem]
          // 取出ele放入nodes数组中
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          // 没有html结构，是一个文本节点
        } else if (!/<|&#?\w+;/.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          //创一个元素div做为容器
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (/<([\w:]+)/.exec(elem) || ["", ""])[1].toLowerCase();
          //ie对字符串进行trimLeft操作，其余是用户输入处理
          //很多标签不能单独作为DIV的子元素
          //td,th,tr,tfoot,tbody等等,需要加头尾
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

          // Descend through wrappers to the right content
          // 因为warp被包装过
          // 需要找到正确的元素父级
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          // Support: QtWebKit
          // jQuery.merge because push.apply(_, arraylike) throws
          // 把节点拷贝到nodes数组中去
          jQuery.merge(nodes, tmp.childNodes);
        }
      }
    }
    i = 0;
    while ((elem = nodes[i++])) {
      fragment.appendChild(elem)
    }
    return fragment;
  }

