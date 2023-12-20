## Array

ES5中数组遍历有多少种方法

```
const arr = [1,2,3,4]
```

1. for循环

```
for (let i = 0; i < arr.length; i++) {
  // ...
}
```

2. forEach

```
arr.forEach(item => {
  // ...
})
```

不支持 continue break

3. every

默认返false 要都为true才继续遍历

4. for in

为对象设计，数组也是对象，可能达不到预期

### ES6新增的遍历方法

5. for of

for in 专为Object遍历设计，every forEach这类是对象遍历方法

for of 的涉及初衷是为 可遍历对象

---

## 如何查找一个元素

Array 遍历、转换、生成、查找
