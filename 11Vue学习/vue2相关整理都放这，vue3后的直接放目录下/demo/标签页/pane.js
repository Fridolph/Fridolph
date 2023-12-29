Vue.component('pane', {
  name: 'pane',
  template: `
    <div class="pane" :class="{'animate-active': show}">
      <slot></slot>      
    </div>
  `,
  props: {
    name: {
      type: String      
    },
    label: {
      type: String,
      default: ''
    },
    closable: {
      type: [Boolean, String]
    }
  },
  data() {
    return {
      show: true
    }
  },
  watch: {
    label() {
      this.updateNav()
    }
  },
  methods: {
    updateNav() {
      this.$parent.updateNav()
    }
  },
  mounted() {
    this.updateNav()
  }
})