import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
    {{isActive ? 'active' : 'not Active'}}
  </div>`,
  data: {
    isActive: false
  }
})
