<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'ivu-collapse'

export default {
  name: 'Collapse',
  props: {
    // 是否为手风琴模式，该模式下同时只能展开一个面板
    accordion: {
      type: Boolean,
      default: false
    },
    // 对应panel.vue展开的name, 手风琴模式下为数组
    value: {
      type: [Array, String]
    }
  },
  data() {
    return {
      // 设置内部使用状态，用于实现v-model
      currentValue: this.value
    }
  },
  computed: {
    classes() {
      return `${prefixCls}`
    }
  },
  watch: {
    value(val) {
      // 从外部改变value时更新内部数据
      this.currentValue = val
    }
  }
}
</script>
