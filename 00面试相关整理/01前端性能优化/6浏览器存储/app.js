if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./service-worker.js', {
    scope: './'
  }).then(data => {
    console.log(data)
  }).catch(err => {
    console.error(err)
  })
} else {
  console.log('Service Worker is net supported!!!')
}