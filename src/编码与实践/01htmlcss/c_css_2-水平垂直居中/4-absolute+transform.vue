<template>
  <div class="center-wrapper">
    <div class="wp">
      <div class="box">absolute + transform</div>
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
  transform: translate(-50%, -50%);
}
</style>
