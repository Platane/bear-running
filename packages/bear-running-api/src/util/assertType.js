export const assertType = (ctx, Type) => x => {
  try {
    Type.assert(x)
    return x
  } catch (err) {
    ctx.throw(400, err.message)
    return false
  }
}
