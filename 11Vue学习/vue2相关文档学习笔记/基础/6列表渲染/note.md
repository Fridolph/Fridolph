## 数组更新

Vue的核心是数据与视图的双向绑定，当我们修改数组时，Vue会检测到数据变化，所以用`v-for`渲染的视图也会立即更新。Vue包含了一组观察数组变异的方法，使用它们改变数组也会触发视图更新：

push()
pop()
shift()
unshift()
splice()
sort()
reverse()
---

以下方法不会改变原数组，而是返回新数组

filter()
concat()
slice()

## 过滤与排序

