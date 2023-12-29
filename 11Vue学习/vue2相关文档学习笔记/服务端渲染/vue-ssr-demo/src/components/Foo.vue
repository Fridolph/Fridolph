<template>
  <div>
    <h1 class="Foo">Foo</h1>
    <!-- <p>{{fooCount}}</p> -->
  </div>
</template>

<script>
// 在这里导入模块，而不是在 store/index.js 中
// import fooStoreModule from '../store/modules/foo'

export default {
  // computed: {
  //   fooCount() {
  //     return this.$store.state.foo.count
  //   }
  // },
  // asyncData({store}) {
  //   store.registerModule('foo', fooStoreModule)
  //   return store.dispatch('foo/inc')
  // },
  // // 重要信息：当多次访问路由时，避免在客户端重复注册模块
  // destroyed() {
  //   this.$store.unregisterModule('foo')
  // }
}
</script>

<style>
  .Foo {
    color: green;
  }
</style>
