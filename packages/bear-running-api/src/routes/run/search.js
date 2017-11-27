import { ObjectId } from 'mongodb'
import { toMongoId, fromMongoId } from '~/util/id'
import { encodeBase64, decodeBase64 } from '~/util/base64'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'
import { withUser } from '~/middleware/withUser'
import { parse } from './parse'
import type Router from 'koa-router'
import type { Step } from 'types/Run'

type CreateRunInput = {|
  steps: Step[],
|}
type UpdateRunInput = {|
  steps?: Step[],
|}

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
    let date_start_min = ctx.request.query.date_start_min || null
    let date_start_max = ctx.request.query.date_start_max || null

    if (ctx.request.query.cursor) {
      const x = JSON.parse(decodeBase64(ctx.request.query.cursor))
      offset = x.offset
      orderBy = x.orderBy
      date_start_min = x.date_start_min
      date_start_max = x.date_start_max
    }

    const orderProp = orderBy.replace(/^\-/, '')
    const orderDesc = orderBy[0] === '-' ? -1 : 1

    const query = {
      deleted: false,
      _user_id: toMongoId(ctx.params.user_id),
    }
    if (date_start_min)
      query.date_start = { ...(query.date_start || {}), $gte: +date_start_min }

    if (date_start_max)
      query.date_start = { ...(query.date_start || {}), $lt: +date_start_max }

    const runs = await ctx.db
      .collection('run')
      .find(query)
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
