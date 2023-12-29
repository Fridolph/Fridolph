<template>
  <div>
    <p>welcome</p>
    <nav>
      <router-link to="/bar">Bar</router-link>
      <router-link to="/baz">Baz</router-link>
      <router-link to="/foo">Foo</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import Bar from './components/Bar'
// import Baz from './components/Baz'
// import Foo from './components/Foo'

export default {
  // components: {
  //   Bar,
  //   Baz,
  //   Foo
  // }
}
</script>

<style>
  .baz {
    color: blue;
  }
</style>
