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
    }))
    ctx.body = parse(user)
  })

  // create user
  router.post('/user', koaBody(), async (ctx, next) => {
    const user = assertType(ctx, CreateUserInput)(ctx.request.body)

    await ctx.db.collection('users').insertOne(user)

    ctx.body = parse(user)
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
      },
      { $set: user }
    )

    ctx.body = parse({ ...value, ...user })
  })
}
