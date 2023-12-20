## 什么是diff算法

!!! 去繁就简

对比差异

## vdom为何使用diff算法

* DOM操作是昂贵的，尽量减少DOM操作
* 找出本次DOM必须更新的节点来更新，其他的不更新
* 这个找出的过程，就需要Diff算法

## Diff实现过程

* patch(container, vnode) 核心 createElement
* patch(vnode, newVnode) 核心 updateChildren

```js
function createElement(vnode) {
  var tag = vnode.tag
  var attrs = vnode.attrs || {}
  var children = vnode.children || []

  if (!tag) return null

  // 创建元素
  var elem = document.createElement(tag)
  // 属性
  var attrName
  for (attrName in attrs) {
    if (attr.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  // 子元素
  children.forEach(function(childVnode) {
    // 递归调用 craeteElement 创建子元素
    elem.appendChild(createElement(childVnode))
  })
  return elem
}
```

updateChildren


```js
function updateChildren(vnode, newVnode) {
  var children = vnode.children || []
  var newChildren = newVnode.children || []
  // 遍历现有的children
  children.forEach(function(child, index) {
    var newChild = newChildren[index]
    if (newChild == null) return
    if (child.tag === newChild.tag) {
      updateChildren(child, newChild)
    } else {
      replaceNode(child, newChild)
    }
  })
}

function replaceNode(vnode, newVnode) {
  var elem = vnode.elem // 真实DOM节点
  var newElem = createElement(newVnode)

  // 替换逻辑省略  
}
```

---

Diff不仅仅是以上内容

* 节点新增和删除
* 节点重新排序
* 节点属性、样式、事件绑定
* 如何极致压榨性能

