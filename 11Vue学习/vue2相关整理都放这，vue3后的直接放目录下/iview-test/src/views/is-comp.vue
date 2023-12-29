<template>
  <div>
    <button @click="handleChange('A')">显示 A 组件</button>
    <button @click="handleChange('B')">显示 B 组件</button>
    <button @click="handleChange('C')">显示 C 组件</button>

    <component :is="component"></component>
  </div>
</template>
<script>
import compA from "../components/is-comp/a.vue";
import compB from "../components/is-comp/b.vue";
import compC from "../components/is-comp/c.vue";

export default {
  data() {
    return {
      component: compA
    };
  },
  methods: {
    handleChange(component) {
      if (component === "A") {
        this.component = compA;
      } else if (component === "B") {
        this.component = compB;
      } else if (component === "C") {
        this.component = compC;
      }
    }
  }
};
</script>
