const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://www.jjwxc.net/onebook.php?novelid=2654068')
})()
