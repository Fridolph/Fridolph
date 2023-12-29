<template>
  <div>{{number}}</div>
  <button @click="handleAddRandom">随机增加</button>
</template>

<script>
export default {
  props: {
    number: {
      type: Number
    }
  },
  methods: {
    handleAddRandom() {
      // 随机获取1-100的数
      const num = Math.floor(Math.random() * 100 + 1);
      this.$bus.on('add', num)
    }
  }
}
</script>

