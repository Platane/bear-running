import { ObjectId } from 'mongodb'
import { toMongoId, fromMongoId } from '~/util/id'
import { encodeBase64, decodeBase64 } from '~/util/base64'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'
import { withUser } from '~/middleware/withUser'
import type Router from 'koa-router'
import type { Step } from 'types/Run'

type CreateRunInput = {|
  steps: Step[],
|}
type UpdateRunInput = {|
  steps?: Step[],
|}

const parse = x => ({
  ...x,
  id: fromMongoId('user', x._user_id, 'runs', x._id),
})

type OrderBy = 'date_start' | '-date_start'

export default router => {
  // get runs
  router.get('/user/:user_id/run', async (ctx, next) => {
    // parse params
    const limit = Math.min(ctx.request.query.limit || Infinity, 20)

    let orderBy = assertType(ctx, OrderBy)(
      ctx.request.query.orderBy || '-date_start'
    )
    let offset = 0

    if (ctx.request.query.cursor) {
      const x = JSON.parse(decodeBase64(ctx.request.query.cursor))
      offset = x.offset
      orderBy = x.orderBy
    }

    const orderProp = orderBy.replace(/^\-/, '')
    const orderDesc = orderBy[0] === '-' ? -1 : 1

    const runs = await ctx.db
      .collection('run')
      .find({
        deleted: false,
        _user_id: toMongoId(ctx.params.user_id),
      })
      .skip(offset)
      .sort([[orderProp, orderDesc]])
      .limit(limit)
      .toArray()

    const nextCursor =
      runs.length < limit
        ? null
        : encodeBase64(
            JSON.stringify({ offset: offset + runs.length, orderBy })
          )

    ctx.body = {
      nextCursor,
      items: runs.map(parse),
    }
  })
}
