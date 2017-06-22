<template>
  <div class="price">
    <span class="now">￥{{food.price}}</span>
    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span> 
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .price
    font-weight: 700
    line-height: 24px
    .now
      margin-right: 8px
      font-size: 14px
      color: rgb(240, 20, 20)
    .old
      text-decoration: line-through
      font-size: 10px
      color: rgb(147, 153, 159)
</style>