<template>
  <div class="center-wrapper">
    <table id="table">
      <tbody>
        <tr>
          <td class="wp">
            <div class="box">利用Table实现居中</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#table {
  margin: 20px auto !important;
  display: table;
}
.wp {
  text-align: center;
}
.box {
  display: inline-block;
}
</style>
