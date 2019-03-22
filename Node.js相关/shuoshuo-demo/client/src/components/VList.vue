<template>
  <div>
    <div class="mb">
      <div
        class="list"
        v-for="v in list"
        :key="v.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{v.title}}</h5>
          <small>{{v.created_at}}</small>
        </div>
        <p class="mb-1">
          {{v.content}}
        </p>
        <footer class="text-right">
          <small @click="handleLike(v.id, v.user_id)">赞（{{v.like_count}}）</small>
          <small @click="handleUnlike(v.id, v.user_id)">踩（{{v.unlike_count}}）</small>
          <small>回复（{{v.comment_count}}）</small>
          <a href="#" @click.prevent="openReply">我要回复</a>
        </footer>
      </div>
      <!-- <div class="list">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">有哪些是一天以内就能掌握却受用终身的技能？</h5>
          <small>2018/09/17</small>
        </div>
        <p class="mb-1">
          有什么是十分钟就能掌握但是受用 终身的技能？ 只要不是太繁琐或者是冷门知识，任何的日常小 贴士、生活小窍门都可以。你知道哪些技能是终 身受用，但只要十分钟，或者说稍加一些练习就 能精通的呢？
        </p>
        <footer class="text-right">
          <small>赞（100）</small>
          <small>回复（66）</small>
          <a href="">我要回复</a>
        </footer>
      </div> -->

      <!-- <div class="list">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">怎么样才能好好聊天？</h5>
          <small>2018/09/17</small>
        </div>
        <p class="mb-1">
          自己讲话太直白容易伤人怎么改善？ 豆瓣有人私信问我，如何与人愉快聊天，最好是见解独到，让人感觉如沐春风。
          作为一个才看完《奇葩说》的逗比，我好想学马东东说一句，赶快喝一杯，喝了就能愉快聊天的XX咖啡，或者是吃一颗变逗比的XX豆
        </p>
        <footer class="text-right">
          <small>赞（10）</small>
          <small>回复（5）</small>
          <a href="">我要回复</a>
        </footer>

        <div class="list">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">怎么样才能好好聊天？</h5>
            <small>2018/09/17</small>
          </div>
          <p class="mb-1">
            自己讲话太直白容易伤人怎么改善？ 豆瓣有人私信问我，如何与人愉快聊天，最好是见解独到，让人感觉如沐春风。
            作为一个才看完《奇葩说》的逗比，我好想学马东东说一句，赶快喝一杯，喝了就能愉快聊天的XX咖啡，或者是吃一颗变逗比的XX豆
          </p>
        </div>
      </div> -->
    </div>

    <ul
      class="pagination mb"
      v-if="pages"
    >
      <li class="page-item disabled" @click="changePage(page - 1)">
        <span class="page-link"> &lt; </span>
      </li>

      <li
        class="page-item"
        v-for="(n, i) in pages"
        :key="i"
        @click="changePage(n)"
      >
        <span :class="['page-link', i + 1 == page ? 'active' : '']">{{n}}</span>
      </li>

      <li class="page-item" @click="changePage(page + 1)">
        <span class="page-link"> &gt; </span>
      </li>
      <span style="margin:5px 0 0 20px">共 {{ total }} 条</span>
    </ul>

    <VReply :show="show" @close="closeReply" />
  </div>
</template>

<script>
import axios from 'axios'
import VReply from './VReply'

export default {
  components: {
    VReply
  },
  data() {
    return {
      total: 0,
      page: 1,
      limit: 2,
      list: [],
      show: false,
    }
  },
  computed: {
    pages() {
      if (this.total > 0) {
        return Math.ceil(this.total / 2)
      } else {
        return 0
      }
    },
  },
  watch: {
    page(newVal, val) {
      this.getData(newVal)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(page) {
      axios.get('/api/contents', {
        params: {
          page
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.total = res.data.total
          this.list = res.data.data
        }
      })
    },
    changePage(page) {
      if (page > this.pages) {
        this.page = this.pages
      } else if (page < 1) {
        this.page = 1
      } else {
        this.page = page
      }
    },
    handleLike(contentId, userId) {
      // console.log('contentId: ', contentId)
      // console.log('userId: ', userId);
      this.$http.post('/api/like', {
        content_id: contentId,
        user_id: userId
      }).then(({data}) => {
        if (data.code === 0) {
          this.list.forEach(v => {
            if (v.id === data.data.id) {
              v.like_count = data.data.like_count
            }
          })
        } else {
          alert(data.msg)
        }
      })
    },
    handleUnlike(contentId, userId) {
      // console.log('userId: ', userId);
      // console.log('contentId: ', contentId)
      this.$http.post('/api/unlike', {
        content_id: contentId,
        user_id: userId
      }).then(({data}) => {
        if (data.code === 0) {
          this.list.forEach(v => {
            if (v.id == data.data.id) {
              v.unlike_count = data.data.unlike_count
            }
          })
        } else {
          alert(data.msg)
        }
      })
    },
    openReply() {
      this.show = true
    },
    closeReply() {
      this.show = false
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-link
  color #999
  &.active
    background-color skyblue
    color blue

.text-right
  cursor pointer
</style>
