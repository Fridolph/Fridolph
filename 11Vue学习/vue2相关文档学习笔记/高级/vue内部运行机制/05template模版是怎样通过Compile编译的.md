## template模版是怎样通过Compile编译的

`compile`编译可分成`parse`、`optimize`与`generate`三个阶段，最终需要得到render function。这部分内容不算Vue响应式核心，只是用来编译的。我们在精力有限的情况下不需要追究其全部实现细节，能把握如何解析的大致流程即可。

<img src="https://user-gold-cdn.xitu.io/2017/12/19/1606ec3d306ab28f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

由于解析过程较复杂。我们用一个简单的template示例，以此来看解析过程。

```html
<div :class="c" class="demo" v-if="isShow">
  <span v-for="item in sz">{{item}}</span>
</div>
```

```js
var html = '<div :class="c" class="demo" v-if="isShow"><span v-for="item in sz">{{item}}</span></div>'
```

下面的过程都会依赖此示例来进行。

### parse

首先是`parse`，parse会用正则等方式将template模版中进行字符串解析，得到指令、class、style等数据，形成AST。

> 在计算机科学中，抽象语法树 abstract syntax tree 或 syntax tree，是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。

该过程较复杂（各种正则解析），我们来看一下得到是AST的样子

```js
{
  // 标签属性的map，记录了标签上的属性
  attrsMap: {
    ':class': 'c',
    class: 'demo',
    'v-if': 'isShow'
  },  
  classBinding: 'c',    // 解析得到的:class
  ['if']: 'isShow',     // 标签属性v-if
  ifConditions: [
    exp: 'isShow'
  ],
  staticClass: 'demo',  // 标签属性class
  tag: 'div',           // 标签的tag名
  children: [           // 子标签数组
    {
      attrsMap: {
        'v-for': 'item in sz'
      },      
      alias: 'item',    // for循环的参数      
      for: 'sz',        // for循环的对象      
      forProcessed: true,     // for循环是否已经被处理的标记位
      tag: 'span',
      children: [
          // 表达式，_s是一个转字符串的函数
        {            
          expression: '_s(item)',
          text: '{{item}}'
        }
      ]
    }
  ]
}
```

最终得到的AST通过一些特定的属性，能够比较清晰地描述出标签的属性以及依赖关系。
接下来，我们用代码来讲解一下如何用正则来把template编译成我们需要的AST：


### 正则

首先我们定义接下来会用到的正则：

```js
const ncname = `[a-zA-Z_][\\w\\-\\.]*` // 字母下划线开头的任意字符 可接 - .
const singleAttrIdentifier = /([^\s"'<>/=]+)/  // 除了 空格 " ' < > / = 开头的任意字符
const singleAttrAssign = /(?:=)/ // 匹配 = 
const singleAttrValues = [
  /"([^"]*)"+/.source,
  /'([^']*)'+/.source,
  /([^\s"'=<>`]+)/.source
]
const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)
const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/
```

### advance

因为我们解析template采用循环进行字符串匹配的方式，所以每匹配解析完一段我们需要将已经匹配掉的去掉，头部的指针指向接下来需要匹配的部分。

```js
function advance(n) {
  index += n
  html = html.substring(n)
}
```

举例，当我们把第一个div的头标签全部匹配完毕以后，我们需要将这部分除去，也就是向右移动43个字符

<img src="https://user-gold-cdn.xitu.io/2018/1/7/160d00562f38ab39?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

调用`advance`函数

    advance(43);

得到结果:

<img src="https://user-gold-cdn.xitu.io/2018/1/7/160d0058331006a5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">


### parseHTML

首先我们定义个`parseHTML`函数，在里面我们循环解析template字符串

```js
function parseHTML() {
  while(html) {
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      if (html.match(endTag)) {
        // process end tag
        continue
      }
      if (html.match(startTagOpen)) {
        // process start tag
        continue
      }      
    } else {
      // process text
      continue
    }
  }
}
```

`parseHTML`会用`while`来循环解析template，用正则在匹配到标签头、标签尾以及文本的时候分别进行不同的处理。直到整个template被解析完成。

### parseStartTag

我们来写一个`parseStartTag`函数，用来解析起始标签 `（"<div :class="c" class="demo" v-if="isShow">"部分的内容）`

```js
function parseStartTag() {
  const start = html.match(startTagOpen)
  if (start) {
    const match = {
      tagName: start[1],
      attrs: [],
      start: index
    }
    advance(start[0].length)
    
    let end, attr
    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      advance(attr[0].length)
      match.attrs.push({
        name: attr[1],
        value: attr[3]
      })
    }
    if (end) {
      match.unarySlash = end[1]
      advance(end[0].length)
      match.end = index
      return match
    }
  }
}
```

首先用`startTagOpen`正则得到标签的头部，可以得到tagName标签名称，同时我们需要一个数组`attrs`用来存放标签内的属性。

```js
const start = html.match(startTagOpen)
const match = {
  tagName: start[1],
  attrs: [],
  start: index
}
advance(start[0].length)
```

接下来使用`startTagClose`与`attribute`两正则分别用来解析标签结束以及标签内的属性。这段代码用while循环一直匹配到`startTagClose`为止，解析内部所有的属性。

```js
let end, attr
while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
  advance(attr[0].length)
  match.attrs.push({
    name: attr[1],
    value: attr[3]
  })
}
if (end) {
  match.unarySlash = end[1]
  advance(end[0].length)
  match.end = index
  return match
}
```

### stack

此外，我们需要维护一个stack栈来保存已经解析好的标签头，这样我们可以根据在解析尾部标签的时候所得到所属的层级关系以及父标签。同时我们定义一个`currentParent`变量用来存放当前标签的父标签节点的引用，`root`变量用来指向根标签节点。

```js
const stack = []
let currentParent, root
```

<img src="https://user-gold-cdn.xitu.io/2018/1/7/160d0f34a5642ce8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

知道这个以后，我们优化一下 `parseHTML` ，在 `startTagOpen` 的 if 逻辑中加上新的处理。

```js
if (html.match(startTagOpen)) {
  const startTagMatch = parseStartTag();
  const element = {
    type: 1,
    tag: startTagMatch.tagName,
    lowerCasedTag: startTagMatch.tagName.toLowerCase(),
    attrsList: startTagMatch.attrs,
    attrsMap: makeAttrsMap(startTagMatch.attrs),
    parent: currentParent,
    children: []
  }

  if(!root){
    root = element
  }

  if(currentParent){
    currentParent.children.push(element);
  }

  stack.push(element);
  currentParent = element;
  continue;
}
```

我们将 `startTagMatch` 得到的结果首先封装成 element ，这个就是最终形成的 AST 的节点，标签节点的 type 为 1。

```js
const startTagMatch = parseStartTag();
const element = {
  type: 1,
  tag: startTagMatch.tagName,
  attrsList: startTagMatch.attrs,
  attrsMap: makeAttrsMap(startTagMatch.attrs),
  parent: currentParent,
  children: []
}
```

然后让 root 指向根节点的引用

```js
if(!root){
  root = element
}
```

接着我们将当前节点的 element 放入父节点 currentParent 的 children 数组中。

```js
if(currentParent){
  currentParent.children.push(element)
}
```


最后将当前节点 element 压入 stack 栈中，并将 currentParent 指向当前节点，因为接下去下一个解析如果还是头标签或者是文本的话，会成为当前节点的子节点，如果是尾标签的话，那么将会从栈中取出当前节点，这种情况我们接下来要讲。

```js
stack.push(element)
currentParent = element
continue
```

其中的 makeAttrsMap 是将 attrs 转换成 map 格式的一个方法。

```js
function makeAttrsMap(attrs) {
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}
```

### parseEndTag

同样，我们在`parseHTML`中加入对尾标签的解析函数，为了匹配如 `</div>`

```js
const endTagMatch = html.match(endTag)
if (endTagMatch) {
  advance(endTagMatch[0].length)
  parseEndTag(endTagMatch[1])
  continue
}
```

用 parseEndTag 来解析尾标签，它会从 stack 栈中取出最近的跟自己标签名一致的那个元素，将 currentParent 指向那个元素，并将该元素之前的元素都从 stack 中出栈。

这里可能有同学会问，难道解析的尾元素不应该对应 stack 栈的最上面的一个元素才对吗？

其实不然，比如说可能会存在自闭合的标签，如 `<br />`，或者是写了`<span>`但是没有加上`</span>`的情况，这时候就要找到 stack 中的第二个位置才能找到同名标签。

```js
function parseEndTag(tagName) {
  let pos
  for (pos = stack.length - 1; pos >= 0; pos--) {
    if (stack[pos].lowerCaseTag === tagName.toLowerCase()) {
      break
    }
  }
  if (pos >= 0) {
    stack.length = pos
    currentParent = stack[pos]
  }
}
```

---

接parseText = =确实不懂，先暂时跳过，以后再回来弄了