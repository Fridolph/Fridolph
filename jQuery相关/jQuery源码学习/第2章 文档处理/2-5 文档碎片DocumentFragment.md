文档碎片是什么？

参考标准的描述，DocumentFragment是一个轻量级的文档对象，能够提取部分文档的树或创建一个新的文档片段，换句话说有文档缓存的作用。

createDocumentFragment有什么作用

多次使用节点方法(如：appendChild)绘制页面，每次都要刷新页面一次。效率也就大打折扣了，而使用document_createDocumentFragment()创建一个文档碎片，把所有的新结点附加在其上，然后把文档碎片的内容一次性添加到document中，这也就只需要一次页面刷新就可以了。

DocumentFragment类型

在所有节点类型中，只有DocumentFragment在文档中没有对应的标记。DOM规定文档片段（documentfragment）是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外资源。DocumentFragment节点具有下列特征：

1. nodeType的值为11
2. nodeName的值为“#document-fragment”
3. nodeValue的值为 null
4. parentNode的值为 null
5. 子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或 EntityReference
虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将来可能会添加到文档中的节点。要创建文档片段，可以使用 document.createDocumentFragment()方法，如下所示：

var fragment = document.createDocumentFragment();
文档片段继承了Node的所有方法，通常用于执行那些针对文档的DOM操作。如果将文档中的节点添加到文档片段中，就会从文档树中再看到该节点。添加到文档片段中的新节点同样也不属于文档树。可以通过appendChild()或insertBefore()将文档片段中内容添加到文档中。在将文档片段作为参数传递给这两个方法时，实际上只会将文档片段的所有子节点添加到相应的位置上；文档片段本身永远不会称为文档树的一部分。

http://www.w3cmm.com/dom/documentfragment.html

createElement与createDocumentFragment

createElement是创建一个新的节点，createDocumentFragment是创建一个文档片段。

DocumentFragment 接口表示文档的一部分（或一段）。更确切地说，它表示一个或多个邻接的 Document 节点和它们的所有子孙节点。

DocumentFragment 节点不属于文档树，继承的 parentNode 属性总是 null。

不过它有一种特殊的行为，该行为使得它非常有用：

即当请求把一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点。这使得 DocumentFragment 成了有用的占位符，暂时存放那些一次插入文档的节点。它还有利于实现文档的剪切、复制和粘贴操作，尤其是与 Range 接口一起使用时更是如此。

可以用 Document.createDocumentFragment() 方法创建新的空 DocumentFragment 节点。

也可以用 Range.extractContents() 方法 或 Range.cloneContents() 方法 获取包含现有文档的片段的 DocumentFragment 节点。

除此之外，createElement创建的元素可以使用innerHTML，createDocumentFragment创建的元素使用innerHTML并不能达到预期修改文档内容的效果，只是作为一个属性而已。两者的节点类型完全不同，并且createDocumentFragment创建的元素在文档中没有对应的标记，因此在页面上只能用js中访问到。

createElement创建的元素可以重复操作，添加之后就算从文档里面移除依旧归文档所有，可以继续操作，但是createDocumentFragment创建的元素是一次性的，添加之后再就不能操作了，在之前domManip方法中提到的iNoClone多个节点操作需要克隆，就是因为文档碎片的特性引起的，大体了解了，我们看看jQuery对于节点操作的时候，加强版的文档碎片buildFragment。