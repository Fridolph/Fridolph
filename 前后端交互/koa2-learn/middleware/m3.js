function m3(ctx) {
  console.log('m3')
}

module.exports = () => async (ctx, next) => {
  console.log('------ m3 start ---------')
  m3(ctx)
  console.log('------ m3 end ---------')
  await next()
}
