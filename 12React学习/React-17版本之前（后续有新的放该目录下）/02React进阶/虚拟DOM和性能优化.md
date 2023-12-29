React 之所以执行效率高，其重要原因是虚拟 DOM 机制。React 应用常用的性能优化也与虚拟 DOM 机制有关。

---

在 Web 环境中，DOM 也就是对 HTML 文本的一种抽象描述。在传统开发中，通过调用浏览器提供 API 对 DOM 执行增删查改操作。这些操作看似只执行了一条 JS 语法，但其效率要慢得多。因为对 DOM 的修改会引起页面的重布局和重渲染，这过程很耗时，这也是前端性能优化的一条原则，尽量减少 DOM 操作。

虚拟 DOM 是一层抽象（对真实 DOM），建立在真实的 DOM 上。（虚拟 DOM 是一项独立的技术）

    <div class="foo">
      <h1>Hello React</h1>
    </div>

可以用 JS 对象来描述

```js
{
  type: 'div',
  props: {
    className: 'foo',
    children: {
      type: 'h1',
      props: {
        children: 'Hello React'
      }
    }
  }
}
```

有了虚拟 DOM 这一层，当我们需要操作 DOM 时，就可以操作虚拟 DOM 而不是操作真实 DOM。

## Diff 算法

React 采用声明式地 API 描述 UI 结构，每次组件的状态或属性更新，组件的 render 方法都会返回一个新的虚拟 DOM 对象，用来表述新的 UI 结构。如果每次 render 都直接使用新的虚拟 DOM 来生成真实 DOM 结构，那么会带来大量对真实 DOM 的操作，影响执行效率。

事实上，React 通过比较两次虚拟 DOM 的变化找出差异部分，更新到真实 DOM 上，从而减少最终要在真实 DOM 上执行的操作，提高程序执行效率。这一过程就是 React 的调和过程 Reconcliliation，其中的关键就是比较两个树型结构的 diff 算法。

> 在 diff 算法中，比较的两方是新的虚拟 DOM 和旧的虚拟 DOM，而表示虚拟 DOM 和真实 DOM，只不过 Diff 的结果会更新到真实的 DOM 上。

正常情况下，比较两个树形结构差异的算法时间复杂度是 O(N^3)。React 通过总结 DOM 的实际使用场景提出了两个在绝大多数实践场景下都成立的假设，基于这两个假设，React 实现了 O(N)时间复杂度内完整两棵虚拟 DOM 树的比较：

1. 如果两个元素的类型不同，那么它们将生成两棵不同的树
2. 为列表中的元素设置 key，用 key 标识对应的元素在多次 render 过程中是否发生变化

### 当根节点是不同类型时

从 div 变成 p，ComponentA 变成 ComponentB，或者从 ComponentA 变成 div 这些都是节点类型发生变化的情况。

根节点类型变化，React 会认为新的树和旧的树完全不同，不会再继续比较其他属性和子节点，而是把整棵树拆掉重建（包括虚拟 DOM 树和真实 DOM 树）。需要注意的是，虚拟 DOM 节点类型分为两类：一类是 DOM 元素类型，一类是 React 组件类型。

在旧的虚拟 DOM 树被拆除过程中，旧的 DOM 元素类型的节点会被销毁，旧的 React 组件的实例 componentWillUnmount 会被调用，在重建过程中，新的 DOM 元素会被插入到 DOM 树中，新的组件实例的 componentWillMount 和 componentDidMount 方法会被调用。重建后的新的虚拟 DOM 树会被整体更新到真实 DOM 树中，这种情况需要大量 DOM 操作，更新效率最低。

### 当根节点是相同的 DOM 元素类型时

React 会保留根节点，而比较根节点的属性，然后只更新那些变化了的属性。

### 当根节点是相同的组件类型时

对应的组件实例不会被销毁，只是会执行更新操作，同步变化的属性到虚拟 DOM 树上，这一过程组件实例的 componentWillReceiveProps 和 componentWillUpdate 会被调用。注意，对于组件类型的节点，React 是无法直接知道如何更新真实 DOM 树的，需要在组件更新并且 render 方法执行完成后，根据 render 返回的虚拟 DOM 结构决定如何更新真实 DOM 树。

比较完根节点后，React 会以同样的原则继续递归比较子节点，每一个子节点相对于其层级以下的节点来说又是一个根节点。如此递归比较，直到比较完两棵树上的所有节点，计算得到最终差异，更新到 DOM 树中。
