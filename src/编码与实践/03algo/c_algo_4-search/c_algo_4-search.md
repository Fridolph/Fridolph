# 二分查找与插入位置

## 先约定边界

输入是升序的有限数值数组。`lowerBound` 返回第一个大于等于 target 的位置，范围是 `[0, length]`；空数组和大于所有元素时也有合法插入点。`binarySearch` 在此基础上返回第一个相等元素的下标，找不到返回 `-1`，不会误把插入点当成查找成功。

<<< ./implementation.js

```js
lowerBound([1, 3, 3, 8], 3) // 1
lowerBound([1, 3, 3, 8], 5) // 3
binarySearch([1, 3, 3, 8], 5) // -1
```

循环维持 `[left, right)` 为尚未确定的区域，候选边界落在 `[left, right]`；每次严格缩小区间，退出时 left = right。中点是 `left + floor((right - left) / 2)`，不能把 left + right 当中点。

查找比较次数 O(log n)、额外空间 O(1)。先检查整个数组有序会引入 O(n)，所以把有序作为调用契约。**找到插入位置不等于插入本身：** 普通数组 `splice` 移动元素仍是 O(n)。未排序数组里“有多少元素比目标小”是另一个问题，不能直接使用二分。

**练习：** 改为 upperBound（第一个大于 target 的位置），推导重复区间长度；说明为什么循环不能简单写成 `left = mid`。

> 来源：[个人算法学习笔记](https://github.com/Fridolph/Fridolph/tree/c3a1eda8e0f7fe08d8ec54e07d07db514cbfc5d7/算法相关)。实现已按明确契约重写，非原样复制；边界验证见本目录 `__tests__/learning-algorithms.test.mjs`。
