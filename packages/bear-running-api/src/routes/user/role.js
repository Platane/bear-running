import { ObjectId } from 'mongodb'
import { toMongoId, fromMongoId } from '~/util/id'
import { assertType } from '~/util/assertType'
import koaBody from 'koa-bodyparser'
import { withUser } from '~/middleware/withUser'
import { protect } from '~/middleware/protect'
import { parse } from './parse'
import type Router from 'koa-router'
import type { Role } from 'types/Role'

type Input = {| role: Role |}

const permissionLevel: Role = ['user', 'userManager', 'admin']

export default router => {
  // update user role
  router.put(
    '/user/:user_id/role',
    koaBody(),
    withUser(),
    protect(['admin', 'userManager']),
    async (ctx, next) => {
      const patch = assertType(ctx, Input)(ctx.request.body)

      // grab the user
      // ( we need to know his current role )
      const user = await ctx.db.collection('user').findOne({
        _id: toMongoId(ctx.params.user_id),
        deleted: false,
      })

      const setterLevel = permissionLevel.indexOf(ctx.user.role)
      const targetLevel = permissionLevel.indexOf(patch.role)
      const srctLevel = permissionLevel.indexOf(user.role)

      // prevent permission escalation
      ctx.assert(targetLevel <= setterLevel, 403, 'Forbidden')

      // prevent from degrading higher level users
      ctx.assert(srctLevel <= setterLevel, 403, 'Forbidden')

      const { value } = await ctx.db.collection('user').findOneAndUpdate(
        {
          _id: toMongoId(ctx.params.user_id),
          deleted: false,
        },
        { $set: patch }
      )

      ctx.body = parse({ ...value, ...patch })
    }
  )
}
