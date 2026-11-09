<template>
  <div class="center-wrapper">
    <div class="wp">
      <div class="box size">3-absolute+calc</div>
    </div>
  </div>
</template>

<style scoped>
.wp {
  position: relative;
}
.box {
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
}
</style>
