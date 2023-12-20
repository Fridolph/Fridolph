function m2(ctx) {
  console.log('m2')
}

module.exports = () => async (ctx, next) => {
  console.log('------ m2 start ---------')
  m2(ctx)
  console.log('------ m2 end ---------')
  await next()
}
