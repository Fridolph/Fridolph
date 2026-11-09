<template>
  <div class="center-wrapper">
    <div class="wp">
      <div class="wp-inner">
        <div class="box">writing-mode</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wp {
  writing-mode: vertical-lr;
  text-align: center;
}
.wp-inner {
  writing-mode: horizontal-tb;
  display: inline-block;
  text-align: center;
  width: 100%;
}
.box {
  display: inline-block;
  margin: auto;
  text-align: left;
}
</style>
