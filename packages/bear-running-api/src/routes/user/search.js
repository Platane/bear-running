import { encodeBase64, decodeBase64 } from '~/util/base64'
import { assertType } from '~/util/assertType'
import { parse } from './parse'
import type Router from 'koa-router'
import type { Step } from 'types/Run'

type OrderBy = 'date_created' | '-date_created'

export default router => {
  // get runs
  router.get('/user', async (ctx, next) => {
    // parse params
    const limit = Math.min(ctx.request.query.limit || Infinity, 20)

    let orderBy = assertType(ctx, OrderBy)(
      ctx.request.query.orderBy || '-date_created'
    )
    let offset = 0

    let name = ctx.request.query.name

    if (ctx.request.query.cursor) {
      const x = JSON.parse(decodeBase64(ctx.request.query.cursor))
      name = x.name
      offset = x.offset
      orderBy = x.orderBy
    }

    const orderProp = orderBy.replace(/^\-/, '')
    const orderDesc = orderBy[0] === '-' ? -1 : 1

    const query = {
      deleted: false,
    }

    if (name)
      query['$text'] = {
        $search: name,
        $caseSensitive: false,
        $diacriticSensitive: false,
      }

    const runs = await ctx.db
      .collection('user')
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
