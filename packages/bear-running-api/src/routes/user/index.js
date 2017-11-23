import { ObjectId } from 'mongodb'
import { toMongoId, fromMongoId } from '~/util/id'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'

const parser = x => x

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
  router.get(
    '/user/:user_id',
    async (ctx, next) =>
      (next.body = parse(
        await ctx.db.collection('users').findOne({
          _id: toMongoId(ctx.params.user_id),
        })
      ))
  )

  // get users
  router.get(
    '/user',
    async (ctx, next) =>
      (next.body = parse(
        await ctx.db.collection('users').findOne({
          _id: toMongoId(ctx.params.user_id),
        })
      ))
  )

  // create user
  router.post('/user', koaBody(), async (ctx, next) => {
    const user = assertType(ctx, CreateUserInput)(ctx.request.body)

    await ctx.db.collection('users').insertOne(user)

    ctx.body = { ...user, id: fromMongoId('user', user._id) }
  })

  // update user
  router.put('/user/:user_id', koaBody(), async (ctx, next) => {
    const user = assertType(ctx, UpdateUserInput)(ctx.request.body)

    const { value } = await ctx.db.collection('users').findOneAndUpdate(
      {
        _id: toMongoId(ctx.params.user_id),
      },
      { $set: user }
    )

    ctx.body = { ...value, id: ctx.params.user_id }
  })
}
