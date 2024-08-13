// 使用window.location.href或window.location.replace（）重定向到url。
// 传递第二个参数来模拟链接点击（true – default）或HTTP重定向（false）。
const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url)
