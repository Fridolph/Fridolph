Virtual DOM产生的前提是浏览器中的DOM是很“昂贵的”，为了更直观的感受到，我们可以简单地把一个div元素属性打印出来

略

可看到，真正的DOM元素是非常庞大的，因为浏览器的标准就把DOM设计得非常复杂，当我们频繁地去做DOM更新，会产生一定的性能问题。

而Virtual DOM就是用一个原生对象去描述一个DOM节点，所以它比创建一个DOM的代价要小得多。在Vue中，Virtual DOM是用VNode这么一个Class去描述。它的定义在 `src/core/vdom/vnode.js`中的：

```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<Vnode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scoped
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // componennt placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isCompoent: boolean; // empty comment placeholder
  isCloned: boolean; // is a cloned node;
  isOnce: boolean; // is a v-once node ?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support
}
```

可以看到Vue.js中的Virtual DOM的定义还是略微复杂一些，因为它这里包含了很多vue的特性。Vue.js中的Virtual DOM是借鉴了一个开源库 snabbdom的实现，然后加入了一些vue特色的东西

## 总结

其实VNode是对真实DOM的一种抽象描述，它的核心无非就几个关键属性，标签名、数据、子节点、键值等，其他属性都是用来扩展VNode的灵活性以及一些特殊feature的。由于VNode只是用来映射到真实DOM的渲染，不需要包含操作DOM的方法，因此它是非常轻量和简单的。

Virtual DOM除了它数据结构的定义，映射到真实的DOM实际上要经历VNode的create、diff、patch等过程。那么在Vue.js中， VNode中的create是通过之前提到的createElement方法创建的，我们接下来来分析这部分的实现。

---

更多可以参考 snabbdom
