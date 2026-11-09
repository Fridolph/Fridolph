<template>
  <div class="center-wrapper">
    <div class="wp">
      <div class="box size">1-absolute+负margin</div>
    </div>
  </div>
</template>

<style scoped>
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -60px;
}
</style>
