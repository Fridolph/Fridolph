针对节点的操作有几个重点的细节：

保证最终操作的永远是dom元素，浏览器的最终API只认识那么几个接口，所以如果传递是字符串或者其他的，当然需要转换
针对节点的大量操作，我们肯定是需要引入文档碎片做优化的，这个必不可少
我们知道jQuery的的接口是支持多种参数传递的，那么就需要有一个过滤器的中介来处理各种参数类型。

这个任务就交给了domManip，除此之外domManip在设计上需要做的处理：

1. 解析参数，字符串，函数，对象
2. 针对大数据引入文档碎片处理
3. 如果参数中包含script的处理

其中还有很多细节的问题：

1. IE下面innerHTML会忽略没作用域元素,no-scope element(script,link,style,meta,noscript)等，所以这类通过innerHTML创建需要加前缀

2. innerHTML在IE下面会对字符串进行trimLeft操作，去掉空白

3. innerHTML不会执行脚本的代码，如果支持defer除外

4. 很多标签不能作为div的子元素、td、tr, tbody等等

5. jQuery是合集对象，文档碎片的与事件的复制问题

 

针对innerHTML不会执行脚本的代码，如果支持defer除外的解释：

    div.innerHTML = "<script>alert(1)</srcript>" 
这个代码不会执行

例外的情况：IE9之前满足几个条件

1. script设定defer属性

2. script元素必须位于有作用域元素之后，因为script被认为是无作用域的（页面中不可见）

换句话说，这样设置

    div.innerHTML = "<div><script defer>alert(1)</srcript></div>"  
可以执行
jQuery在内部通过会有一个domManip方法，把这些问题都方方面面处理掉了

 

综合上面一系列的问题，jQuery引入了domManip方法

原因清楚了，我们再来看jQuery是如何处理tbody问题，jQuery是兼容IE 6浏览器的。append、prepend、before和after都是操作Dom元素的函数，如果被插入的对象是table，那就要在table中加入tbody标签啊

所以domManip，主要是处理这个问题的，他还处理插入元素的顺序等等

在结构上首先用extend在原型上拓展了一堆方法，其实每一个的实现都很简单，重点就是要看懂domManip的使用。可以重点挑两个方法的实现看一看，不用每个都看。

然后就是appendTo和append之类的处理，大同小异，因为实现差不多，所以就放在一起了

    jQuery.fn.extend({ 
         text: function() {}, 
         append: function() {}, 
         prepend: function() {}, 
         before: function() {}, 
         after: function() {}, 
         clone: function() {}, 
         html: function() {},   
         replaceWith: function() {},  
         domManip: function() {},  
    })

其中append方法：

    append: function() {
        return this.domManip(arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.appendChild(elem);
            }
        });
    }

####1:函数调用了domManip函数，传进去的参数第一个是arguments，这个大家都知道arguments是函数参数对象，是一个类数组对象。这里arguments可能是包含dom元素的数组，或者html字符串

####2:第二参数是一个回调函数，target.appendChild(elem);看到这个代码就很明了，在回调函数中分离各自的处理方法，通过domManip抽象出公共的处理，其余的prepend 、before 、after等接口也是类似的处理



    <script type="text/javascript">
        /**
         *  一个简单的流程
         *  用于描述文档处理的设计结构与流程
         * * 
         */
        function buildFragment(elems, context) {
            var fragment = context.createDocumentFragment(),
                nodes = [],
                i = 0,
                elem,
                l = elems.length;

            for (; i < l; i++) {
                elem = elems[i];
                //创一个元素div做为容器
                tmp = fragment.appendChild(context.createElement("div"));
                //放到文档碎片中
                tmp.innerHTML = elem;   
            }
            return fragment;
        }

        function domManip(parentEles, target, callback) {
            var l = parentEles.length;
            var iNoClone = l - 1;

            if (l) {
                var fragment = buildFragment([target], parentEles[0].ownerDocument);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first) {
                    callback.call(parentEles, first);
                }
            }

        }
        
        function append(parentEles, target) {
            return domManip([parentEles], target, function(elem) {
                parentEles.appendChild(elem)
            });
        }

        $("button").click(function(){
            append(document.getElementById('test'),'<div>通过append加入</div>' )
        })
    </script>