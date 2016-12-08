<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script tyep="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food)
    },
    methods: {
      addCart(e) {
        if (!e._constructed) {
          return
        }
        console.log('click')
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart(e) {
        if (!e._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-add, .cart-count
      display: inline-block
    .cart-decrease, .cart-add
      padding: 5px
      font-size: 20px
      line-height: 20px
      color: rgb(0,160,220)
    .cart-count
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 20px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
</style>