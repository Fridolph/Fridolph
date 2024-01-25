# grid-auto-flow

grid-auto-flow 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。

## 语法

```css
/* Keyword values */
grid-auto-flow: row;
grid-auto-flow: column;
grid-auto-flow: dense;
grid-auto-flow: row dense;
grid-auto-flow: column dense;

/* Global values */
grid-auto-flow: inherit;
grid-auto-flow: initial;
grid-auto-flow: unset;
```

- row

该关键字指定自动布局算法按照通过逐行填充来排列元素，在必要时增加新行。如果既没有指定 row 也没有 column，则默认为 row。

- column

该关键字指定自动布局算法通过逐列填充来排列元素，在必要时增加新列。

- dense

该关键字指定自动布局算法使用一种“稠密”堆积算法，如果后面出现了稍小的元素，则会试图去填充网格中前面留下的空白。这样做会填上稍大元素留下的空白，但同时也可能导致原来出现的次序被打乱。

如果省略它，使用一种「稀疏」算法，在网格中布局元素时，布局算法只会「向前」移动，永远不会倒回去填补空白。这保证了所有自动布局元素「按照次序」出现，即使可能会留下被后面元素填充的空白。

## 用法

| Class               | Properties                    |
| ------------------- | ----------------------------- |
| grid-flow-row       | grid-auto-flow: row;          |
| grid-flow-col       | grid-auto-flow: column;       |
| grid-flow-dense     | grid-auto-flow: dense;        |
| grid-flow-row-dense | grid-auto-flow: row dense;    |
| grid-flow-col-dense | grid-auto-flow: column dense; |
