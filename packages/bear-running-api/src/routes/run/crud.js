import { toMongoId, fromMongoId } from '~/util/id'
import { parse } from './parse'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'
import { withUser } from '~/middleware/withUser'
import type Router from 'koa-router'
import type { Weather, Step } from 'types/Run'

type CreateRunInput = {|
  steps: Step[],
  weather: Weather,
|}
type UpdateRunInput = {|
  steps?: Step[],
  weather?: Weather,
|}

export default router => {
  // get run
  router.get('/user/:user_id/run/:run_id', async (ctx, next) => {
    const run = await ctx.db.collection('run').findOne({
      _id: toMongoId(ctx.params.run_id),
      deleted: false,
    })

    if (!run) ctx.throw(404, 'Not Found')

    ctx.body = parse(run)
  })

  // create run
  router.post(
    '/user/:user_id/run',
    koaBody(),
    withUser(),
    async (ctx, next) => {
      const run = assertType(ctx, CreateRunInput)(ctx.request.body)

      const user_id = ctx.params.user_id
      const _user_id = toMongoId(user_id)

      // check that the user exists
      if (
        !await ctx.db.collection('user').findOne({
          _id: _user_id,
          deleted: false,
        })
      )
        return ctx.throw(404, 'User Not Found')

      // check Authorization
      if (!['admin'].includes(ctx.user.role) && ctx.user.id !== user_id)
        ctx.throw(403, 'Forbidden')

      // insert
      const r = { ...run, user_id, _user_id, deleted: false }
      r.date_start = run.steps[0].date

      await ctx.db.collection('run').insertOne(r)

      ctx.body = parse(r)
    }
  )

  // update run
  router.put(
    '/user/:user_id/run/:run_id',
    koaBody(),
    withUser(),
    async (ctx, next) => {
      const runInput = assertType(ctx, UpdateRunInput)(ctx.request.body)

      // get the run, to ensure it belong to the right user id
      const runOld = await ctx.db.collection('run').findOne({
        _id: toMongoId(ctx.params.run_id),
        deleted: false,
      })

      // check Authorization
      if (!['admin'].includes(ctx.user.role) && ctx.user.id !== runOld.user_id)
        ctx.throw(403, 'Forbidden')

      if (runInput.steps) runInput.date_start = runInput.steps[0].date

      const { value } = await ctx.db.collection('run').findOneAndUpdate(
        {
          _id: toMongoId(ctx.params.run_id),
          deleted: false,
        },
        { $set: runInput }
      )

      ctx.body = parse({ ...value, ...runInput })
    }
  )

  // delete run
  router.del('/user/:user_id/run/:run_id', withUser(), async (ctx, next) => {
    // get the run, to ensure it belong to the right user id
    const run = await ctx.db.collection('run').findOne({
      _id: toMongoId(ctx.params.run_id),
      deleted: false,
    })

    // check Authorization
    if (!['admin'].includes(ctx.user.role) && ctx.user.id !== run.user_id)
      ctx.throw(403, 'Forbidden')

    const { value } = await ctx.db.collection('run').findOneAndUpdate(
      {
        _id: toMongoId(ctx.params.run_id),
      },
      { $set: { deleted: true } }
    )

    ctx.body = '"ok"'
  })
}
