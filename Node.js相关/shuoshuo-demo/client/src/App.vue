<template>
  <div id="app">
    <div class="container">
      <VHeader />

      <VList />

      <VReply />
    </div>
  </div>
</template>

<script>
import VHeader from './components/VHeader'
import VList from './components/VList'
import VReply from './components/VReply'
export default {
  name: 'app',
  components: {
    VHeader,
    VList,
    VReply,
  },
}
</script>
<style lang="stylus">
.mb
  margin-bottom 20px
.list
  padding 20px
  border-bottom 1px dotted #ccc
</style>
