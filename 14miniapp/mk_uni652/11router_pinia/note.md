# 11-11 KeepAlive 组件详解和活跃阶段的生命周期

```vue [app.vue]
<template>
  <router-link to="/">Home</router-link>
  <router-link to="/profile">Profile</router-link>
  <router-link to="/about">About</router-link>

  <router-view>
    <keep-alive v-slot="{ Component }">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

```vue [profile.vue]
<template>
  <div>count: {{ count }}</div>
  <button @click="count++">add</button>
</template>
<script setup>
const count = ref(0)
onMounted(() => {
  console.log('组件挂载')
})
onUnmounted(() => {
  console.log('组件卸载')
})
onActivated(() => {
  console.log('激活')
})
onDeactivated(() => {
  console.log('失活')
})
</script>
```

- include: 用于缓存组件
  - 使用字符，例：`<keep-alive :include="About,Profile">`
  - 使用正则，例：`<keep-alive :include="/^pro|me$/">`
  - 使用数组，例：`<keep-alive :include="['about', 'profile']">`
- exclude：命中不缓存组件
  - 同上，同时存在优先级高于 include
- max：缓存组件最大数量，超出后，先进先出

# 11-17 Pinia Plugins 的相关使用

```js [main.js]
import { createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  const initialStore = JSON.parse(JSON.stringify(store))
  store.$reset = () => {
    store.$patch(state => {
      Object.assign(state, initialStore)
    })
  }
})

app.use(pinia)
app.mount('#app')
```
