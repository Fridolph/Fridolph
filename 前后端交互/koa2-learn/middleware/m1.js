function m1(ctx) {
  console.log('m1')
}

module.exports = () => async (ctx, next) => {
  console.log('------ m1 start ---------')
  m1(ctx)
  console.log('------ m1 end ---------')
  await next()
}
