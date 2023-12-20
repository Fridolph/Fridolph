class ProgressBar {
  constructor($container) {
    this.fullWidth = $container.width()
    this.$bar = null
  }  
  // 设置宽度
  setProgress(percentage) {
    this.$bar.animate({
      width: this.fullWidth * percentage + 'px'
    })
  }
  // 完成
  finished() {
    this.$bar.hide()
  }
  // 失败
  failed() {
    this.addFailedText()
  }
  addFailedText() { }
}

class ProgressBarWithNumber extends ProgressBar {
  constructor($container) {
    super($container)
  }
  // 多态
  setProgress(percentage) {
    // 先借助继承父类的函数
    super.setProgress(percentage)
    this.showPercentageText(percentage)
  }
  showPercentageText(percentage) {}
}