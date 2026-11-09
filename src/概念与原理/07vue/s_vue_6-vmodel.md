# 双向数据绑定

双向数据绑定通常是指我们使用的 `v-model` 指令的实现（Vue3 中为 v-model:modelValue），是 Vue 的一个特性，也可以说是一个 input 事件和 value 的语法糖。 Vue 通过 v-model 指令为组件添加上 input 事件处理和 value 属性的赋值。

## 原理

```vue
<template>
  <input v-model="localValue" />
</template>
```

上述的组件就相当于如下代码

```vue
<template>
  <!-- 这里添加了input时间的监听和value的属性绑定 -->
  <input
    @input="onInput"
    :value="localValue" />
  <span>{{ localValue }}</span>
</template>
<script>
export default {
  data() {
    return {
      localValue: '',
    }
  },
  methods: {
    onInput(v) {
      //在 input 事件的处理函数中更新 value 的绑定值
      this.localValue = v.target.value
      console.log(this.localValue)
    },
  },
}
</script>
```
