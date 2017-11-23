import { ObjectId } from 'mongodb'
import { toMongoId, fromMongoId } from '~/util/id'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'
import { withUser } from '~/middleware/withUser'

type CreateUserInput = {|
  name: string,
  picture: string,
|}
type UpdateUserInput = {|
  name?: string,
  picture?: string,
|}

const parse = x => ({ ...x, id: fromMongoId('user', x._id) })

export default router => {
  // get user
  router.get('/user/:user_id', async (ctx, next) => {
    const user = (next.body = await ctx.db.collection('users').findOne({
      _id: toMongoId(ctx.params.user_id),
      deleted: false,
    }))

    if (!user) ctx.throw(404, 'Not Found')

    ctx.body = parse(user)
  })

  // create user
  router.post('/user', koaBody(), async (ctx, next) => {
    const user = assertType(ctx, CreateUserInput)(ctx.request.body)

    const r = { ...user, deleted: false }

    await ctx.db.collection('users').insertOne(r)

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

    const { value } = await ctx.db.collection('users').findOneAndUpdate(
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

    const { value } = await ctx.db.collection('users').findOneAndUpdate(
      {
        _id: toMongoId(ctx.params.user_id),
      },
      { $set: { deleted: true } }
    )

    ctx.body = '"ok"'
  })
}
