# 链表 Linked List

链表是一组节点组成的集合，每个节点都使用一个对象的引用来指向它的后一个节点。指向另一节点的引用讲做链。

[链表](../../../概念与原理/03algo/s_algo_3-linkedlist.md)

## 单链表

::: details 单链表 Class 实现

::: code-group

```js
class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
// 单链表基本操作：插入、删除、查找
class LinkedList {
  constructor(value) {
    value = value === undefined ? 'head' : value
    this.head = new ListNode(value)
  }

  // 查找value值对应的节点，若没找到返回-1
  findByValue(value) {
    let current = this.head
    while (current !== null && current.value !== value) {
      current = current.next
    }
    return current ? current : -1
  }

  // 查找value值对应 上一个节点，若没找到返回-1
  findPrevByValue(value) {
    let current = this.head
    while (current.next !== null && current.next.value !== value) {
      current = current.next
    }
    return current ? current : -1
  }

  // 根据index查找节点，可比较链表是否有重复节点
  findByIndex(index) {
    let current = this.head
    // 从 0 还是 1 开始可根据实际需求调整
    let position = 0
    while (current.next !== null && position !== index) {
      current = current.next
      position++
    }
    return current && position === index ? current : -1
  }

  // 根据传入的value值，找到节点并在其之前 插入新节点
  insert(schValue, newValue) {
    let current = this.findByValue(schValue)
    if (current === -1) return false

    let newNode = new ListNode(newValue)
    newNode.next = current.next
    current.next = newNode
  }

  // 在链表末尾插入一个新节点
  push(value) {
    let current = this.head
    let node = new ListNode(value)
    while (current.next !== null) {
      current = current.next
    }
    current.next = node
  }

  frontPush(value) {
    this.insert('head', value)
  }

  // 根据传入值，若找到节点，则删除该节点；未找到返-1
  remove(value) {
    if (value === 'head') return false
    let needRemoveNode = this.findByValue(value)
    if (needRemoveNode === -1) return false
    let prevNode = this.findPrevByValue(value)
    prevNode.next = needRemoveNode.next
  }

  // 遍历链表，按顺序拿到所有值
  getList() {
    let result = new Array()
    let current = this.head
    while (current !== null) {
      result.push(current.value)
      current = current.next
    }
    return result
  }
}
```

:::

**运行结果：**

```js
let demo = new LinkedList()
console.log(demo.getList()) // [ 'head' ]
demo.push('1.push')
demo.insert('1.push', '2.insert')
demo.push('3.continue push')
demo.push('4.wait remove')
demo.remove('4.wait remove')
demo.frontPush('5. frontPush')
// console.log('findByIndex \n', demo.findByIndex(1))
console.log(demo.getList())
// [ 'head', '5. frontPush', '1.push', '2.insert', '3.continue push' ]
```

## 双向链表

::: details 双向链表的实现

::: code-group

```js
class ListNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}
// 单链表基本操作：插入、删除、查找
class DoubleLinkedList {
  constructor(value) {
    value = value === undefined ? 'head' : value
    this.head = new ListNode(value)
  }

  // 查找value值对应的节点，若没找到返回-1
  findByValue(value) {
    let current = this.head
    while (current !== null && current.value !== value) {
      current = current.next
    }
    return current ? current : -1
  }

  // 查找value值对应 上一个节点，若没找到返回-1
  findPrevByValue(value) {
    let current = this.head
    while (current.next !== null && current.next.value !== value) {
      current = current.next
    }
    return current ? current : -1
  }

  // 根据index查找节点，可比较链表是否有重复节点
  findByIndex(index) {
    let current = this.head
    // 从 0 还是 1 开始可根据实际需求调整
    let position = 0
    while (current.next !== null && position !== index) {
      current = current.next
      position++
    }
    return current && position === index ? current : -1
  }

  // 根据传入的value值，找到节点并在其之后 插入新节点
  insert(schValue, newValue) {
    let current = this.findByValue(schValue)
    if (current === -1) return false

    let newNode = new ListNode(newValue)
    newNode.next = current.next
    newNode.prev = current
    current.next = newNode
  }

  // 在链表末尾插入一个新节点
  push(value) {
    let current = this.head
    let node = new ListNode(value)
    while (current.next !== null) {
      current = current.next
    }
    node.prev = current
    current.next = node
  }

  frontPush(value) {
    this.insert('head', value)
  }

  // 根据传入值，若找到节点，则删除该节点；未找到返-1
  remove(value) {
    if (value === 'head') return false
    let needRemoveNode = this.findByValue(value)
    if (needRemoveNode === -1) return false
    let prevNode = this.findPrevByValue(value)
    prevNode.next = needRemoveNode.next
  }

  // 遍历链表，按顺序拿到所有值
  getList() {
    let result = new Array()
    let current = this.head
    while (current !== null) {
      result.push(current.value)
      current = current.next
    }
    return result
  }
}
```

:::

**验证结果：**

```js
let demo = new DoubleLinkedList()
// console.log(demo.getList()) // [ 'head' ]
demo.push('1.push')
demo.push('2.push')
demo.insert('1.push', '3.insert')
demo.push('4.continue push')
demo.push('5.wait remove')
demo.remove('5.wait remove')
demo.frontPush('7. frontPush')
console.log(demo.getList())
// [ 'head', '7. frontPush', '1.push', '3.insert', '2.push', '4.continue push']

console.log(demo.findByIndex(5))
```

## 参考

- [「算法与数据结构」链表的 9 个基本操作](https://juejin.cn/post/6850418120755494925)

::: tip 原文更详细，推荐看原帖
当然，这里也体现了在线文档的好处。评论区有反馈，说代码运行，和一些其他问题。笔者已进行了相应（润色）调整。

若您发现有其他纰漏或是错误，请联系我或提 issue，谢谢！
:::
