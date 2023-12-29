理解一下vue3里的运用

```ts
function unref<T>(ref: T): T extends Ref<infer V> ? V : T {
  return ifRef(ref) ? (ref.value as any) : ref
}
unref(ref(3)) // 3
```

可以按这个思路读一遍，加深理解

unref 函数，的参数为 ref，这是一个泛型类型暂定为T， 该函数返回值为
`T extends Ref<infer V> ? V : T`

由上文可知 `infer V` 作为一个占位符

这里我们跳到实际传的参数 -> ref(3) ，这里T是满足三目表达式的，最终返回类型 V，即 ref(3) 中的 typeof 3 -> 得到number类型
