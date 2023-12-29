<template>
  <div :class="itemClasses">
    <div :class="headerClasses">
      <Icon type="arrow-right-b"></Icon>
      <slot></slot>
    </div>
    <div :class="contentClasses">
      <div :class="boxClasses">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 依赖iView图标组件
import Icon from '../icon/icon.vue'

const prefixCls = 'ivu-collapse'

export default {
  name: 'Panel',
  components: { Icon },
  props: {
    name: {
      // 用于唯一的标识当前面板
      type: String
    }
  }
}
</script>
