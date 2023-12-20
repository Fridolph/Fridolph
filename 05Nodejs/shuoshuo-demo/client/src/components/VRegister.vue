<template>
  <div
    class="modal"
    :style="`display: ${show ? 'block' : 'none'}`"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">注册</h5>
          <button
            type="button"
            class="close"
            @click="close"
          >
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">

          <!-- 注册 -->
          <form>
            <div class="form-group row">
              <label
                for="username"
                class="col-md-3 col-form-label"
              >用户名</label>
              <div class="col-md-9">
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="r_username"
                  placeholder="用户名"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="password"
                class="col-md-3 col-form-label"
              >密码</label>
              <div class="col-md-9">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="r_password"
                  placeholder="密码"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="repassword"
                class="col-md-3 col-form-label"
              >重复密码</label>
              <div class="col-md-9">
                <input
                  v-model="repassword"
                  type="password"
                  class="form-control"
                  id="r_repassword"
                  placeholder="重复密码"
                />
              </div>
            </div>
          </form>

        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="handleRegister"
          >注册</button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="close"
          >取消</button>
          <!-- <a href="#">我有账号，立即登录</a> -->
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
      username: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    checkSubmit() {
      if (this.username == '') {
        console.log('用户名为空')
        return false
      }
      if (this.password == '') {
        console.log('密码为空')
        return false
      }
      if (this.repassword == '') {
        console.log('密码为空')
        return false
      }
      if (this.password != this.repassword) {
        console.log('两次密码不一致')
        return false
      }
      return true
    },
    clear() {
      this.username = ''
      this.password = ''
      this.repassword = ''
    },
    handleRegister() {
      if (this.checkSubmit()) {
        axios.post('/api/register', {
          username: this.username.trim(),
          password: this.password.trim()
        }).then(res => {
          // console.log('res: ', res.data)
          if (res.data.code === 0) {
            this.clear()
            this.close()
            this.$emit('regOk', res.data.data)
            alert('注册成功')
          } else {
            this.clear()
            alert(res.data.msg)
          }
        })
      }
    }
  }
}
</script>
