这篇文章主要讲的是路由切换的时候动画效果的实现，可以根据不同的路径去改变动画的效果，以下就是源码，可供参考：

```html
<template>  
  <div id="app">  
  
    <transition :name="transitionName">  
      <router-view class="child-view"></router-view>  
    </transition>  
  
  </div>  
</template>  
  
<script>  
  
export default {  
  name: 'app',  
  data () {  
    return {  
      transitionName: 'slide-left'  
    }  
  },  
  mounted () {  
  },  
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {  
      if(to.path == '/'){  
        this.transitionName = 'slide-right';  
      }else{  
        this.transitionName = 'slide-left';  
      }  
    }  
  }  
}  
</script>  
  
<style>  
.child-view {  
  position: absolute;  
  left: 0;  
  top: 0;  
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 0);  
  transform: translate(30px, 0);  
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 0);  
  transform: translate(-30px, 0);  
}  
</style>  
```

路由的api链接在这，详细的可以去看这          https://router.vuejs.org/zh-cn/advanced/transitions.html