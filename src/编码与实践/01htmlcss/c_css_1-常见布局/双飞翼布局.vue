<template>
  <div class="demo-wrapper">
    <div id="main" class="col">
      <div id="main-wrap">this is main</div>
    </div>
    <div id="left" class="col">
      this is left
    </div>
    <div id="right" class="col">
      this is right
    </div>
  </div>
</template>

<style scoped>
.col {
  float: left;
}
#main {
  width: 100%;
  height: 200px;
  background-color: Lavender;
}
#main-wrap {
  margin: 0 190px 0 190px;
}

#left {
  width: 190px;
  height: 200px;
  background-color: pink;
  margin-left: -100%;
}
#right {
  width: 190px;
  height: 200px;
  background-color: Khaki;
  margin-left: -190px;
}
</style>
