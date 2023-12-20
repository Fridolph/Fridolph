<template>
  <div>
    <div class="py-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="../assets/img/sequelize.jpg"
      />
      <p class="lead">
        爱就好比骑马和学法语，如果不趁年轻时学会，以后想学会就难了。
      </p>
      <p class="lead">
        Love is like riding or speaking French,if you don not learn it young, it's hard to get the trick of it
        later.
      </p>

    </div>

    <div v-if="username == ''" class="heading text-right mb">
      <a href="#" @click.prevent="handleRegister">注册</a>
      <span> | </span>
      <a href="#" @click.prevent="handleLogin">登录</a>
    </div>
    <div v-else class="heading text-right mb" style="position:relative">
      <a style="position: absolute;left: 0" href="#" @click.prevent="openMessageModal">我要发表</a>
      {{username}}
      <span> | </span>
      <a href="#" @click.prevent="handleLogout">注销</a>
    </div>

    <VLogin :show="modalName === 'login'" @close="closeModal" @loginOk="loginOk" />

    <VRegister :show="modalName === 'register'" @close="closeModal" @regOk="loginOk" />

    <VNewContent :show="modalName === 'newContent'" @close="closeModal" @subNew="submitNewContent" />
  </div>
</template>

<script>
import VLogin from './VLogin'
import VRegister from './VRegister'
import VNewContent from './VNewContent'
export default {
  components: {
    VLogin,
    VRegister,
    VNewContent
  },
  data() {
    return {
      modalName: '',
      username: ''
    }
  },
  created() {
    let username = localStorage.getItem('username')
    if (username) {
      this.username = username
    }
  },
  methods: {
    handleLogin() {
      this.modalName = 'login'
    },
    handleRegister() {
      this.modalName = 'register'
    },
    openMessageModal() {
      this.modalName= 'newContent'
    },
    handleLogout() {
      let cf = confirm('是否要注销')
      if (cf) {
        this.$http.post('/api/logout').then(res => {
          // console.log('res: ', res.data)
          if (res.data.code === 0) {
            this.username = ''
            localStorage.setItem('uid', '')
            localStorage.setItem('username', '')
          }
        })
      }
    },
    submitNewContent() {
      console.log('submitNewContent: ')
    },
    closeModal() {
      this.modalName = ''
    },
    loginOk(data) {
      console.log('loginOk: ', data)
      localStorage.setItem('uid', data.id)
      localStorage.setItem('username', data.username)
      this.username = data.username
    }
  }
}
</script>
