import type { Context } from 'koa'

export const assertType = (
  ctx: Context,
  Type: { assert: (o: any) => void }
) => (x: any) => {
  try {
    Type.assert(x)
    return x
  } catch (err) {
    ctx.throw(400, err.message)
    throw new Error('type Error')
  }
}
