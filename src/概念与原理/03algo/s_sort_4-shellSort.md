# 希尔排序 Shell Sort

> 1959 年 Shell 发明； 第一个突破 O(n^2)的排序算法；是简单插入排序的改进版；它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序

## 简介

希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。动态定义间隔序列的算法是《算法（第 4 版》的合著者 Robert Sedgewick 提出的。

## 算法描述

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

1. 选择一个增量序列 t1，t2，…，tk，其中 ti>tj，tk=1；
2. 按增量序列个数 k，对序列进行 k 趟排序；
3. 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

## 图解希尔算法

<Image alt='1' src='/03algo/shell1.png' />
<Image alt='2' src='/03algo/shell2.png' />
<Image alt='3' src='/03algo/shell3.png' />
<Image alt='4' src='/03algo/shell4.png' />
<Image alt='5' src='/03algo/shell5.png' />
<Image alt='6' src='/03algo/shell6.png' />
<Image alt='7' src='/03algo/shell7.png' />

## 算法实现

[希尔排序实现](../../编码与实践/03algo/c_sort_4-shellSort/c_sort_4-shellSort.md)

## 算法分析

- 最佳情况：T(n) = O(nlog2 n)
- 最坏情况：T(n) = O(nlog2 n)
- 平均情况：T(n) =O(nlog n)

## 参考

- [算法通关手册-希尔排序](https://algo.itcharge.cn/01.Array/02.Array-Sort/04.Array-Shell-Sort/#_2-%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95%E6%AD%A5%E9%AA%A4)
- [十大经典排序算法总结（JavaScript 描述）](https://juejin.cn/post/6844903444365443080)
