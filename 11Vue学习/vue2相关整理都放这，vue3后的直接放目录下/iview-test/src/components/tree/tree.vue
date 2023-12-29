<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    />
  </div>
</template>

<script>
import TreeNode from "./node.vue";
import { deepCopy } from "../../utils/assist";

export default {
  name: "Tree",
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cloneData: []
    };
  },
  watch: {
    data() {
      this.rebuildData();
    }
  },
  created() {
    this.rebuildData();
  },
  methods: {
    rebuildData() {
      this.cloneData = deepCopy(this.data);
    },
    emitEvent() {
      this.$emit(eventName, data, this.cloneData);
    }
  }
};
</script>
