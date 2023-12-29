import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
    <p :id="id">{{text}}</p>
  </div>`,
  data: {
    id: 0,
    text: 'hello vue'
  }
})
