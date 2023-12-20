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
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="food.ratings">
        </ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li 
              class="rating-item border-1px"              
              v-for="rating in food.ratings"
              v-show="needShow(rating.rateType,rating.text)"
            >
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" width="12" height="12" class="avatar" />
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import { formatDate } from 'common/js/date'
  import price from 'components/common/price/price'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/common/split/split'
  import ratingselect from 'components/common/ratingselect/ratingselect'

  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show: function() {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
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
      },
      needShow: function(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    events: {
      'ratingtype.select': function(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      'content.toggle': function(onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }

    },
    filters: {
      formatDate: function(time) {
        let date = new Date(time)

        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      price,
      cartcontrol,
      split,
      ratingselect,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

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
      position: relative
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
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 16px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size:12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        margin-left: 18px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7,17,27,0.1))
        .user
          position: absolute
          right: 0
          top: 16px          
          font-size: 0
          line-height: 12px
          .name
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size: 10px
            color: rgb(147,153,159)            
          .avatar
            border-radius: 50%
        .time
          margin-right: 6px
          line-height: 12px
          font-size: 10px
          color: rgb(147,153,159)
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7,17,27)
          .icon-thumb_up, .icon-thumb_down
            margin-right: 4px
            line-height: 24px
            font-size: 12px
          .icon-thumb_up
            color: rgb(0,160,220)
          .icon-thumb_down
            color: rgb(147,153,159)
      .no-rating
        padding: 16px 0
        font-size: 12px
        color: rgb(147,153,159)
</style>