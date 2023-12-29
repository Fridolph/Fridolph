<template>
  <div>
    随机增加：
    <Conter :number="number"></Conter>
  </div>
</template>

<script>
import Counter from './Counter'

export default {
  components: {
    Counter
  },
  data() {
    return {
      number: 0
    }
  },
  methods: {
    handleAddRandom(num) {
      this.number += num
    }
  },
  created() {
    this.$bus.on('add', this.handleAddRandom)
  },
  beforeDestory() {
    this.$bus.off('add', this.handleAddRandom)
  }
}
</script>
