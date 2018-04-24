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

  addFailedText() {
    
  }
}

class ProgressBarWithNumber {
  constructor($container) {
    this.progressBar = new ProgressBar($container)
  }
  setProgress(percentage) {
    this.progressBar.setProgress(percentage)
    this.showPercentageText(percentage)
  }
  showPercentageText(percentage) {}
}