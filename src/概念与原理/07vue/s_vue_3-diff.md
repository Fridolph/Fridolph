# Virtual DOM & Diff

## 虚拟 DOM - Virtual DOM

Virtual DOM 是对 DOM 的抽象,本质上是 JavaScript 对象,这个对象就是更加轻量级的对 DOM 的描述.

<Image src="/07vue/vdom.png" alt="虚拟 DOM" />

## 为什么需要 Virtual DOM

首先,我们都知道在前端性能优化的一个秘诀就是尽可能少地操作 DOM,不仅仅是 DOM 相对较慢,更因为频繁变动 DOM 会造成浏览器的回流或者重回,这些都是性能的杀手,因此我们需要这一层抽象,在 patch 过程中尽可能地一次性将差异更新到 DOM 中,这样保证了 DOM 不会出现性能很差的情况.

其次,现代前端框架的一个基本要求就是无须手动操作 DOM,一方面是因为手动操作 DOM 无法保证程序性能,多人协作的项目中如果 review 不严格,可能会有开发者写出性能较低的代码,另一方面更重要的是省略手动 DOM 操作可以大大提高开发效率.

最后,也是 Virtual DOM 最初的目的,就是更好的跨平台,比如 Node.js 就没有 DOM,如果想实现 SSR(服务端渲染),那么一个方式就是借助 Virtual DOM,因为 Virtual DOM 本身是 JavaScript 对象.

## Virtual DOM 的更新

Virtual DOM 归根到底是 JavaScript 对象,我们得想办法将 Virtual DOM 与真实的 DOM 对应起来,也就是说,需要我们声明一个函数,此函数可以将 vnode 转化为真实 DOM.

```js
function createElm(vnode, insertedVnodeQueue) {
  let data = vnode.data
  let i
  // 省略 hook 调用
  let children = vnode.children
  let type = vnode.type

  /// 根据 type 来分别生成 DOM
  // 处理 comment
  if (type === 'comment') {
    if (vnode.text == null) {
      vnode.text = ''
    }
    vnode.elm = api.createComment(vnode.text)
  }
  // 处理其它 type
  else if (type) {
    const elm = (vnode.elm = data.ns ? api.createElementNS(data.ns, type) : api.createElement(type))

    // 调用 create hook
    for (let i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)

    // 分别处理 children 和 text。
    // 这里隐含一个逻辑：vnode 的 children 和 text 不会／应该同时存在。
    if (isArray(children)) {
      // 递归 children，保证 vnode tree 中每个 vnode 都有自己对应的 dom；
      // 即构建 vnode tree 对应的 dom tree。
      children.forEach(ch => {
        ch && api.appendChild(elm, createElm(ch, insertedVnodeQueue))
      })
    } else if (isPrimitive(vnode.text)) {
      api.appendChild(elm, api.createTextNode(vnode.text))
    }
    // 调用 create hook；为 insert hook 填充 insertedVnodeQueue。
    i = vnode.data.hook
    if (i) {
      i.create && i.create(emptyNode, vnode)
      i.insert && insertedVnodeQueue.push(vnode)
    }
  }
  // 处理 text（text的 type 是空）
  else {
    vnode.elm = api.createTextNode(vnode.text)
  }

  return vnode.elm
}
```

## Vue 的 diff 算法详细分析

> 你看 Vue 源码干嘛？你使用 Vue 又不需要它的源码，你只需要会用就行了 —— 尤大 （说得很有道理，但不卷找不到工作）

## 定义

diff 算法是一种通过同层的树节点进行比较的高效算法

其有两个特点：

- 比较`只会在同层级进行`, 不会跨层级比较
- 在 diff 比较的过程中，`循环从两边向中间比较`

diff 算法在很多场景下都有应用，在 vue 中，作用于虚拟 dom 渲染成真实 dom 的新旧 VNode 节点比较

## 比较方式

diff 整体策略为：深度优先

### 同层比较

1. 比较只会在同层级进行, 不会跨层级比较

<Image src="/07vue/diff1.webp" alt="比较只会在同层级进行，不会跨层级比较" />

2. 比较的过程中，循环从两边向中间收拢

<Image src="/07vue/diff2.webp" alt="比较的过程中，循环从两边向中间收拢" />

### Diff 更新

下面举个 vue 通过 diff 算法更新的例子，新旧 VNode 节点如下图所示：

<Image src="/07vue/diff3.webp" alt="新旧VNode节点如下图所示" />

#### 第一次循环后

<Image src="/07vue/diff4.webp" alt="第一次循环" />
发现旧节点D与新节点D相同，直接复用旧节点D作为diff后的第一个真实节点，同时旧节点endIndex移动到C，新节点的 startIndex 移动到了 C

#### 第二次循环后

  <Image src="/07vue/diff5.webp" alt="第二次循环" />

同样是旧节点的末尾和新节点的开头(都是 C)相同，同理，diff 后创建了 C 的真实节点插入到第一次创建的 D 节点后面。同时旧节点的 endIndex 移动到了 B，新节点的 startIndex 移动到了 E

#### 第三次循环中

<Image src="/07vue/diff6.webp" alt="第三次循环" />

发现 E 没有找到，这时候只能直接创建新的真实节点 E，插入到第二次创建的 C 节点之后。同时新节点的 startIndex 移动到了 A。旧节点的 startIndex 和 endIndex 都保持不动

#### 第四次循环中

<Image src="/07vue/diff7.webp" alt="第四次循环" />

发现了新旧节点的开头(都是 A)相同，于是 diff 后创建了 A 的真实节点，插入到前一次创建的 E 节点后面。同时旧节点的 startIndex 移动到了 B，新节点的 startIndex 移动到了 B

#### 第五次循环中

<Image src="/07vue/diff8.webp" alt="第五次循环" />

情形同第四次循环一样，因此 diff 后创建了 B 真实节点 插入到前一次创建的 A 节点后面。同时旧节点的 startIndex 移动到了 C，新节点的 startIndex 移动到了 F

#### Diff 结束

<Image src="/07vue/diff9.webp" alt="Diff 结束" />

新节点的 startIndex 已经大于 endIndex 了，需要创建 newStartIdx 和 newEndIdx 之间的所有节点，也就是节点 F，直接创建 F 节点对应的真实节点放到 B 节点后面

## 原理分析

当数据发生改变时，set 方法会调用 Dep.notify 通知所有订阅者 Watcher，订阅者就会调用 patch 给真实的 DOM 打补丁，更新相应的视图

::: tip 源码位置
src/core/vdom/patch.js
:::

```js
function patch(oldVnode, vnode, hydrating, removeOnly) {
  if (isUndef(vnode)) {
    // 没有新节点，直接执行destory钩子函数
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
    return
  }

  let isInitialPatch = false
  const insertedVnodeQueue = []

  if (isUndef(oldVnode)) {
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue) // 没有旧节点，直接用新节点生成dom元素
  } else {
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // 判断旧节点和新节点自身一样，一致执行patchVnode
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {
      // 否则直接销毁及旧节点，根据新节点生成dom元素
      if (isRealElement) {
        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
          oldVnode.removeAttribute(SSR_ATTR)
          hydrating = true
        }
        if (isTrue(hydrating)) {
          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
            invokeInsertHook(vnode, insertedVnodeQueue, true)
            return oldVnode
          }
        }
        oldVnode = emptyNodeAt(oldVnode)
      }
      return vnode.elm
    }
  }
}
```

### patch

patch 函数前两个参数位为 oldVnode 和 Vnode ，分别代表新的节点和之前的旧节点，主要做了四个判断：

- `没有新节点`，直接触发旧节点的 destory 钩子
- `没有旧节点`，说明是页面刚开始初始化的时候，此时，根本不需要比较了，直接全是新建，所以只调用 createElm
- `旧节点和新节点自身一样`，通过 sameVnode 判断节点是否一样，一样时，直接调用 patchVnode 去处理这两个节点
- `旧节点和新节点自身不一样`，当两个节点不一样的时候，直接创建新节点，删除旧节点

下面主要讲的是 patchVnode 部分：

```js
function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  // 如果新旧节点一致，什么都不做
  if (oldVnode === vnode) {
    return
  }

  // 让vnode.el引用到现在的真实dom，当el修改时，vnode.el会同步变化
  const elm = (vnode.elm = oldVnode.elm)

  // 异步占位符
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
    } else {
      vnode.isAsyncPlaceholder = true
    }
    return
  }
  // 如果新旧都是静态节点，并且具有相同的key
  // 当vnode是克隆节点或是v-once指令控制的节点时，只需要把oldVnode.elm和oldVnode.child都复制到vnode上
  // 也不用再有其他操作
  if (
    isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  let i
  const data = vnode.data
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode)
  }

  const oldCh = oldVnode.children
  const ch = vnode.children
  if (isDef(data) && isPatchable(vnode)) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode)
  }
  // 如果vnode不是文本节点或者注释节点
  if (isUndef(vnode.text)) {
    // 并且都有子节点
    if (isDef(oldCh) && isDef(ch)) {
      // 并且子节点不完全一致，则调用updateChildren
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)

      // 如果只有新的vnode有子节点
    } else if (isDef(ch)) {
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      // elm已经引用了老的dom节点，在老的dom节点上添加子节点
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)

      // 如果新vnode没有子节点，而vnode有子节点，直接删除老的oldCh
    } else if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)

      // 如果老节点是文本节点
    } else if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '')
    }

    // 如果新vnode和老vnode是文本节点或注释节点
    // 但是vnode.text != oldVnode.text时，只需要更新vnode.elm的文本内容就可以
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text)
  }
  if (isDef(data)) {
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode)
  }
}
```

### patchVnode

主要做了几个判断：

- 新节点是否是文本节点，如果是，则直接更新 dom 的文本内容为新节点的文本内容
- 新节点和旧节点如果都有子节点，则处理比较更新子节点
- 只有新节点有子节点，旧节点没有，那么不用比较了，所有节点都是全新的，所以直接全部新建就好了，新建是指创建出所有新 DOM，并且添加进父节点
- 只有旧节点有子节点而新节点没有，说明更新后的页面，旧节点全部都不见了，那么要做的，就是把所有的旧节点删除，也就是直接把 DOM 删除

子节点不完全一致，则调用 `updateChildren`

```js
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0 // 旧头索引
  let newStartIdx = 0 // 新头索引
  let oldEndIdx = oldCh.length - 1 // 旧尾索引
  let newEndIdx = newCh.length - 1 // 新尾索引
  let oldStartVnode = oldCh[0] // oldVnode的第一个child
  let oldEndVnode = oldCh[oldEndIdx] // oldVnode的最后一个child
  let newStartVnode = newCh[0] // newVnode的第一个child
  let newEndVnode = newCh[newEndIdx] // newVnode的最后一个child
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly

  // 如果oldStartVnode和oldEndVnode重合，并且新的也都重合了，证明diff完了，循环结束
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 如果oldVnode的第一个child不存在
    if (isUndef(oldStartVnode)) {
      // oldStart索引右移
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left

      // 如果oldVnode的最后一个child不存在
    } else if (isUndef(oldEndVnode)) {
      // oldEnd索引左移
      oldEndVnode = oldCh[--oldEndIdx]

      // oldStartVnode和newStartVnode是同一个节点
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // patch oldStartVnode和newStartVnode， 索引左移，继续循环
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]

      // oldEndVnode和newEndVnode是同一个节点
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // patch oldEndVnode和newEndVnode，索引右移，继续循环
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]

      // oldStartVnode和newEndVnode是同一个节点
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      // patch oldStartVnode和newEndVnode
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
      // 如果removeOnly是false，则将oldStartVnode.eml移动到oldEndVnode.elm之后
      canMove &&
        nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      // oldStart索引右移，newEnd索引左移
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]

      // 如果oldEndVnode和newStartVnode是同一个节点
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      // patch oldEndVnode和newStartVnode
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
      // 如果removeOnly是false，则将oldEndVnode.elm移动到oldStartVnode.elm之前
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      // oldEnd索引左移，newStart索引右移
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]

      // 如果都不匹配
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)

      // 尝试在oldChildren中寻找和newStartVnode的具有相同的key的Vnode
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)

      // 如果未找到，说明newStartVnode是一个新的节点
      if (isUndef(idxInOld)) {
        // New element
        // 创建一个新Vnode
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)

        // 如果找到了和newStartVnodej具有相同的key的Vnode，叫vnodeToMove
      } else {
        vnodeToMove = oldCh[idxInOld]
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && !vnodeToMove) {
          warn(
            'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
          )
        }

        // 比较两个具有相同的key的新节点是否是同一个节点
        //不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，除了头尾两端的比较外，还会从用key生成的对象oldKeyToIdx中查找匹配的节点，所以为节点设置key可以更高效的利用dom。
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // patch vnodeToMove和newStartVnode
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
          // 清除
          oldCh[idxInOld] = undefined
          // 如果removeOnly是false，则将找到的和newStartVnodej具有相同的key的Vnode，叫vnodeToMove.elm
          // 移动到oldStartVnode.elm之前
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)

          // 如果key相同，但是节点不相同，则创建一个新的节点
        } else {
          // same key but different element. treat as new element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
        }
      }

      // 右移
      newStartVnode = newCh[++newStartIdx]
    }
  }
}
```

while 循环主要处理了以下五种情景：

- 当新老 VNode 节点的 start 相同时，直接 patchVnode ，同时新老 VNode 节点的开始索引都加 1
- 当新老 VNode 节点的 end 相同时，同样直接 patchVnode ，同时新老 VNode 节点的结束索引都减 1
- 当老 VNode 节点的 start 和新 VNode 节点的 end 相同时，这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldEndVnode 的后面，同时老 VNode 节点开始索引加 1，新 VNode 节点的结束索引减 1
- 当老 VNode 节点的 end 和新 VNode 节点的 start 相同时，这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldStartVnode 的前面，同时老 VNode 节点结束索引减 1，新 VNode 节点的开始索引加 1
- 如果都不满足以上四种情形，那说明没有相同的节点可以复用，则会分为以下两种情况：
  - 从旧的 VNode 为 key 值，对应 index 序列为 value 值的哈希表中找到与 newStartVnode 一致 key 的旧的 VNode 节点，再进行 patchVnode，同时将这个真实 dom 移动到 oldStartVnode 对应的真实 dom 的前面
  - 调用 createElm 创建一个新的 dom 节点放到当前 newStartIdx 的位置

## Vue 中 key 的作用

所以我们需要使用 key 来给每个节点做一个唯一标识，Diff 算法就可以正确的识别此节点，找到正确的位置区插入新的节点

<Image src="/07vue/vue-key.webp" alt="Vue中key的作用"/>

## 总结

**当数据发生改变时**，订阅者 `watcher` 就会调用 `patch` 给真实的 DOM 打补丁。通过 isSameVnode 进行判断，相同则调用 patchVnode 方法

**patchVnode 做了以下操作：**

1. 找到对应的真实 dom，称为 el
2. 如果都有都有文本节点且不相等，将 el 文本节点设置为 Vnode 的文本节点
3. 如果 oldVnode 有子节点而 VNode 没有，则删除 el 子节点
4. 如果 oldVnode 没有子节点而 VNode 有，则将 VNode 的子节点真实化后添加到 el
5. 如果两者都有子节点，则执行 updateChildren 函数比较子节点

**updateChildren 主要做了以下操作：**

1. 设置新旧 VNode 的头尾指针
2. 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用 patchVnode 进行 patch 重复流程、调用 createElem 创建一个新节点，从哈希表寻找 key 一致的 VNode 节点再分情况操作

## 自测

## 参考

- [Vue 的 diff 算法详细分析](https://juejin.cn/post/7204844328111374391#heading-24)——bb_xiaxia1998
- [面试官: 你对虚拟 DOM 原理的理解?](https://juejin.cn/post/6844903902429577229)——寻找海蓝 96
