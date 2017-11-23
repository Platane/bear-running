import { ObjectId } from 'mongodb'
import { toMongoId, fromMongoId } from '~/util/id'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'
import { withUser } from '~/middleware/withUser'
import { parse } from './parse'
import type Router from 'koa-router'

type CreateUserInput = {|
  name: string,
  picture: string,
|}
type UpdateUserInput = {|
  name?: string,
  picture?: string,
|}

export default router => {
  // get user
  router.get('/user/:user_id', async (ctx, next) => {
    const user = await ctx.db.collection('user').findOne({
      _id: toMongoId(ctx.params.user_id),
      deleted: false,
    })

    if (!user) ctx.throw(404, 'User Not Found')

    ctx.body = parse(user)
  })

  // create user
  router.post('/user', koaBody(), async (ctx, next) => {
    const user = assertType(ctx, CreateUserInput)(ctx.request.body)

    const r = { ...user, deleted: false }

    await ctx.db.collection('user').insertOne(r)

    ctx.body = parse(r)
  })

  // update user
  router.put('/user/:user_id', koaBody(), withUser(), async (ctx, next) => {
    const user = assertType(ctx, UpdateUserInput)(ctx.request.body)

    // check Authorization
    if (
      !['admin', 'userManager'].includes(ctx.user.role) &&
      ctx.user.id !== ctx.params.user_id
    )
      ctx.throw(403, 'Forbidden')

    const { value } = await ctx.db.collection('user').findOneAndUpdate(
      {
        _id: toMongoId(ctx.params.user_id),
        deleted: false,
      },
      { $set: user }
    )

    ctx.body = parse({ ...value, ...user })
  })

  // delete user
  router.del('/user/:user_id', withUser(), async (ctx, next) => {
    // check Authorization
    if (
      !['admin', 'userManager'].includes(ctx.user.role) &&
      ctx.user.id !== ctx.params.user_id
    )
      ctx.throw(403, 'Forbidden')

    const { value } = await ctx.db.collection('user').findOneAndUpdate(
      {
        _id: toMongoId(ctx.params.user_id),
      },
      { $set: { deleted: true } }
    )

    ctx.body = '"ok"'
  })
}
