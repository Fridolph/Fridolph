function pv(ctx) {
  ctx.session.count++
  console.log('pv', ctx.path)
}

module.exports = () => async (ctx, next) => {
  pv(ctx)
  await next()
}
