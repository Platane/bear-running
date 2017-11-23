import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '~/config'
import type { Context } from 'koa'

export const withUser = () => async (ctx: Context, next) => {
  const token =
    ctx.request.headers.authorization &&
    ctx.request.headers.authorization.replace('Bearer ', '')

  try {
    const data = jwt.verify(token, JWT_PRIVATE_KEY)

    ctx.user = {
      role: data['http://bear-running/role'],
      id: data['http://bear-running/userId'],
    }
  } catch (e) {
    ctx.throw(401, 'Unauthorized')
  }

  await next()
}
