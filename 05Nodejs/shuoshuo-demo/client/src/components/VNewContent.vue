<template>
  <div
    class="modal"
    :style="`display: ${show ? 'block' : 'none'}`"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">发表新内容</h5>
          <button
            type="button"
            class="close"
            @click="close"
          >
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">

          <!-- 登录 -->
          <form>
            <div class="form-group row">
              <label
                for="title"
                class="col-md-12 col-form-label"
              >标题</label>
              <div class="col-md-12">
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  id="l_title"
                  placeholder="请输入标题"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="content"
                class="col-md-12 col-form-label"
              >内容</label>
              <div class="col-md-12">
                <textarea
                  v-model="content"
                  type="content"
                  class="form-control"
                  id="l_content"
                  maxlength="255"
                  placeholder="正文少于255个字符"
                />
              </div>
            </div>
          </form>

        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="handleSubmit"
          >发表</button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="close"
          >取消</button>
          <!-- <a href="">我要注册</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    checkSubmit() {
      if (this.title == '') {
        console.log('标题为空')
        return false
      }
      if (this.content == '') {
        console.log('内容为空')
        return false
      }
      return true
    },
    clear() {
      this.title = ''
      this.content = ''
    },
    handleSubmit() {
      if (this.checkSubmit()) {
        let username = localStorage.getItem('username')
        this.$http.post('/api/contents', {
          title: this.title,
          content: this.content
        }).then(({data}) => {
          // console.log('data', data)
          this.clear()
          this.close()
        })
      }
    }
  }
}
</script>
