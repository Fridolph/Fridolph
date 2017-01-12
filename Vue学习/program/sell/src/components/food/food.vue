<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" />
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sell}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <price :food="food"></price>
      </div>
      <div class="cartcontrol-wrapper">
        <cartcontrol :food="food"></cartcontrol>
      </div>
      <div 
        class="buy" 
        v-show="!food.count || food.count === 0"
        @click.stop.prevent="addFirst"
        transition="fade"
      >
        加入购物车
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import price from 'components/common/price/price'
  import cartcontrol from 'components/cartcontrol/cartcontrol'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
      }
    },
    methods: {
      show: function() {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide: function() {
        this.showFlag = false
      },
      addFirst: function(e) {
        if (!e._constructed) {
          return
        }
        this.$dispatch('cart.add', e.target)
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      price,
      cartcontrol,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background-color: #fff
    &.move-transition
      transition: all 0.4s ease-in-out
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform: translate3d(100%, 0, 0)
    .food-content
      position: relative
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width:100%
          height:100%
        .back
          position: absolute
          top: 18px
          left: 12px
          border: 1px solid #fff
          background-color: rgba(7,17,27,0.4)
          border-radius: 50%
          .icon-arrow_lift
            display: block
            padding: 7px
            font-size: 16px
            color: #fff
      .content
        padding: 18px
        .title
          margin-bottom: 8px
          line-height: 14px
          font-size: 14px
          font-weight: 700
          color: rgb(7,17,27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147,153,159)
          .sell-count
            margin-right: 12px
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        line-height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        color: #fff
        background-color: rgb(0, 160, 220)
        border-radius: 12px
        &.fade-transition
          transition: all 0.2s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0  
</style>