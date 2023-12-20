<template>
  <div
    class="modal"
    :style="`display: ${show ? 'block' : 'none'}`"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">xxxxxxxxxx</h5>
          <button
            type="button"
            class="close"
            @click="close"
          >
            <span>&times;</span>
          </button>
        </div>

        <div class="modal-body">

          <!-- 回复 -->
          <form>
            <div class="form-group row">
              <div class="col-md-12">
                <textarea
                  class="form-control"
                  placeholder="回复内容……"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </form>

        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
          >回复</button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="close"
          >取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
