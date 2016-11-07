对于节点的创建innerHTML是一个很高效的接口。jQuery在节点操作上使用了innerHTML，创建效率上来说至少比createElement快了2-10倍不等，而且还能一次性生成一堆的节点，但是随之而来就有一些兼容性问题，

我总结了有以下几点，当然兼容上也结合了jQuery的解决方案。

1. IE会对用户字符串进行trimLeft操作，用户可能的本意就是需要空白
2. IE8有些元素innerHTML是只读
3. IE会忽略开头的无作用域元素
4. 大多情况下不执行script脚本,当然如果支持defer的IE9之前的浏览器除外
5. 一些标签不能作为div的子元素，如tr,tb, col等

jQuery的节点操作最终是需要转化成文档碎片也就是要通过buildFragment()方法处理的，所以innerHTML兼容的修复也自然在buildFragment方法中。

我们弄清了缘由再去分析，其实整个修正的代码就很简单了。

1：首先无作用域的问题，通过文档碎片创建一个div的包含容器，让所有的元素都被div元素给包含起来，包括script，style等无作用域的元素，很好的解决了

tmp = tmp || fragment.appendChild(context.createElement("div"));
tmp.innerHTML = elem
2：针对不支持innerHTML属性的元素，给单独提出来，通过正则抽出来这个节点名字去处理

wrapMap = ｛
     tr: [2, "<table><tbody>", "</tbody></table>"],
｝
tag = /<([\w:]+)/.exec(‘<tr>慕课网</tr>’)
wrap = wrapMap[tag] || wrapMap._default;
tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
如果遇到wrapMap[‘tr’]的标签就会自动包装一层节点，这样达到支持。


    /**
       * 修正innerHTML的缺陷
       * @return {[type]} [description]
       */
      function buildFragment(elem) {
        var nodes = [];
        var fragment = document.createDocumentFragment();
        var tmp = tmp || fragment.appendChild(document.createElement("div"));
        tag = (/<([\w:]+)/.exec(elem) || ["", ""])[1].toLowerCase();
        wrap = wrapMap[tag] || wrapMap._default;
        tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
        j = wrap[0];
        while (j--) {
          tmp = tmp.lastChild;
        }
        jQuery.merge(nodes, tmp.childNodes);
        document.body.appendChild(tmp)
      }