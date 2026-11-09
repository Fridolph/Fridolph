# Vue 编译原理

> 文章内容为 Vue2，主要学习思路。Vue3 后面有文章了再整理吧。

## Vue 的版本

很多人使用 Vue 的时候，都是直接通过 vue-cli 生成的模板代码，并不知道 Vue 其实提供了两个构建版本。

- `vue.js` 完整版本，包含了模板编译的能力；
- `vue.runtime.js` 运行时版本，不提供模板编译能力，需要通过 `vue-loader` 进行提前编译。

简单来说，就是如果你用了 vue-loader ，就可以使用 vue.runtime.min.js，将模板编译的过程交过 vue-loader，如果你是在浏览器中直接通过 script 标签引入 Vue，需要使用 vue.min.js，运行的时候编译模板。

## 编译入口

了解了 Vue 的版本，我们看看 Vue 完整版的入口文件（src/platforms/web/entry-runtime-with-compiler.js）。

```js
// 省略了部分代码，只保留了关键部分
import { compileToFunctions } from './compiler/index'

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el) {
  const options = this.$options

  // 如果没有 render 方法，则进行 template 编译
  if (!options.render) {
    let template = options.template
    if (template) {
      // 调用 compileToFunctions，编译 template，得到 render 方法
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      )
      // 这里的 render 方法就是生成生成虚拟 DOM 的方法
      options.render = render
    }
  }
  return mount.call(this, el, hydrating)
}
```

再看看 ./compiler/index 文件的 compileToFunctions 方法从何而来。

```js
import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

// 通过 createCompiler 方法生成编译函数
const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions }
```

后续的主要逻辑都在 compiler 模块中，这一块有些绕，因为本文不是做源码分析，就不贴整段源码了。简单看看这一段的逻辑是怎么样的。

```js
export function createCompiler(baseOptions) {
  const baseCompile = (template, options) => {
    // 解析 html，转化为 ast
    const ast = parse(template.trim(), options)
    // 优化 ast，标记静态节点
    optimize(ast, options)
    // 将 ast 转化为可执行代码
    const code = generate(ast, options)
    return {
      ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns,
    }
  }
  const compile = (template, options) => {
    const tips = []
    const errors = []
    // 收集编译过程中的错误信息
    options.warn = (msg, tip) => {
      ;(tip ? tips : errors).push(msg)
    }
    // 编译
    const compiled = baseCompile(template, options)
    compiled.errors = errors
    compiled.tips = tips

    return compiled
  }
  const createCompileToFunctionFn = () => {
    // 编译缓存
    const cache = Object.create(null)
    return (template, options, vm) => {
      // 已编译模板直接走缓存
      if (cache[template]) {
        return cache[template]
      }
      const compiled = compile(template, options)
      return (cache[key] = compiled)
    }
  }
  return {
    compile,
    compileToFunctions: createCompileToFunctionFn(compile),
  }
}
```

## 主流程

可以看到主要的编译逻辑基本都在 `baseCompile` 方法内，主要分为三个步骤：

- `模板编译` Parse，将模板代码转化为 `AST`；
- `优化` Optimize，优化 AST，方便后续虚拟 DOM 更新；
- `生成` Generate，生成代码，将 AST 转化为可执行的代码

### 编译 Parse

首先看到 parse 方法，该方法的主要作用就是解析 HTML，并转化为 AST（抽象语法树）

::: tip AST 为一个树形结构的对象
每一层表示一个节点，第一层就是 div（tag: "div"）。div 的子节点都在 children 属性中，分别是 h2 标签、空行、button 标签。我们还可以注意到有一个用来标记节点类型的属性：type，这里 div 的 type 为 1，表示是一个元素节点，type 一共有三种类型：

- 元素节点；
- 表达式；
- 文本；

:::

#### 解析 HTML

parse 的整体逻辑较为复杂，我们可以先简化一下代码，看看 parse 的流程。

```js
import { parseHTML } from './html-parser'

export function parse(template, options) {
  let root
  parseHTML(template, {
    // some options...
    start() {}, // 解析到标签位置开始的回调
    end() {}, // 解析到标签位置结束的回调
    chars() {}, // 解析到文本时的回调
    comment() {}, // 解析到注释时的回调
  })
  return root
}
```

可以看到 parse 主要通过 parseHTML 进行工作，这个 parseHTML 本身来自于开源库：htmlparser.js，只不过经过了 Vue 团队的一些修改，修复了相关 issue。

下面我们一起来理一理 parseHTML 的逻辑。

```js
export function parseHTML(html, options) {
  let index = 0
  let last, lastTag
  const stack = []
  while (html) {
    last = html
    let textEnd = html.indexOf('<')

    // "<" 字符在当前 html 字符串开始位置
    if (textEnd === 0) {
      // 1、匹配到注释: <!-- -->
      if (/^<!\--/.test(html)) {
        const commentEnd = html.indexOf('-->')
        if (commentEnd >= 0) {
          // 调用 options.comment 回调，传入注释内容
          options.comment(html.substring(4, commentEnd))
          // 裁切掉注释部分
          advance(commentEnd + 3)
          continue
        }
      }

      // 2、匹配到条件注释: <![if !IE]>  <![endif]>
      if (/^<!\[/.test(html)) {
        // ... 逻辑与匹配到注释类似
      }

      // 3、匹配到 Doctype: <!DOCTYPE html>
      const doctypeMatch = html.match(/^<!DOCTYPE [^>]+>/i)
      if (doctypeMatch) {
        // ... 逻辑与匹配到注释类似
      }

      // 4、匹配到结束标签: </div>
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
      }

      // 5、匹配到开始标签: <div>
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
      }
    }
    // "<" 字符在当前 html 字符串中间位置
    let text, rest, next
    if (textEnd > 0) {
      // 提取中间字符
      rest = html.slice(textEnd)
      // 这一部分当成文本处理
      text = html.substring(0, textEnd)
      advance(textEnd)
    }
    // "<" 字符在当前 html 字符串中不存在
    if (textEnd < 0) {
      text = html
      html = ''
    }

    // 如果存在 text 文本
    // 调用 options.chars 回调，传入 text 文本
    if (options.chars && text) {
      // 字符相关回调
      options.chars(text)
    }
  }
  // 向前推进，裁切 html
  function advance(n) {
    index += n
    html = html.substring(n)
  }
}
```

上述代码为简化后的 parseHTML，while 循环中每次截取一段 html 文本，然后通过正则判断文本的类型进行处理，这就类似于编译原理中常用的有限状态机。每次拿到 "<" 字符前后的文本，"<" 字符前的就当做文本处理，"<" 字符后的通过正则判断，可推算出有限的几种状态。

> 原文很长，主要是讲解正则如何处理，感兴趣可看原文，这里就不贴更多了

#### 处理开始标签

#### 处理结束标签

#### 处理文本

### 优化 Optimize

通过上述一些列处理，我们就得到了 Vue 模板的 AST。由于 Vue 是响应式设计，所以拿到 AST 之后还需要进行一系列优化，确保静态的数据不会进入虚拟 DOM 的更新阶段，以此来优化性能。

```js
export function optimize(root, options) {
  if (!root) return
  // 标记静态节点
  markStatic(root)
}
```

简单来说，就是把所以静态节点的 static 属性设置为 true。

```js
function isStatic(node) {
  if (node.type === 2) {
    // 表达式，返回 false
    return false
  }
  if (node.type === 3) {
    // 静态文本，返回 true
    return true
  }
  // 此处省略了部分条件
  return !!(
    (
      !node.hasBindings && // 没有动态绑定
      !node.if &&
      !node.for && // 没有 v-if/v-for
      !isBuiltInTag(node.tag) && // 不是内置组件 slot/component
      !isDirectChildOfTemplateFor(node) && // 不在 template for 循环内
      Object.keys(node).every(isStaticKey)
    ) // 非静态节点
  )
}

function markStatic(node) {
  node.static = isStatic(node)
  if (node.type === 1) {
    // 如果是元素节点，需要遍历所有子节点
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        // 如果有一个子节点不是静态节点，则该节点也必须是动态的
        node.static = false
      }
    }
  }
}
```

### 生成 Generate

得到优化的 AST 之后，就需要将 AST 转化为 render 方法。还是用之前的模板，先看看生成的代码长什么样：

```html
<div>
  <h2 v-if="message">{{message}}</h2>
  <button @click="showName">showName</button>
</div>
```

```js
with (this) {
  return _c('div', [
    message ? _c('h2', [_v(_s(message))]) : _e(),
    _v(' '),
    _c('button', { on: { click: showName } }, [_v('showName')]),
  ])
}
```

这里的 \_c 对应的是虚拟 DOM 中的 createElement 方法。其他的下划线方法在 core/instance/render-helpers 中都有定义，每个方法具体做了什么不做展开。

具体转化方法就是一些简单的字符拼接，下面是简化了逻辑的部分，不做过多讲述。

```js
export function generate(ast, options) {
  const state = new CodegenState(options)
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns,
  }
}

export function genElement(el, state) {
  let code
  const data = genData(el, state)
  const children = genChildren(el, state, true)
  code = `_c('${el.tag}'${
    data ? `,${data}` : '' // data
  }${
    children ? `,${children}` : '' // children
  })`
  return code
}
```

## 参考

- [Vue 模板编译原理](https://juejin.cn/post/6863241580753616903)——Shenfq
