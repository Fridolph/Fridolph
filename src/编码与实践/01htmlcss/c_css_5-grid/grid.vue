<template>
  <div class="wrapper">
    <div class="one item">One</div>
    <div class="two item">Two</div>
    <div class="three item">Three</div>
    <div class="four item">Four</div>
    <div class="five item">Five</div>
    <div class="six item">Six</div>
    <div class="seven item">Seven</div>
    <div class="eight item">eight</div>
    <div class="nine item">Nine</div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: 200px 100px;
  /*  只设置了两行，但实际的数量会超出两行，超出的行高会以 grid-auto-rows 算 */
  grid-template-rows: 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}

.one {
  background: #19caad;
}
.two {
  background: #8cc7b5;
}
.three {
  background: #d1ba74;
}
.four {
  background: #bee7e9;
}
.five {
  background: #e6ceac;
}
.six {
  background: #ecad9e;
}
.seven {
  background: #beedc7;
}
.eight {
  background: #f4606c;
}
.nine {
  background: #a0eee1;
}
.item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}
</style>
