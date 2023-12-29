## 数据状态更新时的差异 diff 及 patch 机制


### 数据更新视图

之前讲到，在对`model`进行操作时，会触发对应`Dep`中的`Watcher`对象。Watcher对象会调用对应的`update`方法来更新视图。最终是将新产生的VNode节点与老的VNode进行一个`patch`的过程，比对得出差异，最终将这些差异更新到视图上。

### 跨平台

因为使用了Virtual DOM的原因，Vue具有了跨平台的能力，Virtual DOM终归只是一些JS对象，那么最终是如何调用不同平台的API呢？

这就需要依赖一层适配层了，将不同平台的API封装在内，以同样的接口对外提供。

```js
const nodeOpts = {
  setTextContext(text) {
    if (platform === 'weex') {
      node.parentNode.setAttr('value', text)
    } else if (platform === 'web') {
      node.textContent = text
    }
  },
  parentNode() {},
  removeChild() {},
  nextSibling() {},
  insertBefore() {}
}
```

举例，现在我们有上述一个`nodeOpts`对象做适配，根据platform区分不同平台来执行当前平台对应的API，而对外则是提供了一致的接口，供Virtual DOM使用。

### API

接下来我们介绍一些其他API，这会在patch过程中被用到，他们最终都会调用`nodeOpts`中的相应函数来操作平台。

`insert`用来在`parent`这个父节点上插入一个子节点，如果指定来`ref`则插入到`ref`这个子节点前面。

```js
function insert(parent, elm, ref) {
  if (parent) {
    if (ref) {
      if (ref.parentNode === parent) {
        nodeOpts.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOpts.appendChild(parent, elm)
    }
  }
}
```

`createElm`用来新建一个节点，tag存在创建一个标签节点，否则创建一个文本节点。

```js
function createElm(vnode, parentElm, refElm) {
  if (vdnoe.tag) {
    insert(parentElm, nodeOpts.createElement(vnode.tag), refElm)
  } else {
    insert(parentElm, nodeOpts.createTextNode(vnode.text), refElm)
  }
}
```

`addVnodes`用来批量调用`createElm`新建节点

```js
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createElm(vnodes[startIdx], parentElm, refElm)
  }
}
```

`removeNode`用来移除一个节点

```js
function removeNode(el) {
  const parent = nodeOpts.parentNode(el)
  if (parent) {
    nodeOpts.removeChild(parent, el)
  }
}
```

`removeVnodes`会批量调用`removeNode`移除节点

```js
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch) {
      removeNode(ch.elm)
    }
  }
}
```

### patch

首先说一下 `patch`的核心diff算法，我们用diff算法可以比对出两颗树的差异，我们来看一下，假设我们现在有如下两颗树，它们分别是新老VNode节点，这时到了patch过程，我们需要将它们进行比对。

<img src="https://user-gold-cdn.xitu.io/2017/12/28/1609be691ed64525?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

diff算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种相当高效的算法，如下图：

<img src="https://user-gold-cdn.xitu.io/2017/12/28/1609be700a80c98a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

这张图中的相同颜色的方块中的节点会进行比对，比对得到「差异」后将这些「差异」更新到视图上。因为只进行同层级的比对，所以十分高效。

patch 的过程相当复杂，我们先用简单的代码来看一下。

```js
function patch(oldVnode, vnode, parentElm) {
  if (!oldVnode) {
    addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
  } else if (!vnode) {
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
  } else {
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode)
    } else {
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
    } 
  }
}
```

因为`patch`的主要功能是比对两个Vnode节点，将差异更新到视图上，所以入参有新老两个Vnode以及父节点的element。我们来逐步捋一下逻辑：

1. 首先在oldVnode不存在时，（相当于新的Vnode替代原本没有的节点）直接用addVnodes将这些节点批量添加到parentElm上

```js
if (!oldVnode) {
  addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
}
```

2. 然后在vnode(新VNode节点)不存在时，相当于要把老的节点删除，所以直接使用`removeVnodes`进行批量的节点删除即可

```js
else if (!vnode) {
  removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
}
```

3. 最后一种情况，当oldVnode与Vnode都存在时，需要判断它们是否属于`sameVnode`相同节点。如果是则进行`patchVnode`比对Vnode操作，否则删除老节点，增加新节点。

```js
if (sameVnode(oldVnode, vnode)) {
  patchVnode(oldVnode, vnode)
} else {
  removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
  addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
}
```

### sameVnode

我们来看下什么情况下两个Vnode会属于 `sameVnode`相同节点呢？

```js
function sameVnode() {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    (!!a.data) === (!!b.data) &&
    sameInputType(a, b)
  )
}

function sameInputType(a, b) {
  if (a.tag !== 'input') return true
  let i 
  const typeA = (i = a.data) && (i = i.attrs) && i.type
  const typeB = (i = b.data) && (i = i.attrs) && i.type
  return typeA === typeB
}
```

`someVnode`，只有当key、tag、isComment、data同时定义（或不定义），同时满足当标签类型为input时type相同即可。

### patchVnode

之前patch的过程还剩下`patchVnode`没说，这是最复杂的一个。因为该函数是在符合sameVnode条件下触发的，所以会进行比对：

```js
function patchVnode(oldVnode, vnode) {
  // 在新老Vnode节点相同的情况下，就不需要做任何改变了，直接return掉
  if (oldVnode === vnode) return

  // 当新老Vnode节点都是isStatic静态的，且key相同
  // 只要将componentInstance与elm从老Vnode节点拿过来即可
  // 这里的isStatic就是前面提过的编译时将静态节点标记出来，这样可跳过对比过程
  if (vnode.isStatic && oldStatic.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const ch = vnode.children

  // 接下来，当新Vnode节点是文本节时，直接用setTextContent来设置text
  // 这里的nodeOpts是一个适配层，根据不同平台提供不同操作平台DOM的方法
  if (vnode.text) {
    nodeOpts.setTextContent(elm, vnode.text)
  } else {
    // 当新Vnode是非文本节点时，需要分以下几种情况
    // oldCh与ch都存在且不相同时，使用updateChildren函数来更新子节点
    if (oldCh && ch && (oldCh !== ch)) {
      updateChildren(elm, oldCh, ch)
    } else if (ch) {
      // 如果ch存在，且老节点是文本节点则先将节点的文本清除
      // 然后将ch批量插入到节点elm下
      if (oldVnode.text) nodeOpts.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1)
    } else if (oldCh) {
      // 同理当只有oldCh存在时，说明需要将老节点通过removeVnodes全部清除
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (oldVnode.text) {
      // 最后一种情况是当只有老节点是文本节点时，清除其节点的文本内容
      nodeOpts.setTextContent(elm, '')
    }
  }
}
```

### updateChildren

接下来讲一下updateChildren函数：

<pre><code class="hljs javascript" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateChildren</span> (<span class="hljs-params">parentElm, oldCh, newCh</span>) </span>{
    <span class="hljs-keyword">let</span> oldStartIdx = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> newStartIdx = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> oldEndIdx = oldCh.length - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">let</span> oldStartVnode = oldCh[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">let</span> oldEndVnode = oldCh[oldEndIdx];
    <span class="hljs-keyword">let</span> newEndIdx = newCh.length - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">let</span> newStartVnode = newCh[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">let</span> newEndVnode = newCh[newEndIdx];
    <span class="hljs-keyword">let</span> oldKeyToIdx, idxInOld, elmToMove, refElm;

    <span class="hljs-keyword">while</span> (oldStartIdx &lt;= oldEndIdx &amp;&amp; newStartIdx &lt;= newEndIdx) {
        <span class="hljs-keyword">if</span> (!oldStartVnode) {
            oldStartVnode = oldCh[++oldStartIdx];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!oldEndVnode) {
            oldEndVnode = oldCh[--oldEndIdx];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode);
            nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode);
            nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">let</span> elmToMove = oldCh[idxInOld];
            <span class="hljs-keyword">if</span> (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : <span class="hljs-literal">null</span>;
            <span class="hljs-keyword">if</span> (!idxInOld) {
                createElm(newStartVnode, parentElm);
                newStartVnode = newCh[++newStartIdx];
            } <span class="hljs-keyword">else</span> {
                elmToMove = oldCh[idxInOld];
                <span class="hljs-keyword">if</span> (sameVnode(elmToMove, newStartVnode)) {
                    patchVnode(elmToMove, newStartVnode);
                    oldCh[idxInOld] = <span class="hljs-literal">undefined</span>;
                    nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                } <span class="hljs-keyword">else</span> {
                    createElm(newStartVnode, parentElm);
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
    }

    <span class="hljs-keyword">if</span> (oldStartIdx &gt; oldEndIdx) {
        refElm = (newCh[newEndIdx + <span class="hljs-number">1</span>]) ? newCh[newEndIdx + <span class="hljs-number">1</span>].elm : <span class="hljs-literal">null</span>;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newStartIdx &gt; newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
}
</code></pre>


首先我们定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引，同时 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这几个索引对应的 VNode 节点。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b707df4902029?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

接下来是一个 while 循环，在这过程中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢。

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b70ecf5967f0a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

首先当 oldStartVnode 或者 oldEndVnode 不存在的时候，oldStartIdx 与 oldEndIdx 继续向中间靠拢，并更新对应的 oldStartVnode 与 oldEndVnode 的指向（注：下面讲到的 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 移动都会伴随着 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 的指向的变化，之后的部分只会讲 Idx 的移动）。

```js
if (!oldStartVnode) {
    oldStartVnode = oldCh[++oldStartIdx];
} else if (!oldEndVnode) {
    oldEndVnode = oldCh[--oldEndIdx];
}
```

接下来这一块，是将 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 两两比对的过程，一共会出现 2*2=4 种情况。

```js
else if (sameVnode(oldStartVnode, newStartVnode)) {
    patchVnode(oldStartVnode, newStartVnode);
    oldStartVnode = oldCh[++oldStartIdx];
    newStartVnode = newCh[++newStartIdx];
} else if (sameVnode(oldEndVnode, newEndVnode)) {
    patchVnode(oldEndVnode, newEndVnode);
    oldEndVnode = oldCh[--oldEndIdx];
    newEndVnode = newCh[--newEndIdx];
} else if (sameVnode(oldStartVnode, newEndVnode)) {
    patchVnode(oldStartVnode, newEndVnode);
    nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
    oldStartVnode = oldCh[++oldStartIdx];
    newEndVnode = newCh[--newEndIdx];
} else if (sameVnode(oldEndVnode, newStartVnode)) {
    patchVnode(oldEndVnode, newStartVnode);
    nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
    oldEndVnode = oldCh[--oldEndIdx];
    newStartVnode = newCh[++newStartIdx];
}
```

首先是 oldStartVnode 与 newStartVnode 符合 sameVnode 时，说明老 VNode 节点的头部与新 VNode 节点的头部是相同的 VNode 节点，直接进行 patchVnode，同时 oldStartIdx 与 newStartIdx 向后移动一位。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b71f5a48631f4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

其次是 oldEndVnode 与 newEndVnode 符合 sameVnode，也就是两个 VNode 的结尾是相同的 VNode，同样进行 patchVnode 操作并将 oldEndVnode 与 newEndVnode 向前移动一位。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b7228b9ecb23a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

接下来是两种交叉的情况。

先是 oldStartVnode 与 newEndVnode 符合 sameVnode 的时候，也就是老 VNode 节点的头部与新 VNode 节点的尾部是同一节点的时候，将 oldStartVnode.elm 这个节点直接移动到 oldEndVnode.elm 这个节点的后面即可。然后 oldStartIdx 向后移动一位，newEndIdx 向前移动一位。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b723af0fd706a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

同理，oldEndVnode 与 newStartVnode 符合 sameVnode 时，也就是老 VNode 节点的尾部与新 VNode 节点的头部是同一节点的时候，将 oldEndVnode.elm 插入到 oldStartVnode.elm 前面。同样的，oldEndIdx 向前移动一位，newStartIdx 向后移动一位。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b72ae720954cd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

最后是当以上情况都不符合的时候，这种情况怎么处理呢？

```js
else {
  let elmToMove = oldCh[idxInOld];
  if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
  idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;
  if (!idxInOld) {
      createElm(newStartVnode, parentElm);
      newStartVnode = newCh[++newStartIdx];
  } else {
      elmToMove = oldCh[idxInOld];
      if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
      } else {
          createElm(newStartVnode, parentElm);
          newStartVnode = newCh[++newStartIdx];
      }
  }
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key
      if (isDef(key)) map[key] = i
  }
  return map
}
```

createKeyToOldIdx 的作用是产生 key 与 index 索引对应的一个 map 表。比如说

```js
[
  {xx: xx, key: 'key0'},
  {xx: xx, key: 'key1'}, 
  {xx: xx, key: 'key2'}
]
```

在经过 createKeyToOldIdx 转化以后会变成：

```js
{
  key0: 0, 
  key1: 1, 
  key2: 2
}
```

我们可以根据某一个 key 的值，快速地从 oldKeyToIdx（createKeyToOldIdx 的返回值）中获取相同 key 的节点的索引 idxInOld，然后找到相同的节点。

如果没有找到相同的节点，则通过 createElm 创建一个新节点，并将 newStartIdx 向后移动一位。

```js
if (!idxInOld) {
  createElm(newStartVnode, parentElm);
  newStartVnode = newCh[++newStartIdx];
}
```

否则如果找到了节点，同时它符合 sameVnode，则将这两个节点进行 patchVnode，将该位置的老节点赋值 undefined（之后如果还有新节点与该节点key相同可以检测出来提示已有重复的 key ），同时将 newStartVnode.elm 插入到 oldStartVnode.elm 的前面。同理，newStartIdx 往后移动一位。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b73aa8f758342?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

```js
else {
  elmToMove = oldCh[idxInOld];
  if (sameVnode(elmToMove, newStartVnode)) {
    patchVnode(elmToMove, newStartVnode);
    oldCh[idxInOld] = undefined;
    nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
    newStartVnode = newCh[++newStartIdx];
  }
}
```

如果不符合 sameVnode，只能创建一个新节点插入到 parentElm 的子节点中，newStartIdx 往后移动一位

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b73f50ed43932?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

```js
else {
  createElm(newStartVnode, parentElm);
  newStartVnode = newCh[++newStartIdx];
}
```

最后一步就很容易啦，当 while 循环结束以后，如果 oldStartIdx > oldEndIdx，说明老节点比对完了，但是新节点还有多的，需要将新节点插入到真实 DOM 中去，调用 addVnodes 将这些节点插入即可。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b7457cae26687?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

同理，如果满足 newStartIdx > newEndIdx 条件，说明新节点比对完了，老节点还有多，将这些无用的老节点通过 removeVnodes 批量删除即可。

<img src="https://user-gold-cdn.xitu.io/2018/1/2/160b744a2c07257d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

```js
if (oldStartIdx > oldEndIdx) {
    refElm = (newCh[newEndIdx + 1]) ? newCh[newEndIdx + 1].elm : null;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
} else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
}
```

到这里，比对的核心实现已经讲完了，这部分比较复杂，不过仔细地梳理一下比对的过程，相信一定能够理解得更加透彻的。

注：本节代码参考[《数据状态更新时的差异 diff 及 patch 机制》](https://github.com/answershuto/VueDemo/blob/master/%E3%80%8A%E6%95%B0%E6%8D%AE%E7%8A%B6%E6%80%81%E6%9B%B4%E6%96%B0%E6%97%B6%E7%9A%84%E5%B7%AE%E5%BC%82%20diff%20%E5%8F%8A%20patch%20%E6%9C%BA%E5%88%B6%E3%80%8B.js)。