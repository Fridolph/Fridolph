# 插入排序 Insertion Sort

维护一个有序前缀，每轮取下一个元素，从后向前移动比它大的项，再放入空出的正确位置。移动元素比不断相邻交换更直接，也更容易说明不变量。

## JavaScript 代码实现

<<< ./insertion.js

```js
insertionSort([3, 1, 2, 1]) // [1, 1, 2, 3]，原地修改
```

已有序时 O(n)，平均与最坏 O(n²)，额外空间 O(1)。只移动严格大于 key 的元素，保持相等元素顺序，因此稳定。适合小数组、基本有序数据，仍需结合实际实现与负载选择。

## 改进插入排序

二分查找可以减少寻找插入点的比较次数，但后续移动元素仍是 O(n)，整体最坏仍为 O(n²)，不能宣称变成 O(n log n)。

<<< ./binaryInsertion.js

这里查找的是 upperBound，让新元素插入相等元素之后，以保持稳定性；与[二分查找练习](/编码与实践/03algo/c_algo_4-search/c_algo_4-search)中的 lowerBound 区分。

关联：[插入排序原理](/概念与原理/03algo/s_sort_3-insertionSort)。

## 参考

- [个人排序笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/算法相关/十大经典算法)（归并、纠错后重写）。
- [十大经典排序算法总结（JavaScript 描述）](https://juejin.cn/post/6844903444365443080)（原文档参考来源，保留归属）。
